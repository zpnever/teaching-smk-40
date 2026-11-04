/* Widget Pertemuan 21: pohon DOM, penguji selector, laboratorium event, gelembung event */
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

  /* ── 3. Laboratorium event ────────────────── */
  function labEvent(el) {
    var body = kepala(el, 'Laboratorium Event');
    body.innerHTML = '<p class="content-text">Lakukan sesuatu pada elemen-elemen di bawah: klik, klik ganda, arahkan mouse, ketik, tekan tombol keyboard, pilih, centang, kirim form. Setiap event yang terpicu dicatat di log — perhatikan <strong>jenis</strong>, <strong>target</strong>, dan <strong>urutannya</strong>.</p>' +
      '<div class="lab-grid">' +
      '<div class="lab-arena" data-arena>' +
      '<button type="button" class="btn btn--sm" id="lab-tombol">Klik aku</button>' +
      '<div class="lab-kotak" id="lab-kotak" tabindex="0">Arahkan mouse / klik ganda</div>' +
      '<label class="field">Ketik sesuatu<input class="input" id="lab-input" placeholder="ketik di sini…" autocomplete="off"></label>' +
      '<label class="field">Pilih kelas<select class="input" id="lab-select"><option>X RPL</option><option>XI RPL</option><option>XII RPL</option></select></label>' +
      '<label class="lab-cek"><input type="checkbox" id="lab-cek"> Saya setuju</label>' +
      '<form id="lab-form" class="lab-form"><input class="input" placeholder="isi lalu Enter" autocomplete="off"><button class="btn btn--sm" type="submit">Kirim</button></form>' +
      '</div>' +
      '<div class="lab-kanan"><div class="pill-group" data-filter></div><label class="lab-cek"><input type="checkbox" data-cegah checked> <code>e.preventDefault()</code> pada submit</label><div class="mini-console lab-log" data-log aria-live="polite"><div class="dim">// event akan muncul di sini</div></div><button type="button" class="btn btn--sm btn--ghost" data-bersih>Bersihkan log</button></div>' +
      '</div>';

    var KELOMPOK = {
      mouse: ['click', 'dblclick', 'mouseenter', 'mouseleave', 'contextmenu'],
      keyboard: ['keydown', 'keyup'],
      form: ['input', 'change', 'focus', 'blur', 'submit']
    };
    var aktif = { mouse: true, keyboard: true, form: true };
    var log = body.querySelector('[data-log]');
    var filter = body.querySelector('[data-filter]');
    Object.keys(KELOMPOK).forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.setAttribute('aria-pressed', 'true');
      b.textContent = k;
      b.addEventListener('click', function () {
        aktif[k] = !aktif[k];
        b.setAttribute('aria-pressed', aktif[k] ? 'true' : 'false');
      });
      filter.appendChild(b);
    });
    body.querySelector('[data-bersih]').addEventListener('click', function () { log.innerHTML = '<div class="dim">// log dibersihkan</div>'; });

    function tulis(e, tambahan) {
      var grup = Object.keys(KELOMPOK).filter(function (k) { return KELOMPOK[k].indexOf(e.type) !== -1; })[0];
      if (!aktif[grup]) return;
      var dim = log.querySelector('.dim:only-child');
      if (dim) dim.remove();
      var d = document.createElement('div');
      var t = e.target;
      var nama = t.id ? '#' + t.id.replace('lab-', '') : t.tagName.toLowerCase();
      d.innerHTML = '<span class="ok">' + esc(e.type) + '</span>  <span class="dim">target:</span> ' + esc(nama) + (tambahan ? '  <span class="dim">' + esc(tambahan) + '</span>' : '');
      log.appendChild(d);
      while (log.children.length > 60) log.removeChild(log.firstChild);
      log.scrollTop = log.scrollHeight;
    }

    var arena = body.querySelector('[data-arena]');
    var tombol = arena.querySelector('#lab-tombol');
    var kotak = arena.querySelector('#lab-kotak');
    var input = arena.querySelector('#lab-input');
    var select = arena.querySelector('#lab-select');
    var cek = arena.querySelector('#lab-cek');
    var form = arena.querySelector('#lab-form');
    var cegah = body.querySelector('[data-cegah]');

    tombol.addEventListener('click', function (e) { tulis(e); });
    kotak.addEventListener('click', function (e) { tulis(e); });
    kotak.addEventListener('dblclick', function (e) { tulis(e, '(klik ganda)'); });
    kotak.addEventListener('mouseenter', function (e) { kotak.classList.add('on'); tulis(e); });
    kotak.addEventListener('mouseleave', function (e) { kotak.classList.remove('on'); tulis(e); });
    kotak.addEventListener('contextmenu', function (e) { e.preventDefault(); tulis(e, '(klik kanan — menu bawaan dicegah)'); });
    [input, form.querySelector('input')].forEach(function (inp) {
      inp.addEventListener('focus', function (e) { tulis(e); });
      inp.addEventListener('blur', function (e) { tulis(e); });
      inp.addEventListener('keydown', function (e) { tulis(e, 'e.key = "' + e.key + '"'); });
      inp.addEventListener('keyup', function (e) { tulis(e, 'e.key = "' + e.key + '"'); });
      inp.addEventListener('input', function (e) { tulis(e, 'value = "' + inp.value + '"'); });
      inp.addEventListener('change', function (e) { tulis(e, 'value = "' + inp.value + '" (setelah selesai)'); });
    });
    select.addEventListener('change', function (e) { tulis(e, 'value = "' + select.value + '"'); });
    cek.addEventListener('change', function (e) { tulis(e, 'checked = ' + cek.checked); });
    form.addEventListener('submit', function (e) {
      if (cegah.checked) {
        e.preventDefault();
        tulis(e, 'dicegah → halaman tidak dimuat ulang');
      } else {
        e.preventDefault();
        tulis(e, 'TANPA preventDefault, halaman akan reload & log ini hilang!');
        arena.classList.add('shake');
        setTimeout(function () { arena.classList.remove('shake'); log.innerHTML = '<div class="err">⟳ Halaman dimuat ulang… (semua perubahan hilang)</div>'; }, 600);
      }
    });
  }

  /* ── 4. Gelembung event (bubbling) ────────── */
  function gelembung(el) {
    var body = kepala(el, 'Event Menggelembung ke Atas');
    body.innerHTML = '<p class="content-text">Ketiga kotak di bawah punya listener <code>click</code> masing-masing. Klik bagian <strong>paling dalam</strong> lalu perhatikan urutannya: event "naik" dari target ke induk-induknya. Inilah dasar <strong>event delegation</strong>.</p>' +
      '<div class="gl-luar" data-nama="div#kartu"><span>div#kartu</span><div class="gl-tengah" data-nama="ul#daftar"><span>ul#daftar</span><div class="gl-dalam" data-nama="li"><span>li (klik di sini)</span></div></div></div>' +
      '<label class="lab-cek"><input type="checkbox" data-stop> panggil <code>e.stopPropagation()</code> di <code>li</code></label>' +
      '<div class="mini-console" data-log aria-live="polite"><div class="dim">// klik salah satu kotak</div></div>';
    var log = body.querySelector('[data-log]');
    var stop = body.querySelector('[data-stop]');
    var urut = 0, timer;
    body.querySelectorAll('[data-nama]').forEach(function (kotak) {
      kotak.addEventListener('click', function (e) {
        if (!urut) log.innerHTML = '';
        urut++;
        var d = document.createElement('div');
        var target = e.target.closest('[data-nama]').getAttribute('data-nama');
        d.innerHTML = '<span class="ok">' + urut + '.</span> listener di <b>' + esc(kotak.getAttribute('data-nama')) + '</b>  <span class="dim">e.target = ' + esc(target) + ', e.currentTarget = ' + esc(kotak.getAttribute('data-nama')) + '</span>';
        log.appendChild(d);
        kotak.classList.remove('nyala');
        void kotak.offsetWidth;
        kotak.classList.add('nyala');
        if (stop.checked && kotak.classList.contains('gl-dalam')) {
          e.stopPropagation();
          log.insertAdjacentHTML('beforeend', '<div class="err">stopPropagation() → event berhenti, tidak naik lagi</div>');
        }
        clearTimeout(timer);
        timer = setTimeout(function () { urut = 0; }, 50);
      });
    });
  }

  var DAFTAR = { 'pohon-dom': pohonDom, 'uji-selector': ujiSelector, 'lab-event': labEvent, 'gelembung': gelembung };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
