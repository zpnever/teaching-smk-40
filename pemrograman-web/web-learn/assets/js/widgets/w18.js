/* Widget Pertemuan 18: penelusur loop (dry run) & grid nested loop */
(function () {
  'use strict';

  var esc = function (s) { return window.Editor.esc(s); };

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Penelusur loop for (dry run) ───── */
  var OPERATOR = {
    '<=': function (a, b) { return a <= b; },
    '<': function (a, b) { return a < b; },
    '>=': function (a, b) { return a >= b; },
    '>': function (a, b) { return a > b; }
  };
  var UPDATE = {
    'i++': function (i) { return i + 1; },
    'i--': function (i) { return i - 1; },
    'i += 2': function (i) { return i + 2; },
    'i -= 2': function (i) { return i - 2; },
    'i += 5': function (i) { return i + 5; }
  };
  var ISI = {
    'console.log(i);': function (i) { return String(i); },
    'console.log(i * 2);': function (i) { return String(i * 2); },
    'console.log(`Iterasi ke-${i}`);': function (i) { return 'Iterasi ke-' + i; },
    'console.log("Halo!");': function () { return 'Halo!'; }
  };
  var BATAS_ITERASI = 25;

  function opsi(obj, pilih) {
    return Object.keys(obj).map(function (k) {
      return '<option' + (k === pilih ? ' selected' : '') + '>' + esc(k) + '</option>';
    }).join('');
  }

  function penelusur(el) {
    var body = kepala(el, 'Penelusur Loop for (Dry Run)');
    body.innerHTML =
      '<p class="content-text">Atur perulangannya, lalu tekan <strong>Langkah</strong> berkali-kali untuk melihat urutan kerja <code>for</code> satu per satu: inisialisasi → cek kondisi → jalankan blok → update → cek kondisi lagi…</p>' +
      '<div class="row">' +
      '<label class="field">Mulai (let i =)<input class="input" type="number" value="1" data-in="mulai"></label>' +
      '<label class="field">Kondisi<select data-in="op">' + opsi(OPERATOR, '<=') + '</select></label>' +
      '<label class="field">Batas<input class="input" type="number" value="5" data-in="batas"></label>' +
      '<label class="field">Update<select data-in="upd">' + opsi(UPDATE, 'i++') + '</select></label>' +
      '</div>' +
      '<label class="field">Isi blok<select data-in="isi">' + opsi(ISI, 'console.log(i);') + '</select></label>' +
      '<div class="trace-code" aria-hidden="true"></div>' +
      '<div class="trace-status" aria-live="polite"></div>' +
      '<div class="block-actions" style="margin-top:0">' +
      '<button type="button" class="btn btn--sm" data-aksi="langkah">Langkah ▸</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-aksi="semua">Jalankan Semua</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-aksi="ulang">Ulang</button>' +
      '</div>' +
      '<div class="table-wrap trace-wrap" style="margin:0"><table class="tabel trace-tabel"><thead><tr><th>Iterasi</th><th>Nilai i</th><th>Kondisi</th><th>Output</th></tr></thead><tbody></tbody></table></div>' +
      '<div class="mini-console" data-konsol><div class="dim">// Output console muncul di sini</div></div>';

    var inp = {};
    body.querySelectorAll('[data-in]').forEach(function (x) { inp[x.getAttribute('data-in')] = x; });
    var kode = body.querySelector('.trace-code');
    var status = body.querySelector('.trace-status');
    var tbody = body.querySelector('tbody');
    var konsol = body.querySelector('[data-konsol]');
    var btnLangkah = body.querySelector('[data-aksi="langkah"]');
    var btnSemua = body.querySelector('[data-aksi="semua"]');
    var s, timer = null;

    function cfg() {
      var mulai = parseInt(inp.mulai.value, 10);
      var batas = parseInt(inp.batas.value, 10);
      return {
        mulai: isNaN(mulai) ? 0 : mulai,
        batas: isNaN(batas) ? 0 : batas,
        op: inp.op.value,
        upd: inp.upd.value,
        isi: inp.isi.value
      };
    }

    function gambarKode(aktif) {
      var c = cfg();
      function bagian(nama, teks) {
        return '<span class="part' + (aktif === nama ? ' on' : '') + '">' + esc(teks) + '</span>';
      }
      kode.innerHTML = 'for (' + bagian('init', 'let i = ' + c.mulai) + '; ' +
        bagian('cond', 'i ' + c.op + ' ' + c.batas) + '; ' + bagian('upd', c.upd) + ') {\n  ' +
        bagian('body', c.isi) + '\n}' + (aktif === 'keluar' ? '\n' + bagian('keluar', '// keluar dari loop ✓') : '');
    }

    function ulang() {
      berhenti();
      s = { fase: 'mulai', i: null, iter: 0, baris: null, selesai: false };
      tbody.innerHTML = '';
      konsol.innerHTML = '<div class="dim">// Output console muncul di sini</div>';
      status.innerHTML = 'Tekan <strong>Langkah ▸</strong> untuk mulai.';
      btnLangkah.disabled = false;
      btnSemua.disabled = false;
      gambarKode(null);
    }

    function tambahBaris(iter, i, kond) {
      tbody.querySelectorAll('tr.now').forEach(function (r) { r.classList.remove('now'); });
      var tr = document.createElement('tr');
      tr.className = 'now';
      tr.innerHTML = '<td>' + iter + '</td><td>' + i + '</td><td>' + kond + '</td><td class="trace-out">–</td>';
      tbody.appendChild(tr);
      var wrap = tbody.closest('.table-wrap');
      wrap.scrollTop = wrap.scrollHeight;
      return tr;
    }

    function cetak(teks) {
      var dim = konsol.querySelector('.dim');
      if (dim) dim.remove();
      var d = document.createElement('div');
      d.textContent = teks;
      konsol.appendChild(d);
      konsol.scrollTop = konsol.scrollHeight;
    }

    function selesai(pesan, aktif) {
      s.selesai = true;
      status.innerHTML = pesan;
      gambarKode(aktif);
      btnLangkah.disabled = true;
      btnSemua.disabled = true;
      berhenti();
    }

    function langkah() {
      if (s.selesai) return;
      var c = cfg();
      if (s.fase === 'mulai') {
        s.i = c.mulai;
        s.fase = 'cond';
        gambarKode('init');
        status.innerHTML = '<b>Inisialisasi</b> — counter dibuat: <code>i = ' + s.i + '</code>. Bagian ini hanya dijalankan <strong>sekali</strong>.';
      } else if (s.fase === 'cond') {
        var benar = OPERATOR[c.op](s.i, c.batas);
        var teks = s.i + ' ' + c.op + ' ' + c.batas + ' → ' + benar;
        if (!benar) {
          var tr = tambahBaris('–', s.i, teks);
          tr.querySelector('.trace-out').textContent = '(keluar)';
          selesai('<b>Cek kondisi</b> — <code>' + esc(teks) + '</code>. Kondisi <strong>false</strong>, loop selesai setelah <strong>' + s.iter + ' iterasi</strong>.', 'keluar');
          return;
        }
        if (s.iter >= BATAS_ITERASI) {
          selesai('<b>Berhenti paksa!</b> Sudah ' + BATAS_ITERASI + ' iterasi tapi kondisi masih <strong>true</strong>. Dengan pengaturan ini kondisinya tidak akan pernah false — inilah <strong>infinite loop</strong>. Cek arah update-nya.', 'cond');
          return;
        }
        s.iter++;
        s.baris = tambahBaris(s.iter, s.i, teks);
        s.fase = 'body';
        gambarKode('cond');
        status.innerHTML = '<b>Cek kondisi</b> — <code>' + esc(teks) + '</code>. Kondisi <strong>true</strong>, masuk ke blok untuk iterasi ke-' + s.iter + '.';
      } else if (s.fase === 'body') {
        var out = ISI[c.isi](s.i);
        s.baris.querySelector('.trace-out').textContent = out;
        cetak(out);
        s.fase = 'upd';
        gambarKode('body');
        status.innerHTML = '<b>Jalankan blok</b> — <code>' + esc(c.isi) + '</code> mencetak <code>' + esc(out) + '</code>.';
      } else if (s.fase === 'upd') {
        var lama = s.i;
        s.i = UPDATE[c.upd](s.i);
        s.fase = 'cond';
        gambarKode('upd');
        status.innerHTML = '<b>Update</b> — <code>' + esc(c.upd) + '</code>: i berubah dari ' + lama + ' menjadi <strong>' + s.i + '</strong>. Berikutnya kondisi dicek lagi.';
      }
    }

    function berhenti() {
      if (timer) { clearInterval(timer); timer = null; }
      btnSemua.textContent = 'Jalankan Semua';
    }

    btnLangkah.addEventListener('click', function () { berhenti(); langkah(); });
    btnSemua.addEventListener('click', function () {
      if (timer) { berhenti(); return; }
      btnSemua.textContent = 'Jeda';
      timer = setInterval(function () { langkah(); if (s.selesai) berhenti(); }, 260);
    });
    body.querySelector('[data-aksi="ulang"]').addEventListener('click', ulang);
    Object.keys(inp).forEach(function (k) { inp[k].addEventListener('change', ulang); });
    ulang();
  }

  /* ── 2. Grid nested loop ───────────────── */
  function gridNested(el) {
    var body = kepala(el, 'Nested Loop: Baris & Kolom');
    body.innerHTML =
      '<p class="content-text">Setiap kali loop <strong>luar</strong> (baris) berputar sekali, loop <strong>dalam</strong> (kolom) berjalan penuh dari awal sampai selesai. Tekan <strong>Putar</strong> dan perhatikan urutan kotaknya terisi.</p>' +
      '<div class="row">' +
      '<label class="field">Jumlah baris<input class="input" type="number" min="1" max="5" value="3" data-in="baris"></label>' +
      '<label class="field">Jumlah kolom<input class="input" type="number" min="1" max="8" value="4" data-in="kolom"></label>' +
      '<button type="button" class="btn btn--sm" data-aksi="putar">Putar ▸</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-aksi="ulang">Ulang</button>' +
      '</div>' +
      '<div class="nest-wrap"><div class="nest-grid" aria-hidden="true"></div></div>' +
      '<div class="readout" aria-live="polite" data-out></div>';
    var inBaris = body.querySelector('[data-in="baris"]');
    var inKolom = body.querySelector('[data-in="kolom"]');
    var grid = body.querySelector('.nest-grid');
    var out = body.querySelector('[data-out]');
    var timer = null;

    function angka(x, min, max) {
      var n = parseInt(x.value, 10);
      if (isNaN(n)) n = min;
      n = Math.max(min, Math.min(max, n));
      x.value = n;
      return n;
    }

    function siapkan() {
      if (timer) { clearInterval(timer); timer = null; }
      var B = angka(inBaris, 1, 5), K = angka(inKolom, 1, 8);
      grid.style.gridTemplateColumns = 'auto repeat(' + K + ', minmax(34px, 1fr))';
      var html = '<span class="nest-label"></span>';
      for (var k = 1; k <= K; k++) html += '<span class="nest-label">k' + k + '</span>';
      for (var b = 1; b <= B; b++) {
        html += '<span class="nest-label">b' + b + '</span>';
        for (var j = 1; j <= K; j++) html += '<span class="nest-cell" data-b="' + b + '" data-k="' + j + '"></span>';
      }
      grid.innerHTML = html;
      out.innerHTML = '<div class="muted">Loop luar ' + B + ' kali × loop dalam ' + K + ' kali = <strong>' + (B * K) + '</strong> baris output.</div>';
      return { B: B, K: K };
    }

    function putar() {
      var u = siapkan();
      var b = 1, k = 1, n = 0;
      timer = setInterval(function () {
        grid.querySelectorAll('.nest-cell.now').forEach(function (c) { c.classList.remove('now'); });
        var sel = grid.querySelector('.nest-cell[data-b="' + b + '"][data-k="' + k + '"]');
        n++;
        sel.classList.add('isi', 'now');
        sel.textContent = n;
        out.innerHTML = '<div class="muted">baris = ' + b + ', kolom = ' + k + '</div><div class="big">Baris ' + b + ', Kolom ' + k + '</div>' +
          '<div class="muted">iterasi loop dalam ke-' + n + ' dari ' + (u.B * u.K) + '</div>';
        k++;
        if (k > u.K) { k = 1; b++; }
        if (b > u.B) { clearInterval(timer); timer = null; }
      }, 380);
    }

    body.querySelector('[data-aksi="putar"]').addEventListener('click', putar);
    body.querySelector('[data-aksi="ulang"]').addEventListener('click', siapkan);
    inBaris.addEventListener('change', siapkan);
    inKolom.addEventListener('change', siapkan);
    siapkan();
  }

  var DAFTAR = { 'penelusur-loop': penelusur, 'grid-nested': gridNested };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
