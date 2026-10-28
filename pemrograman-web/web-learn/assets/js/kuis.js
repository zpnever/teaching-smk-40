/* ═══════════════════════════════════════════
   KUIS — satu soal per kartu, langsung ada pembahasan
   <div data-kuis="15"></div>                       → BANK['15'].kuis
   <div data-kuis="akhir" data-acak="15"></div>     → 15 soal acak dari semua bank
   Tipe soal:
     { tipe: 'pg',    tanya, kode?, opsi: [...], jawab: index, bahas, opsiKode? }
     { tipe: 'bs',    tanya, kode?, jawab: true|false, bahas }
     { tipe: 'isian', tanya, kode?, jawab: ['jawaban', 'alternatif'], bahas }
     { tipe: 'susun', tanya, baris: ['urutan', 'yang', 'benar'], bahas }
   Teks opsi boleh memakai `backtick` untuk kode.
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var HURUF = 'ABCDEFGH';
  var IKON_KUIS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>';
  var MATERI_SEMUA = ['15', '16', '17', '18', '19'];

  function esc(s) { return window.Editor.esc(s); }
  function md(s) {
    return esc(s).replace(/`([^`]+)`/g, function (_, k) { return '<code>' + k + '</code>'; });
  }
  function acak(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function normal(s) {
    s = String(s).trim().replace(/\s+/g, ' ').replace(/;$/, '');
    var m = /^(["'`])(.*)\1$/.exec(s);
    return m ? m[2] : s;
  }

  function ambilSoal(id, el) {
    if (id === 'akhir') {
      var kolam = [];
      MATERI_SEMUA.forEach(function (m) {
        var b = window.BANK && window.BANK[m];
        if (b && b.kuis) b.kuis.forEach(function (q) { kolam.push(Object.assign({ asal: m }, q)); });
      });
      var n = parseInt(el.getAttribute('data-acak'), 10) || 15;
      return acak(kolam).slice(0, n);
    }
    var bank = window.BANK && window.BANK[id];
    return bank && bank.kuis ? bank.kuis.slice() : [];
  }

  function render(el) {
    if (el.__siap) return;
    el.__siap = true;
    var id = el.getAttribute('data-kuis');
    var contoh = ambilSoal(id, el);
    var total = contoh.length;
    if (!total) { el.textContent = 'Belum ada soal kuis.'; return; }

    el.classList.add('block', 'kuis');
    el.innerHTML =
      '<div class="block-head"><span class="block-kind">' + IKON_KUIS + ' Kuis</span><h3>' +
      esc(el.getAttribute('data-judul') || 'Tes Pemahaman') + '</h3><span class="block-status"><span class="status-pill"></span></span></div>' +
      '<div class="block-body"></div>';
    var body = el.querySelector('.block-body');
    var pill = el.querySelector('.status-pill');

    function setPill() {
      var k = window.Progress.materi(id).kuis;
      if (k) { pill.className = 'status-pill done'; pill.textContent = 'Terbaik ' + k.terbaik + '/' + k.total; }
      else { pill.className = 'status-pill'; pill.textContent = total + ' soal'; }
    }
    setPill();

    var soal = [], idx = 0, jawaban = [];

    function intro() {
      var jenis = {};
      contoh.forEach(function (q) { jenis[q.tipe] = 1; });
      var NAMA = { pg: 'pilihan ganda', bs: 'benar/salah', isian: 'isian', susun: 'susun kode' };
      var daftar = Object.keys(jenis).map(function (j) { return NAMA[j]; }).join(', ');
      body.innerHTML =
        '<div class="skor">' +
        '<div class="callout-mascot" style="width:110px;height:110px">' + window.Illus.maskot('mikir') + '</div>' +
        '<div><h4>Siap diuji?</h4><p>' + total + ' soal (' + daftar + '). Setiap soal langsung ada pembahasannya. ' +
        (id === 'akhir' ? 'Soal diambil acak dari semua materi, jadi tiap percobaan berbeda. ' : '') +
        'Nilai terbaikmu tersimpan di rapor.</p>' +
        '<div class="block-actions"><button type="button" class="btn">Mulai Kuis</button></div></div></div>';
      body.querySelector('.btn').addEventListener('click', mulai);
    }

    function mulai() {
      soal = id === 'akhir' ? ambilSoal(id, el) : contoh.slice();
      idx = 0;
      jawaban = [];
      tampilSoal();
    }

    function titik() {
      return '<div class="kuis-dots" aria-hidden="true">' + soal.map(function (_, i) {
        var k = 'kuis-dot';
        if (i < jawaban.length) k += jawaban[i] ? ' benar' : ' salah';
        if (i === idx) k += ' now';
        return '<span class="' + k + '"></span>';
      }).join('') + '</div>';
    }

    function tampilSoal() {
      var q = soal[idx];
      body.innerHTML =
        '<div class="kuis-top">' + titik() + '<span class="kuis-counter">Soal ' + (idx + 1) + ' / ' + soal.length +
        (q.asal ? ' · #' + q.asal : '') + '</span></div>' +
        '<div class="kuis-q">' + q.tanya + '</div>';
      if (q.kode) {
        var pre = document.createElement('pre');
        window.Editor.highlight(window.Editor.dedent(q.kode), pre);
        body.appendChild(pre);
      }
      var area = document.createElement('div');
      body.appendChild(area);
      var nav = document.createElement('div');
      nav.className = 'kuis-nav';
      body.appendChild(nav);

      if (q.tipe === 'pg' || q.tipe === 'bs') renderPilihan(q, area, nav);
      else if (q.tipe === 'isian') renderIsian(q, area, nav);
      else if (q.tipe === 'susun') renderSusun(q, area, nav);
      var fokus = body.querySelector('button, input, textarea');
      if (fokus && idx > 0) fokus.focus({ preventScroll: true });
    }

    function selesaiJawab(q, benar, area, nav) {
      jawaban.push(benar);
      var b = document.createElement('div');
      b.className = 'bahas';
      b.innerHTML = '<div class="bahas-title">' + (benar ? '✓ Benar!' : '✗ Kurang tepat') + '</div>' + (q.bahas || '');
      area.appendChild(b);
      var dots = body.querySelector('.kuis-dots');
      if (dots) dots.outerHTML = titik();
      var lanjut = document.createElement('button');
      lanjut.type = 'button';
      lanjut.className = 'btn btn--sm';
      lanjut.textContent = idx + 1 < soal.length ? 'Soal berikutnya →' : 'Lihat Nilai';
      lanjut.addEventListener('click', function () {
        idx++;
        if (idx < soal.length) tampilSoal(); else hasil();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      nav.appendChild(lanjut);
      lanjut.focus({ preventScroll: true });
    }

    function renderPilihan(q, area, nav) {
      var opsi = q.tipe === 'bs' ? ['Benar', 'Salah'] : q.opsi;
      var kunci = q.tipe === 'bs' ? (q.jawab ? 0 : 1) : q.jawab;
      var wadah = document.createElement('div');
      wadah.className = 'kuis-opsi';
      area.appendChild(wadah);
      var tombol = opsi.map(function (o, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opsi';
        b.innerHTML = '<span class="opsi-key">' + HURUF[i] + '</span><span class="opsi-text' + (q.opsiKode ? ' mono' : '') + '">' + (q.opsiKode ? esc(o) : md(o)) + '</span>';
        b.addEventListener('click', function () {
          var benar = i === kunci;
          tombol.forEach(function (t, j) {
            t.disabled = true;
            if (j === kunci) t.classList.add('benar');
            else if (j === i) t.classList.add('salah');
            else t.classList.add('redup');
          });
          selesaiJawab(q, benar, area, nav);
        });
        wadah.appendChild(b);
        return b;
      });
    }

    function renderIsian(q, area, nav) {
      var form = document.createElement('form');
      form.className = 'row';
      form.innerHTML = '<input class="isian-input" style="flex:1 1 220px" autocomplete="off" spellcheck="false" placeholder="Ketik jawabanmu…" aria-label="Jawaban">' +
        '<button type="submit" class="btn btn--sm">Cek</button>';
      area.appendChild(form);
      var input = form.querySelector('input');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!input.value.trim()) { input.focus(); return; }
        var benar = q.jawab.some(function (j) { return normal(j) === normal(input.value); });
        input.readOnly = true;
        input.classList.add(benar ? 'benar' : 'salah');
        form.querySelector('button').disabled = true;
        if (!benar) {
          var k = document.createElement('p');
          k.className = 'content-text';
          k.style.marginTop = '.6rem';
          k.innerHTML = 'Jawaban yang benar: <code>' + esc(q.jawab[0]) + '</code>';
          area.appendChild(k);
        }
        selesaiJawab(q, benar, area, nav);
      });
    }

    function renderSusun(q, area, nav) {
      var urutan = q.baris.map(function (b, i) { return i; });
      var pool = acak(urutan);
      if (pool.join() === urutan.join() && pool.length > 1) pool.reverse();
      var pilih = [];
      area.innerHTML = '<div class="susun-area"><div class="susun-label">Klik baris untuk menyusun kode</div><div class="susun-slot" data-slot="jawab"></div>' +
        '<div class="susun-label">Potongan baris</div><div class="susun-slot" data-slot="pool"></div></div>';
      var slotJawab = area.querySelector('[data-slot="jawab"]');
      var slotPool = area.querySelector('[data-slot="pool"]');
      var cek = document.createElement('button');
      cek.type = 'button';
      cek.className = 'btn btn--sm';
      cek.textContent = 'Cek Susunan';
      cek.disabled = true;
      nav.appendChild(cek);

      function gambar() {
        slotJawab.innerHTML = '';
        slotPool.innerHTML = '';
        pilih.forEach(function (i, posisi) { slotJawab.appendChild(baris(i, function () { pilih.splice(posisi, 1); pool.push(i); gambar(); })); });
        pool.forEach(function (i, posisi) { slotPool.appendChild(baris(i, function () { pool.splice(posisi, 1); pilih.push(i); gambar(); })); });
        cek.disabled = pool.length > 0;
      }
      function baris(i, fn) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'susun-line';
        b.textContent = q.baris[i];
        b.addEventListener('click', fn);
        return b;
      }
      gambar();
      cek.addEventListener('click', function () {
        var benar = pilih.every(function (v, i) { return q.baris[v] === q.baris[i]; });
        slotJawab.querySelectorAll('.susun-line').forEach(function (b, i) {
          b.disabled = true;
          b.classList.add(q.baris[pilih[i]] === q.baris[i] ? 'benar' : 'salah');
        });
        cek.remove();
        if (!benar) {
          var pre = document.createElement('pre');
          window.Editor.highlight(q.baris.join('\n'), pre);
          var k = document.createElement('p');
          k.className = 'content-text';
          k.style.marginTop = '.8rem';
          k.textContent = 'Susunan yang benar:';
          area.appendChild(k);
          area.appendChild(pre);
        }
        selesaiJawab(q, benar, area, nav);
      });
    }

    function hasil() {
      var benar = jawaban.filter(Boolean).length;
      var skor = Math.round(benar / soal.length * 100);
      var k = window.Progress.setKuis(id, benar, soal.length);
      setPill();
      var mood = skor >= 80 ? 'bangga' : skor >= 60 ? 'senang' : 'sedih';
      var judul = skor === 100 ? 'Sempurna!' : skor >= 80 ? 'Hebat!' : skor >= 60 ? 'Lumayan, terus latihan!' : 'Yuk, ulangi materinya dulu';
      body.innerHTML =
        '<div class="skor">' +
        '<div class="skor-angka"><b>' + skor + '</b><span>' + benar + '/' + soal.length + ' benar</span></div>' +
        '<div><div class="callout-mascot" style="width:64px;height:64px;float:right">' + window.Illus.maskot(mood) + '</div>' +
        '<h4>' + judul + '</h4><p>Nilai terbaikmu: ' + k.terbaik + '/' + k.total + ' (percobaan ke-' + k.percobaan + '). ' +
        'Soal yang salah ditandai arsir di bawah — baca lagi bagian materinya.</p>' +
        '<div class="block-actions"><button type="button" class="btn btn--sm">Ulangi Kuis</button>' +
        '<a class="btn btn--sm btn--ghost" href="' + (el.getAttribute('data-rapor') || '../rapor.html') + '">Lihat Rapor</a></div></div>' +
        '<ul class="review-list">' + soal.map(function (q, i) {
          var teks = q.tanya.replace(/<[^>]+>/g, '');
          if (teks.length > 90) teks = teks.slice(0, 88) + '…';
          return '<li class="' + (jawaban[i] ? '' : 'salah') + '"><b>' + (jawaban[i] ? '✓' : '✗') + ' ' + (i + 1) + '.</b> ' + esc(teks) + '</li>';
        }).join('') + '</ul></div>';
      body.querySelector('button').addEventListener('click', mulai);
      el.dispatchEvent(new CustomEvent('kuis:selesai', { bubbles: true, detail: { materi: id, benar: benar, total: soal.length } }));
    }

    intro();
  }

  function init(ruang) {
    (ruang || document).querySelectorAll('[data-kuis]').forEach(render);
  }

  window.Kuis = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
