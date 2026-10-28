/* ═══════════════════════════════════════════
   RUNNER — menjalankan kode siswa di Web Worker
   - console.log ditangkap & diformat mirip console Chrome
   - loop tak berujung dihentikan setelah batas waktu
   - pesan error diterjemahkan ke bahasa Indonesia
   File ini juga dimuat oleh skrip verifikasi Node (tanpa DOM).
   ═══════════════════════════════════════════ */
(function (root) {
  'use strict';

  var BATAS_WAKTU = 2000; // ms untuk bagian sinkron
  var BATAS_TIMER = 5000; // ms tambahan bila ada setTimeout

  // Kode yang dijalankan sebelum kode siswa (di dalam worker).
  // Semua nama diawali "__" supaya tidak bentrok dengan variabel siswa.
  var PRELUDE = [
    'var __BATAS = 2000, __jml = 0, __tangkap = null, __pending = 0, __selesaiSync = false;',
    'function __fnSrc(f){var s=Function.prototype.toString.call(f);return /^(async\\s+)?function/.test(s)?"ƒ "+s.replace(/^(async\\s+)?function\\s*/,"$1"):s;}',
    'function __fmt(v,d,atas){var t=typeof v;if(t==="string")return atas?v:"\'"+v+"\'";if(t==="number")return Object.is(v,-0)?"-0":String(v);if(t==="bigint")return v+"n";if(v===null||t==="undefined"||t==="boolean")return String(v);if(t==="symbol")return v.toString();if(t==="function")return atas?__fnSrc(v):"ƒ "+(v.name||"anonymous")+"()";if(v instanceof Error)return v.name+": "+v.message;if(d>2)return Array.isArray(v)?"[Array]":"{…}";if(Array.isArray(v))return "["+v.map(function(x){return __fmt(x,d+1,false);}).join(", ")+"]";var k=Object.keys(v);return "{"+k.map(function(n){return n+": "+__fmt(v[n],d+1,false);}).join(", ")+"}";}',
    'function __kirim(level,args){var teks=Array.prototype.map.call(args,function(a){return __fmt(a,0,true);}).join(" ");if(__tangkap){__tangkap.push(teks);return;}__jml++;if(__jml>__BATAS){if(__jml===__BATAS+1)self.postMessage({t:"log",level:"meta",text:"Output dipotong: lebih dari "+__BATAS+" baris."});return;}self.postMessage({t:"log",level:level,text:teks});}',
    'var __console={log:function(){__kirim("log",arguments);},info:function(){__kirim("info",arguments);},debug:function(){__kirim("log",arguments);},warn:function(){__kirim("warn",arguments);},error:function(){__kirim("error",arguments);},table:function(){__kirim("log",arguments);},group:function(){__kirim("log",arguments);},groupEnd:function(){},clear:function(){self.postMessage({t:"clear"});}};',
    'try{Object.defineProperty(self,"console",{value:__console,writable:true,configurable:true});}catch(e){self.console=__console;}',
    'self.alert=function(m){__kirim("info",["[alert] "+(m===undefined?"":m)]);};',
    'self.prompt=function(){__kirim("warn",["prompt() tidak tersedia di editor ini. Pakai variabel biasa, ya."]);return null;};',
    'function __selesai(){if(__selesaiSync&&__pending===0)self.postMessage({t:"done"});}',
    'var __st=self.setTimeout,__ct=self.clearTimeout,__id={};',
    'self.setTimeout=function(fn,ms){var a=Array.prototype.slice.call(arguments,2);__pending++;var id=__st(function(){if(!__id[id])return;delete __id[id];__pending--;if(typeof fn==="function")fn.apply(null,a);__selesai();},ms);__id[id]=1;return id;};',
    'self.clearTimeout=function(id){if(__id[id]){delete __id[id];__pending--;}__ct(id);__selesai();};',
    'function __aman(v){var t=typeof v;if(t==="function"||t==="symbol")return {__teks:__fmt(v,0,true)};if(v!==null&&t==="object"){try{return JSON.parse(JSON.stringify(v));}catch(e){return {__teks:__fmt(v,0,true)};}}return v;}',
    'self.__cek=function(i,fn){__tangkap=[];var r;try{var v=fn();r={t:"cek",i:i,ok:true,tipe:typeof v,value:__aman(v),logs:__tangkap};}catch(e){r={t:"cek",i:i,ok:false,error:{name:e&&e.name,message:e&&e.message},logs:__tangkap};}__tangkap=null;self.postMessage(r);};'
  ].join('\n');

  var PRELUDE_BARIS = PRELUDE.split('\n').length;

  function hitungBaris(teks) {
    return teks ? teks.split('\n').length : 0;
  }

  /**
   * Susun sumber lengkap untuk worker.
   * @param {string} kode   kode siswa
   * @param {object} opsi   { input: string (deklarasi data), harness: string (kode cek) }
   */
  function buildSource(kode, opsi) {
    opsi = opsi || {};
    var input = opsi.input || '';
    var bagian = [PRELUDE];
    if (input) bagian.push(input);
    var offset = PRELUDE_BARIS + hitungBaris(input);
    bagian.push(kode);
    bagian.push(';' + (opsi.harness || ''));
    bagian.push('self.postMessage({t:"sync"});__selesaiSync=true;__selesai();');
    return {
      text: bagian.join('\n'),
      offset: offset,
      inputOffset: PRELUDE_BARIS,
      inputBaris: hitungBaris(input),
      kodeBaris: hitungBaris(kode)
    };
  }

  /* ── Terjemahan error ─────────────────────── */
  var POLA_ERROR = [
    [/^(\S+) is not defined$/, function (m) {
      if (m[1] === 'document' || m[1] === 'window') return '"' + m[1] + '" tidak tersedia di editor latihan ini (tidak ada halaman HTML). Coba kode DOM di file index.html kamu sendiri.';
      return 'Variabel/function "' + m[1] + '" belum dibuat, atau salah ketik. Ingat: JavaScript membedakan huruf besar & kecil (nama ≠ Nama).';
    }],
    [/^Assignment to constant variable/, function () {
      return 'Nilai variabel const tidak boleh diubah. Kalau nilainya memang perlu berubah, buat dengan let.';
    }],
    [/^Cannot access '(.+)' before initialization/, function (m) {
      return 'Variabel "' + m[1] + '" dipakai sebelum dibuat. Pindahkan baris deklarasinya (let/const) ke atas.';
    }],
    [/^Identifier '(.+)' has already been declared/, function (m) {
      return 'Variabel "' + m[1] + '" sudah pernah dibuat (atau sudah disediakan di Data Input). Hapus let/const yang kedua; untuk mengubah nilainya cukup tulis ' + m[1] + ' = nilaiBaru;';
    }],
    [/^(.+) is not a function/, function (m) {
      return '"' + m[1] + '" bukan function, jadi tidak bisa dipanggil dengan tanda kurung (). Cek ejaan nama function-nya.';
    }],
    [/^Missing initializer in const declaration/, function () {
      return 'Variabel const wajib langsung diberi nilai saat dibuat, contoh: const PI = 3.14;';
    }],
    [/^missing \) after argument list/, function () {
      return 'Ada yang kurang di dalam tanda kurung (): mungkin tanda ) belum ditutup, atau lupa koma/+ di antara nilai.';
    }],
    [/^Unexpected end of input/, function () {
      return 'Kode berakhir tiba-tiba. Biasanya ada kurung kurawal } atau kurung ) yang belum ditutup.';
    }],
    [/^Invalid or unexpected token/, function () {
      return 'Ada karakter yang tidak dikenali. Cek tanda kutip yang belum ditutup, kutip miring “ ” (pakai " biasa), atau nama variabel yang diawali angka.';
    }],
    [/^Unexpected identifier(?: '(.+)')?/, function (m) {
      return 'Ada kata' + (m[1] ? ' "' + m[1] + '"' : '') + ' di tempat yang tidak terduga. Mungkin kurang koma, operator +, titik koma, atau nama variabel memakai spasi.';
    }],
    [/^Unexpected token '(if|else|for|while|let|const|function|return|switch|case|break|continue|do|new|class|var|typeof|true|false|null)'/, function (m) {
      return '"' + m[1] + '" adalah kata kunci JavaScript, tidak boleh dipakai sebagai nama variabel, dan harus ditulis di posisi yang benar.';
    }],
    [/^Unexpected token '(.+)'/, function (m) {
      return 'Tanda "' + m[1] + '" muncul di tempat yang salah. Cek pasangan kurung ( ), kurawal { }, dan tanda kutip.';
    }],
    [/^Unexpected number/, function () {
      return 'Ada angka di posisi yang tidak terduga. Ingat: nama variabel tidak boleh diawali angka, dan antar nilai perlu operator.';
    }],
    [/^Unexpected string/, function () {
      return 'Ada teks (string) di posisi yang tidak terduga. Mungkin lupa tanda + atau koma di antara teks dan variabel.';
    }],
    [/^Unexpected template string/, function () {
      return 'Template literal (backtick) di posisi yang tidak terduga. Mungkin lupa tanda + atau koma sebelumnya.';
    }],
    [/^Invalid left-hand side in assignment/, function () {
      return 'Sisi kiri tanda = harus berupa variabel. Kalau maksudnya membandingkan, gunakan === (bukan =).';
    }],
    [/^Illegal return statement/, function () {
      return 'return hanya boleh dipakai di dalam function.';
    }],
    [/^Illegal (break|continue) statement/, function (m) {
      return m[1] + ' hanya boleh dipakai di dalam perulangan (for/while/do...while)' + (m[1] === 'break' ? ' atau switch.' : '.');
    }],
    [/^Cannot read properties of (undefined|null)/, function (m) {
      return 'Mencoba membaca isi dari nilai ' + m[1] + '. Pastikan variabelnya sudah diberi nilai.';
    }],
    [/^Maximum call stack size exceeded/, function () {
      return 'Function memanggil dirinya sendiri tanpa henti. Pastikan ada kondisi berhenti.';
    }],
    [/^Unexpected strict mode reserved word|^Unexpected reserved word/, function () {
      return 'Ada kata kunci JavaScript yang dipakai sebagai nama. Ganti dengan nama lain.';
    }],
    [/^Invalid regular expression/, function () {
      return 'Tanda / dibaca sebagai awal pola teks. Cek operator pembagian atau komentar (//) kamu.';
    }]
  ];

  function terjemahkan(nama, pesan) {
    for (var i = 0; i < POLA_ERROR.length; i++) {
      var m = POLA_ERROR[i][0].exec(pesan || '');
      if (m) return POLA_ERROR[i][1](m);
    }
    if (nama === 'SyntaxError') return 'Ada kesalahan penulisan (sintaks). Cek ejaan kata kunci, pasangan kurung, dan tanda kutip.';
    return '';
  }

  /** Buat objek error dari pesan mentah + nomor baris sumber worker. */
  function buatError(pesanMentah, barisSumber, src) {
    var teks = String(pesanMentah || 'Error').replace(/^Uncaught\s+/, '');
    var m = /^(\w*Error):\s*([\s\S]*)$/.exec(teks);
    var nama = m ? m[1] : 'Error';
    var pesan = m ? m[2] : teks;
    var baris = null;
    if (barisSumber && src) {
      var b = barisSumber - src.offset;
      if (b >= 1 && b <= src.kodeBaris) baris = b;
    }
    return { name: nama, message: pesan, line: baris, hint: terjemahkan(nama, pesan) };
  }

  /** Olah kumpulan pesan worker menjadi hasil akhir. */
  function hasilKosong() {
    return { logs: [], cek: [], error: null, timeout: false, ms: 0, selesai: false };
  }

  function terimaPesan(hasil, m) {
    if (!m) return;
    if (m.t === 'log') hasil.logs.push({ level: m.level, text: m.text });
    else if (m.t === 'cek') hasil.cek.push(m);
    else if (m.t === 'clear') hasil.logs.length = 0;
  }

  /**
   * Jalankan kode di Web Worker.
   * @returns Promise<{logs, cek, error, timeout, ms}>
   */
  function run(kode, opsi) {
    opsi = opsi || {};
    return new Promise(function (resolve) {
      var src = buildSource(kode, opsi);
      var hasil = hasilKosong();
      var t0 = Date.now();
      var url, worker, timer, beres = false;

      function selesai() {
        if (beres) return;
        beres = true;
        clearTimeout(timer);
        try { worker && worker.terminate(); } catch (e) { /* abaikan */ }
        try { url && URL.revokeObjectURL(url); } catch (e) { /* abaikan */ }
        hasil.ms = Date.now() - t0;
        resolve(hasil);
      }
      function waktuHabis() {
        hasil.timeout = true;
        selesai();
      }

      try {
        url = URL.createObjectURL(new Blob([src.text], { type: 'text/javascript' }));
        worker = new Worker(url);
      } catch (e) {
        hasil.error = { name: 'Error', message: 'Browser ini tidak bisa menjalankan kode (Web Worker diblokir).', line: null, hint: 'Coba buka website ini lewat Chrome/Edge/Firefox terbaru.' };
        selesai();
        return;
      }

      timer = setTimeout(waktuHabis, opsi.timeout || BATAS_WAKTU);
      worker.onmessage = function (e) {
        var m = e.data;
        if (m && m.t === 'sync') {
          clearTimeout(timer);
          timer = setTimeout(waktuHabis, BATAS_TIMER);
          return;
        }
        if (m && m.t === 'done') { hasil.selesai = true; selesai(); return; }
        terimaPesan(hasil, m);
      };
      worker.onerror = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        hasil.error = buatError(ev && ev.message, ev && ev.lineno, src);
        selesai();
      };
    });
  }

  root.JSRunner = {
    run: run,
    buildSource: buildSource,
    buatError: buatError,
    terjemahkan: terjemahkan,
    hasilKosong: hasilKosong,
    terimaPesan: terimaPesan,
    PRELUDE: PRELUDE,
    BATAS_WAKTU: BATAS_WAKTU
  };
})(typeof window !== 'undefined' ? window : globalThis);
