/* Widget Pertemuan 17: jalur else if (flowchart), penyortir truthy/falsy */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Flowchart else if: predikat A–D ── */
  var BATAS = [90, 80, 70];
  var HURUF = ['A', 'B', 'C', 'D'];

  function svgFlow() {
    var s = '<svg class="doodle flow-svg" viewBox="0 0 520 362" role="img" aria-label="Flowchart else if predikat nilai">' +
      '<rect x="95" y="6" width="110" height="30" rx="15" class="paper"/>' +
      '<text x="150" y="26" text-anchor="middle" font-size="13">mulai</text>' +
      '<path class="ink" d="M150 36 v16"/>';
    BATAS.forEach(function (b, i) {
      var cy = 82 + i * 90;
      s += '<path data-d="' + i + '" class="paper" d="M150 ' + (cy - 30) + ' l90 30 l-90 30 l-90 -30 z"/>' +
        '<text data-dt="' + i + '" x="150" y="' + (cy + 5) + '" text-anchor="middle" font-size="13" class="mono">nilai &gt;= ' + b + '</text>' +
        '<path data-t="' + i + '" class="thin" d="M240 ' + cy + ' h82 M314 ' + (cy - 6) + ' l8 6 l-8 6"/>' +
        '<text x="268" y="' + (cy - 8) + '" font-size="11">true</text>' +
        '<rect data-r="' + i + '" x="330" y="' + (cy - 20) + '" width="150" height="40" rx="8" class="paper"/>' +
        '<text data-rt="' + i + '" x="405" y="' + (cy + 5) + '" text-anchor="middle" font-size="14">Predikat ' + HURUF[i] + '</text>' +
        '<path data-f="' + i + '" class="thin" d="M150 ' + (cy + 30) + ' v' + (i < 2 ? 30 : 24) + ' M144 ' + (cy + (i < 2 ? 52 : 46)) + ' l6 7 l6 -7"/>' +
        '<text x="158" y="' + (cy + 48) + '" font-size="11">false</text>';
    });
    s += '<rect data-r="3" x="75" y="318" width="150" height="38" rx="8" class="paper"/>' +
      '<text data-rt="3" x="150" y="342" text-anchor="middle" font-size="14">Predikat D (else)</text>' +
      '</svg>';
    return s;
  }

  function predikatFlow(el) {
    var body = kepala(el, 'Jalur else if: Predikat Nilai');
    body.innerHTML =
      '<p class="content-text">Geser nilainya. Lihat kondisi mana yang diperiksa (garis putus-putus = <code>false</code>) dan jalur mana yang akhirnya dijalankan. JavaScript memeriksa dari atas dan <strong>berhenti di kondisi true pertama</strong>.</p>' +
      '<label class="field">Nilai: <b data-nilai style="font-family:var(--font-mono);font-size:1.1rem">85</b><input type="range" min="0" max="100" value="85" data-in aria-label="Nilai"></label>' +
      '<div class="flow-wrap">' + svgFlow() + '</div>' +
      '<div class="readout" aria-live="polite" data-out></div>';
    var input = body.querySelector('[data-in]');
    var svg = body.querySelector('svg');
    function q(sel) { return svg.querySelector(sel); }

    function gambar() {
      var n = Number(input.value);
      body.querySelector('[data-nilai]').textContent = n;
      var pilih = 3;
      for (var i = 0; i < BATAS.length; i++) { if (n >= BATAS[i]) { pilih = i; break; } }
      var jejak = [];
      BATAS.forEach(function (b, i) {
        var diperiksa = i <= pilih;
        var benar = i === pilih;
        q('[data-d="' + i + '"]').setAttribute('class', !diperiksa ? 'paper f-redup' : benar ? 'solid' : 'paper f-salah');
        q('[data-dt="' + i + '"]').setAttribute('class', 'mono' + (benar ? ' inv' : '') + (!diperiksa ? ' f-redup' : ''));
        q('[data-t="' + i + '"]').setAttribute('class', benar ? 'ink f-jalan' : 'thin f-redup');
        q('[data-f="' + i + '"]').setAttribute('class', diperiksa && !benar ? 'ink f-jalan' : 'thin f-redup');
        if (diperiksa) jejak.push(n + ' >= ' + b + ' → ' + (benar ? 'true' : 'false'));
      });
      for (var r = 0; r < 4; r++) {
        q('[data-r="' + r + '"]').setAttribute('class', r === pilih ? 'solid' : 'paper f-redup');
        q('[data-rt="' + r + '"]').setAttribute('class', r === pilih ? 'inv' : 'f-redup');
      }
      if (pilih === 3) jejak.push('semua false → masuk else');
      body.querySelector('[data-out]').innerHTML =
        '<div class="muted">' + esc(jejak.join('   ·   ')) + '</div>' +
        '<div class="big">console.log("Predikat ' + HURUF[pilih] + '")</div>' +
        '<div class="muted">Kondisi yang diperiksa: ' + Math.min(pilih + 1, 3) + ' dari 3' + (pilih < 2 ? ' — sisanya dilewati.' : '.') + '</div>';
    }
    input.addEventListener('input', gambar);
    gambar();
  }

  /* ── 2. Penyortir truthy / falsy ───────── */
  var NILAI = [
    { t: '"halo"', v: 'halo', why: 'String berisi teks → truthy.' },
    { t: '0', v: 0, why: 'Angka 0 termasuk 6 nilai falsy.' },
    { t: '"0"', v: '0', why: 'Ini string berisi karakter "0", bukan angka 0. String tidak kosong → truthy.' },
    { t: '""', v: '', why: 'String kosong termasuk falsy.' },
    { t: '-1', v: -1, why: 'Semua angka selain 0 (dan NaN) → truthy, termasuk angka negatif.' },
    { t: 'null', v: null, why: 'null termasuk falsy.' },
    { t: '" "', v: ' ', why: 'String berisi spasi itu tidak kosong → truthy.' },
    { t: 'undefined', v: undefined, why: 'undefined termasuk falsy.' },
    { t: '"false"', v: 'false', why: 'Teks "false" tetap string yang tidak kosong → truthy.' },
    { t: 'NaN', v: NaN, why: 'NaN (Not a Number) termasuk falsy.' },
    { t: '100', v: 100, why: 'Angka selain 0 → truthy.' },
    { t: 'false', v: false, why: 'false jelas falsy.' }
  ];

  function truthySorter(el) {
    var body = kepala(el, 'Sortir: Truthy atau Falsy?');
    body.innerHTML =
      '<p class="content-text">Nilai apa pun bisa ditaruh di dalam <code>if ( )</code>. Tebak: kalau nilai ini jadi kondisi, apakah dianggap <strong>true</strong> (truthy) atau <strong>false</strong> (falsy)?</p>' +
      '<div class="sorter-top"><span class="kuis-counter" data-ke></span><span class="chip" data-skor></span></div>' +
      '<div class="readout sorter-card"><div class="muted">if (</div><div class="big" data-nilai></div><div class="muted">) { ... }</div></div>' +
      '<div class="row sorter-aksi"><button type="button" class="btn btn--sm" data-p="1">Truthy</button><button type="button" class="btn btn--sm btn--ghost" data-p="0">Falsy</button></div>' +
      '<div data-why aria-live="polite"></div>' +
      '<div class="sorter-bins">' +
      '<div class="mini-card"><h4>Keranjang Truthy</h4><div class="pill-group" data-bin="1"></div></div>' +
      '<div class="mini-card mini-card--dash"><h4>Keranjang Falsy</h4><div class="pill-group" data-bin="0"></div></div>' +
      '</div>';
    var idx = 0, skor = 0;
    var tombol = body.querySelectorAll('[data-p]');
    var why = body.querySelector('[data-why]');

    function tampil() {
      var selesai = idx >= NILAI.length;
      body.querySelector('[data-ke]').textContent = selesai ? 'Selesai!' : 'Nilai ' + (idx + 1) + ' / ' + NILAI.length;
      body.querySelector('[data-skor]').textContent = 'Skor ' + skor + '/' + NILAI.length;
      body.querySelector('[data-nilai]').textContent = selesai ? '✓' : NILAI[idx].t;
      tombol.forEach(function (b) { b.disabled = selesai; });
      if (selesai) {
        why.innerHTML = '<div class="cek-ringkas ' + (skor >= 10 ? 'lulus' : 'gagal') + '">' + window.Illus.maskot(skor >= 10 ? 'bangga' : 'mikir') +
          '<span>Skormu ' + skor + '/' + NILAI.length + '. Hafalkan 6 nilai falsy: false, 0, "", null, undefined, NaN — sisanya truthy!</span></div>' +
          '<div class="block-actions"><button type="button" class="btn btn--sm btn--ghost" data-ulang>Ulangi</button></div>';
        why.querySelector('[data-ulang]').addEventListener('click', function () {
          idx = 0; skor = 0; why.innerHTML = '';
          body.querySelectorAll('[data-bin]').forEach(function (b) { b.innerHTML = ''; });
          tampil();
        });
      }
    }

    tombol.forEach(function (b) {
      b.addEventListener('click', function () {
        if (idx >= NILAI.length) return;
        var item = NILAI[idx];
        var asli = Boolean(item.v);
        var benar = (b.getAttribute('data-p') === '1') === asli;
        if (benar) skor++;
        var chip = document.createElement('span');
        chip.className = 'chip' + (benar ? '' : ' chip-salah');
        chip.style.fontFamily = 'var(--font-mono)';
        chip.textContent = (benar ? '' : '✗ ') + item.t;
        body.querySelector('[data-bin="' + (asli ? 1 : 0) + '"]').appendChild(chip);
        why.innerHTML = '<p class="content-text" style="margin:0"><strong>' + (benar ? '✓ Benar.' : '✗ Kurang tepat.') + '</strong> <code>' + esc(item.t) + '</code> → ' + (asli ? 'truthy' : 'falsy') + '. ' + esc(item.why) + '</p>';
        idx++;
        tampil();
      });
    });
    tampil();
  }

  var DAFTAR = { 'predikat-flow': predikatFlow, 'truthy-sorter': truthySorter };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
