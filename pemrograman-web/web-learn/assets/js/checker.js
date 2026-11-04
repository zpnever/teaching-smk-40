/* ═══════════════════════════════════════════
   CHECKER — memeriksa jawaban tantangan koding
   Tidak bergantung pada DOM; dipakai juga oleh skrip verifikasi Node.

   Bentuk soal (di assets/data/bank-XX.js):
   {
     id, judul, jenis: 'praktik' | 'tantangan' | 'studi-kasus',
     soal: '<p>HTML</p>',
     input: { nama: 'Budi' } | 'let x = 1;'   // Data Input bawaan (opsional)
     starter: 'kode awal', solusi: 'kode solusi', petunjuk: ['...'],
     syarat: [{ nama, pola: /regex/, tidak?: true }],
     tes: [{
       nama,
       input?: {...},              // data input khusus tes ini
       output?: ['baris', ...],    // seluruh output harus sama persis
       mengandung?: ['teks', ...], // output harus memuat teks ini
       minBaris?: n,
       panggil?: 'kuadrat(13)',    // ekspresi yang dievaluasi setelah kode siswa
       hasil?: nilai,              // nilai return yang diharapkan
       hasilOutput?: ['...'],      // output console saat ekspresi dipanggil
       cek?: function (ctx) { return true | 'pesan gagal'; }
     }]
   }
   ═══════════════════════════════════════════ */
