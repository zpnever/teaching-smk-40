/* Widget Pertemuan 22: laboratorium event, gelembung event (bubbling) */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Laboratorium event ────────────────── */
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

  /* ── 2. Gelembung event (bubbling) ────────── */
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

  var DAFTAR = { 'lab-event': labEvent, 'gelembung': gelembung };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
