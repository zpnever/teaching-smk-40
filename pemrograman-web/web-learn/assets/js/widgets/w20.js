/* Widget Pertemuan 20: rak array (index & method), penjelajah jalur data */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  function fmt(v) {
    if (typeof v === 'string') return "'" + v + "'";
    if (Array.isArray(v)) return '[' + v.map(fmt).join(', ') + ']';
    return String(v);
  }

  /* ── 1. Rak berlaci: index & method array ───────── */
  function rakArray(el) {
    var mode = el.getAttribute('data-mode') || 'semua'; // 'index' | 'method' | 'semua'
    var body = kepala(el, mode === 'index' ? 'Rak Berlaci Bernomor' : 'Simulator Method Array');
    var AWAL = ['apel', 'jeruk', 'mangga'];
    var buah = AWAL.slice();
    var MAKS = 7;

    body.innerHTML =
      '<p class="content-text">' + (mode === 'index'
        ? 'Klik sebuah laci untuk mengambil isinya. Perhatikan: nomor laci (<strong>index</strong>) dimulai dari <strong>0</strong>.'
        : 'Ketik sebuah nilai, lalu tekan tombol method. Perhatikan <strong>posisi</strong> yang berubah dan <strong>nilai yang dikembalikan</strong> (return) oleh method.') + '</p>' +
      '<div class="rak" data-rak aria-live="polite"></div>' +
      '<div class="rak-info"><code data-panjang></code><code data-terakhir></code></div>' +
      (mode === 'index' ? '' :
        '<div class="row"><label class="field" style="flex:0 1 200px">nilai x<input class="input" data-x value="pisang" spellcheck="false" autocomplete="off"></label></div>' +
        '<div class="pill-group" data-aksi></div>') +
      '<div class="readout" data-hasil><span class="muted">' + (mode === 'index' ? 'Belum ada laci yang diklik.' : 'Belum ada method yang dijalankan.') + '</span></div>';

    var rak = body.querySelector('[data-rak]');
    var hasil = body.querySelector('[data-hasil]');
    var inputX = body.querySelector('[data-x]');

    function gambar(baru, keluar) {
      rak.innerHTML = '';
      buah.forEach(function (isi, i) {
        var laci = document.createElement('button');
        laci.type = 'button';
        laci.className = 'laci' + (i === baru ? ' baru' : '');
        laci.innerHTML = '<span class="laci-no">' + i + '</span><span class="laci-isi">"' + esc(isi) + '"</span>';
        laci.title = 'buah[' + i + ']';
        laci.addEventListener('click', function () {
          rak.querySelectorAll('.laci').forEach(function (l) { l.classList.remove('pilih'); });
          laci.classList.add('pilih');
          var akhir = i === buah.length - 1;
          tampil('buah[' + i + ']' + (akhir ? '   // sama dengan buah[buah.length - 1]' : ''), fmt(isi), akhir ? 'Ini elemen terakhir: index-nya ' + i + ' = length (' + buah.length + ') − 1.' : '');
        });
        rak.appendChild(laci);
      });
      if (!buah.length) rak.innerHTML = '<div class="rak-kosong">[ ] — array kosong</div>';
      if (keluar) {
        var k = document.createElement('div');
        k.className = 'laci laci-keluar ' + keluar.sisi;
        k.innerHTML = '<span class="laci-no">×</span><span class="laci-isi">"' + esc(keluar.isi) + '"</span>';
        if (keluar.sisi === 'awal') rak.insertBefore(k, rak.firstChild); else rak.appendChild(k);
        setTimeout(function () { if (k.parentNode) k.remove(); }, 700);
      }
      body.querySelector('[data-panjang]').textContent = 'buah.length → ' + buah.length;
      body.querySelector('[data-terakhir]').textContent = buah.length ? 'index terakhir → ' + (buah.length - 1) : 'tidak ada index';
    }

    function tampil(kode, nilai, catatan) {
      hasil.innerHTML = '<div class="muted mono">' + esc(kode) + '</div>' +
        '<div class="big">' + esc(nilai) + '</div>' +
        '<div class="muted mono" style="font-size:.8rem">buah → ' + esc(fmt(buah)) + '</div>' +
        (catatan ? '<div class="muted" style="font-size:.85rem;margin-top:4px">' + esc(catatan) + '</div>' : '');
    }

    if (mode !== 'index') {
      var AKSI = [
        { label: 'push(x)', jalan: function (x) {
          if (buah.length >= MAKS) return { kode: 'buah.push("' + x + '")', nilai: '—', catatan: 'Raknya penuh untuk demo ini. Coba pop() atau shift() dulu.' };
          var r = buah.push(x); gambar(buah.length - 1); return { kode: 'buah.push("' + x + '")', nilai: r, catatan: 'push menambah di AKHIR dan me-return panjang array yang baru.' };
        } },
        { label: 'pop()', jalan: function () {
          var r = buah.pop(); gambar(-1, r === undefined ? null : { isi: r, sisi: 'akhir' }); return { kode: 'buah.pop()', nilai: r === undefined ? 'undefined' : fmt(r), catatan: r === undefined ? 'Array sudah kosong, tidak ada yang bisa dibuang.' : 'pop menghapus elemen TERAKHIR dan me-return elemen yang dibuang.' };
        } },
        { label: 'unshift(x)', jalan: function (x) {
          if (buah.length >= MAKS) return { kode: 'buah.unshift("' + x + '")', nilai: '—', catatan: 'Raknya penuh untuk demo ini. Coba pop() atau shift() dulu.' };
          var r = buah.unshift(x); gambar(0); return { kode: 'buah.unshift("' + x + '")', nilai: r, catatan: 'unshift menambah di AWAL. Semua index lama bergeser +1!' };
        } },
        { label: 'shift()', jalan: function () {
          var r = buah.shift(); gambar(-1, r === undefined ? null : { isi: r, sisi: 'awal' }); return { kode: 'buah.shift()', nilai: r === undefined ? 'undefined' : fmt(r), catatan: r === undefined ? 'Array sudah kosong.' : 'shift menghapus elemen PERTAMA. Semua index bergeser −1.' };
        } },
        { label: 'includes(x)', jalan: function (x) { return { kode: 'buah.includes("' + x + '")', nilai: buah.includes(x), catatan: 'Apakah ada? Huruf besar-kecil dibedakan.' }; } },
        { label: 'indexOf(x)', jalan: function (x) { var r = buah.indexOf(x); return { kode: 'buah.indexOf("' + x + '")', nilai: r, catatan: r === -1 ? '-1 artinya tidak ditemukan.' : 'Ditemukan di laci nomor ' + r + '.' }; } },
        { label: 'join(", ")', jalan: function () { return { kode: 'buah.join(", ")', nilai: fmt(buah.join(', ')), catatan: 'Hasilnya sebuah STRING, bukan array lagi.' }; } },
        { label: '↺ reset', jalan: function () { buah = AWAL.slice(); gambar(); return { kode: 'const buah = ["apel", "jeruk", "mangga"];', nilai: fmt(buah), catatan: '' }; } }
      ];
      var wadah = body.querySelector('[data-aksi]');
      AKSI.forEach(function (a) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pill mono';
        b.textContent = a.label;
        b.addEventListener('click', function () {
          var x = (inputX.value || '').trim() || 'pisang';
          var r = a.jalan(x);
          tampil(r.kode, String(r.nilai), r.catatan);
        });
        wadah.appendChild(b);
      });
    }
    gambar();
  }

  /* ── 2. Penjelajah jalur data (nested & array of object) ── */
  var DATA = {
    nama: 'SMK Nusantara',
    alamat: { kota: 'Jakarta', provinsi: 'DKI Jakarta' },
    jurusan: ['RPL', 'TKJ', 'DKV'],
    siswa: [
      { nama: 'Budi', nilai: 85, hobi: ['membaca', 'ngoding'] },
      { nama: 'Ani', nilai: 90, hobi: ['gaming'] }
    ]
  };
  var KODE_DATA = 'const sekolah = ' + JSON.stringify(DATA, null, 2).replace(/"(\w+)":/g, '$1:') + ';';

  function jalurData(el) {
    var body = kepala(el, 'Jalan Menuju Data');
    body.innerHTML =
      '<p class="content-text">Klik <strong>nilai</strong> mana pun untuk melihat cara mengambilnya. Ingat polanya: object → <code>.namaProperty</code>, array → <code>[index]</code>.</p>' +
      '<div class="jd-pohon" data-pohon></div>' +
      '<div class="readout" data-hasil aria-live="polite"><span class="muted">Klik salah satu nilai di atas.</span></div>' +
      '<div class="subsection" style="margin-top:1.2rem"><div class="section-label">Uji dirimu</div>' +
      '<p class="content-text" data-tanya></p>' +
      '<form class="row" data-form><label class="field" style="flex:1 1 260px">kode<input class="input mono" data-jawab placeholder="sekolah." spellcheck="false" autocomplete="off"></label><button class="btn btn--sm" type="submit">Cek</button><button class="btn btn--sm btn--ghost" type="button" data-lain>Soal lain</button></form>' +
      '<div data-umpan aria-live="polite"></div></div>';

    var pohon = body.querySelector('[data-pohon]');
    var hasil = body.querySelector('[data-hasil]');

    function nilaiTeks(v) { return typeof v === 'string' ? '"' + v + '"' : String(v); }

    function bangun(v, jalur) {
      var w = document.createElement('div');
      if (Array.isArray(v)) {
        w.className = 'jd-arr';
        w.innerHTML = '<span class="jd-kurung">[</span>';
        v.forEach(function (x, i) {
          var baris = document.createElement('div');
          baris.className = 'jd-baris';
          baris.innerHTML = '<span class="jd-idx">' + i + '</span>';
          baris.appendChild(bangun(x, jalur + '[' + i + ']'));
          w.appendChild(baris);
        });
        w.insertAdjacentHTML('beforeend', '<span class="jd-kurung">]</span>');
      } else if (v && typeof v === 'object') {
        w.className = 'jd-obj';
        w.innerHTML = '<span class="jd-kurung">{</span>';
        Object.keys(v).forEach(function (k) {
          var baris = document.createElement('div');
          baris.className = 'jd-baris';
          baris.innerHTML = '<span class="jd-key">' + esc(k) + ':</span>';
          baris.appendChild(bangun(v[k], jalur + '.' + k));
          w.appendChild(baris);
        });
        w.insertAdjacentHTML('beforeend', '<span class="jd-kurung">}</span>');
      } else {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'jd-nilai';
        b.textContent = nilaiTeks(v);
        b.addEventListener('click', function () {
          pohon.querySelectorAll('.jd-nilai.on').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on');
          var langkah = jalur.match(/\.[\w]+|\[\d+\]/g) || [];
          hasil.innerHTML = '<div class="muted">console.log(' + esc(jalur) + ');</div><div class="big">' + esc(typeof v === 'string' ? v : String(v)) + '</div>' +
            '<div class="jd-langkah">' + ['sekolah'].concat(langkah).map(function (l, i) {
              return '<span>' + esc(l) + '</span>' + (i < langkah.length ? '<i>→</i>' : '');
            }).join('') + '</div>';
        });
        return b;
      }
      return w;
    }
    pohon.appendChild(bangun(DATA, 'sekolah'));

    var SOAL = [
      { tanya: 'Ambil kota sekolah', jawab: 'Jakarta' },
      { tanya: 'Ambil jurusan ketiga', jawab: 'DKV' },
      { tanya: 'Ambil nama siswa pertama', jawab: 'Budi' },
      { tanya: 'Ambil nilai Ani', jawab: 90 },
      { tanya: 'Ambil hobi kedua milik Budi', jawab: 'ngoding' },
      { tanya: 'Ambil hobi pertama milik Ani', jawab: 'gaming' },
      { tanya: 'Ambil jumlah jurusan (pakai length)', jawab: 3 },
      { tanya: 'Ambil provinsi sekolah', jawab: 'DKI Jakarta' }
    ];
    var ke = 0;
    var tanyaEl = body.querySelector('[data-tanya]');
    var jawabEl = body.querySelector('[data-jawab]');
    var umpan = body.querySelector('[data-umpan]');
    function pasangSoal() {
      var s = SOAL[ke % SOAL.length];
      tanyaEl.innerHTML = '<strong>' + esc(s.tanya) + '</strong> → hasilnya harus <code>' + esc(nilaiTeks(s.jawab)) + '</code>';
      jawabEl.value = 'sekolah.';
      umpan.innerHTML = '';
    }
    body.querySelector('[data-lain]').addEventListener('click', function () { ke++; pasangSoal(); });
    body.querySelector('[data-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      var expr = jawabEl.value.trim();
      if (!expr) return;
      var s = SOAL[ke % SOAL.length];
      window.JSRunner.run(KODE_DATA, { harness: '__cek(0, function () { return (' + expr + '); });', timeout: 1000 }).then(function (h) {
        var c = h.cek[0];
        var ok = !h.error && c && c.ok && c.value === s.jawab;
        var pesan;
        if (h.error) pesan = 'Kodenya error: ' + h.error.message + (h.error.hint ? ' — ' + h.error.hint : '');
        else if (!c || !c.ok) pesan = 'Error: ' + ((c && c.error && c.error.message) || '?') + '. ' + window.JSRunner.terjemahkan(c && c.error && c.error.name, c && c.error && c.error.message);
        else pesan = ok ? 'Tepat! ' + expr + ' → ' + nilaiTeks(c.value) : 'Hasil kodemu ' + window.Checker.tampil(c.value) + ', belum ' + nilaiTeks(s.jawab) + '. Coba klik nilainya di atas untuk melihat jalannya.';
        umpan.innerHTML = '<div class="cek-ringkas ' + (ok ? 'lulus' : 'gagal') + '">' + (window.Illus ? Illus.maskot(ok ? 'bangga' : 'mikir') : '') + '<span>' + esc(pesan) + '</span></div>';
        if (ok) setTimeout(function () { ke++; pasangSoal(); }, 1600);
      });
    });
    pasangSoal();
  }

  var DAFTAR = { 'rak-array': rakArray, 'jalur-data': jalurData };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