(function (root) {
  'use strict';

  var POLA_KOMENTAR = /("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\/\/[^\n]*|\/\*[\s\S]*?\*\//g;

  function buangKomentar(kode) {
    return String(kode || '').replace(POLA_KOMENTAR, function (m, str) { return str || ''; });
  }

  function tampil(v) {
    if (typeof v === 'string') return '"' + v + '"';
    if (v && typeof v === 'object' && v.__teks) return v.__teks;
    if (typeof v === 'number' && Object.is(v, -0)) return '-0';
    if (v && typeof v === 'object') { try { return JSON.stringify(v); } catch (e) { return String(v); } }
    return String(v);
  }

  function samaNilai(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      if (isNaN(a) && isNaN(b)) return true;
      return Math.abs(a - b) < 1e-9;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }

  function rapikanBaris(baris) {
    var hasil = (baris || []).map(function (b) { return String(b).replace(/\s+$/, ''); });
    while (hasil.length && hasil[hasil.length - 1] === '') hasil.pop();
    return hasil;
  }

  function bandingkanOutput(harap, nyata) {
    var a = rapikanBaris(harap);
    var b = rapikanBaris(nyata);
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        if (b[i] === undefined) return 'Output kurang. Baris ke-' + (i + 1) + ' seharusnya: ' + a[i];
        if (a[i] === undefined) return 'Output kelebihan baris. Baris ke-' + (i + 1) + ' tidak diharapkan: ' + b[i];
        return 'Baris ke-' + (i + 1) + ' berbeda.\nDiharapkan : ' + a[i] + '\nOutput kamu: ' + b[i];
      }
    }
    return null;
  }

  function nilaiKeKode(v) {
    if (typeof v === 'string') return JSON.stringify(v);
    if (v === undefined) return 'undefined';
    if (typeof v === 'number' && isNaN(v)) return 'NaN';
    return JSON.stringify(v);
  }

  /** Ubah objek data input menjadi deklarasi let. */
  function inputKeKode(input) {
    if (!input) return '';
    if (typeof input === 'string') return input;
    return Object.keys(input).map(function (k) {
      return 'let ' + k + ' = ' + nilaiKeKode(input[k]) + ';';
    }).join('\n');
  }

  function pesanError(err) {
    if (!err) return '';
    var s = err.name + ': ' + err.message + (err.line ? ' (baris ' + err.line + ')' : '');
    return err.hint ? s + '\n' + err.hint : s;
  }

  /** Kelompokkan tes berdasarkan data input supaya satu run bisa dipakai banyak tes. */
  function rencanaRun(soal) {
    // Soal DOM: setiap tes yang memanggil sesuatu dijalankan di halaman segar,
    // supaya klik/ketik di satu tes tidak memengaruhi tes lainnya.
    if (soal.tesTerpisah || soal.mode === 'dom') return rencanaTerpisah(soal);
    var grup = {};
    var urutan = [];
    (soal.tes || []).forEach(function (t, i) {
      var input = inputKeKode(t.input !== undefined ? t.input : soal.input);
      if (!grup.hasOwnProperty(input)) { grup[input] = []; urutan.push(input); }
      grup[input].push(i);
    });
    if (!urutan.length) { urutan.push(inputKeKode(soal.input)); grup[urutan[0]] = []; }
    return urutan.map(function (input) {
      var idx = grup[input];
      var harness = idx.filter(function (i) { return soal.tes[i].panggil; }).map(function (i) {
        return harnessTes(soal, i);
      }).join('\n');
      return { input: input, harness: harness, tes: idx };
    });
  }

  function harnessTes(soal, i) {
    return '__cek(' + i + ', function () { return (' + soal.tes[i].panggil + '); });';
  }

  function rencanaTerpisah(soal) {
    var biasa = { input: inputKeKode(soal.input), harness: '', tes: [] };
    var hasil = [biasa];
    (soal.tes || []).forEach(function (t, i) {
      var input = inputKeKode(t.input !== undefined ? t.input : soal.input);
      if (t.panggil) hasil.push({ input: input, harness: harnessTes(soal, i), tes: [i] });
      else if (input === biasa.input) biasa.tes.push(i);
      else hasil.push({ input: input, harness: '', tes: [i] });
    });
    if (!biasa.tes.length && hasil.length > 1) hasil.shift();
    return hasil;
  }

  function nilaiTes(t, run, kode) {
    if (run.timeout) return 'Program tidak berhenti dalam batas waktu. Kemungkinan ada infinite loop — cek kondisi berhenti perulanganmu.';
    if (run.error) return pesanError(run.error);
    var logs = run.logs.filter(function (l) { return l.level !== 'meta'; }).map(function (l) { return l.text; });
    var ctx = { logs: logs, kode: kode, kodeBersih: buangKomentar(kode), run: run };

    if (t.output) {
      var beda = bandingkanOutput(t.output, logs);
      if (beda) return beda;
    }
    if (t.mengandung) {
      var semua = logs.join('\n');
      for (var i = 0; i < t.mengandung.length; i++) {
        var cari = t.mengandung[i];
        var ada = cari instanceof RegExp ? cari.test(semua) : semua.indexOf(cari) !== -1;
        if (!ada) return 'Output belum memuat: ' + (cari instanceof RegExp ? String(cari) : '"' + cari + '"');
      }
    }
    if (t.minBaris && logs.length < t.minBaris) {
      return 'Output baru ' + logs.length + ' baris, minimal ' + t.minBaris + ' baris.' + (logs.length === 0 ? ' Sudah pakai console.log()?' : '');
    }
    if (t.panggil) {
      // Soal DOM: ekspresi pemeriksa berisi helper internal (__klik, __ketik, …) — jangan ditampilkan ke siswa
      var label = t.__dom ? '' : t.panggil;
      var c = null;
      for (var j = 0; j < run.cek.length; j++) if (run.cek[j].i === t.__i) c = run.cek[j];
      if (!c) return t.__dom ? 'Pemeriksaan tidak sempat dijalankan (halaman error atau terlalu lama).' : 'Ekspresi ' + t.panggil + ' tidak sempat dijalankan.';
      if (!c.ok) {
        var e = c.error || {};
        var hint = (root.JSRunner && root.JSRunner.terjemahkan(e.name, e.message)) || '';
        return (t.__dom ? 'Saat pemeriksaan ini dijalankan di halamanmu terjadi ' : 'Saat memanggil ' + t.panggil + ' terjadi ') + e.name + ': ' + e.message + (hint ? '\n' + hint : '') + (t.pesan ? '\n' + t.pesan : '');
      }
      ctx.hasil = c.value;
      ctx.hasilLogs = c.logs;
      if (t.hasOwnProperty('hasil') && !samaNilai(t.hasil, c.value)) {
        if (t.__dom) return 'Diharapkan ' + tampil(t.hasil) + ', di halamanmu: ' + tampil(c.value) + '.' + (t.pesan ? '\n' + t.pesan : '');
        var s = label + ' → diharapkan ' + tampil(t.hasil) + ', hasil kamu ' + tampil(c.value) + '.';
        if (c.value === undefined && t.hasil !== undefined) s += '\nFunction mengembalikan undefined — lupa menulis return?';
        else if (typeof t.hasil !== typeof c.value && c.value !== undefined) s += '\nTipe datanya berbeda (' + typeof t.hasil + ' vs ' + typeof c.value + ').';
        return s;
      }
      if (t.hasilOutput) {
        var beda2 = bandingkanOutput(t.hasilOutput, c.logs);
        if (beda2) return (label ? label + ': ' : '') + beda2;
      }
    }
    if (typeof t.cek === 'function') {
      var r;
      try { r = t.cek(ctx); } catch (err) { r = 'Pemeriksaan gagal: ' + err.message; }
      if (r !== true) return (typeof r === 'string' ? r : 'Belum sesuai.') + (t.pesan ? '\n' + t.pesan : '');
    }
    return null;
  }

  /**
   * Periksa kode siswa.
   * @param soal    objek soal
   * @param kode    kode siswa
   * @param runFn   function(kode, {input, harness}) → Promise<hasil runner>
   * @returns Promise<{ lulus, items: [{ nama, lulus, detail }] }>
   */
  function periksa(soal, kode, runFn) {
    var bersih = buangKomentar(kode);
    var items = [];

    (soal.syarat || []).forEach(function (s) {
      var pola = s.pola instanceof RegExp ? s.pola : new RegExp(s.pola);
      var cocok = pola.test(bersih);
      var lulus = s.tidak ? !cocok : cocok;
      items.push({ nama: s.nama, lulus: lulus, detail: lulus ? '' : (s.pesan || '') });
    });

    var rencana = rencanaRun(soal);
    return Promise.all(rencana.map(function (r) {
      return runFn(kode, { input: r.input, harness: r.harness });
    })).then(function (hasilRun) {
      var hasilTes = [];
      rencana.forEach(function (r, k) {
        r.tes.forEach(function (i) {
          var t = Object.assign({ __i: i, __dom: soal.mode === 'dom' }, soal.tes[i]);
          var gagal = nilaiTes(t, hasilRun[k], kode);
          hasilTes[i] = { nama: t.nama, lulus: !gagal, detail: gagal || '' };
        });
      });
      items = items.concat(hasilTes.filter(Boolean));
      if (!(soal.tes || []).length) {
        var run0 = hasilRun[0];
        var err = run0 && (run0.timeout ? 'Program tidak berhenti (infinite loop?).' : pesanError(run0.error));
        items.push({ nama: 'Kode berjalan tanpa error', lulus: !err, detail: err || '' });
      }
      return {
        lulus: items.every(function (it) { return it.lulus; }),
        items: items,
        run: hasilRun[0]
      };
    });
  }

  root.Checker = {
    periksa: periksa,
    buangKomentar: buangKomentar,
    inputKeKode: inputKeKode,
    rencanaRun: rencanaRun,
    bandingkanOutput: bandingkanOutput,
    samaNilai: samaNilai,
    tampil: tampil,
    pesanError: pesanError
  };
})(typeof window !== 'undefined' ? window : globalThis);
