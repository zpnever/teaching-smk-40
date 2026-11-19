/* ═══════════════════════════════════════════
   PLAYGROUND — editor HTML/CSS/JS + Preview hidup + console
   Markup:
     <div data-playground data-preset="dasar">
       <textarea data-lang="js">document.querySelector("#judul").textContent = "Halo";</textarea>
     </div>
   Atribut opsional:
     data-preset="dasar"      HTML & CSS diambil dari HALAMAN_DOM (bank-21.js)
     <textarea data-lang="html|css|js">  isi file (menimpa preset)
     data-edit="html,css,js"  file yang boleh diubah (default: js bila memakai preset, semua bila tidak)
     data-aktif="html"        tab yang dibuka pertama
     data-tinggi="260"        tinggi Preview (px)
     data-label="…"           keterangan di bilah atas
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var NAMA_FILE = { html: 'index.html', css: 'style.css', js: 'script.js' };
  var IKON_KUNCI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var IKON_MUAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>';
  var nomor = 0;

  function esc(s) { return window.Editor.esc(s); }

  function bacaDraft(kunci) {
    if (!kunci || !window.Progress) return null;
    var d = window.Progress.draft(kunci);
    if (d === undefined || d === null) return null;
    try { var o = JSON.parse(d); if (o && typeof o === 'object') return o; } catch (e) { /* bukan JSON */ }
    return { js: String(d) };
  }

  /**
   * opsi: { html, css, js, edit: ['js'], aktif, tinggi, label, input, simpanKe, simpanId, autorun, placeholder }
   */
  function create(host, opsi) {
    opsi = opsi || {};
    var E = window.Editor;
    nomor++;
    host.classList.add('editor', 'playground');
    host.innerHTML = '';

    var awal = { html: opsi.html || '', css: opsi.css || '', js: opsi.js || '' };
    var edit = opsi.edit || ['html', 'css', 'js'];
    var bolehUbah = function (lang) { return edit.indexOf(lang) !== -1; };
    var draft = bacaDraft(opsi.simpanKe);
    var isi = {
      html: draft && draft.html !== undefined && bolehUbah('html') ? draft.html : awal.html,
      css: draft && draft.css !== undefined && bolehUbah('css') ? draft.css : awal.css,
      js: draft && draft.js !== undefined && bolehUbah('js') ? draft.js : awal.js
    };
    var daftarLang = ['html', 'css', 'js'].filter(function (l) { return l === 'js' || awal[l]; });
    var aktif = opsi.aktif && daftarLang.indexOf(opsi.aktif) !== -1 ? opsi.aktif : (bolehUbah('js') ? 'js' : daftarLang[0]);
    var simpanId = opsi.simpanId || ((location.pathname.split('/').pop() || 'hal') + '-' + nomor);
    var api = {};

    /* Bilah atas: tab file + tombol */
    var bar = document.createElement('div');
    bar.className = 'editor-bar pg-bar';
    bar.innerHTML = '<span class="editor-dots" aria-hidden="true"><i></i><i></i><i></i></span><div class="pg-tabs" role="tablist"></div><span class="editor-tools"></span>';
    host.appendChild(bar);
    var tabsEl = bar.querySelector('.pg-tabs');
    var tools = bar.querySelector('.editor-tools');
    if (opsi.label) {
      var ket = document.createElement('div');
      ket.className = 'pg-label';
      ket.textContent = opsi.label;
      host.appendChild(ket);
    }

    function tombol(html, kelas, judul, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ed-btn ' + (kelas || '');
      b.innerHTML = html;
      if (judul) b.title = judul;
      b.addEventListener('click', fn);
      tools.appendChild(b);
      return b;
    }

    /* Panel kode per file */
    var panes = {}, editor = {}, tabBtn = {};
    var wadahPane = document.createElement('div');
    wadahPane.className = 'pg-panes';
    host.appendChild(wadahPane);

    daftarLang.forEach(function (lang) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pg-tab';
      b.setAttribute('role', 'tab');
      b.innerHTML = esc(NAMA_FILE[lang]) + (bolehUbah(lang) ? '' : ' <span class="pg-lock" title="Sudah disediakan, tidak perlu diubah">' + IKON_KUNCI + '</span>');
      b.addEventListener('click', function () { pilihTab(lang); });
      tabsEl.appendChild(b);
      tabBtn[lang] = b;

      var pane = document.createElement('div');
      pane.className = 'pg-pane' + (bolehUbah(lang) ? '' : ' readonly');
      if (!bolehUbah(lang)) {
        var info = document.createElement('div');
        info.className = 'pg-ro-note';
        info.textContent = NAMA_FILE[lang] + ' sudah disediakan — cukup dibaca. Kodemu ditulis di script.js.';
        pane.appendChild(info);
      }
      if (lang === 'js' && opsi.input) {
        var panel = document.createElement('div');
        panel.className = 'editor-input';
        panel.innerHTML = '<div class="editor-input-label"><span>Data (sudah disediakan, boleh langsung dipakai)</span></div>';
        var w = document.createElement('div');
        panel.appendChild(w);
        pane.appendChild(panel);
        E.buatCM(w, opsi.input, { readOnly: true, lineNumbers: false });
      }
      var w2 = document.createElement('div');
      w2.className = 'editor-code';
      pane.appendChild(w2);
      wadahPane.appendChild(pane);
      panes[lang] = pane;
      editor[lang] = E.buatCM(w2, isi[lang], {
        mode: lang === 'js' ? 'js' : (lang === 'css' ? 'css' : 'html'),
        readOnly: !bolehUbah(lang),
        placeholder: lang === 'js' ? (opsi.placeholder || '// Tulis kode JavaScript-mu di sini…') : '',
        onRun: function () { api.jalankan(); }
      });
      if (lang === 'css' && editor[lang].cm) editor[lang].cm.setOption('mode', 'css');
      if (bolehUbah(lang) && opsi.simpanKe && window.Progress) {
        var t;
        editor[lang].onChange(function () {
          clearTimeout(t);
          t = setTimeout(simpanDraft, 400);
        });
      }
    });

    function simpanDraft() {
      var d = {}, beda = false;
      edit.forEach(function (l) {
        if (!editor[l]) return;
        d[l] = editor[l].getValue();
        if (d[l] !== awal[l]) beda = true;
      });
      window.Progress.draft(opsi.simpanKe, beda ? JSON.stringify(d) : null);
    }

    function pilihTab(lang) {
      aktif = lang;
      daftarLang.forEach(function (l) {
        var on = l === lang;
        tabBtn[l].setAttribute('aria-selected', on ? 'true' : 'false');
        panes[l].hidden = !on;
      });
      var b = tabBtn[lang];
      if (b.offsetLeft + b.offsetWidth > tabsEl.scrollLeft + tabsEl.clientWidth || b.offsetLeft < tabsEl.scrollLeft) tabsEl.scrollLeft = b.offsetLeft - 8;
      setTimeout(function () { editor[lang].refresh(); }, 10);
    }
    if (daftarLang.length < 2) tabsEl.classList.add('tunggal');

    /* Preview */
    var preview = document.createElement('div');
    preview.className = 'pg-preview';
    preview.innerHTML = '<div class="pg-preview-bar"><span class="pg-preview-title">Preview</span><span class="pg-url">index.html</span></div><div class="pg-frame-wrap"><div class="pg-kosong">Tekan <b>Jalankan</b> untuk menampilkan halaman.</div></div>';
    host.appendChild(preview);
    var frameWrap = preview.querySelector('.pg-frame-wrap');
    frameWrap.style.height = (opsi.tinggi || 240) + 'px';
    var btnMuat = document.createElement('button');
    btnMuat.type = 'button';
    btnMuat.className = 'pg-muat';
    btnMuat.title = 'Muat ulang halaman (seperti refresh browser)';
    btnMuat.innerHTML = IKON_MUAT + '<span>Refresh</span>';
    btnMuat.addEventListener('click', function () { api.jalankan(); });
    preview.querySelector('.pg-preview-bar').appendChild(btnMuat);

    var tampilStorage = !!opsi.storagePanel;
    var storagePanelEl = null, storageBodyEl = null, storageCountEl = null;
    function renderStorage(data) {
      if (!storagePanelEl) return;
      var keys = Object.keys(data || {});
      storageCountEl.textContent = keys.length ? keys.length + ' key' : 'kosong';
      storageBodyEl.innerHTML = '';
      if (!keys.length) {
        var kosongEl = document.createElement('div');
        kosongEl.className = 'pg-storage-empty';
        kosongEl.textContent = '(kosong — belum ada data di localStorage)';
        storageBodyEl.appendChild(kosongEl);
        return;
      }
      var tabel = document.createElement('table');
      tabel.className = 'pg-storage-table';
      var thead = document.createElement('thead');
      thead.innerHTML = '<tr><th scope="col">Key</th><th scope="col">Value (string)</th></tr>';
      tabel.appendChild(thead);
      var tbody = document.createElement('tbody');
      keys.forEach(function (k) {
        var tr = document.createElement('tr');
        var tdK = document.createElement('td');
        var tdV = document.createElement('td');
        tdK.textContent = k;
        tdV.textContent = data[k];
        tr.appendChild(tdK);
        tr.appendChild(tdV);
        tbody.appendChild(tr);
      });
      tabel.appendChild(tbody);
      storageBodyEl.appendChild(tabel);
    }
    if (tampilStorage) {
      storagePanelEl = document.createElement('div');
      storagePanelEl.className = 'pg-storage';
      storagePanelEl.innerHTML =
        '<div class="pg-storage-bar">' +
        '<span class="pg-storage-title">Local Storage <span class="pg-storage-count"></span></span>' +
        '<button type="button" class="pg-storage-clear" title="Hapus semua data localStorage pada contoh ini">Hapus Storage</button>' +
        '</div>' +
        '<div class="pg-storage-body" aria-live="polite"></div>';
      host.appendChild(storagePanelEl);
      storageCountEl = storagePanelEl.querySelector('.pg-storage-count');
      storageBodyEl = storagePanelEl.querySelector('.pg-storage-body');
      storagePanelEl.querySelector('.pg-storage-clear').addEventListener('click', function () {
        if (window.DomRunner && window.DomRunner.hapusStorage) window.DomRunner.hapusStorage(simpanId);
        renderStorage({});
        api.jalankan('localStorage dikosongkan.');
      });
      renderStorage(window.DomRunner && window.DomRunner.bacaStorage ? window.DomRunner.bacaStorage(simpanId) : {});
    }

    var konsol = E.buatConsole(host, { kosong: 'Belum ada output di Console. Halaman sudah tampil di Preview — coba klik/ketik di sana.' });

    /* Tombol */
    if (edit.length) {
      tombol(E.IKON.reset + '<span class="ed-label">Reset</span>', '', 'Kembalikan kode awal', function () {
        edit.forEach(function (l) { if (editor[l]) editor[l].setValue(awal[l]); });
        if (opsi.simpanKe && window.Progress) window.Progress.draft(opsi.simpanKe, null);
        api.jalankan();
      });
    }
    tombol(E.IKON.salin + '<span class="ed-label">Salin</span>', '', 'Salin kode file yang sedang dibuka', function () {
      var teks = editor[aktif].getValue();
      var ok = function () { window.App && App.toast(NAMA_FILE[aktif] + ' disalin!'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teks).then(ok, ok);
      else ok();
    });
    (opsi.tombolEkstra || []).forEach(function (t) { tombol(t.html || esc(t.label), t.kelas, t.judul, t.onClick); });
    var tombolRun = tombol(E.IKON.run + '<span class="ed-label">Jalankan</span> <span class="kbd-hint">' + (E.MAC ? '⌘' : 'Ctrl') + '↵</span>', 'ed-btn--run', 'Jalankan (' + (E.MAC ? 'Cmd' : 'Ctrl') + '+Enter)', function () { api.jalankan(); });

    var runAktif = null;
    var urut = 0;
    api.getValue = function () { return editor.js ? editor.js.getValue() : ''; };
    api.setValue = function (v) { if (editor.js) editor.js.setValue(v); };
    api.getFiles = function () {
      return { html: editor.html ? editor.html.getValue() : awal.html, css: editor.css ? editor.css.getValue() : awal.css, js: api.getValue() };
    };
    api.getInput = function () { return opsi.input || ''; };
    api.refresh = function () { daftarLang.forEach(function (l) { editor[l].refresh(); }); };
    api.console = konsol;
    api.host = host;
    api.tools = tools;
    api.tombol = tombol;
    api.jalankan = function (catatan) {
      var ke = ++urut;
      if (runAktif && runAktif.hentikan) runAktif.hentikan();
      runAktif = null;
      var kosong = frameWrap.querySelector('.pg-kosong');
      if (kosong) kosong.remove();
      frameWrap.querySelectorAll('iframe').forEach(function (f) { f.remove(); });
      tombolRun.disabled = true;
      var f = api.getFiles();
      return window.DomRunner.run(f.js, {
        html: f.html,
        css: f.css,
        input: opsi.input || '',
        wadah: frameWrap,
        simpanId: simpanId,
        timeout: 4000,
        onLog: function (level, teks) { if (ke === urut) konsol.pesan(level, teks); },
        onError: function (e) { if (ke === urut) konsol.error(e); },
        onClear: function () { if (ke === urut) konsol.tampilkan({ logs: [], ms: 0 }); },
        onStorage: function (d) { if (ke === urut) renderStorage(d); },
        onReload: function () {
          if (ke !== urut) return;
          setTimeout(function () { api.jalankan('Halaman dimuat ulang karena form dikirim tanpa e.preventDefault().'); }, 900);
        }
      }).then(function (hasil) {
        if (ke !== urut) { if (hasil.hentikan) hasil.hentikan(); return hasil; }
        runAktif = hasil;
        tombolRun.disabled = false;
        if (catatan) hasil.logs.unshift({ level: 'meta', text: catatan });
        konsol.tampilkan(hasil);
        host.dispatchEvent(new CustomEvent('editor:run', { bubbles: true, detail: hasil }));
        return hasil;
      });
    };

    pilihTab(aktif);
    E.semua.push(api);

    /* Jalankan otomatis saat pertama kali terlihat */
    if (opsi.autorun !== false) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) {
          if (en.some(function (x) { return x.isIntersecting; })) { io.disconnect(); api.jalankan(); }
        }, { rootMargin: '200px' });
        io.observe(host);
      } else {
        api.jalankan();
      }
    }
    return api;
  }

  /** Inisialisasi dari markup */
  function dariMarkup(el) {
    if (el.__pg) return el.__pg;
    var E = window.Editor;
    var presetNama = el.getAttribute('data-preset');
    var dasar = presetNama ? window.DomRunner.preset(presetNama) : { html: '', css: '' };
    var file = { html: dasar.html, css: dasar.css, js: '' };
    el.querySelectorAll('textarea[data-lang]').forEach(function (ta) {
      file[ta.getAttribute('data-lang')] = E.dedent(ta.value);
      ta.remove();
    });
    var editAttr = el.getAttribute('data-edit');
    var edit = editAttr ? editAttr.split(/[\s,]+/).filter(Boolean) : (presetNama ? ['js'] : ['html', 'css', 'js']);
    var pg = create(el, {
      html: file.html,
      css: file.css,
      js: file.js,
      edit: edit,
      aktif: el.getAttribute('data-aktif') || '',
      tinggi: parseInt(el.getAttribute('data-tinggi'), 10) || 0,
      label: el.getAttribute('data-label') || '',
      simpanId: el.getAttribute('data-id') || '',
      storagePanel: el.hasAttribute('data-storage') || presetNama === 'storage',
      autorun: !el.hasAttribute('data-manual')
    });
    el.__pg = pg;
    return pg;
  }

  function init(ruang) {
    (ruang || document).querySelectorAll('[data-playground]').forEach(dariMarkup);
  }

  window.Playground = { create: create, init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
