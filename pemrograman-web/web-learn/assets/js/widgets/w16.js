/* Widget Pertemuan 16: kalkulator operator, stepper prioritas, tabel kebenaran, pembanding == vs === */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  function tampilAngka(v) {
    if (typeof v !== 'number') return String(v);
    if (Object.is(v, -0)) return '-0';
    return String(v);
  }

  /* ── 1. Kalkulator operator a & b ─────── */
  var OPERATOR = [
    { op: '+', nama: 'Penjumlahan', f: function (a, b) { return a + b; } },
    { op: '-', nama: 'Pengurangan', f: function (a, b) { return a - b; } },
    { op: '*', nama: 'Perkalian', f: function (a, b) { return a * b; } },
    { op: '/', nama: 'Pembagian', f: function (a, b) { return a / b; } },
    { op: '%', nama: 'Modulus (sisa bagi)', f: function (a, b) { return a % b; } },
    { op: '**', nama: 'Pangkat', f: function (a, b) { return Math.pow(a, b); } }
  ];

  function penjelasan(op, a, b, h) {
    if (op === '%') {
      if (b === 0) return 'Sisa bagi dengan 0 tidak terdefinisi, hasilnya NaN.';
      var kali = Math.trunc(a / b);
      return a + ' = ' + b + ' × ' + kali + ' + ' + tampilAngka(h) + ' → sisanya ' + tampilAngka(h) + '. Trik: angka % 2 === 0 berarti genap.';
    }
    if (op === '/') return b === 0 ? 'Dibagi 0 menghasilkan Infinity (atau NaN untuk 0 / 0).' : 'Hasil pembagian bisa desimal — JavaScript tidak membedakan bulat & desimal.';
    if (op === '**') return a + ' dikali dirinya sendiri sebanyak ' + b + ' kali.';
    return '';
  }

  function kalkulator(el) {
    var body = kepala(el, 'Kalkulator Operator');
    body.innerHTML =
      '<p class="content-text">Ganti nilai <code>a</code> dan <code>b</code>, lalu pilih operatornya. Coba juga <code>a = 17</code> dan <code>b = 5</code> seperti Praktik 1!</p>' +
      '<div class="row">' +
      '<label class="field">let a =<input class="input" type="number" value="10" data-a></label>' +
      '<label class="field">let b =<input class="input" type="number" value="3" data-b></label></div>' +
      '<div class="pill-group" data-ops></div>' +
      '<div class="readout" aria-live="polite" data-out></div>' +
      '<div class="table-wrap" style="margin:0"><table class="tabel"><thead><tr><th>Ekspresi</th><th>Hasil</th></tr></thead><tbody data-semua></tbody></table></div>';
    var ia = body.querySelector('[data-a]');
    var ib = body.querySelector('[data-b]');
    var out = body.querySelector('[data-out]');
    var semua = body.querySelector('[data-semua]');
    var pilih = '%';
    var tombol = OPERATOR.map(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = o.op;
      b.setAttribute('aria-label', o.nama);
      b.addEventListener('click', function () { pilih = o.op; hitung(); });
      body.querySelector('[data-ops]').appendChild(b);
      return b;
    });
    function hitung() {
      var a = parseFloat(ia.value), b = parseFloat(ib.value);
      if (isNaN(a)) a = 0;
      if (isNaN(b)) b = 0;
      var o = OPERATOR.filter(function (x) { return x.op === pilih; })[0];
      tombol.forEach(function (t) { t.setAttribute('aria-pressed', t.textContent === pilih ? 'true' : 'false'); });
      var h = o.f(a, b);
      out.innerHTML = '<div class="muted">' + esc(o.nama) + '</div><div class="big">' + a + ' ' + o.op + ' ' + b + ' = ' + tampilAngka(h) + '</div>' +
        '<div class="muted" style="font-family:var(--font-body);font-size:.88rem;margin-top:4px">' + esc(penjelasan(o.op, a, b, h)) + '</div>';
      semua.innerHTML = OPERATOR.map(function (x) {
        return '<tr' + (x.op === pilih ? ' class="on"' : '') + '><td><code>a ' + x.op + ' b</code></td><td>' + tampilAngka(x.f(a, b)) + '</td></tr>';
      }).join('');
    }
    ia.addEventListener('input', hitung);
    ib.addEventListener('input', hitung);
    hitung();
  }

  /* ── 2. Stepper prioritas operator ─────── */
  // [ ] menandai bagian yang dihitung pada langkah berikutnya
  var EKSPRESI = [
    { teks: '10 + 5 * 2', langkah: [
      { e: '10 + [5 * 2]', why: '* lebih kuat dari +, jadi dikerjakan dulu.' },
      { e: '[10 + 10]', why: 'Tinggal penjumlahan.' },
      { e: '20', why: 'Selesai!' }] },
    { teks: '(10 + 5) * 2', langkah: [
      { e: '[(10 + 5)] * 2', why: 'Tanda kurung selalu paling dulu.' },
      { e: '[15 * 2]', why: 'Lalu perkalian.' },
      { e: '30', why: 'Selesai! Bandingkan dengan tanpa kurung (20).' }] },
    { teks: '20 / 4 + 3 ** 2', langkah: [
      { e: '20 / 4 + [3 ** 2]', why: 'Pangkat ** lebih kuat dari / dan +.' },
      { e: '[20 / 4] + 9', why: 'Pembagian sebelum penjumlahan.' },
      { e: '[5 + 9]', why: 'Tinggal penjumlahan.' },
      { e: '14', why: 'Selesai!' }] },
    { teks: '100 - 10 % 3 * 2', langkah: [
      { e: '100 - [10 % 3] * 2', why: '% dan * setingkat, jadi dikerjakan dari kiri ke kanan: % dulu.' },
      { e: '100 - [1 * 2]', why: 'Lalu perkalian.' },
      { e: '[100 - 2]', why: 'Pengurangan paling akhir.' },
      { e: '98', why: 'Selesai!' }] },
    { teks: '2 + 3 * 4 ** 2', langkah: [
      { e: '2 + 3 * [4 ** 2]', why: 'Pangkat dulu.' },
      { e: '2 + [3 * 16]', why: 'Lalu perkalian.' },
      { e: '[2 + 48]', why: 'Penjumlahan terakhir.' },
      { e: '50', why: 'Selesai!' }] }
  ];

  function tandai(e) {
    return esc(e).replace(/\[([^\]]+)\]/, '<mark>$1</mark>');
  }

  function stepper(el) {
    var body = kepala(el, 'Langkah demi Langkah: Prioritas Operator');
    body.innerHTML =
      '<p class="content-text">Pilih ekspresi, lalu tekan <strong>Langkah berikutnya</strong>. Bagian yang diblok hitam adalah yang dikerjakan JavaScript lebih dulu.</p>' +
      '<div class="pill-group" data-pilih></div>' +
      '<ol class="langkah-list" data-langkah aria-live="polite"></ol>' +
      '<div class="block-actions" style="margin-top:0"><button type="button" class="btn btn--sm" data-maju>Langkah berikutnya →</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-ulang>Ulang</button></div>';
    var list = body.querySelector('[data-langkah]');
    var maju = body.querySelector('[data-maju]');
    var aktif = 0, ke = 0;
    var pills = EKSPRESI.map(function (x, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = x.teks;
      b.addEventListener('click', function () { aktif = i; ke = 0; gambar(); });
      body.querySelector('[data-pilih]').appendChild(b);
      return b;
    });
    function gambar() {
      pills.forEach(function (p, i) { p.setAttribute('aria-pressed', i === aktif ? 'true' : 'false'); });
      var x = EKSPRESI[aktif];
      var html = '<li><span class="langkah-expr">' + esc(x.teks) + '</span><span class="langkah-why">Ekspresi awal</span></li>';
      for (var i = 0; i < ke; i++) {
        var l = x.langkah[i];
        html += '<li><span class="langkah-expr">= ' + tandai(l.e) + '</span><span class="langkah-why">' + esc(l.why) + '</span></li>';
      }
      list.innerHTML = html;
      maju.disabled = ke >= x.langkah.length;
      maju.textContent = ke >= x.langkah.length ? 'Selesai ✓' : 'Langkah berikutnya →';
    }
    maju.addEventListener('click', function () { ke++; gambar(); });
    body.querySelector('[data-ulang]').addEventListener('click', function () { ke = 0; gambar(); });
    gambar();
  }

  /* ── 3. Tabel kebenaran interaktif ─────── */
  function kebenaran(el) {
    var body = kepala(el, 'Tabel Kebenaran Interaktif');
    body.innerHTML =
      '<p class="content-text">Nyalakan/matikan <code>A</code> dan <code>B</code>, atau klik salah satu baris tabel. Perhatikan baris mana yang menyala.</p>' +
      '<div class="row" style="align-items:center">' +
      '<button type="button" class="saklar" data-s="A" aria-pressed="true"><span class="saklar-knob"></span><span>A = <b>true</b></span></button>' +
      '<button type="button" class="saklar" data-s="B" aria-pressed="false"><span class="saklar-knob"></span><span>B = <b>false</b></span></button></div>' +
      '<div class="readout" data-out aria-live="polite"></div>' +
      '<div class="table-wrap" style="margin:0"><table class="tabel tabel-klik"><thead><tr><th>A</th><th>B</th><th>A &amp;&amp; B</th><th>A || B</th><th>!A</th></tr></thead><tbody data-rows></tbody></table></div>';
    var nilai = { A: true, B: false };
    var rows = body.querySelector('[data-rows]');
    var KOMBINASI = [[true, true], [true, false], [false, true], [false, false]];
    rows.innerHTML = KOMBINASI.map(function (k, i) {
      return '<tr tabindex="0" data-i="' + i + '"><td>' + k[0] + '</td><td>' + k[1] + '</td><td>' + (k[0] && k[1]) + '</td><td>' + (k[0] || k[1]) + '</td><td>' + (!k[0]) + '</td></tr>';
    }).join('');
    function gambar() {
      body.querySelectorAll('.saklar').forEach(function (s) {
        var n = s.getAttribute('data-s');
        s.setAttribute('aria-pressed', nilai[n] ? 'true' : 'false');
        s.querySelector('b').textContent = String(nilai[n]);
      });
      rows.querySelectorAll('tr').forEach(function (tr, i) {
        tr.classList.toggle('on', KOMBINASI[i][0] === nilai.A && KOMBINASI[i][1] === nilai.B);
      });
      var A = nilai.A, B = nilai.B;
      body.querySelector('[data-out]').innerHTML =
        '<div>A &amp;&amp; B = <b>' + (A && B) + '</b> <span class="muted">— ' + (A && B ? 'keduanya true' : 'ada yang false') + '</span></div>' +
        '<div>A || B = <b>' + (A || B) + '</b> <span class="muted">— ' + (A || B ? 'minimal satu true' : 'keduanya false') + '</span></div>' +
        '<div>!A = <b>' + (!A) + '</b> <span class="muted">— kebalikan dari A</span></div>';
    }
    body.querySelectorAll('.saklar').forEach(function (s) {
      s.addEventListener('click', function () { var n = s.getAttribute('data-s'); nilai[n] = !nilai[n]; gambar(); });
    });
    rows.querySelectorAll('tr').forEach(function (tr) {
      var pilih = function () { var k = KOMBINASI[+tr.getAttribute('data-i')]; nilai.A = k[0]; nilai.B = k[1]; gambar(); };
      tr.addEventListener('click', pilih);
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pilih(); } });
    });
    gambar();
  }

  /* ── 4. Pembanding == vs === ───────────── */
  var PASANGAN = [['5', '"5"'], ['0', 'false'], ['""', '0'], ['null', 'undefined'], ['"1"', 'true'], ['10', '10']];

  function pembanding(el) {
    var body = kepala(el, 'Adu == vs ===');
    body.innerHTML =
      '<p class="content-text">Isi nilai kiri dan kanan (pakai kutip untuk string), lalu bandingkan. Lihat kapan <code>==</code> "tertipu" karena hanya membandingkan nilai.</p>' +
      '<form class="row" data-form><label class="field">Kiri<input class="input" value="5" data-l spellcheck="false" autocomplete="off"></label>' +
      '<label class="field">Kanan<input class="input" value="&quot;5&quot;" data-r spellcheck="false" autocomplete="off"></label>' +
      '<button type="submit" class="btn btn--sm">Bandingkan</button></form>' +
      '<div class="pill-group" data-contoh></div>' +
      '<div class="adu" data-out aria-live="polite"></div>';
    var il = body.querySelector('[data-l]');
    var ir = body.querySelector('[data-r]');
    var out = body.querySelector('[data-out]');
    PASANGAN.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = p[0] + ' vs ' + p[1];
      b.addEventListener('click', function () { il.value = p[0]; ir.value = p[1]; cek(); });
      body.querySelector('[data-contoh]').appendChild(b);
    });
    function kartu(op, hasil, ket) {
      return '<div class="adu-kartu ' + (hasil === 'true' ? 'ya' : 'tidak') + '"><code>' + op + '</code><b>' + hasil + '</b><span>' + esc(ket) + '</span></div>';
    }
    function cek() {
      var L = il.value.trim() || 'undefined', R = ir.value.trim() || 'undefined';
      out.innerHTML = '<p class="content-text">menjalankan…</p>';
      var kode = 'const __L = (' + L + '\n), __R = (' + R + '\n);\nconsole.log(typeof __L);\nconsole.log(typeof __R);\nconsole.log(__L == __R);\nconsole.log(__L === __R);';
      window.JSRunner.run(kode, { timeout: 1000 }).then(function (h) {
        if (h.error || h.timeout || h.logs.length < 4) {
          out.innerHTML = '<div class="readout"><div class="big">Error</div><div>' + esc(h.error ? (h.error.hint || h.error.message) : 'Nilai tidak bisa dibaca.') + '</div></div>';
          return;
        }
        var tl = h.logs[0].text, tr = h.logs[1].text, sama = h.logs[2].text, identik = h.logs[3].text;
        var ketSama = sama === 'true' ? (tl === tr ? 'nilainya sama' : 'tipe berbeda, tapi dipaksa jadi sama') : 'nilainya berbeda';
        var ketIdentik = identik === 'true' ? 'nilai & tipe sama (' + tl + ')' : (tl !== tr ? 'tipe beda: ' + tl + ' vs ' + tr : 'nilainya berbeda');
        out.innerHTML = '<div class="adu-ekspr"><code>' + esc(L) + '</code> <span class="muted">' + tl + '</span> &nbsp;vs&nbsp; <code>' + esc(R) + '</code> <span class="muted">' + tr + '</span></div>' +
          '<div class="adu-grid">' + kartu('==', sama, ketSama) + kartu('===', identik, ketIdentik) + '</div>' +
          (sama !== identik ? '<p class="content-text" style="margin-top:.6rem"><strong>Lihat?</strong> <code>==</code> bilang sama, padahal tipenya beda. Karena itu selalu pakai <code>===</code>.</p>' : '');
      });
    }
    body.querySelector('[data-form]').addEventListener('submit', function (e) { e.preventDefault(); cek(); });
    cek();
  }

  var DAFTAR = { 'kalkulator-operator': kalkulator, 'stepper-prioritas': stepper, 'tabel-kebenaran': kebenaran, 'pembanding': pembanding };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
