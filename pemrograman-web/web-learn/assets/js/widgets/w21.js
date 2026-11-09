/* Widget Pertemuan 21: pohon DOM, penguji selector (widget event ada di w22.js) */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /** Halaman tiruan (isi <body> dari preset "dasar") di dalam widget */
  function halamanTiruan() {
    var hal = window.DomRunner ? window.DomRunner.preset('dasar').html : '';
    var m = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(hal);
    var isi = (m ? m[1] : hal).replace(/<script[\s\S]*?<\/script>/gi, '');
    var w = document.createElement('div');
    w.className = 'mock-hal';
    w.innerHTML = isi;
    w.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
    return w;
  }

  function label(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    if (el.classList.length) s += '.' + Array.prototype.join.call(el.classList, '.');
    return s;
  }

  /* ── 1. Pohon DOM ──────────────────────────── */
  function pohonDom(el) {
    var body = kepala(el, 'Pohon DOM Halaman Ini');
    body.innerHTML = '<p class="content-text">Kiri: pohon DOM yang dibuat browser. Kanan: halamannya. Klik <strong>node di pohon</strong> atau <strong>elemen di halaman</strong> — pasangannya akan menyala.</p>' +
      '<div class="pd-grid"><div class="pd-pohon" data-pohon></div><div class="pd-hal" data-hal></div></div>' +
      '<div class="readout" data-info aria-live="polite"><span class="muted">Belum ada yang dipilih.</span></div>';
    var hal = halamanTiruan();
    body.querySelector('[data-hal]').appendChild(hal);
    var pohon = body.querySelector('[data-pohon]');
    var info = body.querySelector('[data-info]');
    var pasangan = [];

    function baris(teks, dalam, kelas) {
      var b = document.createElement('div');
      b.className = 'pd-node ' + (kelas || '');
      b.style.paddingLeft = (dalam * 16 + 6) + 'px';
      b.textContent = teks;
      pohon.appendChild(b);
      return b;
    }
    baris('document', 0, 'akar');
    baris('└─ html', 1, 'akar');
    baris('└─ body', 2, 'akar');
    function jalan(induk, dalam) {
      Array.prototype.forEach.call(induk.children, function (c, i) {
        if (c.tagName === 'BR') return;
        var terakhir = i === induk.children.length - 1;
        var node = baris((terakhir ? '└─ ' : '├─ ') + label(c), dalam, '');
        node.tabIndex = 0;
        node.setAttribute('role', 'button');
        pasangan.push([node, c]);
        var pilih = function (e) { if (e) e.stopPropagation(); tandai(node, c); };
        node.addEventListener('click', pilih);
        node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pilih(); } });
        c.addEventListener('click', pilih);
        if (c.children.length) jalan(c, dalam + 1);
      });
    }
    jalan(hal, 3);

    function tandai(node, elemen) {
      pasangan.forEach(function (p) { p[0].classList.remove('on'); p[1].classList.remove('mock-sorot'); });
      node.classList.add('on');
      elemen.classList.add('mock-sorot');
      var sel = elemen.id ? '#' + elemen.id : (elemen.classList.length ? '.' + elemen.classList[0] : elemen.tagName.toLowerCase());
      var teks = elemen.children.length ? '(berisi ' + elemen.children.length + ' elemen anak)' : '"' + elemen.textContent.trim() + '"';
      info.innerHTML = '<div class="muted">elemen &lt;' + esc(elemen.tagName.toLowerCase()) + '&gt; — sebuah object</div>' +
        '<div class="big" style="font-size:1.05rem">document.querySelector("' + esc(sel) + '")</div>' +
        '<div class="muted" style="font-size:.85rem">textContent → ' + esc(teks) + (elemen.parentElement && elemen.parentElement !== hal ? ' · parentElement → ' + esc(label(elemen.parentElement)) : ' · parentElement → body') + '</div>';
    }
  }

  /* ── 2. Penguji selector ──────────────────── */
  function ujiSelector(el) {
    var body = kepala(el, 'Penguji Selector');
    body.innerHTML = '<p class="content-text">Ketik selector lalu pilih method-nya. Elemen yang terpilih akan disorot, dan hasilnya ditampilkan seperti di Console.</p>' +
      '<form class="row" data-form><label class="field" style="flex:0 1 200px">method<select class="input" data-method><option value="qs">querySelector</option><option value="qsa" selected>querySelectorAll</option><option value="id">getElementById</option></select></label>' +
      '<label class="field" style="flex:1 1 180px">selector<input class="input mono" data-sel value=".deskripsi" spellcheck="false" autocomplete="off"></label><button class="btn btn--sm" type="submit">Pilih</button></form>' +
      '<div class="pill-group" data-contoh></div>' +
      '<div class="readout" data-hasil aria-live="polite"></div>' +
      '<div class="pd-hal" data-hal style="margin-top:.8rem"></div>';
    var hal = halamanTiruan();
    body.querySelector('[data-hal]').appendChild(hal);
    var selIn = body.querySelector('[data-sel]');
    var metode = body.querySelector('[data-method]');
    var hasil = body.querySelector('[data-hasil]');
    var CONTOH = [['qsa', '.deskripsi'], ['qs', '.deskripsi'], ['id', 'judul'], ['qs', '#kotak'], ['qsa', '#daftar li'], ['qsa', 'button'], ['qs', 'judul'], ['id', '#judul'], ['qs', '#tidakAda']];
    var NAMA = { qs: 'querySelector', qsa: 'querySelectorAll', id: 'getElementById' };
    var wadah = body.querySelector('[data-contoh]');
    CONTOH.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill mono';
      b.textContent = NAMA[c[0]] + '("' + c[1] + '")';
      b.addEventListener('click', function () { metode.value = c[0]; selIn.value = c[1]; jalan(); });
      wadah.appendChild(b);
    });

    function jalan() {
      hal.querySelectorAll('.mock-sorot').forEach(function (x) { x.classList.remove('mock-sorot'); });
      var s = selIn.value.trim();
      var m = metode.value;
      var kode = 'document.' + NAMA[m] + '("' + s + '")';
      var hasilTeks, catatan = '', daftar = [];
      try {
        if (m === 'id') {
          var e1 = null;
          hal.querySelectorAll('[id]').forEach(function (x) { if (!e1 && x.id === s) e1 = x; });
          if (e1) daftar = [e1];
          hasilTeks = e1 ? label(e1) : 'null';
          if (!e1 && s.charAt(0) === '#') catatan = 'getElementById menerima nama id TANPA tanda #.';
        } else if (m === 'qs') {
          var e2 = hal.querySelector(s);
          if (e2) daftar = [e2];
          hasilTeks = e2 ? label(e2) : 'null';
          if (!e2 && /^[a-z]+$/i.test(s) && hal.querySelector('#' + s + ', .' + s)) catatan = 'Tanpa # atau ., "' + s + '" dicari sebagai TAG <' + s + '>. Maksudnya "#' + s + '"?';
          else if (e2 && hal.querySelectorAll(s).length > 1) catatan = 'Ada ' + hal.querySelectorAll(s).length + ' elemen yang cocok, tapi querySelector hanya mengambil yang PERTAMA.';
        } else {
          daftar = Array.prototype.slice.call(hal.querySelectorAll(s));
          hasilTeks = 'NodeList(' + daftar.length + ') [' + daftar.map(label).join(', ') + ']';
          catatan = daftar.length ? 'Hasilnya daftar (mirip array): akses dengan [0], [1], …, punya length = ' + daftar.length + '.' : 'Tidak ada yang cocok → NodeList kosong (bukan null).';
        }
      } catch (err) {
        hasilTeks = 'SyntaxError';
        catatan = 'Selector tidak valid.';
      }
      daftar.forEach(function (x) { x.classList.add('mock-sorot'); });
      hasil.innerHTML = '<div class="muted">' + esc(kode) + '</div><div class="big" style="font-size:1.05rem">' + esc(hasilTeks) + '</div>' + (catatan ? '<div class="muted" style="font-size:.85rem">' + esc(catatan) + '</div>' : '');
    }
    body.querySelector('[data-form]').addEventListener('submit', function (e) { e.preventDefault(); jalan(); });
    metode.addEventListener('change', jalan);
    jalan();
  }

  var DAFTAR = { 'pohon-dom': pohonDom, 'uji-selector': ujiSelector };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
