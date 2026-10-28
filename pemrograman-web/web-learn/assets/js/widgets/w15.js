/* Widget Pertemuan 15: kotak variabel, cek nama variabel, lab typeof */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };
  var GEMBOK = '<svg class="doodle vbox-gembok" viewBox="0 0 40 40"><path class="ink" d="M12 18 v-5 a8 8 0 0 1 16 0 v5"/><rect x="8" y="18" width="24" height="18" rx="4" class="solid"/><circle cx="20" cy="26" r="2.5" fill="#fff"/></svg>';

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Kotak variabel: let vs const ───── */
  function kotakVariabel(el) {
    var body = kepala(el, 'Kotak let vs Kotak const');
    body.innerHTML =
      '<p class="content-text">Ketik nilai baru, lalu coba masukkan ke tiap kotak. Kotak <code>let</code> boleh diganti isinya, kotak <code>const</code> terkunci.</p>' +
      '<div class="vbox-row">' +
      '<div class="vbox" data-v="skor"><div class="vbox-body"><span>10</span></div><span class="vbox-tag">let skor</span></div>' +
      '<div class="vbox terkunci" data-v="PI"><div class="vbox-body"><span>3.14</span>' + GEMBOK + '</div><span class="vbox-tag">const PI</span></div>' +
      '</div>' +
      '<div class="row"><label class="field" style="flex:2 1 180px">Nilai baru<input class="input" value="25" data-in></label>' +
      '<button type="button" class="pill" data-set="skor">skor = nilai</button>' +
      '<button type="button" class="pill" data-set="PI">PI = nilai</button></div>' +
      '<div class="mini-console" aria-live="polite"><div class="dim">// Riwayat kode muncul di sini</div></div>';
    var input = body.querySelector('[data-in]');
    var konsol = body.querySelector('.mini-console');
    function tulis(kelas, teks) {
      var d = document.createElement('div');
      d.className = kelas;
      d.textContent = teks;
      konsol.appendChild(d);
      konsol.scrollTop = konsol.scrollHeight;
    }
    body.querySelectorAll('[data-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var nama = b.getAttribute('data-set');
        var nilai = input.value.trim() || '0';
        var box = body.querySelector('.vbox[data-v="' + nama + '"]');
        tulis('', nama + ' = ' + nilai + ';');
        if (nama === 'PI') {
          box.classList.remove('shake');
          void box.offsetWidth;
          box.classList.add('shake');
          tulis('err', 'Uncaught TypeError: Assignment to constant variable.');
        } else {
          var span = box.querySelector('.vbox-body span');
          span.textContent = nilai;
          span.classList.remove('pop');
          void span.offsetWidth;
          span.classList.add('pop');
          tulis('ok', '// ✓ isi kotak skor sekarang ' + nilai);
        }
      });
    });
  }

  /* ── 2. Cek nama variabel ──────────────── */
  var KATA_KUNCI = ('break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof var void while with yield await enum static implements interface package private protected public').split(' ');

  function cekNama(el) {
    var body = kepala(el, 'Uji Nama Variabel');
    body.innerHTML =
      '<p class="content-text">Ketik calon nama variabel, lihat apakah boleh dipakai.</p>' +
      '<div class="row"><label class="field" style="flex:1 1 220px">Nama variabel<input class="input" value="namaLengkap" data-in spellcheck="false" autocomplete="off"></label>' +
      '<div data-stempel style="padding-bottom:6px"></div></div>' +
      '<div class="pill-group" data-contoh></div>' +
      '<ul class="cek-list" data-hasil></ul>';
    var contoh = ['namaLengkap', '2kelas', 'nama siswa', 'let', '_rahasia', '$harga', 'TOTAL_HARGA', 'x', 'Nama', 'jumlah-siswa'];
    var wadah = body.querySelector('[data-contoh]');
    var input = body.querySelector('[data-in]');
    contoh.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = c;
      b.addEventListener('click', function () { input.value = c; nilai(); });
      wadah.appendChild(b);
    });
    function nilai() {
      var n = input.value;
      var aturan = [
        { ok: n.length > 0, teks: 'Tidak kosong' },
        { ok: /^[A-Za-z_$]/.test(n), teks: 'Diawali huruf, _ atau $ (bukan angka)' },
        { ok: !/\s/.test(n), teks: 'Tidak mengandung spasi' },
        { ok: /^[\w$\s]*$/.test(n), teks: 'Hanya huruf, angka, _ dan $ (tanpa - . @ dll.)' },
        { ok: KATA_KUNCI.indexOf(n) === -1, teks: 'Bukan kata kunci JavaScript (let, if, const, …)' }
      ];
      var valid = aturan.every(function (a) { return a.ok; }) && /^[A-Za-z_$][\w$]*$/.test(n);
      var saran = [];
      if (valid) {
        if (/^[A-Z][A-Z0-9_]*$/.test(n) && n.length > 1) saran.push({ ok: true, teks: 'HURUF_BESAR: cocok untuk konstanta bernilai tetap, misal const PI.' });
        else if (/_/.test(n.replace(/^_+/, ''))) saran.push({ ok: false, teks: 'Konvensi JS memakai camelCase, misal namaLengkap (bukan nama_lengkap).' });
        else if (/^[A-Z]/.test(n)) saran.push({ ok: false, teks: 'Biasanya variabel diawali huruf kecil (camelCase). Ingat: Nama dan nama itu berbeda!' });
        else saran.push({ ok: true, teks: 'Sudah camelCase / huruf kecil — sesuai konvensi.' });
        if (n.replace(/[_$]/g, '').length < 3) saran.push({ ok: false, teks: 'Terlalu singkat. Nama yang bermakna (umur) lebih baik daripada x.' });
      }
      body.querySelector('[data-stempel]').innerHTML = '<span class="stempel ' + (valid ? 'ok' : 'no') + '">' + (valid ? 'VALID' : 'ERROR') + '</span>';
      body.querySelector('[data-hasil]').innerHTML = aturan.concat(saran.map(function (s) { s.saran = true; return s; })).map(function (a) {
        return '<li class="cek-item ' + (a.ok ? 'lulus' : 'gagal') + '"><span class="cek-icon">' + (a.ok ? '✓' : (a.saran ? '!' : '✗')) + '</span><div>' + (a.saran ? '<b>Konvensi:</b> ' : '') + esc(a.teks) + '</div></li>';
      }).join('');
    }
    input.addEventListener('input', nilai);
    nilai();
  }

  /* ── 3. Lab typeof ─────────────────────── */
  var PENJELASAN = {
    string: 'Teks — apa pun yang diapit tanda kutip " \' atau backtick `.',
    number: 'Angka — bulat, desimal, negatif, bahkan NaN dan Infinity termasuk number.',
    boolean: 'Hanya dua nilai: true atau false.',
    undefined: 'Belum punya nilai (atau nama variabel yang belum dibuat).',
    object: 'Untuk null, ini bug historis JavaScript sejak 1995. Nanti object & array juga bertipe object.',
    function: 'Sebuah function — dipelajari di pertemuan 19.',
    bigint: 'Angka bulat super besar (ada huruf n di belakang).'
  };

  function typeofLab(el) {
    var body = kepala(el, 'Lab typeof');
    body.innerHTML =
      '<p class="content-text">Ketik sebuah nilai (lengkap dengan kutipnya kalau string), lalu tekan <strong>Cek</strong>.</p>' +
      '<form class="row" data-form><label class="field" style="flex:1 1 220px">Nilai<input class="input" value="&quot;Budi&quot;" data-in spellcheck="false" autocomplete="off"></label>' +
      '<button type="submit" class="btn btn--sm">Cek typeof</button></form>' +
      '<div class="pill-group" data-contoh></div>' +
      '<div class="readout" aria-live="polite" data-out></div>';
    var contoh = ['"Budi"', '16', '3.14', '-5', 'true', 'false', 'undefined', 'null', '"16"', '`RPL`', 'NaN', 'Budi'];
    var input = body.querySelector('[data-in]');
    var out = body.querySelector('[data-out]');
    contoh.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = c;
      b.addEventListener('click', function () { input.value = c; cek(); });
      body.querySelector('[data-contoh]').appendChild(b);
    });
    function cek() {
      var v = input.value.trim();
      if (!v) return;
      out.innerHTML = '<span class="muted">menjalankan…</span>';
      window.JSRunner.run('console.log(typeof (' + v + '\n));', { timeout: 1000 }).then(function (h) {
        if (h.error || h.timeout || !h.logs.length) {
          out.innerHTML = '<div class="muted">typeof ' + esc(v) + '</div><div class="big">Error</div><div>' + esc(h.error ? h.error.hint || h.error.message : 'Nilai tidak bisa dibaca.') + '</div>';
          return;
        }
        var t = h.logs[0].text;
        var catatan = PENJELASAN[t] || '';
        if (/^[A-Za-z_$][\w$]*$/.test(v) && ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'].indexOf(v) === -1) {
          catatan = 'Tanpa tanda kutip, ' + v + ' dianggap NAMA VARIABEL yang belum dibuat, jadi hasilnya undefined. Kalau maksudnya teks, tulis "' + v + '".';
        }
        out.innerHTML = '<div class="muted">typeof ' + esc(v) + '</div><div class="big">"' + esc(t) + '"</div><div class="muted" style="font-family:var(--font-body);font-size:.88rem;margin-top:4px">' + esc(catatan) + '</div>';
      });
    }
    body.querySelector('[data-form]').addEventListener('submit', function (e) { e.preventDefault(); cek(); });
    cek();
  }

  var DAFTAR = { 'kotak-variabel': kotakVariabel, 'cek-nama': cekNama, 'typeof-lab': typeofLab };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
