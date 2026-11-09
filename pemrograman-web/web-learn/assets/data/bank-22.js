/* Bank soal Pertemuan 22 — Event */
(function () {
'use strict';
window.BANK = window.BANK || {};
window.HALAMAN_DOM = window.HALAMAN_DOM || {};

function dokumen(judul, isi) {
  return '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + judul + '</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n' + isi + '\n\n  <script src="script.js"></script>\n</body>\n</html>';
}

/* ── Halaman pertemuan 22 (sama dengan starter pertemuan-22-event) ── */
window.HALAMAN_DOM.event = {
  html: dokumen('Belajar Event', [
    '  <h1 id="judul">Belajar Event</h1>',
    '',
    '  <section>',
    '    <button id="tombol1">Tombol 1</button>',
    '    <button id="tombol2">Tombol 2</button>',
    '    <button id="tombol3">Tombol 3</button>',
    '  </section>',
    '',
    '  <section>',
    '    <div id="kotak" class="kotak">Arahkan kursor atau klik aku</div>',
    '  </section>',
    '',
    '  <section>',
    '    <p>Nama: <input id="nama" type="text" placeholder="Ketik namamu..."></p>',
    '    <p id="hasil">Halo, siapa namamu?</p>',
    '    <p>Jumlah karakter: <span id="jumlahKarakter">0</span></p>',
    '  </section>',
    '',
    '  <section>',
    '    <p>',
    '      Warna favorit:',
    '      <select id="pilihWarna">',
    '        <option value="">-- pilih --</option>',
    '        <option value="tomato">Merah</option>',
    '        <option value="seagreen">Hijau</option>',
    '        <option value="royalblue">Biru</option>',
    '      </select>',
    '    </p>',
    '    <label><input type="checkbox" id="setuju"> Saya setuju dengan syarat dan ketentuan</label>',
    '    <form id="formDaftar" novalidate>',
    '      <input id="email" type="email" placeholder="Email kamu">',
    '      <button id="btnDaftar" type="submit">Daftar</button>',
    '    </form>',
    '    <p id="pesanForm"></p>',
    '  </section>',
    '',
    '  <section>',
    '    <input id="angka1" type="number" placeholder="Angka 1">',
    '    <select id="pilihOperator">',
    '      <option value="+">+</option>',
    '      <option value="-">-</option>',
    '      <option value="*">×</option>',
    '      <option value="/">÷</option>',
    '    </select>',
    '    <input id="angka2" type="number" placeholder="Angka 2">',
    '    <button id="btnHitung">Hitung</button>',
    '    <p id="hasilHitung"></p>',
    '  </section>',
    '',
    '  <section>',
    '    <input id="inputTugas" type="text" placeholder="Tulis tugas...">',
    '    <button id="btnTugas">Tambah</button>',
    '    <ul id="daftarTugas"></ul>',
    '  </section>'
  ].join('\n')),
  css: [
    'body {',
    '  font-family: Arial, sans-serif;',
    '  padding: 20px;',
    '}',
    '',
    'section {',
    '  margin-bottom: 16px;',
    '  padding: 12px;',
    '  border: 1px solid #ddd;',
    '  border-radius: 8px;',
    '}',
    '',
    'button {',
    '  padding: 8px 14px;',
    '  cursor: pointer;',
    '}',
    '',
    'input,',
    'select {',
    '  padding: 6px;',
    '}',
    '',
    '.kotak {',
    '  padding: 30px;',
    '  background-color: #4A90E2;',
    '  color: white;',
    '  text-align: center;',
    '  border-radius: 8px;',
    '  transition: all 0.3s ease;',
    '}',
    '',
    '.aktif {',
    '  background-color: #2ecc71;',
    '}',
    '',
    '.besar {',
    '  font-size: 28px;',
    '  padding: 50px 30px;',
    '}'
  ].join('\n')
};

/* ── Halaman studi kasus (dipindah dari pertemuan 21) ── */
window.HALAMAN_DOM.form = {
  html: dokumen('Form Pendaftaran', [
    '  <h1>Daftar Ekskul Coding</h1>',
    '  <form id="formDaftar">',
    '    <label>Nama <input id="nama" type="text" placeholder="Nama lengkap"></label>',
    '    <label>Umur <input id="umur" type="number" placeholder="Umur"></label>',
    '    <label>Kelas',
    '      <select id="kelas">',
    '        <option value="X RPL">X RPL</option>',
    '        <option value="XI RPL" selected>XI RPL</option>',
    '        <option value="XII RPL">XII RPL</option>',
    '      </select>',
    '    </label>',
    '    <button type="submit">Daftar</button>',
    '  </form>',
    '  <p id="pesan"></p>'
  ].join('\n')),
  css: [
    'body { font-family: Arial, sans-serif; padding: 20px; }',
    'form { display: grid; gap: 10px; max-width: 280px; }',
    'label { display: grid; gap: 4px; font-size: 14px; }',
    'input, select, button { padding: 8px; font-size: 15px; border-radius: 6px; border: 1px solid #999; }',
    'button { background: #4A90E2; color: white; border: none; cursor: pointer; }',
    '#pesan { margin-top: 14px; padding: 10px; border-radius: 6px; }',
    '#pesan:empty { display: none; }',
    '.error { background: #fde2e1; color: #b3261e; }',
    '.sukses { background: #dff5e6; color: #1e7a3c; }'
  ].join('\n')
};
window.HALAMAN_DOM.todo = {
  html: dokumen('Daftar Tugas', [
    '  <h1>Daftar Tugas</h1>',
    '  <input id="inputTugas" type="text" placeholder="Tulis tugas, lalu Enter...">',
    '  <button id="btnTambah">Tambah</button>',
    '  <ul id="daftarTugas"></ul>',
    '  <p>Jumlah tugas: <b id="jumlahTugas">0</b></p>'
  ].join('\n')),
  css: [
    'body { font-family: Arial, sans-serif; padding: 20px; }',
    'input { padding: 8px; font-size: 15px; width: 220px; }',
    'button { padding: 8px 12px; font-size: 14px; cursor: pointer; }',
    'li { margin: 6px 0; cursor: pointer; }',
    'li.selesai { text-decoration: line-through; color: #999; }',
    'li .hapus { margin-left: 8px; padding: 2px 8px; font-size: 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; }'
  ].join('\n')
};

/* Pemeriksa singkat */
var KOTAK = 'document.querySelector("#kotak")';
var AKTIF = KOTAK + '.classList.contains("aktif")';
var BESAR = KOTAK + '.classList.contains("besar")';
var DISABLED = 'document.querySelector("#btnDaftar").disabled';
function cocok(pola, pesan) {
  return function (ctx) { return typeof ctx.hasil === 'string' && pola.test(ctx.hasil) ? true : (pesan || 'Belum sesuai') + ' Di halaman: "' + ctx.hasil + '".'; };
}
function adaLog(teks, pesan) {
  return function (ctx) { return (ctx.hasilLogs || []).indexOf(teks) !== -1 ? true : (pesan || 'Console belum menampilkan "' + teks + '".'); };
}

window.BANK['22'] = {
  judul: 'Event',

  latihan: {
    /* ── Praktik dari slide ── */
    p1: {
      id: 'p1', mode: 'dom', preset: 'event',
      judul: 'Praktik 1 — Event siap!',
      soal: '<p class="content-text">Halaman <code>index.html</code> dan <code>style.css</code> sudah disediakan (lihat tab-nya). Di <code>script.js</code> tulis <code>console.log("Event siap!");</code> dan pastikan muncul di Console. Lihat juga tab <strong>Preview</strong>: halamannya sudah tampil.</p>',
      starter: '',
      solusi: 'console.log("Event siap!");',
      petunjuk: ['Cukup satu baris: <code>console.log("Event siap!");</code>'],
      tes: [{ nama: 'Console menampilkan "Event siap!"', output: ['Event siap!'] }]
    },
    p2: {
      id: 'p2', mode: 'dom', preset: 'event',
      judul: 'Praktik 2 — Klik pertama',
      soal: '<p class="content-text">Pasang event <code>click</code> pada <code>#tombol1</code> yang mengubah teks <code>#judul</code> menjadi <code>Tombol 1 diklik!</code>, persis seperti contoh pertama. Klik tombolnya di Preview beberapa kali dan amati.</p>',
      starter: 'const tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\n',
      solusi: 'const tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\ntombol1.addEventListener("click", () => {\n  judul.textContent = "Tombol 1 diklik!";\n});',
      petunjuk: ['Pola: <code>tombol1.addEventListener("click", () =&gt; { ... });</code>', 'Ubah teks di <strong>dalam</strong> function, bukan di luarnya.'],
      tes: [
        { nama: 'Sebelum diklik → judul masih "Belajar Event"', pesan: 'Perubahan judul harus ditulis di DALAM function handler.', panggil: '__teks("#judul")', hasil: 'Belajar Event' },
        { nama: 'Setelah diklik → "Tombol 1 diklik!"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Tombol 1 diklik!' }
      ]
    },
    p3: {
      id: 'p3', mode: 'dom', preset: 'event',
      judul: 'Praktik 3 — Function bernama & penghitung klik',
      soal: '<ol class="task-list"><li>Ubah handler Praktik 2 menjadi <strong>function bernama</strong> <code>tampilkanPesan</code> (cara ke-2).</li>' +
        '<li>Sengaja tambahkan tanda kurung: <code>tampilkanPesan()</code>, lalu jalankan. Apa yang terjadi saat halaman dibuka? Apa yang terjadi saat tombol diklik? Tulis jawabanmu di komentar.</li>' +
        '<li>Perbaiki lagi hingga benar.</li>' +
        '<li>Tambahkan penghitung klik pada teks <code>#tombol2</code> (<code>Diklik N kali</code>) memakai variabel <code>hitung</code> di <strong>luar</strong> handler.</li></ol>',
      starter: 'const tombol1 = document.querySelector("#tombol1");\nconst tombol2 = document.querySelector("#tombol2");\nconst judul = document.querySelector("#judul");\n\n',
      solusi: 'const tombol1 = document.querySelector("#tombol1");\nconst tombol2 = document.querySelector("#tombol2");\nconst judul = document.querySelector("#judul");\n\n// tampilkanPesan() dengan kurung: judul langsung berubah saat halaman dibuka, klik tidak berefek.\nfunction tampilkanPesan() {\n  judul.textContent = "Tombol 1 diklik!";\n}\n\ntombol1.addEventListener("click", tampilkanPesan);\n\nlet hitung = 0;\ntombol2.addEventListener("click", () => {\n  hitung++;\n  tombol2.textContent = `Diklik ${hitung} kali`;\n});',
      petunjuk: ['<code>tombol1.addEventListener("click", tampilkanPesan);</code> — tanpa <code>()</code>.', '<code>let hitung = 0;</code> ditulis <strong>sebelum</strong> <code>addEventListener</code>, bukan di dalam handler.'],
      syarat: [{ nama: 'Memasang tampilkanPesan tanpa tanda kurung', pola: /addEventListener\s*\(\s*["'`]click["'`]\s*,\s*tampilkanPesan\s*\)/ }],
      tes: [
        { nama: 'Sebelum diklik → judul belum berubah', pesan: 'Jika judul sudah berubah, kamu masih menulis tampilkanPesan() dengan kurung.', panggil: '__teks("#judul")', hasil: 'Belajar Event' },
        { nama: 'Klik #tombol1 → "Tombol 1 diklik!"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Tombol 1 diklik!' },
        { nama: '3 klik #tombol2 → "Diklik 3 kali"', pesan: 'Variabel hitung harus dibuat di LUAR handler.', panggil: '(__klik("#tombol2", 3), __teks("#tombol2"))', hasil: 'Diklik 3 kali' }
      ]
    },
    p4: {
      id: 'p4', mode: 'dom', preset: 'event',
      judul: 'Praktik 4 — Kotak merespons kursor',
      soal: '<p class="content-text">Ketik contoh kotak: <code>mouseover</code> → tambah class <code>aktif</code>, <code>mouseout</code> → hapus class <code>aktif</code>, <code>dblclick</code> → <em>toggle</em> class <code>besar</code>. Arahkan kursor masuk dan keluar dari kotak di Preview, lalu klik dua kali. Tulis di komentar: apa yang terjadi jika <code>dblclick</code> diganti <code>click</code>?</p>',
      starter: 'const kotak = document.querySelector("#kotak");\n\n',
      solusi: 'const kotak = document.querySelector("#kotak");\n\nkotak.addEventListener("mouseover", () => {\n  kotak.classList.add("aktif");\n});\n\nkotak.addEventListener("mouseout", () => {\n  kotak.classList.remove("aktif");\n});\n\nkotak.addEventListener("dblclick", () => {\n  kotak.classList.toggle("besar");\n});\n\n// Jika diganti "click", kotak berubah ukuran pada SATU kali klik.',
      petunjuk: ['Tiga listener pada elemen yang sama: <code>"mouseover"</code>, <code>"mouseout"</code>, <code>"dblclick"</code>.'],
      tes: [
        { nama: 'Kursor masuk → aktif', panggil: '(__hover("#kotak"), ' + AKTIF + ')', hasil: true },
        { nama: 'Kursor keluar → tidak aktif', panggil: '(__hover("#kotak"), __keluar("#kotak"), ' + AKTIF + ')', hasil: false },
        { nama: 'Klik dua kali → besar', panggil: '(__dobel("#kotak"), ' + BESAR + ')', hasil: true }
      ]
    },
    p5: {
      id: 'p5', mode: 'dom', preset: 'event',
      judul: 'Praktik 5 — Event object',
      soal: '<ol class="task-list"><li>Tampilkan <code>event.type</code> dan <code>event.target</code> di Console saat <code>#tombol1</code> diklik.</li>' +
        '<li>Buat function <code>tampilkanTombol(e)</code> yang mengubah <code>#judul</code> menjadi <code>Kamu menekan: [teks tombol]</code> (pakai <code>e.target.textContent</code>), lalu pasang ke <strong>ketiga</strong> tombol. Klik satu per satu di Preview.</li></ol>',
      starter: 'const tombol1 = document.querySelector("#tombol1");\nconst tombol2 = document.querySelector("#tombol2");\nconst tombol3 = document.querySelector("#tombol3");\nconst judul = document.querySelector("#judul");\n\n',
      solusi: 'const tombol1 = document.querySelector("#tombol1");\nconst tombol2 = document.querySelector("#tombol2");\nconst tombol3 = document.querySelector("#tombol3");\nconst judul = document.querySelector("#judul");\n\n// 1\ntombol1.addEventListener("click", (event) => {\n  console.log(event.type);\n  console.log(event.target);\n});\n\n// 2\nfunction tampilkanTombol(e) {\n  judul.textContent = `Kamu menekan: ${e.target.textContent}`;\n}\n\ntombol1.addEventListener("click", tampilkanTombol);\ntombol2.addEventListener("click", tampilkanTombol);\ntombol3.addEventListener("click", tampilkanTombol);',
      petunjuk: ['Handler menerima event object sebagai parameter: <code>(event) =&gt; { ... }</code>.', '<code>e.target</code> = tombol yang diklik, jadi teksnya <code>e.target.textContent</code>.'],
      syarat: [{ nama: 'Memakai .target', pola: /\w+\.target/ }],
      tes: [
        { nama: 'Klik #tombol1 → Console menampilkan "click"', panggil: '__klik("#tombol1")', cek: adaLog('click', 'Tampilkan event.type di Console saat #tombol1 diklik.') },
        { nama: 'Klik Tombol 2 → "Kamu menekan: Tombol 2"', panggil: '(__klik("#tombol2"), __teks("#judul"))', hasil: 'Kamu menekan: Tombol 2' },
        { nama: 'Klik Tombol 3 → "Kamu menekan: Tombol 3"', panggil: '(__klik("#tombol3"), __teks("#judul"))', hasil: 'Kamu menekan: Tombol 3' },
        { nama: 'Klik Tombol 1 → "Kamu menekan: Tombol 1"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Kamu menekan: Tombol 1' }
      ]
    },
    p6: {
      id: 'p6', mode: 'dom', preset: 'event',
      judul: 'Praktik 6 — Sapaan langsung (input)',
      soal: '<p class="content-text">Setiap kali <code>#nama</code> diketik (event <code>input</code>), tampilkan <code>Halo, [nama]!</code> di <code>#hasil</code>. Jika kolomnya <strong>kosong</strong>, <code>#hasil</code> kembali menampilkan <code>Halo, siapa namamu?</code> (gunakan <code>if/else</code>).</p>',
      starter: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  hasil.textContent = `Halo, ${nama.value}!`;\n});\n',
      solusi: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  if (nama.value === "") {\n    hasil.textContent = "Halo, siapa namamu?";\n  } else {\n    hasil.textContent = `Halo, ${nama.value}!`;\n  }\n});',
      petunjuk: ['Cek kosong: <code>if (nama.value === "")</code>.', 'Baca <code>nama.value</code> di <strong>dalam</strong> handler.'],
      tes: [
        { nama: 'Ketik "Sari" → "Halo, Sari!"', panggil: '(__ketik("#nama", "Sari"), __teks("#hasil"))', hasil: 'Halo, Sari!' },
        { nama: 'Dikosongkan → "Halo, siapa namamu?"', panggil: '(__ketik("#nama", "Eka"), __ketik("#nama", ""), __teks("#hasil"))', hasil: 'Halo, siapa namamu?' }
      ]
    },
    p7: {
      id: 'p7', mode: 'dom', preset: 'event',
      judul: 'Praktik 7 — Tombol keyboard (keydown)',
      soal: '<p class="content-text">Pasang <code>keydown</code> pada <code>#nama</code>:</p><ol class="task-list"><li>Saat <kbd>Enter</kbd> ditekan, tampilkan <code>Enter ditekan! Nama: [isi input]</code> di <code>#hasil</code>.</li><li>Tampilkan <strong>setiap tombol</strong> yang ditekan di Console dengan <code>console.log(e.key)</code>. Coba tekan huruf, angka, Escape, dan panah.</li></ol>',
      starter: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\n',
      solusi: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("keydown", (e) => {\n  console.log(e.key);\n\n  if (e.key === "Enter") {\n    hasil.textContent = `Enter ditekan! Nama: ${nama.value}`;\n  }\n});',
      petunjuk: ['Handler menerima <code>(e)</code>; nama tombolnya ada di <code>e.key</code>.'],
      tes: [
        { nama: 'Enter → pesan di #hasil', panggil: '(__ketik("#nama", "Budi"), __tekan("#nama", "Enter"), __teks("#hasil"))', hasil: 'Enter ditekan! Nama: Budi' },
        { nama: 'Huruf "a" → tidak mengubah #hasil', panggil: '(__ketik("#nama", "Budi"), __tekan("#nama", "a"), __teks("#hasil"))', hasil: 'Halo, siapa namamu?' },
        { nama: 'Setiap tombol tampil di Console', panggil: '(__tekan("#nama", "a"), __tekan("#nama", "ArrowUp"))', cek: function (ctx) { var l = ctx.hasilLogs || []; return l.indexOf('a') !== -1 && l.indexOf('ArrowUp') !== -1 ? true : 'Tulis console.log(e.key) di dalam handler keydown.'; } }
      ]
    },
    p8: {
      id: 'p8', mode: 'dom', preset: 'event',
      judul: 'Praktik 8 — select & checkbox (change)',
      soal: '<ol class="task-list"><li>Saat <code>#pilihWarna</code> berubah, ubah warna latar <code>#kotak</code> sesuai nilai pilihan. Pilih ketiga warna, lalu pilih <code>-- pilih --</code>.</li><li>Tombol <code>#btnDaftar</code> <strong>nonaktif</strong> saat halaman dibuka, dan aktif hanya jika <code>#setuju</code> dicentang.</li></ol>',
      starter: 'const pilihWarna = document.querySelector("#pilihWarna");\nconst kotak = document.querySelector("#kotak");\nconst setuju = document.querySelector("#setuju");\nconst btnDaftar = document.querySelector("#btnDaftar");\n\n',
      solusi: 'const pilihWarna = document.querySelector("#pilihWarna");\nconst kotak = document.querySelector("#kotak");\nconst setuju = document.querySelector("#setuju");\nconst btnDaftar = document.querySelector("#btnDaftar");\n\npilihWarna.addEventListener("change", () => {\n  kotak.style.backgroundColor = pilihWarna.value;\n});\n\nbtnDaftar.disabled = true;\n\nsetuju.addEventListener("change", () => {\n  btnDaftar.disabled = !setuju.checked;\n});',
      petunjuk: ['<code>pilihWarna.value</code> berisi atribut <code>value</code> dari option yang dipilih.', 'Checkbox dibaca dengan <code>.checked</code>; tombol dinonaktifkan dengan <code>.disabled = true</code>.'],
      tes: [
        { nama: 'Pilih Hijau → latar seagreen', panggil: '(__ubah("#pilihWarna", "seagreen"), ' + KOTAK + '.style.backgroundColor)', hasil: 'seagreen' },
        { nama: 'Pilih "-- pilih --" → warna kembali normal', panggil: '(__ubah("#pilihWarna", "tomato"), __ubah("#pilihWarna", ""), ' + KOTAK + '.style.backgroundColor)', hasil: '' },
        { nama: 'Awal → tombol Daftar nonaktif', panggil: DISABLED, hasil: true },
        { nama: 'Dicentang → aktif; dilepas → nonaktif lagi', pesan: 'Format: setelah dicentang | setelah dilepas (nilai disabled).', panggil: '(__ubah("#setuju", true), ' + DISABLED + ') + "|" + (__ubah("#setuju", false), ' + DISABLED + ')', hasil: 'false|true' }
      ]
    },
    p9: {
      id: 'p9', mode: 'dom', preset: 'event',
      judul: 'Praktik 9 — Form tanpa reload (submit)',
      soal: '<ol class="task-list"><li>Jalankan contoh <strong>tanpa</strong> baris <code>e.preventDefault();</code> lalu klik <strong>Daftar</strong>. Apa yang terjadi? (Perhatikan peringatan di Console.) Tulis di komentar.</li>' +
        '<li>Tambahkan <code>e.preventDefault();</code> lalu uji: email kosong → <code>Email wajib diisi!</code>, email terisi → <code>Terima kasih, [email] sudah terdaftar!</code> di <code>#pesanForm</code>.</li></ol>',
      starter: 'const form = document.querySelector("#formDaftar");\nconst email = document.querySelector("#email");\nconst pesanForm = document.querySelector("#pesanForm");\n\nform.addEventListener("submit", (e) => {\n  // e.preventDefault();\n\n  if (email.value === "") {\n    pesanForm.textContent = "Email wajib diisi!";\n  } else {\n    pesanForm.textContent = `Terima kasih, ${email.value} sudah terdaftar!`;\n  }\n});\n',
      solusi: 'const form = document.querySelector("#formDaftar");\nconst email = document.querySelector("#email");\nconst pesanForm = document.querySelector("#pesanForm");\n\n// Tanpa preventDefault halaman memuat ulang dan pesan hilang.\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n\n  if (email.value === "") {\n    pesanForm.textContent = "Email wajib diisi!";\n  } else {\n    pesanForm.textContent = `Terima kasih, ${email.value} sudah terdaftar!`;\n  }\n});',
      petunjuk: ['Hapus tanda <code>//</code> di depan <code>e.preventDefault();</code>.'],
      tes: [
        { nama: 'Submit dicegah (halaman tidak reload)', pesan: 'Panggil e.preventDefault() di dalam handler submit.', panggil: '__kirim("#formDaftar").dicegah', hasil: true },
        { nama: 'Email kosong → "Email wajib diisi!"', panggil: '(__kirim("#formDaftar"), __teks("#pesanForm"))', hasil: 'Email wajib diisi!' },
        { nama: 'Email terisi → ucapan terima kasih', panggil: '(__ketik("#email", "budi@sekolah.id"), __kirim("#formDaftar"), __teks("#pesanForm"))', hasil: 'Terima kasih, budi@sekolah.id sudah terdaftar!' }
      ]
    },

    /* ── Praktik tambahan ── */
    p10: {
      id: 'p10', mode: 'dom', preset: 'event',
      judul: 'Praktik 10 — Tiga tombol sekaligus (forEach)',
      soal: '<p class="content-text">Ambil ketiga tombol dengan <code>document.querySelectorAll("#tombol1, #tombol2, #tombol3")</code>, lalu pasang listener <code>click</code> ke masing-masing memakai <code>forEach</code>. Saat salah satu diklik, ubah <code>#judul</code> menjadi <code>Kamu menekan: [teks tombol]</code> — ambil dari <code>e.target</code>.</p>',
      starter: 'const semuaTombol = document.querySelectorAll("#tombol1, #tombol2, #tombol3");\nconst judul = document.querySelector("#judul");\n\n',
      solusi: 'const semuaTombol = document.querySelectorAll("#tombol1, #tombol2, #tombol3");\nconst judul = document.querySelector("#judul");\n\nsemuaTombol.forEach((tombol) => {\n  tombol.addEventListener("click", (e) => {\n    judul.textContent = `Kamu menekan: ${e.target.textContent}`;\n  });\n});',
      petunjuk: ['<code>semuaTombol.forEach((tombol) =&gt; { tombol.addEventListener("click", (e) =&gt; { ... }); });</code>'],
      syarat: [{ nama: 'Memakai forEach', pola: /\.forEach\s*\(/ }],
      tes: [
        { nama: 'Klik Tombol 2', panggil: '(__klik("#tombol2"), __teks("#judul"))', hasil: 'Kamu menekan: Tombol 2' },
        { nama: 'Klik Tombol 3', panggil: '(__klik("#tombol3"), __teks("#judul"))', hasil: 'Kamu menekan: Tombol 3' }
      ]
    },
    p11: {
      id: 'p11', mode: 'dom', preset: 'event',
      judul: 'Praktik 11 — Tandai tugas dengan event delegation',
      soal: '<p class="content-text">Kode menambah tugas sudah disediakan. Pasang <strong>satu</strong> listener <code>click</code> di <code>#daftarTugas</code> (bukan di setiap <code>li</code>). Saat sebuah <code>li</code> diklik, toggle class <code>aktif</code> pada <code>li</code> itu (latarnya jadi hijau). Item yang ditambahkan <strong>belakangan</strong> juga harus bisa diklik.</p>',
      starter: 'const inputTugas = document.querySelector("#inputTugas");\nconst daftarTugas = document.querySelector("#daftarTugas");\n\ndocument.querySelector("#btnTugas").addEventListener("click", () => {\n  if (inputTugas.value === "") return;\n  const li = document.createElement("li");\n  li.textContent = inputTugas.value;\n  daftarTugas.append(li);\n  inputTugas.value = "";\n});\n\n// event delegation di sini\n',
      solusi: 'const inputTugas = document.querySelector("#inputTugas");\nconst daftarTugas = document.querySelector("#daftarTugas");\n\ndocument.querySelector("#btnTugas").addEventListener("click", () => {\n  if (inputTugas.value === "") return;\n  const li = document.createElement("li");\n  li.textContent = inputTugas.value;\n  daftarTugas.append(li);\n  inputTugas.value = "";\n});\n\n// event delegation di sini\ndaftarTugas.addEventListener("click", (e) => {\n  const li = e.target.closest("li");\n  if (!li) return;\n  li.classList.toggle("aktif");\n});',
      petunjuk: ['Listener di induk: <code>daftarTugas.addEventListener("click", (e) =&gt; { ... })</code>.', 'Cari li yang diklik: <code>const li = e.target.closest("li");</code> lalu <code>if (!li) return;</code>'],
      syarat: [{ nama: 'Listener dipasang di #daftarTugas (delegation)', pola: /daftarTugas\s*\.\s*addEventListener\s*\(\s*["'`]click["'`]/ }],
      tes: [
        { nama: 'Klik item kedua → hanya item kedua aktif', pesan: 'Format: item pertama aktif? | item kedua aktif?', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTugas"), __ketik("#inputTugas", "B"), __klik("#btnTugas"), __klik("#daftarTugas li:last-child"), __kelas("#daftarTugas li:first-child").indexOf("aktif") !== -1) + "|" + (__kelas("#daftarTugas li:last-child").indexOf("aktif") !== -1)', hasil: 'false|true' },
        { nama: 'Item ketiga (dibuat belakangan) juga bisa diklik', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTugas"), __ketik("#inputTugas", "B"), __klik("#btnTugas"), __ketik("#inputTugas", "C"), __klik("#btnTugas"), __klik("#daftarTugas li:last-child"), __kelas("#daftarTugas li:last-child").indexOf("aktif") !== -1)', hasil: true }
      ]
    },
    p12: {
      id: 'p12', mode: 'dom', preset: 'event',
      judul: 'Praktik 12 — Tunggu sebentar (setTimeout)',
      soal: '<p class="content-text">Saat <code>#tombol3</code> diklik, ubah teks <code>#kotak</code> menjadi <code>Tunggu sebentar...</code>. Lalu <strong>1 detik kemudian</strong> (pakai <code>setTimeout</code>), ubah teksnya menjadi <code>Selesai!</code> dan tambahkan class <code>aktif</code>.</p>',
      starter: 'const tombol3 = document.querySelector("#tombol3");\nconst kotak = document.querySelector("#kotak");\n\n',
      solusi: 'const tombol3 = document.querySelector("#tombol3");\nconst kotak = document.querySelector("#kotak");\n\ntombol3.addEventListener("click", () => {\n  kotak.textContent = "Tunggu sebentar...";\n\n  setTimeout(() => {\n    kotak.textContent = "Selesai!";\n    kotak.classList.add("aktif");\n  }, 1000);\n});',
      petunjuk: ['<code>setTimeout(() =&gt; { ... }, 1000);</code> — 1000 ms = 1 detik, ditulis di dalam handler klik.'],
      syarat: [{ nama: 'Memakai setTimeout', pola: /setTimeout\s*\(/ }],
      tes: [
        { nama: 'Langsung setelah klik → "Tunggu sebentar..."', panggil: '(__klik("#tombol3"), __teks("#kotak"))', hasil: 'Tunggu sebentar...' },
        { nama: '1 detik kemudian → "Selesai!" & aktif', pesan: 'Format: teks kotak | punya class aktif?', panggil: '(__klik("#tombol3"), __tunggu(1150).then(function () { return __teks("#kotak") + "|" + ' + AKTIF + '; }))', hasil: 'Selesai!|true' }
      ]
    },

    /* ── Latihan B (tugas mandiri dari slide) ── */
    b1: {
      id: 'b1', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B1 — Klik Pertama',
      soal: '<p class="content-text">Pada <code>#tombol1</code>: saat diklik, teks <code>#judul</code> berubah menjadi <code>Tombol 1 diklik!</code>.</p>',
      starter: '',
      solusi: 'const tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\ntombol1.addEventListener("click", () => {\n  judul.textContent = "Tombol 1 diklik!";\n});',
      tes: [
        { nama: 'Sebelum diklik → judul tetap', panggil: '__teks("#judul")', hasil: 'Belajar Event' },
        { nama: 'Setelah diklik → "Tombol 1 diklik!"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Tombol 1 diklik!' }
      ]
    },
    b2: {
      id: 'b2', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B2 — Penghitung Klik',
      soal: '<p class="content-text">Pada <code>#tombol2</code>: setiap diklik, teks <strong>tombol itu sendiri</strong> berubah menjadi <code>Diklik N kali</code> (N = jumlah klik).</p>',
      starter: '',
      solusi: 'const tombol2 = document.querySelector("#tombol2");\nlet hitung = 0;\n\ntombol2.addEventListener("click", () => {\n  hitung++;\n  tombol2.textContent = `Diklik ${hitung} kali`;\n});',
      tes: [
        { nama: '1 klik → "Diklik 1 kali"', panggil: '(__klik("#tombol2"), __teks("#tombol2"))', hasil: 'Diklik 1 kali' },
        { nama: '4 klik → "Diklik 4 kali"', pesan: 'Variabel hitung harus dibuat di LUAR handler.', panggil: '(__klik("#tombol2", 4), __teks("#tombol2"))', hasil: 'Diklik 4 kali' }
      ]
    },
    b3: {
      id: 'b3', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B3 — Kotak yang Hidup',
      soal: '<p class="content-text">Pada <code>#kotak</code>:</p><ol class="task-list"><li><code>mouseover</code> → tambah class <code>aktif</code></li><li><code>mouseout</code> → hapus class <code>aktif</code></li><li><code>dblclick</code> → <em>toggle</em> class <code>besar</code></li></ol>',
      starter: '',
      solusi: 'const kotak = document.querySelector("#kotak");\n\nkotak.addEventListener("mouseover", () => {\n  kotak.classList.add("aktif");\n});\nkotak.addEventListener("mouseout", () => {\n  kotak.classList.remove("aktif");\n});\nkotak.addEventListener("dblclick", () => {\n  kotak.classList.toggle("besar");\n});',
      tes: [
        { nama: 'Masuk → aktif, keluar → tidak', pesan: 'Format: setelah masuk | setelah keluar.', panggil: '(__hover("#kotak"), ' + AKTIF + ') + "|" + (__keluar("#kotak"), ' + AKTIF + ')', hasil: 'true|false' },
        { nama: 'Klik dua kali → besar; dua kali lagi → normal', pesan: 'Format: setelah dblclick pertama | setelah dblclick kedua. Pakai classList.toggle.', panggil: '(__dobel("#kotak"), ' + BESAR + ') + "|" + (__dobel("#kotak"), ' + BESAR + ')', hasil: 'true|false' }
      ]
    },
    b4: {
      id: 'b4', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B4 — Function Bernama',
      soal: '<p class="content-text">Buat function bernama <code>ubahWarnaJudul</code> (<strong>bukan</strong> arrow function inline) yang mengubah warna teks <code>#judul</code> menjadi <code>tomato</code>. Pasang ke <code>#tombol3</code> dengan benar (ingat: tanpa tanda kurung).</p>',
      starter: '',
      solusi: 'const tombol3 = document.querySelector("#tombol3");\nconst judul = document.querySelector("#judul");\n\nfunction ubahWarnaJudul() {\n  judul.style.color = "tomato";\n}\n\ntombol3.addEventListener("click", ubahWarnaJudul);',
      syarat: [
        { nama: 'Ada function bernama ubahWarnaJudul', pola: /function\s+ubahWarnaJudul\s*\(/ },
        { nama: 'Dipasang tanpa tanda kurung', pola: /addEventListener\s*\(\s*["'`]click["'`]\s*,\s*ubahWarnaJudul\s*\)/ }
      ],
      tes: [
        { nama: 'Sebelum diklik → warna judul belum berubah', panggil: 'document.querySelector("#judul").style.color', hasil: '' },
        { nama: 'Klik #tombol3 → judul tomato', panggil: '(__klik("#tombol3"), document.querySelector("#judul").style.color)', hasil: 'tomato' }
      ]
    },
    b5: {
      id: 'b5', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B5 — Sapaan Langsung',
      soal: '<p class="content-text">Pada <code>#nama</code> (event <code>input</code>): tampilkan <code>Halo, [nama]!</code> di <code>#hasil</code> <strong>setiap kali mengetik</strong>. Jika kolom <strong>kosong</strong>, tampilkan <code>Halo, siapa namamu?</code>.</p>',
      starter: '',
      solusi: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  if (nama.value === "") {\n    hasil.textContent = "Halo, siapa namamu?";\n  } else {\n    hasil.textContent = `Halo, ${nama.value}!`;\n  }\n});',
      tes: [
        { nama: 'Ketik "Budi" → "Halo, Budi!"', panggil: '(__ketik("#nama", "Budi"), __teks("#hasil"))', hasil: 'Halo, Budi!' },
        { nama: 'Dikosongkan → "Halo, siapa namamu?"', panggil: '(__ketik("#nama", "Budi"), __ketik("#nama", ""), __teks("#hasil"))', hasil: 'Halo, siapa namamu?' }
      ]
    },
    b6: {
      id: 'b6', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B6 — Pilih Warna',
      soal: '<p class="content-text">Pada <code>#pilihWarna</code> (event <code>change</code>): ubah warna latar <code>#kotak</code> sesuai pilihan. Jika memilih <code>-- pilih --</code>, warna kembali normal.</p>',
      starter: '',
      solusi: 'const pilihWarna = document.querySelector("#pilihWarna");\nconst kotak = document.querySelector("#kotak");\n\npilihWarna.addEventListener("change", () => {\n  kotak.style.backgroundColor = pilihWarna.value;   // "" mengembalikan warna dari CSS\n});',
      tes: [
        { nama: 'Pilih Biru → royalblue', panggil: '(__ubah("#pilihWarna", "royalblue"), ' + KOTAK + '.style.backgroundColor)', hasil: 'royalblue' },
        { nama: '"-- pilih --" → warna normal', pesan: 'Warna latar harus dikosongkan ("") agar kembali ke warna dari CSS.', panggil: '(__ubah("#pilihWarna", "tomato"), __ubah("#pilihWarna", ""), ' + KOTAK + '.style.backgroundColor)', hasil: '' }
      ]
    },
    b7: {
      id: 'b7', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B7 — Syarat & Ketentuan',
      soal: '<p class="content-text">Tombol <code>#btnDaftar</code> <strong>nonaktif</strong> saat halaman dibuka dan hanya <strong>aktif</strong> jika checkbox <code>#setuju</code> dicentang (aktif/nonaktif lagi saat centang dibuka).</p>',
      starter: '',
      solusi: 'const setuju = document.querySelector("#setuju");\nconst btnDaftar = document.querySelector("#btnDaftar");\n\nbtnDaftar.disabled = true;\n\nsetuju.addEventListener("change", () => {\n  btnDaftar.disabled = !setuju.checked;\n});',
      tes: [
        { nama: 'Awal → nonaktif', pesan: 'Tombol harus nonaktif SEJAK halaman dibuka: btnDaftar.disabled = true; di luar handler.', panggil: DISABLED, hasil: true },
        { nama: 'Dicentang → aktif', panggil: '(__ubah("#setuju", true), ' + DISABLED + ')', hasil: false },
        { nama: 'Centang dibuka → nonaktif lagi', panggil: '(__ubah("#setuju", true), __ubah("#setuju", false), ' + DISABLED + ')', hasil: true }
      ]
    },
    b8: {
      id: 'b8', mode: 'dom', preset: 'event', jenis: 'latihan',
      judul: 'B8 — Validasi Form',
      soal: '<p class="content-text">Pada <code>#formDaftar</code> (event <code>submit</code>): cegah halaman memuat ulang. Jika email <strong>kosong</strong>, tampilkan <code>Email wajib diisi!</code> di <code>#pesanForm</code>. Jika terisi, tampilkan <code>Terima kasih, [email] sudah terdaftar!</code>.</p>',
      starter: '',
      solusi: 'const form = document.querySelector("#formDaftar");\nconst email = document.querySelector("#email");\nconst pesanForm = document.querySelector("#pesanForm");\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n\n  if (email.value === "") {\n    pesanForm.textContent = "Email wajib diisi!";\n  } else {\n    pesanForm.textContent = `Terima kasih, ${email.value} sudah terdaftar!`;\n  }\n});',
      tes: [
        { nama: 'Submit dicegah', panggil: '__kirim("#formDaftar").dicegah', hasil: true },
        { nama: 'Email kosong → "Email wajib diisi!"', panggil: '(__kirim("#formDaftar"), __teks("#pesanForm"))', hasil: 'Email wajib diisi!' },
        { nama: 'Email terisi → ucapan terima kasih', panggil: '(__ketik("#email", "ani@sekolah.id"), __kirim("#formDaftar"), __teks("#pesanForm"))', hasil: 'Terima kasih, ani@sekolah.id sudah terdaftar!' }
      ]
    },

    /* ── Latihan C: cari & perbaiki ── */
    c1: {
      id: 'c1', mode: 'dom', preset: 'event', jenis: 'perbaiki',
      judul: 'C1 — Memanggil, bukan memasang',
      soal: '<p class="content-text">Seharusnya <code>#judul</code> berubah menjadi <code>Halo!</code> <strong>saat tombol diklik</strong>. Jalankan, amati, tulis kesalahannya di komentar, lalu perbaiki.</p>',
      starter: 'const tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\nfunction sapa() {\n  judul.textContent = "Halo!";\n}\ntombol1.addEventListener("click", sapa());   // seharusnya berubah saat tombol diklik\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: sapa() dipanggil langsung saat halaman dibuka; yang dipasang hasilnya (undefined).\nconst tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\nfunction sapa() {\n  judul.textContent = "Halo!";\n}\ntombol1.addEventListener("click", sapa);',
      petunjuk: ['Pasang nama function <strong>tanpa</strong> tanda kurung.'],
      tes: [
        { nama: 'Sebelum diklik → judul tetap "Belajar Event"', panggil: '__teks("#judul")', hasil: 'Belajar Event' },
        { nama: 'Setelah diklik → "Halo!"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Halo!' }
      ]
    },
    c2: {
      id: 'c2', mode: 'dom', preset: 'event', jenis: 'perbaiki',
      judul: 'C2 — Jenis event tanpa tanda kutip',
      soal: '<p class="content-text">Kode ini ingin mengubah <code>#judul</code> menjadi <code>Halo!</code> saat <code>#tombol1</code> diklik. Jalankan dan baca error-nya.</p>',
      starter: 'const tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\ntombol1.addEventListener(click, () => {\n  judul.textContent = "Halo!";\n});\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: click tanpa tanda kutip dibaca sebagai variabel → ReferenceError.\nconst tombol1 = document.querySelector("#tombol1");\nconst judul = document.querySelector("#judul");\n\ntombol1.addEventListener("click", () => {\n  judul.textContent = "Halo!";\n});',
      petunjuk: ['Jenis event adalah <strong>string</strong>: <code>"click"</code>.'],
      tes: [{ nama: 'Klik → "Halo!"', panggil: '(__klik("#tombol1"), __teks("#judul"))', hasil: 'Halo!' }]
    },
    c3: {
      id: 'c3', mode: 'dom', preset: 'event', jenis: 'perbaiki',
      judul: 'C3 — .value dibaca di luar handler',
      soal: '<p class="content-text">Seharusnya <code>#hasil</code> mengikuti ketikan (<code>Halo, [nama]!</code>). Ketik di Preview: kenapa namanya tidak muncul?</p>',
      starter: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nconst isi = nama.value;\nnama.addEventListener("input", () => {\n  hasil.textContent = `Halo, ${isi}!`;   // seharusnya mengikuti ketikan\n});\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: .value dibaca di luar handler, jadi hanya berisi nilai awal (kosong).\nconst nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  const isi = nama.value;\n  hasil.textContent = `Halo, ${isi}!`;\n});',
      petunjuk: ['Pindahkan pembacaan <code>nama.value</code> ke <strong>dalam</strong> handler.'],
      tes: [{ nama: 'Ketik "Budi" → "Halo, Budi!"', panggil: '(__ketik("#nama", "Budi"), __teks("#hasil"))', hasil: 'Halo, Budi!' }]
    },
    c4: {
      id: 'c4', mode: 'dom', preset: 'event', jenis: 'perbaiki',
      judul: 'C4 — Pesan langsung hilang',
      soal: '<p class="content-text">Pesan <code>Terkirim!</code> langsung hilang setelah tombol <strong>Daftar</strong> diklik. Perbaiki.</p>',
      starter: 'const formDaftar = document.querySelector("#formDaftar");\nconst pesanForm = document.querySelector("#pesanForm");\n\nformDaftar.addEventListener("submit", () => {\n  pesanForm.textContent = "Terkirim!";   // pesan langsung hilang setelah tombol diklik\n});\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: tidak ada preventDefault(), halaman memuat ulang dan pesan hilang.\nconst formDaftar = document.querySelector("#formDaftar");\nconst pesanForm = document.querySelector("#pesanForm");\n\nformDaftar.addEventListener("submit", (e) => {\n  e.preventDefault();\n  pesanForm.textContent = "Terkirim!";\n});',
      petunjuk: ['Terima parameter <code>(e)</code>, lalu panggil <code>e.preventDefault()</code>.'],
      tes: [
        { nama: 'Submit dicegah', panggil: '__kirim("#formDaftar").dicegah', hasil: true },
        { nama: 'Pesan "Terkirim!" tampil', panggil: '(__kirim("#formDaftar"), __teks("#pesanForm"))', hasil: 'Terkirim!' }
      ]
    },
    c5: {
      id: 'c5', mode: 'dom', preset: 'event', jenis: 'perbaiki',
      judul: 'C5 — Elemen, bukan isinya',
      soal: '<p class="content-text">Seharusnya <code>#hasil</code> menampilkan isi yang diketik. Ketik di Preview: apa yang muncul?</p>',
      starter: 'const nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  hasil.textContent = nama;              // seharusnya menampilkan isi yang diketik\n});\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: yang ditampilkan elemennya ([object HTMLInputElement]), bukan isinya.\nconst nama = document.querySelector("#nama");\nconst hasil = document.querySelector("#hasil");\n\nnama.addEventListener("input", () => {\n  hasil.textContent = nama.value;\n});',
      petunjuk: ['Isi input dibaca dengan <code>.value</code>.'],
      tes: [{ nama: 'Ketik "Budi" → #hasil "Budi"', panggil: '(__ketik("#nama", "Budi"), __teks("#hasil"))', hasil: 'Budi' }]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1', mode: 'dom', preset: 'event', jenis: 'tantangan',
      judul: 'Penghitung Karakter (B9)',
      soal: '<p class="content-text">Pada <code>#nama</code> (event <code>input</code>): tampilkan <strong>jumlah karakter</strong> yang diketik di <code>#jumlahKarakter</code> (gunakan <code>.value.length</code>). Jika lebih dari <strong>10</strong> karakter, ubah warna angka menjadi merah (<code>"red"</code>). Jika tidak, kembali normal (<code>""</code>).</p>',
      starter: '',
      solusi: 'const nama = document.querySelector("#nama");\nconst jumlahKarakter = document.querySelector("#jumlahKarakter");\n\nnama.addEventListener("input", () => {\n  const panjang = nama.value.length;\n  jumlahKarakter.textContent = panjang;\n\n  if (panjang > 10) {\n    jumlahKarakter.style.color = "red";\n  } else {\n    jumlahKarakter.style.color = "";\n  }\n});',
      petunjuk: ['<code>nama.value.length</code> = jumlah karakter.', 'Kembali normal: <code>jumlahKarakter.style.color = "";</code>'],
      tes: [
        { nama: 'Ketik "Sari" → 4, warna normal', pesan: 'Format: angka | warna.', panggil: '(__ketik("#nama", "Sari"), __teks("#jumlahKarakter") + "|" + document.querySelector("#jumlahKarakter").style.color)', hasil: '4|' },
        { nama: 'Tepat 10 karakter → belum merah', panggil: '(__ketik("#nama", "Budi Santo"), document.querySelector("#jumlahKarakter").style.color)', hasil: '' },
        { nama: '11 karakter → merah', panggil: '(__ketik("#nama", "Budi Santos"), __teks("#jumlahKarakter") + "|" + document.querySelector("#jumlahKarakter").style.color)', cek: cocok(/^11\|(red|rgb\(255, 0, 0\))$/, 'Format: angka | warna. Lebih dari 10 karakter → angka 11 berwarna merah.') },
        { nama: 'Dihapus lagi jadi pendek → kembali normal', panggil: '(__ketik("#nama", "Budi Santoso"), __ketik("#nama", "Budi"), document.querySelector("#jumlahKarakter").style.color)', hasil: '' }
      ]
    },
    {
      id: 't2', mode: 'dom', preset: 'event', jenis: 'tantangan',
      judul: 'Kalkulator Mini (B10)',
      soal: '<p class="content-text">Saat <code>#btnHitung</code> diklik: baca <code>#angka1</code>, <code>#angka2</code>, dan <code>#pilihOperator</code>, lalu tampilkan hasilnya di <code>#hasilHitung</code> dengan format <code>Hasil: X</code>. Jika membagi dengan <code>0</code>, tampilkan <code>Tidak bisa dibagi nol</code>.</p><p class="content-text"><em>Ingat: <code>.value</code> adalah string, gunakan <code>Number()</code>.</em></p>',
      starter: 'const angka1 = document.querySelector("#angka1");\nconst angka2 = document.querySelector("#angka2");\nconst pilihOperator = document.querySelector("#pilihOperator");\nconst btnHitung = document.querySelector("#btnHitung");\nconst hasilHitung = document.querySelector("#hasilHitung");\n\n',
      solusi: 'const angka1 = document.querySelector("#angka1");\nconst angka2 = document.querySelector("#angka2");\nconst pilihOperator = document.querySelector("#pilihOperator");\nconst btnHitung = document.querySelector("#btnHitung");\nconst hasilHitung = document.querySelector("#hasilHitung");\n\nbtnHitung.addEventListener("click", () => {\n  const a = Number(angka1.value);\n  const b = Number(angka2.value);\n  const op = pilihOperator.value;\n  let hasil;\n\n  if (op === "+") {\n    hasil = a + b;\n  } else if (op === "-") {\n    hasil = a - b;\n  } else if (op === "*") {\n    hasil = a * b;\n  } else if (b === 0) {          // sampai sini berarti operatornya "/"\n    hasil = "Tidak bisa dibagi nol";\n  } else {\n    hasil = a / b;\n  }\n\n  hasilHitung.textContent = `Hasil: ${hasil}`;\n});',
      petunjuk: ['Operator yang dipilih: <code>pilihOperator.value</code> berisi <code>"+"</code>, <code>"-"</code>, <code>"*"</code>, atau <code>"/"</code>.', 'Pakai <code>if / else if</code> (atau <code>switch</code>).'],
      tes: [
        { nama: '5 + 3 → "Hasil: 8" (bukan 53)', pesan: 'Ingat: .value berupa string. Ubah dengan Number().', panggil: '(__ketik("#angka1", "5"), __ketik("#angka2", "3"), __klik("#btnHitung"), __teks("#hasilHitung"))', hasil: 'Hasil: 8' },
        { nama: '8 - 3 → "Hasil: 5"', panggil: '(__ketik("#angka1", "8"), __ketik("#angka2", "3"), __ubah("#pilihOperator", "-"), __klik("#btnHitung"), __teks("#hasilHitung"))', hasil: 'Hasil: 5' },
        { nama: '6 × 4 → "Hasil: 24"', panggil: '(__ketik("#angka1", "6"), __ketik("#angka2", "4"), __ubah("#pilihOperator", "*"), __klik("#btnHitung"), __teks("#hasilHitung"))', hasil: 'Hasil: 24' },
        { nama: '9 ÷ 2 → "Hasil: 4.5"', panggil: '(__ketik("#angka1", "9"), __ketik("#angka2", "2"), __ubah("#pilihOperator", "/"), __klik("#btnHitung"), __teks("#hasilHitung"))', hasil: 'Hasil: 4.5' },
        { nama: 'Dibagi 0 → "Tidak bisa dibagi nol"', panggil: '(__ketik("#angka1", "9"), __ketik("#angka2", "0"), __ubah("#pilihOperator", "/"), __klik("#btnHitung"), __teks("#hasilHitung"))', cek: cocok(/Tidak bisa dibagi nol$/, 'Pembagian dengan 0 harus menampilkan "Tidak bisa dibagi nol".') }
      ]
    },
    {
      id: 't3', mode: 'dom', preset: 'event', jenis: 'tantangan',
      judul: 'Warna dari Keyboard (B11)',
      soal: '<p class="content-text">Pasang event <code>keydown</code> pada <strong><code>document</code></strong> (bukan elemen tertentu): tekan huruf kecil <kbd>r</kbd> → <code>#kotak</code> menjadi <code>tomato</code>, <kbd>g</kbd> → <code>seagreen</code>, <kbd>b</kbd> → <code>royalblue</code>. Tombol lain tidak mengubah apa-apa.</p><p class="content-text">Di Preview, klik dulu area halaman (bukan kolom input) lalu tekan hurufnya. <em>Huruf yang diketik di kolom nama juga memicu event ini. Itu normal.</em></p>',
      starter: 'const kotak = document.querySelector("#kotak");\n\n',
      solusi: 'const kotak = document.querySelector("#kotak");\n\ndocument.addEventListener("keydown", (e) => {\n  if (e.key === "r") {\n    kotak.style.backgroundColor = "tomato";\n  } else if (e.key === "g") {\n    kotak.style.backgroundColor = "seagreen";\n  } else if (e.key === "b") {\n    kotak.style.backgroundColor = "royalblue";\n  }\n});',
      petunjuk: ['<code>document.addEventListener("keydown", (e) =&gt; { ... })</code> menangkap tombol di mana pun pada halaman.'],
      syarat: [{ nama: 'Listener dipasang di document', pola: /document\s*\.\s*addEventListener\s*\(\s*["'`]keydown["'`]/ }],
      tes: [
        { nama: 'Tekan r → tomato', panggil: '(__tekan(document, "r"), ' + KOTAK + '.style.backgroundColor)', hasil: 'tomato' },
        { nama: 'Tekan g → seagreen', panggil: '(__tekan(document, "g"), ' + KOTAK + '.style.backgroundColor)', hasil: 'seagreen' },
        { nama: 'Tekan b → royalblue', panggil: '(__tekan(document, "b"), ' + KOTAK + '.style.backgroundColor)', hasil: 'royalblue' },
        { nama: 'Tombol lain tidak mengubah', panggil: '(__tekan(document, "r"), __tekan(document, "x"), __tekan(document, "Enter"), ' + KOTAK + '.style.backgroundColor)', hasil: 'tomato' },
        { nama: 'Tekan dari dalam kolom nama juga bekerja', pesan: 'Listener harus di document, sehingga tombol yang ditekan di input pun ikut tertangkap.', panggil: '(__tekan("#nama", "g"), ' + KOTAK + '.style.backgroundColor)', hasil: 'seagreen' }
      ]
    },
    {
      id: 't4', mode: 'dom', preset: 'event', jenis: 'tantangan',
      judul: 'Daftar Tugas (B12)',
      soal: '<p class="content-text">Saat <code>#btnTugas</code> diklik: ambil isi <code>#inputTugas</code> dan tambahkan sebagai <code>&lt;li&gt;</code> baru ke <code>#daftarTugas</code>. Setiap item memiliki tombol <code>Hapus</code> yang menghapus item tersebut. Jika input kosong, abaikan. Setelah item ditambahkan, kosongkan input.</p>',
      starter: 'const inputTugas = document.querySelector("#inputTugas");\nconst btnTugas = document.querySelector("#btnTugas");\nconst daftarTugas = document.querySelector("#daftarTugas");\n\n',
      solusi: 'const inputTugas = document.querySelector("#inputTugas");\nconst btnTugas = document.querySelector("#btnTugas");\nconst daftarTugas = document.querySelector("#daftarTugas");\n\nbtnTugas.addEventListener("click", () => {\n  const teks = inputTugas.value;\n\n  if (teks === "") {\n    return;\n  }\n\n  const li = document.createElement("li");\n  li.textContent = teks;\n\n  const btnHapus = document.createElement("button");\n  btnHapus.textContent = "Hapus";\n  btnHapus.addEventListener("click", () => {\n    li.remove();\n  });\n\n  li.append(btnHapus);\n  daftarTugas.append(li);\n  inputTugas.value = "";\n});',
      petunjuk: ['Buat <code>li</code> dan <code>button</code> dengan <code>createElement</code>, lalu <code>li.append(btnHapus)</code>.', 'Listener tombol Hapus dipasang <strong>saat tombol itu dibuat</strong>, di dalam handler Tambah: <code>btnHapus.addEventListener("click", () =&gt; { li.remove(); });</code>'],
      tes: [
        { nama: 'Tambah → 1 item, input dikosongkan', pesan: 'Format: jumlah li | teks tugas | isi input.', panggil: '(__ketik("#inputTugas", "PR MTK"), __klik("#btnTugas"), __hitung("#daftarTugas li") + "|" + document.querySelector("#daftarTugas li").firstChild.textContent.trim() + "|" + document.querySelector("#inputTugas").value)', hasil: '1|PR MTK|' },
        { nama: 'Setiap item punya tombol "Hapus"', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTugas"), __ketik("#inputTugas", "B"), __klik("#btnTugas"), __semua("#daftarTugas li button"))', hasil: ['Hapus', 'Hapus'] },
        { nama: 'Input kosong diabaikan', panggil: '(__ketik("#inputTugas", ""), __klik("#btnTugas"), __hitung("#daftarTugas li"))', hasil: 0 },
        { nama: 'Klik Hapus → hanya item itu yang hilang', pesan: 'Format: jumlah li tersisa | teks tugas yang tersisa.', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTugas"), __ketik("#inputTugas", "B"), __klik("#btnTugas"), __klik("#daftarTugas li button"), __hitung("#daftarTugas li") + "|" + document.querySelector("#daftarTugas li").firstChild.textContent.trim())', hasil: '1|B' }
      ]
    },
    {
      id: 't5', mode: 'dom', preset: 'form', jenis: 'studi-kasus',
      judul: 'Studi Kasus: Form Pendaftaran Ekskul',
      soal: '<p class="content-text">Lihat tab <code>index.html</code>: ada form <code>#formDaftar</code> berisi <code>#nama</code>, <code>#umur</code>, <code>#kelas</code>, dan paragraf <code>#pesan</code>. Saat form dikirim (event <code>submit</code>):</p>' +
        '<ol class="task-list"><li>Cegah halaman dimuat ulang dengan <code>e.preventDefault()</code>.</li>' +
        '<li>Jika nama kosong (setelah <code>trim()</code>) → <code>#pesan</code> berisi <code>Nama wajib diisi.</code> dengan class <code>error</code>.</li>' +
        '<li>Jika umur kosong atau di bawah 15 → <code>Umur minimal 15 tahun.</code> dengan class <code>error</code>.</li>' +
        '<li>Jika valid → <code>Terima kasih, [nama]! Kamu terdaftar dari kelas [kelas].</code> dengan class <code>sukses</code>, lalu kosongkan input nama dan umur.</li></ol>' +
        '<p class="content-text">Pastikan <code>#pesan</code> hanya punya <strong>salah satu</strong> class (<code>error</code> atau <code>sukses</code>).</p>',
      starter: 'const form = document.querySelector("#formDaftar");\nconst inputNama = document.querySelector("#nama");\nconst inputUmur = document.querySelector("#umur");\nconst pilihKelas = document.querySelector("#kelas");\nconst pesan = document.querySelector("#pesan");\n\n',
      solusi: 'const form = document.querySelector("#formDaftar");\nconst inputNama = document.querySelector("#nama");\nconst inputUmur = document.querySelector("#umur");\nconst pilihKelas = document.querySelector("#kelas");\nconst pesan = document.querySelector("#pesan");\n\nfunction tampilPesan(teks, jenis) {\n  pesan.textContent = teks;\n  pesan.className = jenis;\n}\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n\n  const nama = inputNama.value.trim();\n  const umur = Number(inputUmur.value);\n\n  if (nama === "") {\n    tampilPesan("Nama wajib diisi.", "error");\n    return;\n  }\n  if (inputUmur.value === "" || umur < 15) {\n    tampilPesan("Umur minimal 15 tahun.", "error");\n    return;\n  }\n\n  tampilPesan(`Terima kasih, ${nama}! Kamu terdaftar dari kelas ${pilihKelas.value}.`, "sukses");\n  inputNama.value = "";\n  inputUmur.value = "";\n});',
      petunjuk: ['<code>form.addEventListener("submit", (e) =&gt; { e.preventDefault(); ... });</code>', '<code>.value</code> berupa string: pakai <code>Number(inputUmur.value)</code>, dan cek juga apakah kosong (<code>""</code>).', 'Mengganti seluruh class sekaligus: <code>pesan.className = "error";</code>'],
      tes: [
        { nama: 'Submit dicegah (halaman tidak reload)', pesan: 'Panggil e.preventDefault() di baris pertama listener submit.', panggil: '(__ketik("#nama", "Budi"), __ketik("#umur", "16"), __kirim("#formDaftar").dicegah)', hasil: true },
        { nama: 'Nama kosong → error', pesan: 'Format: isi #pesan | class #pesan.', panggil: '(__ketik("#nama", "   "), __ketik("#umur", "16"), __kirim("#formDaftar"), __teks("#pesan") + "|" + document.querySelector("#pesan").className)', hasil: 'Nama wajib diisi.|error' },
        { nama: 'Umur 14 → error', pesan: 'Format: isi #pesan | class #pesan.', panggil: '(__ketik("#nama", "Ani"), __ketik("#umur", "14"), __kirim("#formDaftar"), __teks("#pesan") + "|" + document.querySelector("#pesan").className)', hasil: 'Umur minimal 15 tahun.|error' },
        { nama: 'Umur kosong → error', panggil: '(__ketik("#nama", "Ani"), __ketik("#umur", ""), __kirim("#formDaftar"), __teks("#pesan"))', hasil: 'Umur minimal 15 tahun.' },
        { nama: 'Valid → pesan sukses dengan kelas terpilih', pesan: 'Format: isi #pesan | class #pesan. Ambil kelas dari #kelas.value.', panggil: '(__ketik("#nama", " Citra "), __ketik("#umur", "17"), __ubah("#kelas", "XII RPL"), __kirim("#formDaftar"), __teks("#pesan") + "|" + document.querySelector("#pesan").className)', hasil: 'Terima kasih, Citra! Kamu terdaftar dari kelas XII RPL.|sukses' },
        { nama: 'Valid → input nama & umur dikosongkan', pesan: 'Format: isi #nama | isi #umur — keduanya harus kosong.', panggil: '(__ketik("#nama", "Citra"), __ketik("#umur", "15"), __kirim("#formDaftar"), document.querySelector("#nama").value + "|" + document.querySelector("#umur").value)', hasil: '|' },
        { nama: 'Error lalu valid → class error diganti sukses', panggil: '(__ketik("#nama", ""), __kirim("#formDaftar"), __ketik("#nama", "Doni"), __ketik("#umur", "16"), __kirim("#formDaftar"), document.querySelector("#pesan").className)', hasil: 'sukses' }
      ]
    },
    {
      id: 't6', mode: 'dom', preset: 'todo', jenis: 'studi-kasus',
      judul: 'Studi Kasus: Daftar Tugas Interaktif',
      soal: '<p class="content-text">Lihat tab <code>index.html</code> dan <code>style.css</code>. Buat daftar tugas dengan aturan:</p>' +
        '<ol class="task-list"><li>Klik <code>#btnTambah</code> <strong>atau</strong> tekan <kbd>Enter</kbd> di <code>#inputTugas</code> → tambahkan <code>&lt;li&gt;</code> berisi teks tugas (di-<code>trim</code>) ke <code>#daftarTugas</code>, lalu kosongkan input. Teks kosong diabaikan.</li>' +
        '<li>Setiap <code>&lt;li&gt;</code> punya tombol <code>&lt;button class="hapus"&gt;Hapus&lt;/button&gt;</code>. Teks tugas ditaruh di <code>&lt;span&gt;</code>, contoh: <code>&lt;li&gt;&lt;span&gt;PR MTK&lt;/span&gt;&lt;button class="hapus"&gt;Hapus&lt;/button&gt;&lt;/li&gt;</code>.</li>' +
        '<li>Klik teks tugas → toggle class <code>selesai</code> pada <code>&lt;li&gt;</code>-nya. Klik <strong>Hapus</strong> → hapus <code>&lt;li&gt;</code> itu.</li>' +
        '<li><code>#jumlahTugas</code> selalu menunjukkan jumlah tugas yang ada.</li></ol>' +
        '<p class="content-text"><strong>Bonus pemahaman:</strong> pakai <em>event delegation</em> — satu listener di <code>#daftarTugas</code> — supaya item baru otomatis ikut bisa diklik.</p>',
      starter: 'const input = document.querySelector("#inputTugas");\nconst daftar = document.querySelector("#daftarTugas");\nconst jumlah = document.querySelector("#jumlahTugas");\n\n',
      solusi: 'const input = document.querySelector("#inputTugas");\nconst daftar = document.querySelector("#daftarTugas");\nconst jumlah = document.querySelector("#jumlahTugas");\n\nfunction perbaruiJumlah() {\n  jumlah.textContent = daftar.querySelectorAll("li").length;\n}\n\nfunction tambahTugas() {\n  const teks = input.value.trim();\n  if (teks === "") return;\n\n  const li = document.createElement("li");\n  const span = document.createElement("span");\n  span.textContent = teks;\n  const hapus = document.createElement("button");\n  hapus.className = "hapus";\n  hapus.textContent = "Hapus";\n\n  li.append(span, hapus);\n  daftar.append(li);\n  input.value = "";\n  perbaruiJumlah();\n}\n\ndocument.querySelector("#btnTambah").addEventListener("click", tambahTugas);\ninput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") tambahTugas();\n});\n\n// event delegation: satu listener untuk semua item\ndaftar.addEventListener("click", (e) => {\n  const li = e.target.closest("li");\n  if (!li) return;\n\n  if (e.target.classList.contains("hapus")) {\n    li.remove();\n    perbaruiJumlah();\n  } else {\n    li.classList.toggle("selesai");\n  }\n});',
      petunjuk: ['Buat function <code>tambahTugas()</code> lalu pasang ke <strong>dua</strong> event: click tombol dan keydown Enter.', 'Bangun li dengan createElement: span + button.hapus, lalu <code>li.append(span, hapus)</code>.', 'Delegation: <code>daftar.addEventListener("click", (e) =&gt; { const li = e.target.closest("li"); ... })</code>; cek <code>e.target.classList.contains("hapus")</code>.'],
      tes: [
        { nama: 'Klik Tambah → item baru, input kosong, jumlah 1', pesan: 'Format: teks span tugas | isi input setelahnya | isi #jumlahTugas.', panggil: '(__ketik("#inputTugas", " PR MTK "), __klik("#btnTambah"), __semua("#daftarTugas li span").join() + "|" + document.querySelector("#inputTugas").value + "|" + __teks("#jumlahTugas"))', hasil: 'PR MTK||1' },
        { nama: 'Enter juga menambah', panggil: '(__ketik("#inputTugas", "Baca buku"), __tekan("#inputTugas", "Enter"), __ketik("#inputTugas", "Piket"), __tekan("#inputTugas", "Enter"), __semua("#daftarTugas li span"))', hasil: ['Baca buku', 'Piket'] },
        { nama: 'Teks kosong diabaikan', pesan: 'Format: jumlah li | isi #jumlahTugas. Cek input.value.trim() === "" lalu return.', panggil: '(__ketik("#inputTugas", "   "), __klik("#btnTambah"), __tekan("#inputTugas", "Enter"), __hitung("#daftarTugas li") + "|" + __teks("#jumlahTugas"))', hasil: '0|0' },
        { nama: 'Setiap item punya tombol .hapus', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTambah"), __hitung("#daftarTugas li button.hapus"))', hasil: 1 },
        { nama: 'Klik teks → toggle selesai', pesan: 'Format: setelah klik pertama | setelah klik kedua (class selesai).', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTambah"), __klik("#daftarTugas li span"), document.querySelector("#daftarTugas li").classList.contains("selesai") + "|" + (__klik("#daftarTugas li span"), document.querySelector("#daftarTugas li").classList.contains("selesai")))', hasil: 'true|false' },
        { nama: 'Klik Hapus → item hilang & jumlah berkurang', pesan: 'Format: tugas yang tersisa | isi #jumlahTugas.', panggil: '(__ketik("#inputTugas", "A"), __klik("#btnTambah"), __ketik("#inputTugas", "B"), __klik("#btnTambah"), __klik("#daftarTugas li .hapus"), __semua("#daftarTugas li span").join() + "|" + __teks("#jumlahTugas"))', hasil: 'B|1' }
      ]
    }
  ],

  /* Kuis (dinilai). Soal ber-kode dengan dom: 'event' memakai halaman slide 3. */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Apa yang dimaksud dengan <strong>event</strong> di JavaScript?',
      opsi: [
        'Function bawaan untuk mengubah warna elemen',
        'Kejadian pada halaman web (klik, ketik, tekan tombol, kirim form) yang bisa ditanggapi JavaScript',
        'Tag HTML khusus untuk tombol',
        'Nama lain dari console.log'
      ],
      jawab: 1,
      bahas: '<b>Event</b> = kejadian. <b>Listener</b> menunggu event pada sebuah elemen, dan <b>handler</b> adalah function yang dijalankan saat event terjadi.'
    },
    {
      tipe: 'pg',
      tanya: 'Pada <code>tombol.addEventListener("click", ubahWarna)</code>, apa peran <code>ubahWarna</code>?',
      opsi: ['Elemen yang didengarkan', 'Jenis event', 'Handler: function yang dijalankan saat event terjadi', 'Nilai yang dikembalikan tombol'],
      jawab: 2,
      bahas: 'Polanya <code>elemen.addEventListener("jenisEvent", handler)</code>. <code>tombol</code> = elemen yang didengar, <code>"click"</code> = jenis event, <code>ubahWarna</code> = handler.'
    },
    {
      tipe: 'pg', dom: 'event',
      tanya: 'Kode berikut dijalankan lalu tombol <strong>diklik satu kali</strong>. Apa yang tampil di Console?',
      kode: 'function sapa() {\n  console.log("halo");\n}\nconst tombol1 = document.querySelector("#tombol1");\ntombol1.addEventListener("click", sapa());\nconsole.log("selesai");\ntombol1.click();',
      opsi: ['selesai\nhalo', 'halo\nselesai', 'halo\nselesai\nhalo', 'selesai'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: '<code>sapa()</code> dengan kurung <b>langsung dipanggil</b> saat baris itu dibaca, jadi "halo" muncul duluan. Yang dipasang sebagai handler adalah hasilnya (<code>undefined</code>), sehingga klik tidak berefek.'
    },
    {
      tipe: 'bs',
      tanya: 'Kode <code>tombol1.addEventListener(click, () =&gt; { ... })</code> (tanpa tanda kutip) tetap berjalan normal.',
      jawab: false,
      bahas: 'Tanpa tanda kutip, <code>click</code> dibaca sebagai <b>variabel</b> sehingga muncul <code>ReferenceError: click is not defined</code>. Jenis event ditulis sebagai string huruf kecil: <code>"click"</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Penulisan jenis event mana yang <strong>benar</strong>?',
      opsi: ['`addEventListener("onclick", ...)`', '`addEventListener("Click", ...)`', '`addEventListener("click", ...)`', '`addEventListener(onClick, ...)`'],
      jawab: 2,
      bahas: 'Nama event ditulis <b>huruf kecil semua</b>, <b>tanpa awalan on</b>, dan <b>dalam tanda kutip</b>.'
    },
    {
      tipe: 'isian', dom: 'event',
      tanya: 'Apa output kode berikut? (<code>.click()</code> mensimulasikan klik.)',
      kode: 'const tombol1 = document.querySelector("#tombol1");\nlet hitung = 0;\ntombol1.addEventListener("click", () => {\n  hitung++;\n});\ntombol1.click();\ntombol1.click();\ntombol1.click();\nconsole.log(hitung);',
      jawab: ['3'],
      cekOutput: true,
      bahas: 'Handler dijalankan setiap klik, dan <code>hitung</code> dibuat <b>di luar</b> handler sehingga nilainya tersimpan di antara klik.'
    },
    {
      tipe: 'pg',
      tanya: 'Jika <code>let hitung = 0;</code> dipindah ke <strong>dalam</strong> handler klik penghitung, apa yang terjadi?',
      opsi: ['Hitungan bertambah dua kali lebih cepat', 'Hitungan selalu 1, karena hitung dibuat ulang dari 0 setiap klik', 'Muncul error', 'Tidak ada bedanya'],
      jawab: 1,
      bahas: 'Variabel di dalam handler dibuat baru <b>setiap kali</b> handler dijalankan. Variabel yang harus tersimpan di antara klik dibuat di <b>luar</b> handler.'
    },
    {
      tipe: 'pg', dom: 'event',
      tanya: 'Kode berikut dijalankan lalu <strong>Tombol 2 diklik</strong>. Apa isi <code>#judul</code>?',
      kode: 'const judul = document.querySelector("#judul");\nfunction tampilkanTombol(e) {\n  judul.textContent = `Kamu menekan: ${e.target.textContent}`;\n}\ndocument.querySelector("#tombol1").addEventListener("click", tampilkanTombol);\ndocument.querySelector("#tombol2").addEventListener("click", tampilkanTombol);\ndocument.querySelector("#tombol3").addEventListener("click", tampilkanTombol);',
      opsi: ['Kamu menekan: Tombol 1', 'Kamu menekan: Tombol 2', 'Kamu menekan: tampilkanTombol', 'Belajar Event'],
      jawab: 1,
      bahas: '<code>e.target</code> adalah elemen yang <b>sebenarnya diklik</b>. Karena itu satu function cukup untuk ketiga tombol.'
    },
    {
      tipe: 'pg',
      tanya: 'Event mana yang terpicu <strong>setiap kali</strong> pengguna mengetik satu huruf di <code>&lt;input&gt;</code>?',
      opsi: ['`change`', '`input`', '`submit`', '`click`'],
      jawab: 1,
      bahas: '<code>input</code> terpicu setiap ketikan. <code>change</code> dipakai untuk pilihan <code>select</code> dan checkbox.'
    },
    {
      tipe: 'pg',
      tanya: 'Kode <code>hasil.textContent = nama;</code> (dengan <code>nama</code> = elemen input) menampilkan apa di halaman?',
      opsi: ['Isi yang diketik pengguna', '`[object HTMLInputElement]`', 'Kosong', '`undefined`'],
      jawab: 1,
      bahas: 'Yang ditampilkan adalah <b>elemennya</b>, bukan isinya. Isi input dibaca dengan <code>nama.value</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Kondisi mana yang tepat untuk mendeteksi tombol <kbd>Enter</kbd> di listener <code>keydown</code>?',
      opsi: ['`e.target === "Enter"`', '`e.key === "Enter"`', '`e.type === "Enter"`', '`e.value === "Enter"`'],
      jawab: 1,
      bahas: '<code>e.key</code> berisi nama tombol yang ditekan (<code>"Enter"</code>, <code>"Escape"</code>, <code>"a"</code>). <code>e.type</code> berisi jenis event (<code>"keydown"</code>).'
    },
    {
      tipe: 'pg',
      tanya: '<code>#angka1</code> berisi 5 dan <code>#angka2</code> berisi 3. Apa hasil <code>angka1.value + angka2.value</code>?',
      opsi: ['8', '"53"', 'NaN', '`Error`'],
      jawab: 1,
      bahas: '<code>.value</code> <b>selalu string</b>, bahkan untuk <code>type="number"</code>. <code>"5" + "3"</code> = <code>"53"</code>. Gunakan <code>Number()</code> untuk menghitung.'
    },
    {
      tipe: 'pg',
      tanya: 'Untuk mengetahui apakah checkbox <code>#setuju</code> sedang dicentang, property apa yang dibaca?',
      opsi: ['`setuju.value`', '`setuju.checked`', '`setuju.textContent`', '`setuju.selected`'],
      jawab: 1,
      bahas: 'Checkbox dibaca dengan <code>.checked</code> yang bernilai <code>true</code>/<code>false</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Dengan kode <code>btnDaftar.disabled = !setuju.checked;</code>, saat checkbox <strong>dicentang</strong> tombol Daftar menjadi…',
      opsi: ['Nonaktif, karena disabled = true', 'Aktif, karena disabled = false', 'Hilang dari halaman', 'Tetap seperti semula'],
      jawab: 1,
      bahas: 'Dicentang → <code>checked</code> = <code>true</code> → <code>!true</code> = <code>false</code> → <code>disabled = false</code> → tombol <b>aktif</b>.'
    },
    {
      tipe: 'pg',
      tanya: 'Event apa yang dipakai untuk menanggapi perubahan pilihan pada <code>&lt;select&gt;</code>?',
      opsi: ['`click`', '`change`', '`keydown`', '`submit`'],
      jawab: 1,
      bahas: '<code>change</code> terpicu saat pilihan <code>select</code> (atau centang checkbox) berubah. Nilainya dibaca dengan <code>select.value</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa gunanya <code>e.preventDefault()</code> di dalam listener <code>submit</code> sebuah form?',
      opsi: ['Menghapus semua isi form', 'Mencegah perilaku bawaan browser: mengirim form & memuat ulang halaman', 'Menghentikan JavaScript', 'Mengosongkan Console'],
      jawab: 1,
      bahas: 'Tanpa <code>preventDefault()</code>, form dikirim dan halaman <b>memuat ulang</b>, sehingga pesan yang ditampilkan JavaScript langsung hilang.'
    },
    {
      tipe: 'susun', dom: 'event',
      tanya: 'Susun kode agar form <code>#formDaftar</code> tidak memuat ulang halaman saat dikirim, lalu menampilkan "terkirim" di Console.',
      baris: ['const form = document.querySelector("#formDaftar");', 'form.addEventListener("submit", (e) => {', '  e.preventDefault();', '  console.log("terkirim");', '});'],
      bahas: 'Pilih form → pasang listener <code>submit</code> pada <b>form</b> (bukan tombol) → cegah perilaku bawaan dulu → baru proses datanya.'
    }
  ]
};
})();
