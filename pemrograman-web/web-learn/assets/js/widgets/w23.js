/* Widget Pertemuan 23: Brankas Storage (variabel vs localStorage) & Mesin Pengemas JSON */
(function () {
  'use strict';

  function esc(s) { return window.Editor.esc(s); }

  function kepala(el, judul) {
    el.classList.add('block', 'widget');
    el.innerHTML = '<div class="block-head"><span class="block-kind">Coba Langsung</span><h3>' + judul + '</h3></div><div class="block-body"></div>';
    return el.querySelector('.block-body');
  }

  /* ── 1. Brankas Storage: Variabel biasa vs localStorage ── */
  function brankasStorage(el) {
    var body = kepala(el, 'Simulator: Variabel Biasa vs localStorage');
    body.innerHTML =
      '<p class="content-text">Simpan data, lalu tekan <strong>Simulasi Refresh Halaman</strong>. Perhatikan apa yang terjadi pada variabel biasa dibanding <code>localStorage</code>.</p>' +
      '<div class="st-form">' +
        '<label class="field">Key<input class="input mono" data-k value="rpl_nama" spellcheck="false" autocomplete="off"></label>' +
        '<label class="field">Value<input class="input mono" data-v value="Budi" spellcheck="false" autocomplete="off"></label>' +
      '</div>' +
      '<div class="pill-group" data-aksi>' +
        '<button type="button" class="pill" data-op="set">setItem(key, val)</button>' +
        '<button type="button" class="pill" data-op="get">getItem(key)</button>' +
        '<button type="button" class="pill" data-op="del">removeItem(key)</button>' +
        '<button type="button" class="pill" data-op="clr">clear()</button>' +
        '<button type="button" class="pill on" data-op="refresh">⟳ Simulasi Refresh Halaman</button>' +
      '</div>' +
      '<div class="st-grid">' +
        '<div class="st-panel" data-panel-var>' +
          '<div class="st-panel-head"><span>Memori Sementara (Variabel <code>let</code>)</span><small>hilang saat refresh</small></div>' +
          '<div class="st-var-isi" data-var></div>' +
        '</div>' +
        '<div class="st-panel">' +
          '<div class="st-panel-head"><span>Browser Storage (<code>localStorage</code>)</span><small>bertahan saat refresh</small></div>' +
          '<div class="st-ls-isi" data-ls></div>' +
        '</div>' +
      '</div>' +
      '<div class="mini-console" data-log aria-live="polite"><div class="dim">// Klik setItem untuk menyimpan data, lalu coba Simulasi Refresh!</div></div>';

    var inK = body.querySelector('[data-k]');
    var inV = body.querySelector('[data-v]');
    var varBox = body.querySelector('[data-var]');
    var lsBox = body.querySelector('[data-ls]');
    var panelVar = body.querySelector('[data-panel-var]');
    var log = body.querySelector('[data-log]');

    var varMem = {};
    var lsMem = { rpl_tema: 'gelap' };

    function tulisLog(baris, kelas) {
      var dim = log.querySelector('.dim:only-child');
      if (dim) dim.remove();
      var d = document.createElement('div');
      if (kelas) d.className = kelas;
      d.textContent = baris;
      log.appendChild(d);
      while (log.children.length > 30) log.removeChild(log.firstChild);
      log.scrollTop = log.scrollHeight;
    }

    function gambarTabel(wadah, data, kosongTeks) {
      wadah.innerHTML = '';
      var keys = Object.keys(data);
      if (!keys.length) {
        var em = document.createElement('div');
        em.className = 'st-empty';
        em.textContent = kosongTeks;
        wadah.appendChild(em);
        return;
      }
      var tbl = document.createElement('table');
      tbl.className = 'st-table';
      var thead = document.createElement('thead');
      thead.innerHTML = '<tr><th scope="col">Key</th><th scope="col">Value</th></tr>';
      tbl.appendChild(thead);
      var tb = document.createElement('tbody');
      keys.forEach(function (k) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.textContent = k;
        td2.textContent = typeof data[k] === 'string' ? '"' + data[k] + '"' : String(data[k]);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tb.appendChild(tr);
      });
      tbl.appendChild(tb);
      wadah.appendChild(tbl);
    }

    function gambar() {
      gambarTabel(varBox, varMem, '(kosong — variabel belum diisi / terhapus saat refresh)');
      gambarTabel(lsBox, lsMem, '(kosong — belum ada key di localStorage)');
    }

    body.querySelector('[data-aksi]').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-op]');
      if (!btn) return;
      var op = btn.getAttribute('data-op');
      var k = inK.value.trim() || 'rpl_nama';
      var v = inV.value;

      if (op === 'set') {
        varMem[k] = v;
        lsMem[k] = String(v);
        tulisLog('let ' + k + ' = "' + v + '";  |  localStorage.setItem("' + k + '", "' + String(v) + '");', 'ok');
      } else if (op === 'get') {
        var hasil = Object.prototype.hasOwnProperty.call(lsMem, k) ? lsMem[k] : null;
        tulisLog('localStorage.getItem("' + k + '")  →  ' + (hasil === null ? 'null' : '"' + hasil + '" (typeof: string)'), hasil === null ? 'err' : 'ok');
      } else if (op === 'del') {
        delete varMem[k];
        delete lsMem[k];
        tulisLog('localStorage.removeItem("' + k + '");  →  key "' + k + '" dihapus.', 'ok');
      } else if (op === 'clr') {
        varMem = {};
        lsMem = {};
        tulisLog('localStorage.clear();  →  SEMUA data dihapus!', 'err');
      } else if (op === 'refresh') {
        varMem = {};
        panelVar.classList.remove('shake');
        void panelVar.offsetWidth;
        panelVar.classList.add('shake');
        tulisLog('⟳ Halaman di-refresh! Variabel biasa hilang, tapi localStorage tetap utuh (' + Object.keys(lsMem).length + ' key).', 'ok');
      }
      gambar();
    });

    gambar();
  }

  /* ── 2. Mesin Pengemas JSON ── */
  function mesinJson(el) {
    var body = kepala(el, 'Mesin Pengemas JSON (stringify & parse)');
    var PRESET = [
      {
        label: 'Object siswa',
        key: 'rpl_siswa',
        data: { nama: 'Budi', kelas: 'XI RPL' },
        akses: 'dibaca.nama',
        mentah: '[object Object]',
        aksesMentah: 'undefined'
      },
      {
        label: 'Array buah',
        key: 'rpl_buah',
        data: ['apel', 'jeruk'],
        akses: 'dibaca[1] + " (length: " + dibaca.length + ")"',
        mentah: 'apel,jeruk',
        aksesMentah: '"p" (huruf ke-2 dari string "apel,jeruk"!)'
      },
      {
        label: 'Array of object',
        key: 'rpl_belanja',
        data: [{ nama: 'Buku', harga: 12000 }, { nama: 'Pulpen', harga: 3000 }],
        akses: 'dibaca[0].nama + " Rp " + dibaca[0].harga',
        mentah: '[object Object],[object Object]',
        aksesMentah: 'undefined'
      }
    ];

    body.innerHTML =
      '<p class="content-text">Pilih contoh data, lalu bandingkan hasilnya saat disimpan <strong>tanpa JSON</strong> vs <strong>memakai <code>JSON.stringify</code> &amp; <code>JSON.parse</code></strong>.</p>' +
      '<div class="pill-group" data-preset></div>' +
      '<div class="pill-group" data-mode>' +
        '<button type="button" class="pill" data-m="mentah">Tanpa JSON (langsung)</button>' +
        '<button type="button" class="pill on" data-m="json">Dengan JSON (stringify → parse)</button>' +
      '</div>' +
      '<div class="json-pipe" data-pipe aria-live="polite"></div>';

    var presetEl = body.querySelector('[data-preset]');
    var modeEl = body.querySelector('[data-mode]');
    var pipeEl = body.querySelector('[data-pipe]');
    var aktifPreset = 0;
    var aktifMode = 'json';

    PRESET.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill' + (i === 0 ? ' on' : '');
      b.textContent = p.label;
      b.addEventListener('click', function () {
        aktifPreset = i;
        presetEl.querySelectorAll('.pill').forEach(function (x, j) { x.classList.toggle('on', j === i); });
        gambar();
      });
      presetEl.appendChild(b);
    });

    modeEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]');
      if (!b) return;
      aktifMode = b.getAttribute('data-m');
      modeEl.querySelectorAll('.pill').forEach(function (x) { x.classList.toggle('on', x === b); });
      gambar();
    });

    function gambar() {
      var p = PRESET[aktifPreset];
      var jsonTeks = JSON.stringify(p.data);
      var pakaiJson = aktifMode === 'json';
      var hasilAkses;
      if (pakaiJson) {
        if (aktifPreset === 0) hasilAkses = '"' + p.data.nama + '"';
        else if (aktifPreset === 1) hasilAkses = '"jeruk" (length: 2)';
        else hasilAkses = '"Buku Rp 12000"';
      } else {
        hasilAkses = p.aksesMentah;
      }

      pipeEl.innerHTML = '';
      var kartu1 = document.createElement('div');
      kartu1.className = 'mini-card';
      kartu1.innerHTML = '<h4><span class="letter-badge">1</span>Data Asli (JS)</h4><p class="mono" style="font-size:.82rem;word-break:break-word">' + esc(jsonTeks) + '</p>';

      var kartu2 = document.createElement('div');
      kartu2.className = 'mini-card ' + (pakaiJson ? '' : 'mini-card--dash');
      kartu2.innerHTML = '<h4><span class="letter-badge">2</span>Di localStorage (string) <span class="tag">' + (pakaiJson ? 'JSON.stringify' : 'tanpa JSON') + '</span></h4>' +
        '<p class="mono" style="font-size:.82rem;word-break:break-word">' + esc('"' + (pakaiJson ? jsonTeks : p.mentah) + '"') + '</p>';

      var kartu3 = document.createElement('div');
      kartu3.className = 'mini-card ' + (pakaiJson ? 'mini-card--ink' : 'mini-card--dash');
      kartu3.innerHTML = '<h4><span class="letter-badge">3</span>Hasil Dibaca <span class="tag">' + (pakaiJson ? 'JSON.parse ✓' : 'rusak ✗') + '</span></h4>' +
        '<p class="mono" style="font-size:.82rem">' + esc(p.akses) + ' → <b>' + esc(hasilAkses) + '</b></p>';

      pipeEl.appendChild(kartu1);
      pipeEl.appendChild(kartu2);
      pipeEl.appendChild(kartu3);
    }

    gambar();
  }

  var DAFTAR = { 'brankas-storage': brankasStorage, 'mesin-json': mesinJson };
  function init() {
    document.querySelectorAll('[data-widget]').forEach(function (el) {
      var fn = DAFTAR[el.getAttribute('data-widget')];
      if (fn && !el.__siap) { el.__siap = true; fn(el); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
