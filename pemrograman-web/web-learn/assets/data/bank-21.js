/* Bank soal Pertemuan 21 — DOM Manipulation (Event ada di bank-22.js) */
(function () {
'use strict';
window.BANK = window.BANK || {};

/* ── Halaman yang disediakan (HTML & CSS tidak diubah, siswa menulis script.js) ── */
var CSS_DASAR = [
  'body {',
  '  font-family: Arial, sans-serif;',
  '  padding: 20px;',
  '  transition: background-color 0.3s ease, color 0.3s ease;',
  '}',
  '',
  '.kotak {',
  '  width: 220px;',
  '  margin: 15px 0;',
  '  padding: 20px;',
  '  background-color: #4A90E2;',
  '  color: white;',
  '  border-radius: 8px;',
  '}',
  '',
  '.aktif { background-color: #2ecc71; }',
  '.besar { font-size: 28px; }',
  '.sembunyi { display: none; }',
  '',
  'body.dark-mode {',
  '  background-color: #1a1a1a;',
  '  color: #f0f0f0;',
  '}'
].join('\n');

function dokumen(judul, isi) {
  return '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + judul + '</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n' + isi + '\n\n  <script src="script.js"></script>\n</body>\n</html>';
}

window.HALAMAN_DOM = window.HALAMAN_DOM || {};
window.HALAMAN_DOM.dasar = {
  html: dokumen('DOM Manipulation', [
    '  <h1 id="judul">Belajar DOM</h1>',
    '  <p class="deskripsi">Ini paragraf pertama.</p>',
    '  <p class="deskripsi">Ini paragraf kedua.</p>',
    '',
    '  <ul id="daftar">',
    '    <li>Satu</li>',
    '    <li>Dua</li>',
    '    <li>Tiga</li>',
    '  </ul>',
    '',
    '  <div id="kotak" class="kotak">Kotak</div>',
    '',
    '  <a id="tautan" href="https://www.google.com">Ke Google</a>',
    '  <br><br>',
    '  <input id="nama" type="text" placeholder="Ketik nama...">',
    '  <br><br>',
    '  <button id="tombol1">Tombol 1</button>',
    '  <button id="tombol2">Tombol 2</button>',
    '  <button id="tombol3">Tombol 3</button>'
  ].join('\n')),
  css: CSS_DASAR
};

/* Pemeriksa singkat */
function teksIs(harap) {
  return function (ctx) { return ctx.hasil === harap ? true : 'Diharapkan "' + harap + '", di halaman tertulis "' + ctx.hasil + '".'; };
}
function cocok(pola, pesan) {
  return function (ctx) { return typeof ctx.hasil === 'string' && pola.test(ctx.hasil) ? true : (pesan || 'Belum sesuai') + ' Di halaman: "' + ctx.hasil + '".'; };
}
var KOTAK = 'document.querySelector("#kotak")';

window.BANK['21'] = {
  judul: 'DOM',

  latihan: {
    /* ── Praktik dari slide ── */
    p1: {
      id: 'p1', mode: 'dom',
      judul: 'Praktik 1 — DOM siap!',
      soal: '<p class="content-text">Halaman <code>index.html</code> dan <code>style.css</code> sudah disediakan (lihat tab-nya). Di <code>script.js</code> tulis <code>console.log("DOM siap!");</code> dan pastikan muncul di Console. Lihat juga tab <strong>Preview</strong>: halamannya sudah tampil.</p>',
      starter: '',
      solusi: 'console.log("DOM siap!");',
      petunjuk: ['Cukup satu baris: <code>console.log("DOM siap!");</code>'],
      tes: [{ nama: 'Console menampilkan "DOM siap!"', output: ['DOM siap!'] }]
    },
    p2: {
      id: 'p2', mode: 'dom',
      judul: 'Praktik 2 — Memilih elemen',
      soal: '<p class="content-text">Pilih elemen berikut dan tampilkan di Console dengan <code>console.log()</code>, <strong>berurutan</strong>:</p>' +
        '<ol class="task-list"><li><code>#judul</code> dengan <code>getElementById</code></li><li><code>#kotak</code> dengan <code>querySelector</code></li>' +
        '<li>Semua <code>.deskripsi</code> dengan <code>querySelectorAll</code>, lalu tampilkan <code>length</code> dan elemen ke-2</li>' +
        '<li>Semua <code>li</code> di dalam <code>#daftar</code></li><li>Elemen yang tidak ada, misalnya <code>#tidakAda</code>. Apa hasilnya?</li></ol>',
      starter: '',
      solusi: 'const judul = document.getElementById("judul");\nconsole.log(judul);\n\nconst kotak = document.querySelector("#kotak");\nconsole.log(kotak);\n\nconst semuaParagraf = document.querySelectorAll(".deskripsi");\nconsole.log(semuaParagraf.length);\nconsole.log(semuaParagraf[1]);\n\nconsole.log(document.querySelectorAll("#daftar li"));\n\nconsole.log(document.querySelector("#tidakAda"));',
      petunjuk: [
        '<code>getElementById("judul")</code> — tanpa tanda <code>#</code>.',
        '<code>querySelector</code>/<code>querySelectorAll</code> memakai selector CSS: <code>"#kotak"</code>, <code>".deskripsi"</code>, <code>"#daftar li"</code>.',
        'Elemen ke-2 ada di index <code>[1]</code>.'
      ],
      syarat: [
        { nama: 'Memakai getElementById', pola: /getElementById\s*\(\s*["'`]judul["'`]\s*\)/ },
        { nama: 'Memakai querySelector', pola: /querySelector\s*\(\s*["'`]#kotak["'`]/ },
        { nama: 'Memakai querySelectorAll', pola: /querySelectorAll\s*\(/ }
      ],
      tes: [
        { nama: 'Output berurutan: judul, kotak, 2, paragraf kedua, NodeList li, null', output: ['<h1 id="judul">Belajar DOM</h1>', '<div id="kotak" class="kotak">Kotak</div>', '2', '<p class="deskripsi">Ini paragraf kedua.</p>', 'NodeList(3) [li, li, li]', 'null'] }
      ]
    },
    p3: {
      id: 'p3', mode: 'dom',
      judul: 'Praktik 3 — textContent & innerHTML',
      soal: '<ol class="task-list"><li>Ubah teks <code>#judul</code> menjadi <code>Halo, [namamu]!</code></li>' +
        '<li>Ubah teks paragraf kedua (pakai <code>querySelectorAll</code> dan index <code>[1]</code>)</li>' +
        '<li>Ubah <code>#kotak</code> dengan <code>innerHTML</code> dan <code>"Halo &lt;b&gt;Dunia&lt;/b&gt;"</code>. Jalankan, lalu ganti ke <code>textContent</code>. Bandingkan tampilannya di Preview</li>' +
        '<li>Ganti seluruh isi <code>#daftar</code> dengan 3 buah favoritmu memakai <code>innerHTML</code></li></ol>',
      starter: '',
      solusi: 'document.querySelector("#judul").textContent = "Halo, Budi!";\n\nconst paragraf = document.querySelectorAll(".deskripsi");\nparagraf[1].textContent = "Paragraf kedua sudah diganti.";\n\ndocument.querySelector("#kotak").innerHTML = "Halo <b>Dunia</b>";\n\nconst daftar = document.querySelector("#daftar");\ndaftar.innerHTML = "<li>Apel</li><li>Jeruk</li><li>Mangga</li>";',
      petunjuk: [
        '<code>document.querySelector("#judul").textContent = "Halo, Budi!";</code>',
        '<code>document.querySelectorAll(".deskripsi")[1].textContent = "...";</code>',
        'Isi <code>innerHTML</code> boleh memuat tag: <code>"&lt;li&gt;Apel&lt;/li&gt;&lt;li&gt;Jeruk&lt;/li&gt;&lt;li&gt;Mangga&lt;/li&gt;"</code>'
      ],
      tes: [
        { nama: '#judul berbunyi "Halo, [nama]!"', panggil: '__teks("#judul")', cek: cocok(/^Halo, .+!$/, 'Teks #judul harus berbentuk "Halo, namamu!".') },
        { nama: 'Paragraf kedua sudah diubah', panggil: '__semua(".deskripsi")', cek: function (ctx) { var p = ctx.hasil || []; if (p[0] !== 'Ini paragraf pertama.') return 'Paragraf PERTAMA jangan ikut diubah (pakai index [1]).'; return p[1] && p[1] !== 'Ini paragraf kedua.' ? true : 'Paragraf kedua masih berisi teks awal.'; } },
        { nama: '#kotak berisi Halo <b>Dunia</b> (innerHTML atau textContent)', panggil: '[' + KOTAK + '.innerHTML, ' + KOTAK + '.textContent]', cek: function (ctx) { var h = ctx.hasil || []; return h[0] === 'Halo <b>Dunia</b>' || h[1] === 'Halo <b>Dunia</b>' ? true : 'Isi #kotak belum "Halo <b>Dunia</b>".'; } },
        { nama: '#daftar berisi 3 buah baru', panggil: '__semua("#daftar li")', cek: function (ctx) { var l = ctx.hasil || []; if (l.length !== 3) return '#daftar harus berisi 3 <li>, sekarang ' + l.length + '.'; return l.join() !== 'Satu,Dua,Tiga' ? true : 'Isi #daftar masih Satu, Dua, Tiga.'; } }
      ]
    },
    p4: {
      id: 'p4', mode: 'dom',
      judul: 'Praktik 4 — style',
      soal: '<p class="content-text">Ubah <code>#kotak</code> memakai <code>style</code>: warna latar, warna teks, ukuran font <code>24px</code>, <code>borderRadius</code> <code>20px</code>, dan <code>padding</code> <code>30px</code>. Amati hasilnya di Preview.</p>',
      starter: 'const kotak = document.querySelector("#kotak");\n\n',
      solusi: 'const kotak = document.querySelector("#kotak");\n\nkotak.style.backgroundColor = "tomato";\nkotak.style.color = "white";\nkotak.style.fontSize = "24px";\nkotak.style.borderRadius = "20px";\nkotak.style.padding = "30px";',
      petunjuk: ['Nama property CSS ditulis camelCase: <code>backgroundColor</code>, <code>fontSize</code>, <code>borderRadius</code>.', 'Nilainya string lengkap dengan satuan: <code>"24px"</code>.'],
      tes: [
        { nama: 'Warna latar & warna teks diubah', panggil: '[' + KOTAK + '.style.backgroundColor, ' + KOTAK + '.style.color]', cek: function (ctx) { var h = ctx.hasil || []; if (!h[0]) return 'style.backgroundColor belum diisi.'; return h[1] ? true : 'style.color belum diisi.'; } },
        { nama: 'fontSize 24px', panggil: KOTAK + '.style.fontSize', hasil: '24px' },
        { nama: 'borderRadius 20px', panggil: KOTAK + '.style.borderRadius', hasil: '20px' },
        { nama: 'padding 30px', panggil: KOTAK + '.style.padding', hasil: '30px' }
      ]
    },
    p5: {
      id: 'p5', mode: 'dom',
      judul: 'Praktik 5 — classList',
      soal: '<ol class="task-list"><li>Tambahkan class <code>aktif</code> ke <code>#kotak</code> dan amati perubahannya</li><li>Tambahkan class <code>besar</code>, lalu hapus class <code>aktif</code></li>' +
        '<li>Gunakan <code>toggle("sembunyi")</code> <strong>sekali</strong>, jalankan; lalu <strong>dua kali berturut-turut</strong>. Apa yang terjadi?</li><li>Tampilkan <code>contains("besar")</code> dan <code>contains("aktif")</code> di Console</li></ol>',
      starter: 'const kotak = document.querySelector("#kotak");\n\n',
      solusi: 'const kotak = document.querySelector("#kotak");\n\nkotak.classList.add("aktif");\nkotak.classList.add("besar");\nkotak.classList.remove("aktif");\n\nkotak.classList.toggle("sembunyi");\nkotak.classList.toggle("sembunyi");   // dua kali → kembali tampil\n\nconsole.log(kotak.classList.contains("besar"));   // true\nconsole.log(kotak.classList.contains("aktif"));   // false',
      petunjuk: ['Nama class ditulis <strong>tanpa titik</strong>: <code>add("aktif")</code>.', 'Toggle dua kali = kembali seperti semula.'],
      syarat: [
        { nama: 'Memakai classList.toggle("sembunyi")', pola: /classList\s*\.\s*toggle\s*\(\s*["'`]sembunyi["'`]/ },
        { nama: 'Memakai classList.contains', pola: /classList\s*\.\s*contains\s*\(/ }
      ],
      tes: [
        { nama: '#kotak punya class besar, tanpa aktif', panggil: '__kelas("#kotak")', cek: function (ctx) { var k = ctx.hasil || []; if (k.indexOf('besar') === -1) return 'Class besar belum ditambahkan.'; return k.indexOf('aktif') === -1 ? true : 'Class aktif seharusnya sudah dihapus.'; } },
        { nama: 'Console: true lalu false', output: ['true', 'false'] }
      ]
    },
    p6: {
      id: 'p6', mode: 'dom',
      judul: 'Praktik 6 — Atribut',
      soal: '<ol class="task-list"><li>Ubah <code>href</code> pada <code>#tautan</code> ke situs lain, ubah juga teksnya. <strong>Klik tautannya</strong> di Preview dan lihat ke mana tujuannya</li><li>Ubah <code>placeholder</code> pada <code>#nama</code></li><li>Tampilkan <code>getAttribute("href")</code> di Console</li></ol>',
      starter: 'const tautan = document.querySelector("#tautan");\n\n',
      solusi: 'const tautan = document.querySelector("#tautan");\n\ntautan.setAttribute("href", "https://www.youtube.com");\ntautan.textContent = "Ke YouTube";\n\ndocument.querySelector("#nama").setAttribute("placeholder", "Nama lengkap...");\n\nconsole.log(tautan.getAttribute("href"));',
      petunjuk: ['<code>tautan.setAttribute("href", "https://...")</code>', '<code>getAttribute("href")</code> mengembalikan teks href saat ini.'],
      syarat: [{ nama: 'Memakai setAttribute', pola: /setAttribute\s*\(/ }],
      tes: [
        { nama: 'href diganti ke situs lain', panggil: 'document.querySelector("#tautan").getAttribute("href")', cek: function (ctx) { return ctx.hasil && ctx.hasil !== 'https://www.google.com' ? true : 'href masih https://www.google.com.'; } },
        { nama: 'Teks tautan diganti', panggil: '__teks("#tautan")', cek: function (ctx) { return ctx.hasil && ctx.hasil !== 'Ke Google' ? true : 'Teks tautan masih "Ke Google".'; } },
        { nama: 'placeholder #nama diganti', panggil: 'document.querySelector("#nama").getAttribute("placeholder")', cek: function (ctx) { return ctx.hasil && ctx.hasil !== 'Ketik nama...' ? true : 'placeholder masih "Ketik nama...".'; } },
        { nama: 'Console menampilkan href baru', panggil: 'document.querySelector("#tautan").getAttribute("href")', cek: function (ctx) { return ctx.logs.indexOf(ctx.hasil) !== -1 ? true : 'Tampilkan href baru dengan console.log(tautan.getAttribute("href"));'; } }
      ]
    },
    p7: {
      id: 'p7', mode: 'dom',
      judul: 'Praktik 7 — Membuat & menghapus elemen',
      soal: '<ol class="task-list"><li>Tambahkan <code>&lt;li&gt;</code> baru berisi <code>"Empat"</code> di <strong>akhir</strong> <code>#daftar</code></li><li>Tambahkan <code>&lt;li&gt;</code> baru berisi <code>"Nol"</code> di <strong>awal</strong> <code>#daftar</code></li>' +
        '<li>Hapus item yang bertuliskan <code>"Dua"</code> (cari index-nya setelah penambahan tadi)</li><li>Tampilkan jumlah item dengan <code>document.querySelectorAll("#daftar li").length</code></li></ol>',
      starter: 'const daftar = document.querySelector("#daftar");\n\n',
      solusi: 'const daftar = document.querySelector("#daftar");\n\nconst empat = document.createElement("li");\nempat.textContent = "Empat";\ndaftar.append(empat);\n\nconst nol = document.createElement("li");\nnol.textContent = "Nol";\ndaftar.prepend(nol);\n\n// urutan: Nol, Satu, Dua, Tiga, Empat → "Dua" di index 2\ndocument.querySelectorAll("#daftar li")[2].remove();\n\nconsole.log(document.querySelectorAll("#daftar li").length);',
      petunjuk: ['3 langkah: <code>createElement("li")</code> → isi <code>textContent</code> → <code>append</code>/<code>prepend</code>.', 'Setelah "Nol" ditambah di awal, semua index bergeser +1.', 'Hapus dengan <code>elemen.remove()</code>.'],
      syarat: [
        { nama: 'Memakai createElement', pola: /createElement\s*\(/ },
        { nama: 'Memakai append & prepend', pola: /\.append\s*\([\s\S]*\.prepend\s*\(|\.prepend\s*\([\s\S]*\.append\s*\(/ },
        { nama: 'Memakai remove()', pola: /\.remove\s*\(\s*\)/ }
      ],
      tes: [
        { nama: 'Isi #daftar: Nol, Satu, Tiga, Empat', panggil: '__semua("#daftar li")', hasil: ['Nol', 'Satu', 'Tiga', 'Empat'] },
        { nama: 'Console menampilkan 4', mengandung: ['4'] }
      ]
    },
    p8: {
      id: 'p8', mode: 'dom',
      judul: 'Praktik 8 — Penghitung klik',
      soal: '<p class="content-text">Ketik contoh penghitung klik, lalu <strong>klik Tombol 1 berkali-kali</strong> di Preview. Amati teks tombol dan warna kotak. Lalu ubah agar setiap klik juga mengubah teks <code>#judul</code> menjadi <code>"Klik ke-N"</code> (N = nilai <code>hitung</code>).</p>',
      starter: 'const tombol = document.querySelector("#tombol1");\nconst kotak = document.querySelector("#kotak");\nlet hitung = 0;\n\ntombol.addEventListener("click", () => {\n  hitung++;\n  tombol.textContent = `Diklik ${hitung} kali`;\n  kotak.classList.toggle("aktif");\n  // tambahkan: ubah teks #judul\n});\n',
      solusi: 'const tombol = document.querySelector("#tombol1");\nconst kotak = document.querySelector("#kotak");\nconst judul = document.querySelector("#judul");\nlet hitung = 0;\n\ntombol.addEventListener("click", () => {\n  hitung++;\n  tombol.textContent = `Diklik ${hitung} kali`;\n  kotak.classList.toggle("aktif");\n  judul.textContent = `Klik ke-${hitung}`;\n});',
      petunjuk: ['Di dalam function klik tambahkan <code>document.querySelector("#judul").textContent = `Klik ke-${hitung}`;</code>'],
      tes: [
        { nama: '3 klik → tombol "Diklik 3 kali"', pesan: 'Variabel hitung harus dibuat di LUAR function klik.', panggil: '(__klik("#tombol1", 3), __teks("#tombol1"))', hasil: 'Diklik 3 kali' },
        { nama: '3 klik → judul "Klik ke-3"', panggil: '(__klik("#tombol1", 3), __teks("#judul"))', hasil: 'Klik ke-3' },
        { nama: 'Kotak bergantian warna (aktif setelah klik ganjil)', pesan: 'Format: setelah klik ke-1, setelah klik ke-2. Pakai classList.toggle("aktif").', panggil: '(__klik("#tombol1"), ' + KOTAK + '.classList.contains("aktif")) + "," + (__klik("#tombol1"), ' + KOTAK + '.classList.contains("aktif"))', hasil: 'true,false' }
      ]
    },

    /* ── Latihan B (tugas mandiri dari slide) ── */
    b1: {
      id: 'b1', mode: 'dom', jenis: 'latihan',
      judul: 'B1 — Ubah Teks',
      soal: '<p class="content-text">Ubah teks <code>#judul</code> menjadi <code>Halo, [namamu]!</code>. Ubah juga teks <strong>kedua</strong> paragraf <code>.deskripsi</code> (pakai <code>querySelectorAll</code>) dengan kalimat buatanmu sendiri.</p>',
      starter: '',
      solusi: 'document.querySelector("#judul").textContent = "Halo, Budi!";\nconst paragraf = document.querySelectorAll(".deskripsi");\nparagraf[0].textContent = "Ini paragraf pertama yang sudah diubah.";\nparagraf[1].textContent = "Ini paragraf kedua yang sudah diubah.";',
      syarat: [{ nama: 'Memakai querySelectorAll', pola: /querySelectorAll\s*\(/ }],
      tes: [
        { nama: '#judul "Halo, [nama]!"', panggil: '__teks("#judul")', cek: cocok(/^Halo, .+!$/, 'Teks #judul harus berbentuk "Halo, namamu!".') },
        { nama: 'Kedua paragraf sudah diganti', panggil: '__semua(".deskripsi")', cek: function (ctx) { var p = ctx.hasil || []; return p[0] !== 'Ini paragraf pertama.' && p[1] !== 'Ini paragraf kedua.' ? true : 'Kedua paragraf harus diganti dengan kalimatmu sendiri.'; } }
      ]
    },
    b2: {
      id: 'b2', mode: 'dom', jenis: 'latihan',
      judul: 'B2 — Kotak Berwarna',
      soal: '<p class="content-text">Ubah <code>#kotak</code> memakai <code>style</code>: warna latar, warna teks, <code>fontSize</code> <code>24px</code>, <code>borderRadius</code> <code>20px</code>, dan <code>padding</code> <code>30px</code>.</p>',
      starter: '',
      solusi: 'const kotak = document.querySelector("#kotak");\nkotak.style.backgroundColor = "tomato";\nkotak.style.color = "white";\nkotak.style.fontSize = "24px";\nkotak.style.borderRadius = "20px";\nkotak.style.padding = "30px";',
      tes: [
        { nama: 'backgroundColor & color diisi', panggil: '[' + KOTAK + '.style.backgroundColor, ' + KOTAK + '.style.color]', cek: function (ctx) { var h = ctx.hasil || []; return h[0] && h[1] ? true : 'Warna latar dan warna teks harus diisi.'; } },
        { nama: 'fontSize, borderRadius, padding', panggil: '[' + KOTAK + '.style.fontSize, ' + KOTAK + '.style.borderRadius, ' + KOTAK + '.style.padding].join(" ")', hasil: '24px 20px 30px' }
      ]
    },
    b3: {
      id: 'b3', mode: 'dom', jenis: 'latihan',
      judul: 'B3 — Sembunyikan & Hapus',
      soal: '<p class="content-text">Sembunyikan paragraf <strong>pertama</strong> <code>.deskripsi</code> memakai <code>style.display = "none"</code>. Lalu <strong>hapus</strong> paragraf <strong>kedua</strong> memakai <code>remove()</code>.</p>',
      starter: '',
      solusi: 'const paragraf = document.querySelectorAll(".deskripsi");\nparagraf[0].style.display = "none";\nparagraf[1].remove();',
      tes: [
        { nama: 'Paragraf pertama disembunyikan (masih ada di DOM)', panggil: 'document.querySelector(".deskripsi").style.display', hasil: 'none' },
        { nama: 'Paragraf kedua dihapus (tinggal 1 .deskripsi)', panggil: '__hitung(".deskripsi")', hasil: 1 }
      ]
    },
    b4: {
      id: 'b4', mode: 'dom', jenis: 'latihan',
      judul: 'B4 — Bermain Class',
      soal: '<p class="content-text">Pada <code>#kotak</code>: tambahkan class <code>aktif</code>, tambahkan class <code>besar</code>, lalu hapus class <code>besar</code>. Tampilkan hasil <code>contains("aktif")</code> dan <code>contains("besar")</code> di Console.</p>',
      starter: '',
      solusi: 'const kotak = document.querySelector("#kotak");\nkotak.classList.add("aktif");\nkotak.classList.add("besar");\nkotak.classList.remove("besar");\nconsole.log(kotak.classList.contains("aktif"));\nconsole.log(kotak.classList.contains("besar"));',
      tes: [
        { nama: 'Class akhir: kotak aktif', panggil: '__kelas("#kotak").join(" ")', hasil: 'kotak aktif' },
        { nama: 'Console: true lalu false', output: ['true', 'false'] }
      ]
    },
    b5: {
      id: 'b5', mode: 'dom', jenis: 'latihan',
      judul: 'B5 — Daftar Hobi',
      soal: '<p class="content-text">Ganti seluruh isi <code>#daftar</code> dengan <strong>4 hobimu</strong> memakai <code>innerHTML</code>.</p>',
      starter: '',
      solusi: 'document.querySelector("#daftar").innerHTML =\n  "<li>Ngoding</li><li>Membaca</li><li>Gaming</li><li>Renang</li>";',
      syarat: [{ nama: 'Memakai innerHTML', pola: /\.innerHTML\s*=/ }],
      tes: [{ nama: '#daftar berisi 4 <li>', panggil: '__hitung("#daftar li")', hasil: 4 }]
    },
    b6: {
      id: 'b6', mode: 'dom', jenis: 'latihan',
      judul: 'B6 — Menambah & Menghapus Item',
      soal: '<p class="content-text">Daftar 4 hobi dari B5 sudah disiapkan di awal kode. Lanjutkan:</p><ol class="task-list"><li>Tambahkan 1 hobi baru di <strong>akhir</strong> (<code>append</code>)</li><li>Tambahkan 1 hobi baru di <strong>awal</strong> (<code>prepend</code>)</li><li>Hapus item pada <strong>index 2</strong> (setelah penambahan di atas)</li><li>Tampilkan jumlah item akhir dengan <code>length</code></li></ol>',
      starter: 'document.querySelector("#daftar").innerHTML =\n  "<li>Ngoding</li><li>Membaca</li><li>Gaming</li><li>Renang</li>";\n\n',
      solusi: 'document.querySelector("#daftar").innerHTML =\n  "<li>Ngoding</li><li>Membaca</li><li>Gaming</li><li>Renang</li>";\n\nconst daftar = document.querySelector("#daftar");\n\nconst itemAkhir = document.createElement("li");\nitemAkhir.textContent = "Menulis";\ndaftar.append(itemAkhir);\n\nconst itemAwal = document.createElement("li");\nitemAwal.textContent = "Olahraga";\ndaftar.prepend(itemAwal);\n\n// Urutan: Olahraga, Ngoding, Membaca, Gaming, Renang, Menulis\ndocument.querySelectorAll("#daftar li")[2].remove();\nconsole.log(document.querySelectorAll("#daftar li").length);',
      syarat: [{ nama: 'Memakai append & prepend', pola: /\.append\s*\([\s\S]*\.prepend\s*\(|\.prepend\s*\([\s\S]*\.append\s*\(/ }, { nama: 'Memakai remove()', pola: /\.remove\s*\(\s*\)/ }],
      tes: [
        { nama: 'Ada 5 item akhir', panggil: '__hitung("#daftar li")', hasil: 5 },
        { nama: '"Membaca" (index 2 setelah penambahan) terhapus', panggil: '__semua("#daftar li")', cek: function (ctx) { var l = ctx.hasil || []; if (l.indexOf('Membaca') !== -1) return 'Item index 2 setelah penambahan (Membaca) belum terhapus.'; return l[1] === 'Ngoding' && l[2] === 'Gaming' ? true : 'Urutan item belum sesuai: ' + l.join(', '); } },
        { nama: 'Console menampilkan 5', mengandung: ['5'] }
      ]
    },
    b7: {
      id: 'b7', mode: 'dom', jenis: 'latihan',
      judul: 'B7 — Mengubah Atribut',
      soal: '<p class="content-text">Ubah <code>href</code> dan teks <code>#tautan</code> ke situs lain, ubah <code>placeholder</code> pada <code>#nama</code>, lalu tampilkan nilai <code>href</code> baru dengan <code>getAttribute</code>. Klik tautannya di Preview untuk memastikan tujuannya.</p>',
      starter: '',
      solusi: 'const tautan = document.querySelector("#tautan");\ntautan.setAttribute("href", "https://www.youtube.com");\ntautan.textContent = "Ke YouTube";\ndocument.querySelector("#nama").setAttribute("placeholder", "Nama lengkap...");\nconsole.log(tautan.getAttribute("href"));',
      tes: [
        { nama: 'href & teks tautan diganti', panggil: '[document.querySelector("#tautan").getAttribute("href"), __teks("#tautan")]', cek: function (ctx) { var h = ctx.hasil || []; if (h[0] === 'https://www.google.com') return 'href masih Google.'; return h[1] !== 'Ke Google' ? true : 'Teks tautan masih "Ke Google".'; } },
        { nama: 'placeholder diganti', panggil: 'document.querySelector("#nama").placeholder', cek: function (ctx) { return ctx.hasil !== 'Ketik nama...' ? true : 'placeholder belum diganti.'; } },
        { nama: 'href baru tampil di Console', panggil: 'document.querySelector("#tautan").getAttribute("href")', cek: function (ctx) { return ctx.logs.indexOf(ctx.hasil) !== -1 ? true : 'Tampilkan href baru di Console.'; } }
      ]
    },
    b8: {
      id: 'b8', mode: 'dom', jenis: 'latihan',
      judul: 'B8 — Tombol Penghitung',
      soal: '<p class="content-text">Pada <code>#tombol1</code>: setiap kali diklik, teks tombol berubah menjadi <code>Diklik N kali</code> (N = jumlah klik) <strong>dan</strong> <code>#kotak</code> bergantian berubah warna memakai <code>classList.toggle("aktif")</code>.</p>',
      starter: '',
      solusi: 'const tombol = document.querySelector("#tombol1");\nconst kotak = document.querySelector("#kotak");\nlet hitung = 0;\n\ntombol.addEventListener("click", () => {\n  hitung++;\n  tombol.textContent = `Diklik ${hitung} kali`;\n  kotak.classList.toggle("aktif");\n});',
      tes: [
        { nama: '1 klik → "Diklik 1 kali" & kotak aktif', pesan: 'Format: teks tombol | kotak punya class aktif?', panggil: '(__klik("#tombol1"), __teks("#tombol1") + "|" + ' + KOTAK + '.classList.contains("aktif"))', hasil: 'Diklik 1 kali|true' },
        { nama: '4 klik → "Diklik 4 kali" & kotak tidak aktif', pesan: 'Format: teks tombol | kotak punya class aktif?', panggil: '(__klik("#tombol1", 4), __teks("#tombol1") + "|" + ' + KOTAK + '.classList.contains("aktif"))', hasil: 'Diklik 4 kali|false' }
      ]
    },

    /* ── Latihan C: cari & perbaiki ── */
    c1: {
      id: 'c1', mode: 'dom', jenis: 'perbaiki',
      judul: 'C1 — Selector tanpa #',
      soal: '<p class="content-text">Kode ini ingin memilih elemen dengan id <code>judul</code> lalu mengubah teksnya menjadi <code>Halo</code>. Jalankan, baca error-nya, tulis kesalahannya di komentar, lalu perbaiki.</p>',
      starter: 'const judul = document.querySelector("judul");   // ingin memilih elemen dengan id "judul"\njudul.textContent = "Halo";\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: "judul" mencari TAG <judul> (tidak ada) → null.\nconst judul = document.querySelector("#judul");\njudul.textContent = "Halo";',
      petunjuk: ['Selector id wajib diawali <code>#</code>.'],
      tes: [{ nama: '#judul berubah menjadi "Halo"', panggil: '__teks("#judul")', hasil: 'Halo' }]
    },
    c2: {
      id: 'c2', mode: 'dom', jenis: 'perbaiki',
      judul: 'C2 — Daftar diperlakukan seperti satu elemen',
      soal: '<p class="content-text">Kode ini ingin mengubah teks <strong>paragraf pertama</strong> menjadi <code>Teks baru</code>, tapi tidak ada yang berubah di Preview. Kenapa?</p>',
      starter: 'const semua = document.querySelectorAll(".deskripsi");\nsemua.textContent = "Teks baru";                  // ingin mengubah paragraf pertama\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: querySelectorAll menghasilkan DAFTAR, bukan satu elemen.\nconst semua = document.querySelectorAll(".deskripsi");\nsemua[0].textContent = "Teks baru";',
      petunjuk: ['Ambil satu elemen dari daftar dengan index: <code>semua[0]</code>.'],
      tes: [{ nama: 'Paragraf pertama "Teks baru", kedua tetap', panggil: '__semua(".deskripsi")', hasil: ['Teks baru', 'Ini paragraf kedua.'] }]
    },
    c3: {
      id: 'c3', mode: 'dom', jenis: 'perbaiki',
      judul: 'C3 — Nama property CSS',
      soal: '<p class="content-text">Kode ini ingin membuat latar <code>#kotak</code> berwarna merah.</p>',
      starter: 'const kotak = document.querySelector("#kotak");\nkotak.style.background-color = "red";\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: background-color dibaca sebagai pengurangan (background - color).\nconst kotak = document.querySelector("#kotak");\nkotak.style.backgroundColor = "red";',
      petunjuk: ['Di JavaScript, nama property CSS ditulis camelCase.'],
      tes: [{ nama: 'style.backgroundColor = "red"', panggil: KOTAK + '.style.backgroundColor', hasil: 'red' }]
    },
    c4: {
      id: 'c4', mode: 'dom', jenis: 'perbaiki',
      judul: 'C4 — Nilai tanpa satuan',
      soal: '<p class="content-text">Kode ini ingin membuat ukuran font <code>#kotak</code> menjadi 24 piksel, tapi tampilannya tidak berubah.</p>',
      starter: 'const kotak = document.querySelector("#kotak");\nkotak.style.fontSize = 24;                        // ingin ukuran font 24 piksel\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: nilai style harus string lengkap dengan satuan.\nconst kotak = document.querySelector("#kotak");\nkotak.style.fontSize = "24px";',
      petunjuk: ['Nilai style berupa string + satuan: <code>"24px"</code>.'],
      tes: [{ nama: 'style.fontSize = "24px"', panggil: KOTAK + '.style.fontSize', hasil: '24px' }]
    },
    c5: {
      id: 'c5', mode: 'dom', jenis: 'perbaiki',
      judul: 'C5 — Titik di nama class',
      soal: '<p class="content-text">Kode ini ingin membuat <code>#kotak</code> berwarna hijau (class <code>aktif</code>).</p>',
      starter: 'const kotak = document.querySelector("#kotak");\nkotak.classList.add(".aktif");                    // ingin kotak berwarna hijau\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: nama class ditulis tanpa titik.\nconst kotak = document.querySelector("#kotak");\nkotak.classList.add("aktif");',
      petunjuk: ['Titik hanya dipakai di selector CSS, bukan di classList.'],
      tes: [{ nama: 'Class kotak menjadi "kotak aktif"', panggil: '__kelas("#kotak").join(" ")', hasil: 'kotak aktif' }]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1', mode: 'dom', jenis: 'tantangan',
      judul: 'Dark Mode (B9)',
      soal: '<p class="content-text">Pada <code>#tombol2</code>: setiap klik men-<em>toggle</em> class <code>dark-mode</code> pada <code>document.body</code>. Ubah teks tombol: <code>"☀️ Mode Terang"</code> saat mode gelap aktif, dan <code>"🌙 Mode Gelap"</code> saat mode terang aktif (gunakan <code>if/else</code> dan <code>contains</code>).</p>',
      starter: 'const tombol = document.querySelector("#tombol2");\n\n',
      solusi: 'const tombol = document.querySelector("#tombol2");\n\ntombol.addEventListener("click", () => {\n  document.body.classList.toggle("dark-mode");\n\n  if (document.body.classList.contains("dark-mode")) {\n    tombol.textContent = "☀️ Mode Terang";\n  } else {\n    tombol.textContent = "🌙 Mode Gelap";\n  }\n});',
      petunjuk: ['<code>document.body.classList.toggle("dark-mode")</code>', 'Setelah toggle, cek dengan <code>document.body.classList.contains("dark-mode")</code>.'],
      syarat: [{ nama: 'Memakai classList.contains', pola: /classList\s*\.\s*contains\s*\(/ }],
      tes: [
        { nama: 'Belum diklik → body tanpa dark-mode', panggil: 'document.body.classList.contains("dark-mode")', hasil: false },
        { nama: '1 klik → body dark-mode', pesan: 'Pasang listener click di #tombol2 dan toggle class "dark-mode" pada document.body.', panggil: '(__klik("#tombol2"), document.body.classList.contains("dark-mode"))', hasil: true },
        { nama: '1 klik → tombol "☀️ Mode Terang"', panggil: '(__klik("#tombol2"), __teks("#tombol2"))', cek: cocok(/Mode Terang$/, 'Teks tombol saat gelap harus "☀️ Mode Terang".') },
        { nama: '2 klik → kembali terang', panggil: '(__klik("#tombol2", 2), document.body.classList.contains("dark-mode"))', hasil: false },
        { nama: '2 klik → tombol "🌙 Mode Gelap"', panggil: '(__klik("#tombol2", 2), __teks("#tombol2"))', cek: cocok(/Mode Gelap$/, 'Teks tombol saat terang harus "🌙 Mode Gelap".') }
      ]
    },
    {
      id: 't2', mode: 'dom', jenis: 'studi-kasus',
      judul: 'Daftar dari Array & Kartu dari Object (B10 + B11)',
      soal: '<p class="content-text">Data <code>buah</code> (array) dan <code>siswa</code> (object) sudah disediakan.</p>' +
        '<ol class="task-list"><li>Tampilkan isi array <code>buah</code> ke <code>#daftar</code> sebagai item <code>&lt;li&gt;</code> memakai <strong>satu kali</strong> <code>innerHTML</code>. <em>Petunjuk: manfaatkan <code>join</code>.</em></li>' +
        '<li>Tampilkan <code>siswa</code> di <code>#kotak</code>: nama <strong>tebal</strong>, lalu baris baru berisi kelas, lalu baris baru berisi umur — format <code>&lt;b&gt;Budi&lt;/b&gt;&lt;br&gt;Kelas: XI RPL&lt;br&gt;Umur: 16 tahun</code> (gunakan template literal).</li></ol>' +
        '<p class="content-text">Kode diuji juga dengan data lain, jadi jangan menulis isinya manual.</p>',
      input: 'const buah = ["Apel", "Jeruk", "Mangga", "Pisang"];\nconst siswa = { nama: "Budi", kelas: "XI RPL", umur: 16 };',
      starter: '// 1. buah → #daftar\n\n// 2. siswa → #kotak\n',
      solusi: '// 1. buah → #daftar\ndocument.querySelector("#daftar").innerHTML =\n  "<li>" + buah.join("</li><li>") + "</li>";\n\n// 2. siswa → #kotak\ndocument.querySelector("#kotak").innerHTML =\n  `<b>${siswa.nama}</b><br>Kelas: ${siswa.kelas}<br>Umur: ${siswa.umur} tahun`;',
      petunjuk: ['<code>"&lt;li&gt;" + buah.join("&lt;/li&gt;&lt;li&gt;") + "&lt;/li&gt;"</code> menghasilkan semua item sekaligus.', 'Kartu: <code>`&lt;b&gt;${siswa.nama}&lt;/b&gt;&lt;br&gt;Kelas: ${siswa.kelas}&lt;br&gt;Umur: ${siswa.umur} tahun`</code>'],
      syarat: [{ nama: 'Memakai innerHTML', pola: /\.innerHTML\s*=/ }],
      tes: [
        { nama: '#daftar berisi 4 buah', panggil: '__semua("#daftar li")', hasil: ['Apel', 'Jeruk', 'Mangga', 'Pisang'] },
        { nama: '#kotak sesuai format kartu', panggil: KOTAK + '.innerHTML', hasil: '<b>Budi</b><br>Kelas: XI RPL<br>Umur: 16 tahun' },
        { nama: 'Data lain: daftar ikut berubah', input: 'const buah = ["Durian", "Salak"];\nconst siswa = { nama: "Ani", kelas: "XI TKJ", umur: 17 };', panggil: '__semua("#daftar li")', hasil: ['Durian', 'Salak'] },
        { nama: 'Data lain: kartu ikut berubah', input: 'const buah = ["Durian", "Salak"];\nconst siswa = { nama: "Ani", kelas: "XI TKJ", umur: 17 };', panggil: KOTAK + '.innerHTML', hasil: '<b>Ani</b><br>Kelas: XI TKJ<br>Umur: 17 tahun' }
      ]
    },
    {
      id: 't3', mode: 'dom', jenis: 'tantangan',
      judul: 'Target Klik (B12)',
      soal: '<p class="content-text">Pada <code>#tombol3</code>: setiap klik menambah hitungan dan menampilkannya di teks tombol (<code>Diklik N kali</code>). Jika hitungan sudah <strong>mencapai 5 atau lebih</strong>, ubah <code>#kotak</code> menjadi berwarna <code>aktif</code> dan teksnya menjadi <code>"Target tercapai!"</code>.</p>',
      starter: '',
      solusi: 'const tombol = document.querySelector("#tombol3");\nconst kotak = document.querySelector("#kotak");\nlet hitung = 0;\n\ntombol.addEventListener("click", () => {\n  hitung++;\n  tombol.textContent = `Diklik ${hitung} kali`;\n\n  if (hitung >= 5) {\n    kotak.classList.add("aktif");\n    kotak.textContent = "Target tercapai!";\n  }\n});',
      petunjuk: ['Simpan hitungan di variabel <code>let</code> di <strong>luar</strong> function klik.', 'Gunakan <code>classList.add("aktif")</code> (bukan toggle) agar tetap hijau.'],
      tes: [
        { nama: '4 klik → tombol "Diklik 4 kali", kotak belum berubah', pesan: 'Format per bagian: teks tombol | teks kotak | kotak punya class aktif?', panggil: '(__klik("#tombol3", 4), __teks("#tombol3") + "|" + __teks("#kotak") + "|" + ' + KOTAK + '.classList.contains("aktif"))', hasil: 'Diklik 4 kali|Kotak|false' },
        { nama: '5 klik → kotak aktif & "Target tercapai!"', pesan: 'Format: teks kotak | kotak punya class aktif? Cek kondisi hitung >= 5.', panggil: '(__klik("#tombol3", 5), __teks("#kotak") + "|" + ' + KOTAK + '.classList.contains("aktif"))', hasil: 'Target tercapai!|true' },
        { nama: '6 klik → tetap aktif (bukan bergantian), tombol "Diklik 6 kali"', pesan: 'Pakai classList.add("aktif"), bukan toggle, supaya tetap hijau.', panggil: '(__klik("#tombol3", 6), __teks("#tombol3") + "|" + ' + KOTAK + '.classList.contains("aktif"))', hasil: 'Diklik 6 kali|true' }
      ]
    }
  ],

  /* Kuis (dinilai). Soal ber-kode dengan dom: 'dasar' dijalankan di halaman slide 3 saat verifikasi. */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Apa yang dimaksud dengan <strong>DOM</strong>?',
      opsi: [
        'Bahasa pemrograman baru untuk membuat halaman web',
        'Representasi halaman HTML berbentuk pohon objek yang dibuat browser, sehingga JavaScript bisa membaca & mengubahnya',
        'File CSS yang mengatur tampilan halaman',
        'Tempat menyimpan data di server'
      ],
      jawab: 1,
      bahas: '<b>DOM (Document Object Model)</b> = pohon objek dari halaman HTML. Setiap elemen adalah <b>object</b> dengan property (<code>textContent</code>, <code>style</code>) dan method (<code>remove()</code>, <code>append()</code>).'
    },
    {
      tipe: 'pg',
      tanya: 'Manakah penulisan yang <strong>salah</strong> untuk memilih <code>&lt;h1 id="judul"&gt;</code>?',
      opsi: ['`document.getElementById("judul")`', '`document.querySelector("#judul")`', '`document.getElementById("#judul")`', '`document.querySelector("h1")`'],
      jawab: 2,
      bahas: '<code>getElementById</code> menerima <b>nama id saja tanpa #</b>. Tanda <code>#</code> hanya dipakai di selector CSS (<code>querySelector</code>).'
    },
    {
      tipe: 'isian', dom: 'dasar',
      tanya: 'Memakai halaman slide 3, apa output kode berikut?',
      kode: 'console.log(document.querySelectorAll(".deskripsi").length);',
      jawab: ['2'],
      cekOutput: true,
      bahas: 'Ada dua <code>&lt;p class="deskripsi"&gt;</code>. <code>querySelectorAll</code> menghasilkan daftar yang punya <code>length</code>.'
    },
    {
      tipe: 'pg', dom: 'dasar',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(document.querySelectorAll("#daftar li")[1].textContent);',
      opsi: ['Satu', 'Dua', 'Tiga', 'undefined'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Index <code>[1]</code> adalah item <b>kedua</b>: "Dua".'
    },
    {
      tipe: 'pg', dom: 'dasar',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(document.querySelector("#tidakAda"));',
      opsi: ['undefined', 'null', '""', '`Error`'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Jika elemen tidak ditemukan, <code>querySelector</code> menghasilkan <code>null</code>. Kalau langsung dipakai (<code>null.textContent = ...</code>) barulah muncul TypeError.'
    },
    {
      tipe: 'pg',
      tanya: 'Setelah <code>kotak.innerHTML = "Halo &lt;b&gt;Dunia&lt;/b&gt;"</code>, apa yang <strong>tampil di halaman</strong>?',
      opsi: ['Halo <b>Dunia</b> — tag-nya ikut tampil sebagai teks', 'Halo Dunia — dengan kata "Dunia" bercetak tebal', 'Hanya kata "Dunia"', 'Tidak ada yang tampil'],
      jawab: 1,
      bahas: '<code>innerHTML</code> <b>memproses</b> tag HTML. Kalau memakai <code>textContent</code>, tag tidak diproses dan tampil apa adanya.'
    },
    {
      tipe: 'pg',
      tanya: 'Penulisan <code>style</code> mana yang <strong>benar</strong>?',
      opsi: ['`kotak.style.background-color = "red";`', '`kotak.style.fontSize = 24;`', '`kotak.style.backgroundColor = "red";`', '`kotak.style = "red";`'],
      jawab: 2,
      bahas: 'Nama property CSS ditulis <b>camelCase</b> dan nilainya <b>string lengkap dengan satuan</b> (<code>"24px"</code>).'
    },
    {
      tipe: 'isian', dom: 'dasar',
      tanya: 'Apa output kode berikut?',
      kode: 'const kotak = document.querySelector("#kotak");\nkotak.classList.add("aktif");\nkotak.classList.toggle("aktif");\nconsole.log(kotak.classList.contains("aktif"));',
      jawab: ['false'],
      cekOutput: true,
      bahas: '<code>add</code> menambahkan class, lalu <code>toggle</code> menghapusnya lagi karena sudah ada.'
    },
    {
      tipe: 'pg', dom: 'dasar',
      tanya: 'Apa output kode berikut?',
      kode: 'const daftar = document.querySelector("#daftar");\nconst li = document.createElement("li");\nli.textContent = "Empat";\nconsole.log(daftar.querySelectorAll("li").length);\ndaftar.append(li);\nconsole.log(daftar.querySelectorAll("li").length);',
      opsi: ['3\n3', '4\n4', '3\n4', '4\n5'],
      opsiKode: true,
      jawab: 2,
      cekOutput: true,
      bahas: 'Elemen hasil <code>createElement</code> <b>belum</b> masuk halaman sampai di-<code>append</code>.'
    },
    {
      tipe: 'bs',
      tanya: 'Kode <code>tombol.addEventListener("click", sapa());</code> akan menjalankan <code>sapa</code> setiap kali tombol diklik.',
      jawab: false,
      bahas: 'Dengan tanda kurung, <code>sapa()</code> langsung <b>dipanggil saat itu juga</b> dan hasilnya (biasanya <code>undefined</code>) yang dikirim. Callback harus dikirim tanpa kurung: <code>addEventListener("click", sapa)</code>.'
    },
    {
      tipe: 'bs',
      tanya: 'Jika <code>&lt;script src="script.js"&gt;</code> diletakkan di <code>&lt;head&gt;</code> tanpa <code>defer</code>, maka <code>document.querySelector("#judul")</code> di dalamnya bisa bernilai <code>null</code>.',
      jawab: true,
      bahas: 'Browser membaca HTML dari atas. Saat script di <code>&lt;head&gt;</code> berjalan, elemen di <code>&lt;body&gt;</code> belum dibuat. Solusi: script di bawah body, atribut <code>defer</code>, atau <code>DOMContentLoaded</code>.'
    },
    {
      tipe: 'susun', dom: 'dasar',
      tanya: 'Susun kode untuk menambahkan <code>&lt;li&gt;Empat&lt;/li&gt;</code> di akhir <code>#daftar</code>.',
      baris: ['const daftar = document.querySelector("#daftar");', 'const itemBaru = document.createElement("li");', 'itemBaru.textContent = "Empat";', 'daftar.append(itemBaru);'],
      cekOutput: true,
      bahas: 'Tiga langkah: <b>buat</b> (<code>createElement</code>) → <b>isi</b> (<code>textContent</code>) → <b>masukkan</b> (<code>append</code>).'
    }
  ]
};
})();
