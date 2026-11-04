/* ═══════════════════════════════════════════
   EDITOR — CodeMirror 5 (fallback <textarea>) + console
   Pemakaian di HTML:
     <div class="editor" data-editor data-file="script.js">
       <textarea class="editor-src">console.log("Halo");</textarea>
     </div>
   Atribut opsional: data-mode="html" (tanpa tombol jalankan),
   data-norun, data-readonly, data-autorun
   Kartu tebak:
     <div class="tebak" data-tebak data-q="Pertanyaan?"><textarea>kode</textarea></div>
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var IKON = {
    run: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    salin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    mata: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
  };
  var MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  var adaCM = function () { return typeof window.CodeMirror === 'function'; };
  var semua = [];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  /** Rapikan kode dari <textarea>: buang baris kosong awal/akhir & indentasi bersama */
  function dedent(teks) {
    var baris = String(teks).replace(/\t/g, '  ').split('\n');
    while (baris.length && !baris[0].trim()) baris.shift();
    while (baris.length && !baris[baris.length - 1].trim()) baris.pop();
    var min = Infinity;
    baris.forEach(function (b) { if (b.trim()) min = Math.min(min, b.match(/^ */)[0].length); });
    if (!isFinite(min)) min = 0;
    return baris.map(function (b) { return b.slice(min); }).join('\n');
  }

  /** Sorot sintaks statis ke dalam elemen <pre> */
  function highlight(kode, pre, mode) {
    pre.classList.add('snippet', 'cm-s-kode');
    if (adaCM() && window.CodeMirror.runMode) {
      pre.textContent = '';
      window.CodeMirror.runMode(kode, mode === 'html' ? 'htmlmixed' : 'javascript', pre);
    } else {
      pre.textContent = kode;
    }
    return pre;
  }

  function buatCM(wadah, nilai, opsi) {
    if (adaCM()) {
      var cm = window.CodeMirror(wadah, {
        value: nilai,
        mode: opsi.mode === 'html' ? 'htmlmixed' : 'javascript',
        theme: 'kode',
        lineNumbers: opsi.lineNumbers !== false,
        tabSize: 2,
        indentUnit: 2,
        smartIndent: true,
        lineWrapping: !!opsi.wrap,
        readOnly: opsi.readOnly ? 'nocursor' : false,
        autoCloseBrackets: !opsi.readOnly,
        matchBrackets: !opsi.readOnly,
        viewportMargin: Infinity,
        placeholder: opsi.placeholder || '',
        extraKeys: {
          Tab: function (c) {
            if (c.somethingSelected()) c.indentSelection('add');
            else c.replaceSelection('  ', 'end');
          },
          'Shift-Tab': function (c) { c.indentSelection('subtract'); },
          'Ctrl-Enter': function () { opsi.onRun && opsi.onRun(); },
          'Cmd-Enter': function () { opsi.onRun && opsi.onRun(); }
        }
      });
      return {
        getValue: function () { return cm.getValue(); },
        setValue: function (v) { cm.setValue(v); },
        refresh: function () { cm.refresh(); },
        onChange: function (fn) { cm.on('change', function () { fn(cm.getValue()); }); },
        focus: function () { cm.focus(); },
        cm: cm
      };
    }
    // Fallback: textarea biasa
    var ta = document.createElement('textarea');
    ta.className = 'editor-fallback';
    ta.value = nilai;
    ta.spellcheck = false;
    ta.readOnly = !!opsi.readOnly;
    ta.rows = Math.max(3, nilai.split('\n').length + 1);
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var a = ta.selectionStart, b = ta.selectionEnd;
        ta.value = ta.value.slice(0, a) + '  ' + ta.value.slice(b);
        ta.selectionStart = ta.selectionEnd = a + 2;
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        opsi.onRun && opsi.onRun();
      }
    });
    wadah.appendChild(ta);
    return {
      getValue: function () { return ta.value; },
      setValue: function (v) { ta.value = v; },
      refresh: function () {},
      onChange: function (fn) { ta.addEventListener('input', function () { fn(ta.value); }); },
      focus: function () { ta.focus(); },
      ta: ta
    };
  }

  /* ── Console ─────────────────────────────── */
  function buatConsole(host, opsiK) {
    opsiK = opsiK || {};
    var el = document.createElement('div');
    el.className = 'editor-console';
    el.hidden = true;
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = '<div class="console-head"><span>Console</span><span class="console-time"></span><button type="button" title="Bersihkan console">bersihkan</button></div><div class="console-lines"></div>';
    host.appendChild(el);
    var lines = el.querySelector('.console-lines');
    var waktu = el.querySelector('.console-time');
    el.querySelector('button').addEventListener('click', function () { el.hidden = true; lines.innerHTML = ''; });

    function baris(level, teks) {
      var kosong = lines.querySelector('.console-empty');
      if (kosong) kosong.remove();
      var d = document.createElement('div');
      d.className = 'console-line ' + level;
      d.textContent = teks;
      lines.appendChild(d);
    }

    return {
      el: el,
      tampilkan: function (hasil) {
        el.hidden = false;
        lines.innerHTML = '';
        hasil.logs.forEach(function (l) { baris(l.level, l.text); });
        if (hasil.error) {
          var e = hasil.error;
          baris('error', 'Uncaught ' + e.name + ': ' + e.message + (e.line ? '   (baris ' + e.line + ')' : ''));
          if (e.hint) baris('hint', e.hint);
        }
        if (hasil.timeout) {
          baris('error', 'Program dihentikan setelah ' + (window.JSRunner.BATAS_WAKTU / 1000) + ' detik.');
          baris('hint', 'Sepertinya ada infinite loop (perulangan tanpa akhir). Cek apakah kondisi loop bisa menjadi false, dan apakah variabel penghitungnya di-update.');
        }
        if (!hasil.logs.length && !hasil.error && !hasil.timeout) {
          var k = document.createElement('div');
          k.className = 'console-empty';
          k.textContent = opsiK.kosong || 'Kode berjalan tanpa output. Tampilkan sesuatu dengan console.log().';
          lines.appendChild(k);
        }
        waktu.textContent = hasil.timeout ? 'dihentikan' : 'selesai · ' + hasil.ms + ' ms';
        lines.scrollTop = lines.scrollHeight;
      },
      pesan: function (level, teks) {
        el.hidden = false;
        baris(level, teks);
        lines.scrollTop = lines.scrollHeight;
      },
      error: function (e) {
        el.hidden = false;
        baris('error', 'Uncaught ' + e.name + ': ' + e.message + (e.line ? '   (baris ' + e.line + ')' : ''));
        if (e.hint) baris('hint', e.hint);
        lines.scrollTop = lines.scrollHeight;
      },
      bersihkan: function () { lines.innerHTML = ''; el.hidden = true; }
    };
  }

  /**
   * Buat editor lengkap.
   * opsi: { value, mode, file, readOnly, run (bool), input (string kode data), inputPilihan: [{label, kode}],
   *         placeholder, simpanKe (kunci draft), tombolEkstra: [{label, kelas, onClick}] }
   */
  function create(host, opsi) {
    opsi = opsi || {};
    host.classList.add('editor');
    if (opsi.readOnly) host.classList.add('readonly');
    var awal = opsi.value || '';
    var draft = opsi.simpanKe && window.Progress ? Progress.draft(opsi.simpanKe) : undefined;
    var bisaJalan = opsi.run !== false && opsi.mode !== 'html';
    var api = {};

    var bar = document.createElement('div');
    bar.className = 'editor-bar';
    bar.innerHTML = '<span class="editor-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="editor-file">' + (opsi.file ? '<b>' + esc(opsi.file) + '</b>' : '') + (opsi.label ? ' · ' + esc(opsi.label) : '') + '</span>' +
      '<span class="editor-tools"></span>';
    host.appendChild(bar);
    var tools = bar.querySelector('.editor-tools');

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

    // Panel Data Input (read-only)
    var inputEd = null, inputKode = opsi.input || '';
    if (inputKode) {
      var panel = document.createElement('div');
      panel.className = 'editor-input';
      var label = document.createElement('div');
      label.className = 'editor-input-label';
      label.innerHTML = '<span>Data input (sudah disediakan)</span>';
      panel.appendChild(label);
      if (opsi.inputPilihan && opsi.inputPilihan.length > 1) {
        var sel = document.createElement('select');
        sel.setAttribute('aria-label', 'Pilih data uji');
        opsi.inputPilihan.forEach(function (p, i) {
          var o = document.createElement('option');
          o.value = i;
          o.textContent = p.label;
          sel.appendChild(o);
        });
        sel.addEventListener('change', function () {
          inputKode = opsi.inputPilihan[sel.value].kode;
          inputEd.setValue(inputKode);
        });
        label.appendChild(sel);
      }
      var wadahInput = document.createElement('div');
      panel.appendChild(wadahInput);
      host.appendChild(panel);
      inputEd = buatCM(wadahInput, inputKode, { readOnly: true, lineNumbers: false });
    }

    var wadah = document.createElement('div');
    wadah.className = 'editor-code';
    host.appendChild(wadah);
    var ed = buatCM(wadah, draft !== undefined ? draft : awal, {
      mode: opsi.mode,
      readOnly: opsi.readOnly,
      placeholder: opsi.placeholder,
      onRun: function () { api.jalankan(); }
    });
    var konsol = buatConsole(host);

    if (opsi.simpanKe && window.Progress) {
      var t;
      ed.onChange(function (v) {
        clearTimeout(t);
        t = setTimeout(function () { Progress.draft(opsi.simpanKe, v === awal ? null : v); }, 400);
      });
    }

    if (!opsi.readOnly) {
      tombol(IKON.reset + '<span class="ed-label">Reset</span>', '', 'Kembalikan kode awal', function () {
        ed.setValue(awal);
        konsol.bersihkan();
        if (opsi.simpanKe && window.Progress) Progress.draft(opsi.simpanKe, null);
      });
    }
    tombol(IKON.salin + '<span class="ed-label">Salin</span>', '', 'Salin kode', function () {
      var teks = ed.getValue();
      var ok = function () { window.App && App.toast('Kode disalin!'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teks).then(ok, ok);
      else ok();
    });
    (opsi.tombolEkstra || []).forEach(function (t) {
      tombol(t.html || esc(t.label), t.kelas, t.judul, t.onClick);
    });
    var tombolRun = null;
    if (bisaJalan) {
      tombolRun = tombol(IKON.run + '<span class="ed-label">Jalankan</span> <span class="kbd-hint">' + (MAC ? '⌘' : 'Ctrl') + '↵</span>', 'ed-btn--run', 'Jalankan kode (' + (MAC ? 'Cmd' : 'Ctrl') + '+Enter)', function () { api.jalankan(); });
    }

    api.getValue = function () { return ed.getValue(); };
    api.setValue = function (v) { ed.setValue(v); };
    api.getInput = function () { return inputKode; };
    api.refresh = function () { ed.refresh(); inputEd && inputEd.refresh(); };
    api.console = konsol;
    api.host = host;
    api.tools = tools;
    api.tombol = tombol;
    api.jalankan = function () {
      if (!bisaJalan) return Promise.resolve(null);
      if (tombolRun) tombolRun.disabled = true;
      return window.JSRunner.run(ed.getValue(), { input: inputKode }).then(function (hasil) {
        if (tombolRun) tombolRun.disabled = false;
        konsol.tampilkan(hasil);
        host.dispatchEvent(new CustomEvent('editor:run', { bubbles: true, detail: hasil }));
        return hasil;
      });
    };

    semua.push(api);
    if (opsi.autorun) api.jalankan();
    return api;
  }

  /** Inisialisasi dari markup <div data-editor><textarea class="editor-src"> */
  function dariMarkup(el) {
    if (el.__editor) return el.__editor;
    var src = el.querySelector('textarea');
    var kode = src ? dedent(src.value) : '';
    if (src) src.remove();
    var ed = create(el, {
      value: kode,
      mode: el.getAttribute('data-mode') || 'js',
      file: el.getAttribute('data-file') || (el.getAttribute('data-mode') === 'html' ? 'index.html' : 'script.js'),
      label: el.getAttribute('data-label') || '',
      readOnly: el.hasAttribute('data-readonly'),
      run: !el.hasAttribute('data-norun'),
      autorun: el.hasAttribute('data-autorun')
    });
    el.__editor = ed;
    return ed;
  }

  /* ── Kartu "Tebak Dulu!" ────────────────── */
  function normal(s) {
    return String(s || '').replace(/\r/g, '').split('\n').map(function (b) { return b.trim(); })
      .filter(function (b) { return b; }).join('\n').replace(/^["'`]|["'`]$/g, '');
  }

  function tebak(el) {
    if (el.__tebak) return;
    el.__tebak = true;
    var src = el.querySelector('textarea');
    var kode = src ? dedent(src.value) : '';
    if (src) src.remove();
    var tanya = el.getAttribute('data-q') || 'Apa output kode di bawah ini? Tebak dulu sebelum dijalankan!';
    el.classList.add('block', 'tebak');
    el.innerHTML = '<div class="block-head"><span class="block-kind">' + IKON.mata + ' Tebak Dulu!</span><h3>' + esc(el.getAttribute('data-judul') || 'Quick Test') + '</h3></div>' +
      '<div class="block-body"><p class="content-text">' + tanya + '</p></div>';
    var body = el.querySelector('.block-body');
    var pre = document.createElement('pre');
    highlight(kode, pre);
    body.appendChild(pre);
    var ta = document.createElement('textarea');
    ta.className = 'tebak-input';
    ta.placeholder = 'Tulis tebakan output-mu di sini (boleh beberapa baris)…';
    ta.rows = 2;
    body.appendChild(ta);
    var aksi = document.createElement('div');
    aksi.className = 'block-actions';
    aksi.innerHTML = '<button type="button" class="btn btn--sm">' + IKON.run + ' Cek Jawaban</button>';
    body.appendChild(aksi);
    var hasilEl = document.createElement('div');
    body.appendChild(hasilEl);

    var preset = el.getAttribute('data-dom');
    var banding = el.getAttribute('data-banding'); // selector: bandingkan tebakan dengan teks yang TAMPIL di elemen ini
    function jalankanTebak() {
      if (preset !== null && window.DomRunner) {
        var hal = window.DomRunner.preset(preset);
        var harness = banding ? '__cek(0, function () { var e = document.querySelector(' + JSON.stringify(banding) + '); return e ? e.innerText : null; });' : '';
        return window.DomRunner.run(kode, { html: hal.html, css: hal.css, harness: harness });
      }
      return window.JSRunner.run(kode);
    }

    aksi.querySelector('button').addEventListener('click', function () {
      var b = this;
      b.disabled = true;
      jalankanTebak().then(function (hasil) {
        b.disabled = false;
        hasilEl.innerHTML = '';
        var tebakan = ta.value.trim();
        var keluaran = hasil.logs.map(function (l) { return l.text; }).join('\n');
        if (banding && hasil.cek && hasil.cek[0] && hasil.cek[0].ok) keluaran = String(hasil.cek[0].value);
        if (hasil.error) keluaran += (keluaran ? '\n' : '') + 'Uncaught ' + hasil.error.name + ': ' + hasil.error.message;
        if (tebakan) {
          var benar = normal(tebakan) === normal(keluaran);
          var v = document.createElement('div');
          v.className = 'cek-ringkas ' + (benar ? 'lulus' : 'gagal');
          v.innerHTML = window.Illus ? Illus.maskot(benar ? 'bangga' : 'mikir') : '';
          v.appendChild(document.createTextNode(benar ? 'Tebakanmu tepat! Keren.' : 'Belum tepat. Bandingkan dengan output asli di bawah, lalu cari tahu kenapa.'));
          hasilEl.appendChild(v);
        }
        var box = document.createElement('div');
        box.className = 'editor';
        box.style.marginBottom = '0';
        hasilEl.appendChild(box);
        if (preset !== null && window.Playground) {
          var hal2 = window.DomRunner.preset(preset);
          window.Playground.create(box, { html: hal2.html, css: hal2.css, js: kode, label: 'hasil asli — lihat Preview, silakan ubah & jalankan lagi', autorun: true });
          return;
        }
        var ed = create(box, { value: kode, file: 'coba-ubah.js', label: 'output asli di bawah — silakan ubah & jalankan lagi' });
        ed.console.tampilkan(hasil);
      });
    });
  }

  function init(ruang) {
    (ruang || document).querySelectorAll('[data-editor]').forEach(dariMarkup);
    (ruang || document).querySelectorAll('[data-tebak]').forEach(tebak);
  }

  window.Editor = { create: create, init: init, highlight: highlight, dedent: dedent, esc: esc, IKON: IKON, semua: semua, buatCM: buatCM, buatConsole: buatConsole, MAC: MAC, tebak: tebak };

  function mulai() {
    init();
    // Segarkan ukuran editor saat step/tab dibuka dan setelah font selesai dimuat
    document.addEventListener('step:open', function (e) {
      setTimeout(function () {
        semua.forEach(function (ed) { if (e.target.contains(ed.host)) ed.refresh(); });
      }, 30);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { semua.forEach(function (ed) { ed.refresh(); }); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mulai);
  else mulai();
})();
