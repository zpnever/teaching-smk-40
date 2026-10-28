/* Widget Pertemuan 19: mesin function, kotak scope global/lokal */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Mesin function ─────────────────── */
  var MESIN = {
    kuadrat: {
      kode: 'function kuadrat(angka) {\n  return angka * angka;\n}',
      params: [{ nama: 'angka', contoh: '7' }]
    },
    sapa: {
      kode: 'function sapa(nama = "Teman") {\n  return `Halo, ${nama}!`;\n}',
      params: [{ nama: 'nama', contoh: '"Budi"' }]
    },
    luasPersegiPanjang: {
      kode: 'const luasPersegiPanjang = (panjang, lebar) => panjang * lebar;',
      params: [{ nama: 'panjang', contoh: '12' }, { nama: 'lebar', contoh: '8' }]
    },
    hargaDiskon: {
      kode: 'function hargaDiskon(harga, persen = 10) {\n  return harga - harga * persen / 100;\n}',
      params: [{ nama: 'harga', contoh: '50000' }, { nama: 'persen', contoh: '' }]
    }
  };

  var SVG_MESIN =
    '<svg class="doodle" viewBox="0 0 360 190" aria-hidden="true">' +
    '<g class="wobble">' +
    '<path class="soft" d="M112 26 h76 l-22 32 h-32 z"/>' +
    '<rect x="96" y="58" width="168" height="98" rx="14" class="paper"/>' +
    '<rect x="116" y="70" width="128" height="26" rx="6" class="solid"/>' +
    '<path class="paper" d="M264 112 h44 l12 22 h-56 z"/>' +
    '<path class="ink" d="M116 156 v18 M244 156 v18 M104 174 h24 M232 174 h24"/>' +
    '<path class="thin" d="M206 112 h40 M206 122 h28 M206 132 h34"/>' +
    '</g>' +
    '<g class="mf-gigi"><circle cx="140" cy="126" r="16" class="paper"/><path class="ink" d="M140 106 v-4 M140 146 v4 M120 126 h-4 M160 126 h4 M126 112 l-3 -3 M154 140 l3 3 M126 140 l-3 3 M154 112 l3 -3"/><circle cx="140" cy="126" r="5" class="solid"/></g>' +
    '<g class="mf-gigi mf-gigi--b"><circle cx="180" cy="134" r="11" class="paper"/><path class="ink" d="M180 119 v-3 M180 149 v3 M165 134 h-3 M195 134 h3"/><circle cx="180" cy="134" r="3.5" class="solid"/></g>' +
    '<text x="180" y="88" text-anchor="middle" font-size="13" class="mono inv mf-label">kuadrat()</text>' +
    '<text x="150" y="20" text-anchor="middle" font-size="11">parameter masuk</text>' +
    '<text x="304" y="102" text-anchor="middle" font-size="11">return keluar</text>' +
    '</svg>';

  function mesinFunction(el) {
    var body = kepala(el, 'Mesin Function');
    body.innerHTML =
      '<p class="content-text">Pilih mesin, isi argument-nya, lalu tekan <strong>Jalankan Mesin</strong>. Kosongkan argument untuk melihat <code>undefined</code> atau nilai default bekerja.</p>' +
      '<div class="pill-group" data-pilih></div>' +
      '<pre data-kode></pre>' +
      '<div class="mf-stage" data-stage><span class="mf-chip mf-in" data-in></span>' + SVG_MESIN + '<span class="mf-chip mf-out" data-out></span></div>' +
      '<form class="row" data-form><div class="row" data-param style="flex:1 1 260px"></div><button type="submit" class="btn btn--sm">Jalankan Mesin ▸</button></form>' +
      '<div class="readout" aria-live="polite" data-hasil><span class="muted">Belum dijalankan.</span></div>';

    var pilihEl = body.querySelector('[data-pilih]');
    var kodeEl = body.querySelector('[data-kode]');
    var paramEl = body.querySelector('[data-param]');
    var stage = body.querySelector('[data-stage]');
    var chipIn = body.querySelector('[data-in]');
    var chipOut = body.querySelector('[data-out]');
    var hasilEl = body.querySelector('[data-hasil]');
    var label = body.querySelector('.mf-label');
    var aktif = 'kuadrat';
    var sibuk = false;

    Object.keys(MESIN).forEach(function (nama) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = nama + '()';
      b.setAttribute('aria-pressed', nama === aktif ? 'true' : 'false');
      b.addEventListener('click', function () {
        aktif = nama;
        pilihEl.querySelectorAll('.pill').forEach(function (p) { p.setAttribute('aria-pressed', p === b ? 'true' : 'false'); });
        pasang();
      });
      pilihEl.appendChild(b);
    });

    function pasang() {
      var m = MESIN[aktif];
      window.Editor.highlight(m.kode, kodeEl);
      label.textContent = aktif.length > 14 ? aktif.slice(0, 13) + '…()' : aktif + '()';
      paramEl.innerHTML = m.params.map(function (p) {
        return '<label class="field">' + esc(p.nama) + '<input class="input" data-p value="' + esc(p.contoh) + '" spellcheck="false" autocomplete="off" placeholder="(kosong)"></label>';
      }).join('');
      chipIn.textContent = '';
      chipOut.textContent = '';
      stage.classList.remove('jalan', 'keluar');
      hasilEl.innerHTML = '<span class="muted">Belum dijalankan.</span>';
    }

    function panggilan() {
      var nilai = Array.prototype.map.call(paramEl.querySelectorAll('[data-p]'), function (i) { return i.value.trim(); });
      while (nilai.length && nilai[nilai.length - 1] === '') nilai.pop();
      return aktif + '(' + nilai.map(function (v) { return v === '' ? 'undefined' : v; }).join(', ') + ')';
    }

    body.querySelector('[data-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      if (sibuk) return;
      sibuk = true;
      var call = panggilan();
      chipIn.textContent = call.slice(aktif.length);
      chipOut.textContent = '';
      stage.classList.remove('jalan', 'keluar');
      void stage.offsetWidth;
      stage.classList.add('jalan');
      hasilEl.innerHTML = '<span class="muted">Mesin bekerja…</span>';
      var tunggu = new Promise(function (r) { setTimeout(r, 1100); });
      var kerja = window.JSRunner.run(MESIN[aktif].kode, { harness: '__cek(0, function () { return (' + call + '); });', timeout: 1000 });
      Promise.all([kerja, tunggu]).then(function (r) {
        sibuk = false;
        var h = r[0];
        var c = h.cek[0];
        if (h.error || !c || !c.ok) {
          var e = h.error || (c && c.error) || { name: 'Error', message: 'Mesin macet.' };
          var hint = h.error ? h.error.hint : window.JSRunner.terjemahkan(e.name, e.message);
          chipOut.textContent = 'Error';
          stage.classList.add('keluar');
          hasilEl.innerHTML = '<div class="muted">' + esc(call) + '</div><div class="big">Error</div><div style="font-family:var(--font-body);font-size:.88rem">' + esc(e.name + ': ' + e.message) + (hint ? '<br>' + esc(hint) : '') + '</div>';
          return;
        }
        var tampil = window.Checker.tampil(c.value);
        chipOut.textContent = tampil;
        stage.classList.add('keluar');
        var catatan = '';
        if (c.value === undefined) catatan = 'Hasilnya undefined — ada argument yang kosong, jadi parameternya bernilai undefined.';
        else if (typeof c.value === 'number' && isNaN(c.value)) catatan = 'NaN muncul karena menghitung dengan nilai yang bukan angka (misalnya undefined atau teks).';
        else if (/hargaDiskon\(\s*[^,)]+\s*\)$/.test(call)) catatan = 'Argument persen tidak diisi, jadi memakai nilai default 10.';
        else if (call === 'sapa()') catatan = 'Tanpa argument, parameter nama memakai nilai default "Teman".';
        hasilEl.innerHTML = '<div class="muted">' + esc(call) + ' → return</div><div class="big">' + esc(tampil) + '</div>' +
          '<div class="muted" style="font-family:var(--font-body);font-size:.85rem;margin-top:4px">tipe: ' + esc(c.tipe) + (catatan ? ' · ' + esc(catatan) : '') + '</div>';
      });
    });

    pasang();
  }

  /* ── 2. Kotak scope global & lokal ─────── */
  function kotakScope(el) {
    var body = kepala(el, 'Siapa Bisa Melihat Siapa?');
    body.innerHTML =
      '<p class="content-text">Klik salah satu perintah. Perhatikan <strong>dari mana</strong> kode dijalankan dan kotak mana yang bisa ditemukan.</p>' +
      '<div class="scope-global" data-area="luar"><span class="scope-label">Global — di luar function</span>' +
      '<div class="scope-isi">' +
      '<div class="vbox" data-v="sekolah"><div class="vbox-body"><span>"SMK 40 Jakarta"</span></div><span class="vbox-tag">const sekolah</span></div>' +
      '<div class="scope-lokal" data-area="dalam"><span class="scope-label">Lokal — di dalam tampilkan()</span>' +
      '<div class="scope-isi"><div class="vbox" data-v="kelas"><div class="vbox-body"><span>"XI RPL"</span></div><span class="vbox-tag">const kelas</span></div></div></div>' +
      '</div></div>' +
      '<div class="pill-group" data-aksi></div>' +
      '<div class="mini-console" aria-live="polite"><div class="dim">// Hasil pencarian variabel muncul di sini</div></div>';

    var AKSI = [
      { dari: 'dalam', v: 'sekolah', label: 'dalam function: console.log(sekolah)' },
      { dari: 'dalam', v: 'kelas', label: 'dalam function: console.log(kelas)' },
      { dari: 'luar', v: 'sekolah', label: 'luar function: console.log(sekolah)' },
      { dari: 'luar', v: 'kelas', label: 'luar function: console.log(kelas)' }
    ];
    var NILAI = { sekolah: 'SMK 40 Jakarta', kelas: 'XI RPL' };
    var konsol = body.querySelector('.mini-console');
    var wadah = body.querySelector('[data-aksi]');

    function tulis(kelas, teks) {
      var d = document.createElement('div');
      d.className = kelas;
      d.textContent = teks;
      konsol.appendChild(d);
      konsol.scrollTop = konsol.scrollHeight;
    }
    function bersih() {
      body.querySelectorAll('.aktif, .ketemu, .shake').forEach(function (x) { x.classList.remove('aktif', 'ketemu', 'shake'); });
    }

    AKSI.forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = a.label;
      b.addEventListener('click', function () {
        bersih();
        var area = body.querySelector('[data-area="' + a.dari + '"]');
        void area.offsetWidth;
        area.classList.add('aktif');
        tulis('dim', '// dijalankan dari ' + (a.dari === 'dalam' ? 'DALAM function tampilkan()' : 'LUAR function (global)'));
        tulis('', 'console.log(' + a.v + ');');
        var box = body.querySelector('.vbox[data-v="' + a.v + '"]');
        if (a.dari === 'luar' && a.v === 'kelas') {
          var lokal = body.querySelector('.scope-lokal');
          lokal.classList.add('shake');
          tulis('err', 'Uncaught ReferenceError: kelas is not defined');
          tulis('dim', '// dari luar hanya kotak global yang terlihat; kelas terkunci di dalam function');
          return;
        }
        box.classList.add('ketemu');
        tulis('ok', NILAI[a.v]);
        if (a.dari === 'dalam' && a.v === 'sekolah') tulis('dim', '// cari di lokal → tidak ada → naik ke global → ketemu!');
        else if (a.dari === 'dalam') tulis('dim', '// cari di lokal → langsung ketemu');
        else tulis('dim', '// variabel global bisa diakses di mana saja');
      });
      wadah.appendChild(b);
    });
  }

  var DAFTAR = { 'mesin-function': mesinFunction, 'kotak-scope': kotakScope };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
