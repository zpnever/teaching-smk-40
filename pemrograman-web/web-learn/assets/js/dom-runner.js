/* ═══════════════════════════════════════════
   DOM RUNNER — menjalankan HTML + CSS + JS siswa di iframe sandbox
   - bentuk hasil sama dengan JSRunner.run → bisa dipakai Checker.periksa
   - console.log ditangkap & diformat (elemen, NodeList, event, ...)
   - loop tak berujung dihentikan (loop guard)
   - helper tes: __klik, __ketik, __ubah, __tekan, __kirim, __hover, ...
   Pemakaian:
     DomRunner.run(js, { html, css, input, harness, wadah?, onLog?, onError?, simpanId? })
   Tanpa `wadah` → iframe tersembunyi, dihapus setelah selesai (mode periksa).
   Dengan `wadah` → iframe tampil di wadah dan tetap hidup (mode playground).
   ═══════════════════════════════════════════ */
(function (root) {
  'use strict';

  var BATAS_PERIKSA = 6000;
  var BATAS_LOOP = 1500;
  var RUNS = {};
  var nomor = 0;

  /* ── Kode yang dijalankan PERTAMA di dalam iframe ─────────────
     Ditulis sebagai function biasa lalu di-toString(), jadi tidak
     boleh memakai variabel dari luar function ini. */
  function PRELUDE(CFG) {
    var TOKEN = CFG.token;
    var induk = window.parent;
    var tangkap = null;
    var errBaru = null;
    var jumlah = 0;
    function kirim(pesan) { pesan.__coret = TOKEN; try { induk.postMessage(pesan, '*'); } catch (e) { /* abaikan */ } }

    /* Formatter mirip console Chrome */
    function namaPendek(el) {
      if (!el || el.nodeType !== 1) return el && el.nodeName ? el.nodeName.toLowerCase() : String(el);
      var s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      if (typeof el.className === 'string' && el.className.trim()) s += '.' + el.className.trim().split(/\s+/).join('.');
      return s;
    }
    function tagBuka(el) {
      var s = '<' + el.tagName.toLowerCase();
      for (var i = 0; i < el.attributes.length; i++) {
        var a = el.attributes[i];
        s += ' ' + a.name + (a.value === '' ? '' : '="' + a.value + '"');
      }
      return s + '>';
    }
    function fmtElemen(el) {
      var html = el.outerHTML;
      if (html.length <= 160) return html;
      var tutup = '</' + el.tagName.toLowerCase() + '>';
      return tagBuka(el) + '…' + (/^(input|img|br|hr|meta|link)$/i.test(el.tagName) ? '' : tutup);
    }
    function adalahNode(v) { return v && typeof v === 'object' && typeof v.nodeType === 'number' && typeof v.nodeName === 'string'; }
    function fmt(v, d, atas) {
      var t = typeof v;
      if (t === 'string') return atas ? v : "'" + v + "'";
      if (t === 'number') return Object.is(v, -0) ? '-0' : String(v);
      if (t === 'bigint') return v + 'n';
      if (v === null || t === 'undefined' || t === 'boolean') return String(v);
      if (t === 'symbol') return v.toString();
      if (t === 'function') {
        if (!atas) return 'ƒ ' + (v.name || 'anonymous') + '()';
        var src = Function.prototype.toString.call(v);
        return /^(async\s+)?function/.test(src) ? 'ƒ ' + src.replace(/^(async\s+)?function\s*/, '$1') : src;
      }
      if (v === window) return 'Window';
      if (v === document) return '#document';
      if (adalahNode(v)) {
        if (v.nodeType === 1) return atas ? fmtElemen(v) : namaPendek(v);
        if (v.nodeType === 3) return '"' + v.textContent + '"';
        return v.nodeName;
      }
      if (v instanceof Error) return v.name + ': ' + v.message;
      var nama = v.constructor && v.constructor.name;
      if (nama === 'NodeList' || nama === 'HTMLCollection' || nama === 'RadioNodeList') {
        if (d > 1) return nama + '(' + v.length + ')';
        var isi = Array.prototype.map.call(v, function (x) { return fmt(x, d + 1, false); });
        return nama + '(' + v.length + ') [' + isi.join(', ') + ']';
      }
      if (nama === 'DOMTokenList') {
        return 'DOMTokenList(' + v.length + ') [' + Array.prototype.map.call(v, function (x) { return "'" + x + "'"; }).join(', ') + ']';
      }
      if (typeof Event !== 'undefined' && v instanceof Event) {
        var bagian = ["type: '" + v.type + "'"];
        if (v.key !== undefined) bagian.push("key: '" + v.key + "'");
        bagian.push('target: ' + (v.target ? (adalahNode(v.target) ? namaPendek(v.target) : fmt(v.target, 3, false)) : 'null'));
        return nama + ' {' + bagian.join(', ') + ', …}';
      }
      if (d > 2) return Array.isArray(v) ? '[Array]' : '{…}';
      if (Array.isArray(v)) return '[' + v.map(function (x) { return fmt(x, d + 1, false); }).join(', ') + ']';
      var proto = Object.getPrototypeOf(v);
      var biasa = proto === Object.prototype || proto === null;
      if (!biasa && nama !== 'DOMStringMap') return (nama || 'Object') + ' {…}';
      var k = Object.keys(v);
      return (biasa ? '' : nama + ' ') + '{' + k.map(function (n) { return n + ': ' + fmt(v[n], d + 1, false); }).join(', ') + '}';
    }
    window.__fmt = fmt;

    function catat(level, args) {
      var teks = Array.prototype.map.call(args, function (a) { return fmt(a, 0, true); }).join(' ');
      if (tangkap) tangkap.push(teks);
      jumlah++;
      if (jumlah > 2000) { if (jumlah === 2001) kirim({ t: 'log', level: 'meta', text: 'Output dipotong: lebih dari 2000 baris.' }); return; }
      kirim({ t: 'log', level: level, text: teks });
    }
    var konsol = {
      log: function () { catat('log', arguments); },
      info: function () { catat('info', arguments); },
      debug: function () { catat('log', arguments); },
      dir: function () { catat('log', arguments); },
      table: function () { catat('log', arguments); },
      warn: function () { catat('warn', arguments); },
      error: function () { catat('error', arguments); },
      group: function () { catat('log', arguments); },
      groupEnd: function () {},
      clear: function () { kirim({ t: 'clear' }); }
    };
    try { Object.defineProperty(window, 'console', { value: konsol, writable: true, configurable: true }); } catch (e) { window.console = konsol; }
    window.alert = function (m) { catat('info', ['[alert] ' + (m === undefined ? '' : m)]); };
    window.confirm = function (m) { catat('info', ['[confirm] ' + (m === undefined ? '' : m) + '  → dianggap OK (true)']); return true; };
    window.prompt = function () { catat('warn', ['prompt() tidak tersedia di editor ini. Pakai <input> dan .value, ya.']); return null; };

    /* Error → induk (nomor baris dihitung induk) */
    function laporError(e, baris) {
      var info = { name: (e && e.name) || 'Error', message: (e && e.message) || String(e), baris: baris || null };
      if (info.message === '__LOOP__') info.loop = true;
      errBaru = errBaru || info;
      kirim({ t: 'error', error: info });
    }
    window.addEventListener('error', function (ev) {
      ev.preventDefault();
      var e = ev.error;
      if (!e) {
        var m = /^(?:Uncaught\s+)?(\w*Error):\s*([\s\S]*)$/.exec(ev.message || '');
        e = m ? { name: m[1], message: m[2] } : { name: 'Error', message: ev.message };
      }
      laporError(e, ev.lineno);
    });
    window.addEventListener('unhandledrejection', function (ev) { ev.preventDefault(); laporError(ev.reason, null); });

    /* Loop guard: dipanggil di awal setiap putaran loop siswa */
    var awalLoop = 0;
    window.__lg = function () {
      var t = Date.now();
      if (!awalLoop) {
        awalLoop = t;
        Promise.resolve().then(function () { awalLoop = 0; });
      } else if (t - awalLoop > CFG.batasLoop) {
        awalLoop = 0;
        throw new RangeError('__LOOP__');
      }
    };

    /* localStorage & sessionStorage tiruan (origin sandbox tidak punya storage) */
    var data = Object.assign({}, CFG.storage || {});
    var sessionData = {};
    function simpanStorage() { kirim({ t: 'storage', data: Object.assign({}, data) }); }
    function buatStorage(store, lapor) {
      var s = {
        getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
        setItem: function (k, v) { store[String(k)] = String(v); if (lapor) simpanStorage(); },
        removeItem: function (k) { delete store[String(k)]; if (lapor) simpanStorage(); },
        clear: function () { Object.keys(store).forEach(function (k) { delete store[k]; }); if (lapor) simpanStorage(); },
        key: function (i) { var ks = Object.keys(store); return i >= 0 && i < ks.length ? ks[i] : null; }
      };
      Object.defineProperty(s, 'length', { get: function () { return Object.keys(store).length; } });
      return s;
    }
    var storage = buatStorage(data, true);
    var session = buatStorage(sessionData, false);
    [['localStorage', storage], ['sessionStorage', session]].forEach(function (p) {
      try { Object.defineProperty(window, p[0], { value: p[1], configurable: true }); } catch (e) { /* abaikan */ }
    });

    /* Tautan & form: jangan pindah halaman */
    window.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if (!a || ev.defaultPrevented) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') return;
      ev.preventDefault();
      catat('info', ['[tautan] Menuju ' + a.href + ' — di editor ini halaman tidak pindah; di browser asli tautan ini akan dibuka.']);
      kirim({ t: 'nav', href: a.href });
    });
    window.__formTerkirim = 0;
    window.addEventListener('submit', function (ev) {
      if (ev.defaultPrevented) return;
      ev.preventDefault();
      window.__formTerkirim++;
      catat('warn', ['Form terkirim tanpa e.preventDefault() → di browser asli halaman akan dimuat ulang (refresh) dan semua perubahan hilang!']);
      kirim({ t: 'reload' });
    });

    /* ── Helper untuk pemeriksa tes ── */
    function el(sel) {
      if (sel && typeof sel === 'object') return sel;
      var e = document.querySelector(sel);
      if (!e) throw new Error('Elemen ' + sel + ' tidak ditemukan di halaman.');
      return e;
    }
    function picu(target, jenis, opsi) {
      var ev;
      opsi = Object.assign({ bubbles: true, cancelable: true }, opsi || {});
      if (/^key/.test(jenis)) ev = new KeyboardEvent(jenis, opsi);
      else if (/^(mouse|dblclick|contextmenu)/.test(jenis)) ev = new MouseEvent(jenis, opsi);
      else if (/^(focus|blur)/.test(jenis)) ev = new FocusEvent(jenis, opsi);
      else ev = new Event(jenis, opsi);
      target.dispatchEvent(ev);
      return ev;
    }
    window.__el = el;
    window.__klik = function (sel, n) { var e = el(sel); for (var i = 0; i < (n || 1); i++) e.click(); };
    window.__dobel = function (sel) { var e = el(sel); e.click(); e.click(); picu(e, 'dblclick', { detail: 2 }); };
    window.__ketik = function (sel, teks) {
      var e = el(sel);
      picu(e, 'focus', { bubbles: false }); picu(e, 'focusin');
      e.value = teks;
      picu(e, 'input');
    };
    window.__ubah = function (sel, nilai) {
      var e = el(sel);
      if (e.type === 'checkbox' || e.type === 'radio') e.checked = !!nilai; else e.value = nilai;
      picu(e, 'input');
      picu(e, 'change');
    };
    window.__tekan = function (sel, key) {
      var e = el(sel);
      picu(e, 'keydown', { key: key, code: key.length === 1 ? 'Key' + key.toUpperCase() : key });
      picu(e, 'keyup', { key: key, code: key.length === 1 ? 'Key' + key.toUpperCase() : key });
    };
    window.__kirim = function (sel) {
      var f = el(sel);
      if (f.tagName !== 'FORM') f = f.closest('form') || f;
      var sebelum = window.__formTerkirim;
      var ev = picu(f, 'submit');
      return { dicegah: window.__formTerkirim === sebelum, prevented: ev.defaultPrevented };
    };
    window.__hover = function (sel) { var e = el(sel); picu(e, 'mouseenter', { bubbles: false }); picu(e, 'mouseover'); };
    window.__keluar = function (sel) { var e = el(sel); picu(e, 'mouseleave', { bubbles: false }); picu(e, 'mouseout'); };
    window.__fokus = function (sel) { var e = el(sel); picu(e, 'focus', { bubbles: false }); picu(e, 'focusin'); };
    window.__blur = function (sel) { var e = el(sel); picu(e, 'blur', { bubbles: false }); picu(e, 'focusout'); };
    window.__teks = function (sel) { var e = document.querySelector(sel); return e ? e.textContent.trim() : null; };
    window.__semua = function (sel) { return Array.prototype.map.call(document.querySelectorAll(sel), function (e) { return e.textContent.trim(); }); };
    window.__ada = function (sel) { return !!document.querySelector(sel); };
    window.__hitung = function (sel) { return document.querySelectorAll(sel).length; };
    window.__kelas = function (sel) { var e = document.querySelector(sel); return e ? Array.prototype.slice.call(e.classList) : null; };
    window.__tampil = function (sel) { var e = document.querySelector(sel); return !!e && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden'; };
    window.__tunggu = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

    /* ── Antrean pemeriksaan ── */
    var antre = [];
    function aman(v) {
      var t = typeof v;
      if (t === 'function' || t === 'symbol' || adalahNode(v) || (v && t === 'object' && v.constructor && /^(NodeList|HTMLCollection|DOMTokenList)$/.test(v.constructor.name))) return { __teks: fmt(v, 0, true) };
      if (v !== null && t === 'object') { try { return JSON.parse(JSON.stringify(v)); } catch (e) { return { __teks: fmt(v, 0, true) }; } }
      if (t === 'number' && !isFinite(v)) return { __teks: String(v) };
      return v;
    }
    window.__cek = function (i, fn) { antre.push([i, fn]); };
    window.__mulai = function () {
      function jalan() {
        var k = 0;
        function lanjut() {
          if (k >= antre.length) { kirim({ t: 'done', storage: Object.assign({}, data) }); return; }
          var item = antre[k++];
          tangkap = [];
          errBaru = null;
          function selesai(r) {
            r.t = 'cek'; r.i = item[0]; r.logs = tangkap; tangkap = null;
            kirim(r);
            setTimeout(lanjut, 0);
          }
          var v;
          try { v = item[1](); } catch (e) { selesai({ ok: false, error: { name: e && e.name, message: e && e.message } }); return; }
          Promise.resolve(v).then(function (nilai) {
            setTimeout(function () {
              if (errBaru) selesai({ ok: false, error: { name: errBaru.name, message: errBaru.loop ? 'Perulangan tidak berhenti (infinite loop).' : errBaru.message }, saatEvent: true });
              else selesai({ ok: true, tipe: typeof nilai, value: aman(nilai) });
            }, 0);
          }, function (e) { selesai({ ok: false, error: { name: e && e.name, message: e && e.message } }); });
        }
        setTimeout(lanjut, 0);
      }
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', jalan);
      else jalan();
    };
  }

  /* ── Loop guard: sisipkan __lg(); di awal badan for/while/do ── */
  function lewatiString(src, i) {
    var q = src[i], j = i + 1;
    while (j < src.length) {
      var c = src[j];
      if (c === '\\') { j += 2; continue; }
      if (q === '`' && c === '$' && src[j + 1] === '{') {
        var dalam = 1; j += 2;
        while (j < src.length && dalam) {
          if (src[j] === '{') dalam++;
          else if (src[j] === '}') dalam--;
          else if (src[j] === '"' || src[j] === "'" || src[j] === '`') { j = lewatiString(src, j); continue; }
          j++;
        }
        continue;
      }
      if (c === q) return j + 1;
      if (c === '\n' && q !== '`') return j;
      j++;
    }
    return j;
  }
  function lewatiSpasi(src, j) {
    while (j < src.length) {
      if (/\s/.test(src[j])) { j++; continue; }
      if (src[j] === '/' && src[j + 1] === '/') { var n = src.indexOf('\n', j); j = n < 0 ? src.length : n; continue; }
      if (src[j] === '/' && src[j + 1] === '*') { var m = src.indexOf('*/', j + 2); j = m < 0 ? src.length : m + 2; continue; }
      break;
    }
    return j;
  }
  function kurungTutup(src, j) {
    var dalam = 0;
    while (j < src.length) {
      var c = src[j];
      if (c === '"' || c === "'" || c === '`') { j = lewatiString(src, j); continue; }
      if (c === '(') dalam++;
      else if (c === ')') { dalam--; if (!dalam) return j; }
      j++;
    }
    return -1;
  }
  function lindungiLoop(src) {
    var out = '', i = 0, n = src.length;
    while (i < n) {
      var c = src[i];
      if (c === '/' && src[i + 1] === '/') { var a = src.indexOf('\n', i); a = a < 0 ? n : a; out += src.slice(i, a); i = a; continue; }
      if (c === '/' && src[i + 1] === '*') { var b = src.indexOf('*/', i + 2); b = b < 0 ? n : b + 2; out += src.slice(i, b); i = b; continue; }
      if (c === '"' || c === "'" || c === '`') { var s = lewatiString(src, i); out += src.slice(i, s); i = s; continue; }
      if (/[A-Za-z_$]/.test(c)) {
        var m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 40));
        var w = m[0];
        var sebelum = i > 0 ? src[i - 1] : '';
        if (sebelum !== '.' && (w === 'for' || w === 'while' || w === 'do')) {
          var j = i + w.length;
          if (w !== 'do') {
            j = lewatiSpasi(src, j);
            if (src[j] === '(') {
              var tutup = kurungTutup(src, j);
              if (tutup > 0) {
                var k = lewatiSpasi(src, tutup + 1);
                if (src[k] === '{') {
                  out += src.slice(i, k + 1) + '__lg();';
                  i = k + 1;
                  continue;
                }
              }
            }
          } else {
            var k2 = lewatiSpasi(src, j);
            if (src[k2] === '{') { out += src.slice(i, k2 + 1) + '__lg();'; i = k2 + 1; continue; }
          }
        }
        out += w; i += w.length; continue;
      }
      out += c; i++;
    }
    return out;
  }

  /* ── Susun dokumen srcdoc ── */
  var POLA_CSS = /<link\b[^>]*href=["']?(?:\.\/)?style\.css["']?[^>]*>/i;
  var POLA_JS = /<script\b[^>]*src=["']?(?:\.\/)?script\.js["']?[^>]*>\s*<\/script>/i;

  function hitungBaris(s) { return s ? s.split('\n').length : 0; }
  function amankanJSON(o) { return JSON.stringify(o).replace(/</g, '\\u003c'); }

  function susun(js, opsi, cfg) {
    var doc = opsi.html || '';
    if (!/<body[\s>]/i.test(doc)) doc = '<!DOCTYPE html>\n<html lang="id">\n<head>\n<meta charset="UTF-8">\n</head>\n<body>\n' + doc + '\n</body>\n</html>';
    var css = opsi.css || '';
    var gaya = '<style>\n' + css + '\n</style>';
    if (POLA_CSS.test(doc)) doc = doc.replace(POLA_CSS, function () { return gaya; });
    else if (css) doc = /<\/head>/i.test(doc) ? doc.replace(/<\/head>/i, function () { return gaya + '\n</head>'; }) : gaya + doc;

    var prelude = '<script>(' + PRELUDE.toString() + ')(' + amankanJSON(cfg) + ');</script>';
    if (/<head(\s[^>]*)?>/i.test(doc)) doc = doc.replace(/<head(\s[^>]*)?>/i, function (m) { return m + prelude; });
    else doc = prelude + doc;

    var KODE = '\u0000KODE\u0000';
    var blokInput = opsi.input ? '<script>\n' + opsi.input + '\n</script>' : '';
    var blokKode = blokInput + '<script>\n' + KODE + '\n</script>';
    if (POLA_JS.test(doc)) doc = doc.replace(POLA_JS, function () { return blokKode; });
    else if (js) doc = doc.replace(/<\/body>/i, function () { return blokKode + '\n</body>'; });

    var harness = '<script>\n' + (opsi.harness || '') + '\n;__mulai();</script>';
    if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>(?![\s\S]*<\/body>)/i, function () { return harness + '\n</body>'; });
    else doc += harness;

    var posisi = doc.indexOf(KODE);
    var offset = posisi < 0 ? -1 : hitungBaris(doc.slice(0, posisi)) - 1;
    doc = posisi < 0 ? doc : doc.slice(0, posisi) + lindungiLoop(js || '') + doc.slice(posisi + KODE.length);
    return { text: doc, offset: offset, kodeBaris: hitungBaris(js) };
  }

  /* ── Penyimpanan localStorage tiruan per playground ── */
  function bacaStorage(id) {
    if (!id) return {};
    try { return JSON.parse(localStorage.getItem('coretjs.sandbox.' + id)) || {}; } catch (e) { return {}; }
  }
  function tulisStorage(id, data) {
    if (!id) return;
    try {
      if (data && Object.keys(data).length) localStorage.setItem('coretjs.sandbox.' + id, JSON.stringify(data));
      else localStorage.removeItem('coretjs.sandbox.' + id);
    } catch (e) { /* storage tidak tersedia */ }
  }

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d !== 'object' || !d.__coret) return;
    var r = RUNS[d.__coret];
    if (!r || !r.frame || e.source !== r.frame.contentWindow) return;
    r.terima(d);
  });

  function buatError(info, src) {
    var baris = null;
    if (info.baris && src.offset >= 0) {
      var b = info.baris - src.offset;
      if (b >= 1 && b <= src.kodeBaris) baris = b;
    }
    var J = root.JSRunner;
    return { name: info.name, message: info.message, line: baris, hint: J ? J.terjemahkan(info.name, info.message) : '' };
  }

  /**
   * Jalankan kode di iframe.
   * @returns Promise<{logs, cek, error, timeout, ms, selesai, frame?, hentikan()}>
   */
  function run(js, opsi) {
    opsi = opsi || {};
    var token = 'r' + (++nomor) + '_' + Math.random().toString(36).slice(2);
    var hidup = !!opsi.wadah;
    var cfg = { token: token, batasLoop: BATAS_LOOP, storage: opsi.storage || bacaStorage(opsi.simpanId) };
    var src = susun(js, opsi, cfg);

    var storageSnapshot = Object.assign({}, cfg.storage || {});
    if (opsi.onStorage) opsi.onStorage(Object.assign({}, storageSnapshot));

    return new Promise(function (resolve) {
      var hasil = { logs: [], cek: [], error: null, timeout: false, ms: 0, selesai: false, storage: Object.assign({}, storageSnapshot) };
      var t0 = Date.now();
      var beres = false, timer;
      var frame = document.createElement('iframe');
      frame.setAttribute('sandbox', 'allow-scripts allow-forms');
      frame.setAttribute('title', opsi.judul || 'Preview halaman');
      frame.className = 'pg-frame';
      if (!hidup) {
        frame.setAttribute('aria-hidden', 'true');
        frame.tabIndex = -1;
        frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:800px;height:600px;border:0;opacity:0;pointer-events:none';
      }

      function hentikan() {
        delete RUNS[token];
        if (frame.parentNode) frame.parentNode.removeChild(frame);
      }
      function selesai() {
        if (beres) return;
        beres = true;
        clearTimeout(timer);
        hasil.ms = Date.now() - t0;
        hasil.storage = Object.assign({}, storageSnapshot);
        hasil.frame = hidup ? frame : null;
        hasil.hentikan = hentikan;
        if (opsi.onStorage) opsi.onStorage(Object.assign({}, storageSnapshot));
        if (!hidup) hentikan();
        resolve(hasil);
      }

      RUNS[token] = {
        frame: frame,
        terima: function (m) {
          if (m.t === 'log') {
            if (!beres) hasil.logs.push({ level: m.level, text: m.text });
            else if (opsi.onLog) opsi.onLog(m.level, m.text);
          } else if (m.t === 'clear') {
            if (!beres) hasil.logs.length = 0;
            else if (opsi.onClear) opsi.onClear();
          } else if (m.t === 'error') {
            var e = m.error.loop
              ? { name: 'RangeError', message: 'Perulangan berjalan lebih dari ' + (BATAS_LOOP / 1000) + ' detik dan dihentikan.', line: null, hint: 'Sepertinya ada infinite loop (perulangan tanpa akhir). Cek apakah kondisi loop bisa menjadi false, dan apakah variabel penghitungnya di-update.' }
              : buatError(m.error, src);
            if (!beres) {
              if (m.error.loop) hasil.timeout = true;
              else if (!hasil.error) hasil.error = e;
            } else if (opsi.onError) opsi.onError(e);
          } else if (m.t === 'cek') {
            hasil.cek.push(m);
          } else if (m.t === 'storage') {
            storageSnapshot = Object.assign({}, m.data || {});
            tulisStorage(opsi.simpanId, storageSnapshot);
            if (opsi.onStorage) opsi.onStorage(Object.assign({}, storageSnapshot));
          } else if (m.t === 'reload') {
            if (opsi.onReload) opsi.onReload();
          } else if (m.t === 'done') {
            if (m.storage) storageSnapshot = Object.assign({}, m.storage);
            hasil.selesai = true;
            selesai();
          }
        }
      };

      timer = setTimeout(function () { hasil.timeout = true; selesai(); }, opsi.timeout || BATAS_PERIKSA);
      frame.srcdoc = src.text;
      (opsi.wadah || document.body).appendChild(frame);
    });
  }

  /* ── Preset halaman (HTML/CSS bersama) ── */
  function preset(nama) {
    var semua = root.HALAMAN_DOM || {};
    var p = semua[nama || 'dasar'] || semua.dasar || { html: '', css: '' };
    return { html: p.html || '', css: p.css || '' };
  }

  root.DomRunner = {
    run: run,
    preset: preset,
    bacaStorage: bacaStorage,
    tulisStorage: tulisStorage,
    hapusStorage: function (id) { tulisStorage(id, {}); },
    lindungiLoop: lindungiLoop,
    susun: susun,
    BATAS_LOOP: BATAS_LOOP
  };
})(window);
