/* ═══════════════════════════════════════════
   CHALLENGE — kartu praktik / tantangan / studi kasus
   <div data-challenge="15:p1"></div>  → BANK['15'].latihan.p1 atau BANK['15'].tantangan[id=p1]
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var IKON_KODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>';
  var IKON_CEK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var IKON_LAMPU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>';
  var LABEL = { praktik: 'Praktik', latihan: 'Latihan', perbaiki: 'Cari & Perbaiki', tantangan: 'Tantangan', 'studi-kasus': 'Studi Kasus' };

  function esc(s) { return window.Editor.esc(s); }

  function cariSoal(ref) {
    var p = ref.split(':');
    var bank = window.BANK && window.BANK[p[0]];
    if (!bank) return null;
    if (bank.latihan && bank.latihan[p[1]]) return { materi: p[0], soal: bank.latihan[p[1]], dinilai: false };
    var t = (bank.tantangan || []).filter(function (x) { return x.id === p[1]; })[0];
    return t ? { materi: p[0], soal: t, dinilai: true } : null;
  }

  function pilihanInput(soal) {
    var C = window.Checker;
    var daftar = [];
    var lihat = {};
    function tambah(label, input) {
      var kode = C.inputKeKode(input);
      if (!kode || lihat[kode]) return;
      lihat[kode] = 1;
      daftar.push({ label: label, kode: kode });
    }
    if (soal.input) tambah('Data contoh', soal.input);
    (soal.tes || []).forEach(function (t, i) { if (t.input) tambah('Tes ' + (i + 1) + ': ' + t.nama, t.input); });
    return daftar;
  }

  /** HTML & CSS untuk soal DOM: dari soal.html/css atau preset HALAMAN_DOM */
  function halamanSoal(soal) {
    var p = window.DomRunner.preset(soal.preset || 'dasar');
    return { html: soal.html !== undefined ? soal.html : p.html, css: soal.css !== undefined ? soal.css : p.css };
  }

  function render(el) {
    if (el.__siap) return;
    var info = cariSoal(el.getAttribute('data-challenge'));
    if (!info) { el.textContent = 'Soal tidak ditemukan: ' + el.getAttribute('data-challenge'); return; }
    el.__siap = true;
    var soal = info.soal, materi = info.materi;
    var jenis = soal.jenis || (info.dinilai ? 'tantangan' : 'praktik');
    var kunci = materi + ':' + soal.id;

    el.classList.add('block', 'challenge');
    el.id = el.id || 'soal-' + materi + '-' + soal.id;
    el.innerHTML =
      '<div class="block-head">' +
      '<span class="block-kind">' + IKON_KODE + (LABEL[jenis] || 'Praktik') + '</span>' +
      '<h3>' + esc(soal.judul) + '</h3>' +
      '<span class="block-status"><span class="status-pill">' + (info.dinilai ? 'Dinilai' : 'Latihan') + '</span></span>' +
      '</div>' +
      '<div class="block-body">' +
      '<div class="challenge-soal">' + (soal.soal || '') + '</div>' +
      '<div class="challenge-editor"></div>' +
      '<div class="block-actions">' +
      '<button type="button" class="btn btn--sm" data-aksi="periksa">' + IKON_CEK + ' Periksa Jawaban</button>' +
      (soal.petunjuk && soal.petunjuk.length ? '<button type="button" class="btn btn--sm btn--ghost" data-aksi="petunjuk">' + IKON_LAMPU + ' Petunjuk</button>' : '') +
      '<button type="button" class="btn btn--sm btn--ghost" data-aksi="solusi" hidden>Lihat Solusi</button>' +
      '</div>' +
      '<div class="challenge-hasil" aria-live="polite"></div>' +
      '<div class="challenge-extra"></div>' +
      '</div>';

    var dom = soal.mode === 'dom';
    var halaman = dom ? halamanSoal(soal) : null;
    var tampilStorage = !!(soal.storagePanel || soal.preset === 'storage' || soal.preset === 'todoStorage' || soal.preset === 'belanja');
    var pilihan = dom ? [] : pilihanInput(soal);
    var ed = dom ? window.Playground.create(el.querySelector('.challenge-editor'), {
      html: halaman.html,
      css: halaman.css,
      js: soal.starter || '',
      edit: soal.edit || ['js'],
      input: window.Checker.inputKeKode(soal.input),
      tinggi: soal.tinggi || 0,
      simpanKe: kunci,
      simpanId: 'soal-' + kunci,
      storagePanel: tampilStorage
    }) : window.Editor.create(el.querySelector('.challenge-editor'), {
      value: soal.starter || '',
      file: soal.file || 'script.js',
      input: pilihan.length ? pilihan[0].kode : '',
      inputPilihan: pilihan,
      placeholder: '// Tulis kodemu di sini…',
      simpanKe: kunci
    });
    function runFn(k, o) {
      if (!dom) return window.JSRunner.run(k, o);
      var f = ed.getFiles();
      return window.DomRunner.run(k, { html: f.html, css: f.css, input: o.input, harness: o.harness, storage: o.storage });
    }

    var pill = el.querySelector('.status-pill');
    var hasilEl = el.querySelector('.challenge-hasil');
    var extra = el.querySelector('.challenge-extra');
    var btnPeriksa = el.querySelector('[data-aksi="periksa"]');
    var btnSolusi = el.querySelector('[data-aksi="solusi"]');
    var btnPetunjuk = el.querySelector('[data-aksi="petunjuk"]');
    var gagalKe = 0;

    function setStatus() {
      var m = window.Progress.materi(materi);
      var lulus = info.dinilai ? m.tantangan[soal.id] && m.tantangan[soal.id].lulus : m.praktik[soal.id];
      var pakaiSolusi = info.dinilai && m.tantangan[soal.id] && m.tantangan[soal.id].solusi && !m.tantangan[soal.id].lulusTanpaSolusi;
      if (lulus) {
        pill.className = 'status-pill done';
        pill.textContent = pakaiSolusi ? '✓ Selesai (dibantu)' : '✓ Selesai';
      }
      if (info.dinilai && m.tantangan[soal.id] && m.tantangan[soal.id].solusi) btnSolusi.hidden = false;
    }
    setStatus();

    btnPeriksa.addEventListener('click', function () {
      btnPeriksa.disabled = true;
      hasilEl.innerHTML = '<p class="content-text" style="margin-top:1rem">Memeriksa…</p>';
      var kode = ed.getValue();
      window.Checker.periksa(soal, kode, runFn).then(function (r) {
        btnPeriksa.disabled = false;
        tampilkanHasil(r);
        if (dom) ed.jalankan();
        else if (r.run) ed.console.tampilkan(r.run);
        if (r.lulus) {
          if (info.dinilai) window.Progress.setTantangan(materi, soal.id, { lulus: true, percobaan: true });
          else window.Progress.setPraktik(materi, soal.id);
          setStatus();
          el.dispatchEvent(new CustomEvent('challenge:lulus', { bubbles: true, detail: { materi: materi, id: soal.id } }));
        } else {
          gagalKe++;
          if (info.dinilai) window.Progress.setTantangan(materi, soal.id, { percobaan: true });
          if (gagalKe >= 1 && soal.solusi) btnSolusi.hidden = false;
        }
      });
    });

    function tampilkanHasil(r) {
      hasilEl.innerHTML = '';
      var ringkas = document.createElement('div');
      ringkas.className = 'cek-ringkas ' + (r.lulus ? 'lulus' : 'gagal');
      var jmlLulus = r.items.filter(function (i) { return i.lulus; }).length;
      ringkas.innerHTML = window.Illus.maskot(r.lulus ? 'bangga' : 'mikir') +
        '<span>' + (r.lulus ? 'Mantap! Semua pemeriksaan lulus.' : jmlLulus + ' dari ' + r.items.length + ' pemeriksaan lulus. Perbaiki yang bertanda ✗ lalu periksa lagi.') + '</span>';
      hasilEl.appendChild(ringkas);
      var ul = document.createElement('ul');
      ul.className = 'cek-list';
      r.items.forEach(function (it) {
        var li = document.createElement('li');
        li.className = 'cek-item ' + (it.lulus ? 'lulus' : 'gagal');
        li.innerHTML = '<span class="cek-icon">' + (it.lulus ? '✓' : '✗') + '</span><div>' + esc(it.nama) + (it.detail ? '<small>' + esc(it.detail) + '</small>' : '') + '</div>';
        ul.appendChild(li);
      });
      hasilEl.appendChild(ul);
    }

    if (btnPetunjuk) {
      var level = 0;
      btnPetunjuk.addEventListener('click', function () {
        level = Math.min(level + 1, soal.petunjuk.length);
        var box = extra.querySelector('.hint-box') || document.createElement('div');
        box.className = 'hint-box';
        box.innerHTML = '<strong>Petunjuk ' + level + '/' + soal.petunjuk.length + '</strong><ol>' +
          soal.petunjuk.slice(0, level).map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ol>';
        extra.prepend(box);
        if (level === soal.petunjuk.length) btnPetunjuk.disabled = true;
      });
    }

    btnSolusi.addEventListener('click', function () {
      if (extra.querySelector('.solusi-box')) return;
      if (info.dinilai) {
        var m = window.Progress.materi(materi).tantangan[soal.id];
        var sudah = m && (m.solusi || m.lulus);
        if (!sudah && !window.confirm('Kalau kamu membuka solusi sebelum berhasil, tantangan ini tidak mendapat poin di rapor. Tetap buka solusi?')) return;
        window.Progress.setTantangan(materi, soal.id, { solusi: true });
      }
      var box = document.createElement('div');
      box.className = 'solusi-box';
      box.innerHTML = '<div class="data-input-label">Contoh solusi <span class="chip">bukan satu-satunya jawaban benar</span></div>';
      extra.appendChild(box);
      var wadah = document.createElement('div');
      box.appendChild(wadah);
      if (dom) window.Playground.create(wadah, { html: halaman.html, css: halaman.css, js: soal.solusi, edit: [], input: ed.getInput(), label: 'Contoh solusi — jalankan & coba di Preview', simpanId: 'solusi-' + kunci, storagePanel: tampilStorage });
      else window.Editor.create(wadah, { value: soal.solusi, file: 'solusi.js', readOnly: true, input: ed.getInput() });
      btnSolusi.hidden = true;
    });
  }

  function init(ruang) {
    (ruang || document).querySelectorAll('[data-challenge]').forEach(render);
  }

  window.Challenge = { init: init, halamanSoal: halamanSoal };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
