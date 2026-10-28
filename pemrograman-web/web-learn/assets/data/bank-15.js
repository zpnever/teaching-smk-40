/* Bank soal Pertemuan 15 — Dasar JavaScript, Variabel & Tipe Data */
window.BANK = window.BANK || {};
window.BANK['15'] = {
  judul: 'Dasar JavaScript',

  /* Praktik dari slide (tidak dinilai) */
  latihan: {
    setup: {
      id: 'setup',
      judul: 'Halo, JavaScript!',
      soal: '<p class="content-text">Pemanasan dulu. Tampilkan teks <code>Halo, JavaScript!</code> ke console, persis seperti di slide.</p>',
      starter: '// Tampilkan Halo, JavaScript! di bawah ini\n',
      solusi: 'console.log("Halo, JavaScript!");',
      petunjuk: ['Pakai <code>console.log()</code>.', 'Teks harus diapit tanda kutip: <code>"Halo, JavaScript!"</code>'],
      tes: [{ nama: 'Output: Halo, JavaScript!', output: ['Halo, JavaScript!'] }]
    },
    p1: {
      id: 'p1',
      judul: 'Praktik 1 — Variabel let',
      soal: '<ol class="task-list">' +
        '<li>Masukkan nama dan umur kalian ke dalam variabel <code>nama</code> dan <code>umur</code> (pakai <code>let</code>).</li>' +
        '<li>Tampilkan keduanya di log.</li>' +
        '<li>Ubah isi <code>nama</code> menjadi nama teman kalian <strong>tanpa membuat variabel baru</strong>.</li>' +
        '<li>Cetak lagi namanya (baris output terakhir).</li></ol>',
      starter: '// 1. Buat variabel nama dan umur\n\n// 2. Tampilkan\n\n// 3. Ubah nama (tanpa let lagi!)\n\n// 4. Cetak lagi\n',
      solusi: 'let nama = "Danu";\nlet umur = 16;\nconsole.log(nama);\nconsole.log(umur);\n\nnama = "Aini";\nconsole.log(nama);',
      petunjuk: [
        'Deklarasi: <code>let nama = "Danu";</code>',
        'Mengubah nilai cukup <code>nama = "Aini";</code> — tanpa <code>let</code>, karena variabelnya sudah ada.'
      ],
      syarat: [
        { nama: 'Membuat variabel nama dengan let', pola: /\blet\s+nama\b/ },
        { nama: 'Membuat variabel umur dengan let', pola: /\blet\s+umur\b/ },
        { nama: 'Tidak membuat variabel nama dua kali', pola: /\b(let|const|var)\s+nama\b[\s\S]*\b(let|const|var)\s+nama\b/, tidak: true, pesan: 'Untuk mengubah nilai, tulis nama = "..." tanpa let.' }
      ],
      tes: [
        { nama: 'Menampilkan minimal 3 baris output', minBaris: 3 },
        {
          nama: 'Nilai nama berubah dan dicetak di baris terakhir',
          panggil: 'nama',
          cek: function (ctx) {
            var akhir = String(ctx.hasil);
            var l = ctx.logs;
            if (typeof ctx.hasil !== 'string') return 'Isi variabel nama dengan teks (string).';
            if (l[l.length - 1].indexOf(akhir) === -1) return 'Baris output terakhir harus menampilkan nama yang baru.';
            if (l[0].indexOf(akhir) !== -1) return 'Nama di awal dan di akhir masih sama. Ubah nama menjadi nama temanmu.';
            return true;
          }
        }
      ]
    },
    p2: {
      id: 'p2',
      judul: 'Praktik 2 — Dua Cara Menggabungkan Teks',
      soal: '<p class="content-text">Buat variabel <code>nama</code>, <code>kelas</code>, dan <code>hobi</code>. Tampilkan kalimat perkenalan diri memakai <strong>kedua cara</strong>: penggabungan <code>+</code> dan template literal <code>`${ }`</code>. Bandingkan mana yang lebih mudah ditulis!</p>',
      starter: 'let nama = "";\nlet kelas = "";\nlet hobi = "";\n\n// Cara 1: penggabungan +\n\n// Cara 2: template literal\n',
      solusi: 'let nama = "Danu";\nlet kelas = "XI RPL";\nlet hobi = "ngoding";\n\nconsole.log("Halo, saya " + nama + " dari kelas " + kelas + ". Hobi saya " + hobi + ".");\nconsole.log(`Halo, saya ${nama} dari kelas ${kelas}. Hobi saya ${hobi}.`);',
      petunjuk: [
        'Cara 1: <code>"Halo, saya " + nama + " dari " + kelas</code>',
        'Cara 2: pakai backtick (tombol di kiri angka 1): <code>`Halo, saya ${nama} dari ${kelas}`</code>'
      ],
      syarat: [
        { nama: 'Memakai penggabungan dengan +', pola: /["']\s*\+\s*\w|\w\s*\+\s*["']/ },
        { nama: 'Memakai template literal dengan ${ }', pola: /`[^`]*\$\{[^`]*`/ }
      ],
      tes: [
        {
          nama: 'Dua kalimat memuat nama, kelas, dan hobi',
          panggil: '[nama, kelas, hobi]',
          cek: function (ctx) {
            var v = ctx.hasil;
            if (!v || v.some(function (x) { return !x; })) return 'Isi dulu ketiga variabel (jangan dibiarkan kosong "").';
            var cocok = ctx.logs.filter(function (b) { return v.every(function (x) { return b.indexOf(String(x)) !== -1; }); });
            return cocok.length >= 2 ? true : 'Harus ada 2 baris output yang masing-masing memuat nama, kelas, dan hobi.';
          }
        }
      ]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1',
      jenis: 'tantangan',
      judul: 'Kartu Identitas Otomatis',
      soal: '<p class="content-text">Data siswa sudah tersedia di <strong>Data Input</strong> (variabel <code>nama</code>, <code>umur</code>, <code>hobi</code>). Tampilkan <strong>tepat 3 baris</strong> berikut memakai template literal. Kodemu akan diuji dengan data siswa lain, jadi jangan menulis nama/angka secara langsung!</p>' +
        '<pre class="snippet">Halo, nama saya Rara.\nUmur saya 16 tahun, tahun depan 17 tahun.\nHobi saya menggambar.</pre>',
      input: { nama: 'Rara', umur: 16, hobi: 'menggambar' },
      starter: '// Tulis 3 console.log di sini\n',
      solusi: 'console.log(`Halo, nama saya ${nama}.`);\nconsole.log(`Umur saya ${umur} tahun, tahun depan ${umur + 1} tahun.`);\nconsole.log(`Hobi saya ${hobi}.`);',
      petunjuk: ['Di dalam <code>${ }</code> boleh ada perhitungan, misalnya <code>${umur + 1}</code>.', 'Perhatikan titik di akhir kalimat dan spasi setelah koma.'],
      syarat: [
        { nama: 'Memakai template literal', pola: /`[^`]*\$\{[^`]*`/ },
        { nama: 'Tidak menulis nama "Rara" secara langsung', pola: /Rara/, tidak: true }
      ],
      tes: [
        { nama: 'Data Rara (16 th)', output: ['Halo, nama saya Rara.', 'Umur saya 16 tahun, tahun depan 17 tahun.', 'Hobi saya menggambar.'] },
        { nama: 'Data Budi (17 th)', input: { nama: 'Budi', umur: 17, hobi: 'main futsal' }, output: ['Halo, nama saya Budi.', 'Umur saya 17 tahun, tahun depan 18 tahun.', 'Hobi saya main futsal.'] },
        { nama: 'Data Citra (15 th)', input: { nama: 'Citra', umur: 15, hobi: 'membaca komik' }, output: ['Halo, nama saya Citra.', 'Umur saya 15 tahun, tahun depan 16 tahun.', 'Hobi saya membaca komik.'] }
      ]
    },
    {
      id: 't2',
      jenis: 'tantangan',
      judul: 'Detektif Tipe Data',
      soal: '<p class="content-text">Ada 5 variabel misterius di Data Input: <code>a</code>, <code>b</code>, <code>c</code>, <code>d</code>, <code>e</code>. Tampilkan tipe data masing-masing (urut dari a sampai e, satu per baris) memakai operator <code>typeof</code>. Jangan menulis jawabannya langsung seperti <code>"string"</code> — biarkan <code>typeof</code> yang bekerja!</p>',
      input: { a: '16', b: 16, c: true, d: null, e: undefined },
      starter: '// Tampilkan typeof a sampai typeof e\n',
      solusi: 'console.log(typeof a);\nconsole.log(typeof b);\nconsole.log(typeof c);\nconsole.log(typeof d);\nconsole.log(typeof e);',
      petunjuk: ['Contoh: <code>console.log(typeof a);</code>', 'Ingat fakta unik: <code>typeof null</code> menghasilkan <code>"object"</code>.'],
      syarat: [
        { nama: 'Memakai operator typeof', pola: /\btypeof\b/ },
        { nama: 'Tidak menulis nama tipe data sebagai teks langsung', pola: /["'`](string|number|boolean|object|undefined)["'`]/, tidak: true }
      ],
      tes: [
        { nama: 'Data contoh', output: ['string', 'number', 'boolean', 'object', 'undefined'] },
        { nama: 'Data acak 1', input: { a: 3.14, b: 'true', c: false, d: null, e: -5 }, output: ['number', 'string', 'boolean', 'object', 'number'] },
        { nama: 'Data acak 2', input: { a: undefined, b: '', c: 0, d: 'null', e: true }, output: ['undefined', 'string', 'number', 'string', 'boolean'] }
      ]
    },
    {
      id: 't3',
      jenis: 'studi-kasus',
      judul: 'Perbaiki Kode Teman',
      soal: '<p class="content-text">Temanmu menulis kode ini tapi <strong>error terus</strong>. Perbaiki semua kesalahannya sampai output-nya:</p>' +
        '<pre class="snippet">Dewi kelas XI RPL di SMK 40 Jakarta</pre>' +
        '<ul class="task-list"><li>Nama sekolah <strong>tidak boleh berubah</strong>, jadi tetap pakai <code>const</code>.</li>' +
        '<li>Pakai nama variabel <code>kelas</code> dan <code>namaSiswa</code> (camelCase).</li></ul>',
      starter: 'const sekolah = "SMK 40 Jakarta";\nlet 1kelas = "XI RPL";\nlet nama siswa = "Dewi";\n\nsekolah = "SMK 40";\nconsole.log(`${nama siswa} kelas ${1kelas} di ${sekolah}`);',
      solusi: 'const sekolah = "SMK 40 Jakarta";\nlet kelas = "XI RPL";\nlet namaSiswa = "Dewi";\n\nconsole.log(`${namaSiswa} kelas ${kelas} di ${sekolah}`);',
      petunjuk: [
        'Nama variabel tidak boleh diawali angka dan tidak boleh mengandung spasi.',
        'Variabel <code>const</code> tidak bisa diberi nilai baru — hapus baris yang mengubahnya.'
      ],
      syarat: [
        { nama: 'sekolah tetap memakai const', pola: /\bconst\s+sekolah\b/ },
        { nama: 'Ada variabel kelas', pola: /\b(let|const)\s+kelas\b/ },
        { nama: 'Ada variabel namaSiswa (camelCase)', pola: /\b(let|const)\s+namaSiswa\b/ }
      ],
      tes: [{ nama: 'Output: Dewi kelas XI RPL di SMK 40 Jakarta', output: ['Dewi kelas XI RPL di SMK 40 Jakarta'] }]
    }
  ],

  /* Kuis (dinilai) — soal ber-kode dengan cekOutput diverifikasi otomatis */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Di mana posisi tag <code>&lt;script&gt;</code> yang disarankan?',
      opsi: ['Di dalam `<head>`, paling atas', 'Di bagian paling bawah `<body>`, sebelum `</body>`', 'Setelah tag `</html>`', 'Di mana saja, hasilnya sama'],
      jawab: 1,
      bahas: 'Browser membaca HTML dari atas ke bawah. Kalau script dijalankan sebelum elemen HTML selesai dimuat, script bisa gagal menemukan elemen tersebut.'
    },
    {
      tipe: 'pg',
      tanya: 'Cara menghubungkan JavaScript ke HTML yang <strong>paling disarankan</strong> adalah…',
      opsi: ['Inline, langsung di atribut tag', 'Internal, di dalam tag `<script>`', 'Eksternal, file `.js` terpisah', 'Menulis kode di dalam CSS'],
      jawab: 2,
      bahas: 'File eksternal membuat HTML tetap rapi, kodenya bisa dipakai ulang di banyak halaman, dan lebih mudah dirawat.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'let nama = "Budi";\nnama = "Andi";\nconsole.log(nama);',
      jawab: ['Andi'],
      cekOutput: true,
      bahas: 'Variabel <code>let</code> boleh diubah. Nilai terakhir yang disimpan adalah <code>"Andi"</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa yang terjadi saat kode ini dijalankan?',
      kode: 'const PI = 3.14;\nPI = 3.14159;',
      opsi: ['PI berubah menjadi 3.14159', 'PI tetap 3.14 tanpa pesan apa pun', 'Muncul error `TypeError: Assignment to constant variable.`', 'Muncul `undefined`'],
      jawab: 2,
      bahas: 'Nilai variabel <code>const</code> tidak boleh diubah setelah ditetapkan, sehingga JavaScript melempar <code>TypeError</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Manakah nama variabel yang <strong>valid</strong> dan sesuai konvensi?',
      opsi: ['`2kelas`', '`nama siswa`', '`namaSiswa`', '`let`'],
      jawab: 2,
      bahas: 'Nama variabel tidak boleh diawali angka, tidak boleh mengandung spasi, dan tidak boleh memakai kata kunci JS seperti <code>let</code>. <code>namaSiswa</code> juga sudah camelCase.'
    },
    {
      tipe: 'bs',
      tanya: 'Variabel <code>nama</code> dan <code>Nama</code> adalah variabel yang sama.',
      jawab: false,
      bahas: 'JavaScript bersifat <em>case-sensitive</em>: huruf besar dan kecil dianggap berbeda, jadi itu dua variabel yang berbeda.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(typeof null);',
      opsi: ['null', 'undefined', 'object', 'string'],
      jawab: 2,
      cekOutput: true,
      bahas: 'Ini bug historis JavaScript sejak 1995: <code>typeof null</code> menghasilkan <code>"object"</code>, dan tidak diperbaiki demi kompatibilitas.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'let x;\nconsole.log(x);',
      opsi: ['null', 'undefined', '0', 'Error'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Variabel yang dibuat tapi belum diisi otomatis bernilai <code>undefined</code>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'let umur = 16;\nconsole.log(`Umur: ${umur} tahun`);',
      jawab: ['Umur: 16 tahun'],
      cekOutput: true,
      bahas: 'Template literal mengganti <code>${umur}</code> dengan isi variabelnya, yaitu <code>16</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Menurut <em>best practice</em>, kapan memakai <code>let</code>?',
      opsi: ['Selalu, untuk semua variabel', 'Hanya jika nilainya memang perlu diubah nanti', 'Hanya untuk angka', 'Tidak pernah, pakai `var` saja'],
      jawab: 1,
      bahas: 'Gunakan <code>const</code> sebagai default, lalu ganti menjadi <code>let</code> hanya jika nilainya memang perlu berubah (skor game, counter, input pengguna).'
    },
    {
      tipe: 'pg',
      tanya: 'Tipe data dari nilai <code>"16"</code> (dengan tanda kutip) adalah…',
      kode: 'console.log(typeof "16");',
      opsi: ['number', 'string', 'boolean', 'object'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Apa pun yang diapit tanda kutip adalah <code>string</code>, walaupun isinya terlihat seperti angka.'
    },
    {
      tipe: 'susun',
      tanya: 'Susun baris kode agar output-nya <code>Sari</code> lalu <code>Rina</code>, tanpa error.',
      baris: ['let nama = "Sari";', 'console.log(nama);', 'nama = "Rina";', 'console.log(nama);'],
      bahas: 'Variabel harus dibuat dulu dengan <code>let</code>, baru boleh dipakai dan diubah nilainya.'
    }
  ]
};
