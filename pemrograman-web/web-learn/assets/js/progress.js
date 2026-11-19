/* ═══════════════════════════════════════════
   PROGRESS — progres & nilai siswa di localStorage
   (dibungkus try/catch: mode privat / storage diblokir tetap jalan)
   ═══════════════════════════════════════════ */
(function (root) {
  'use strict';

  var KUNCI = 'coretjs.v1';
  var MATERI = ['15', '16', '17', '18', '19', '20', '21', '22', '23', 'akhir'];
  var cache = null;

  function baca() {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(KUNCI)) || null; } catch (e) { cache = null; }
    if (!cache || typeof cache !== 'object') cache = {};
    cache.profil = cache.profil || { nama: '', kelas: 'XI RPL' };
    cache.materi = cache.materi || {};
    cache.draft = cache.draft || {};
    return cache;
  }

  function simpan() {
    try { localStorage.setItem(KUNCI, JSON.stringify(cache)); } catch (e) { /* storage tidak tersedia */ }
  }

  function materi(id) {
    var s = baca();
    var m = s.materi[id];
    if (!m) m = s.materi[id] = {};
    m.bagian = m.bagian || {};
    m.praktik = m.praktik || {};
    m.tantangan = m.tantangan || {};
    return m;
  }

  var P = {
    MATERI: MATERI,

    data: baca,

    materi: materi,

    profil: function (ubah) {
      var s = baca();
      if (ubah) { Object.assign(s.profil, ubah); simpan(); }
      return s.profil;
    },

    setTotalBagian: function (id, n) {
      var m = materi(id);
      if (m.totalBagian !== n) { m.totalBagian = n; simpan(); }
    },

    tandaiBagian: function (id, bagian) {
      var m = materi(id);
      if (!m.bagian[bagian]) { m.bagian[bagian] = Date.now(); m.terakhir = Date.now(); simpan(); }
    },

    setPraktik: function (id, praktik) {
      var m = materi(id);
      if (!m.praktik[praktik]) { m.praktik[praktik] = Date.now(); m.terakhir = Date.now(); simpan(); }
    },

    /** info: { lulus?: bool, solusi?: bool } */
    setTantangan: function (id, tid, info) {
      var m = materi(id);
      var t = m.tantangan[tid] || (m.tantangan[tid] = { lulus: false, solusi: false, percobaan: 0 });
      if (info.percobaan) t.percobaan++;
      if (info.solusi) t.solusi = true;
      if (info.lulus && !t.lulus) { t.lulus = true; t.lulusTanpaSolusi = !t.solusi; t.waktu = Date.now(); }
      m.terakhir = Date.now();
      simpan();
      return t;
    },

    setKuis: function (id, benar, total) {
      var m = materi(id);
      var k = m.kuis || (m.kuis = { terbaik: 0, total: total, percobaan: 0 });
      k.percobaan++;
      k.total = total;
      k.terakhir = benar;
      if (benar >= k.terbaik) { k.terbaik = benar; k.waktu = Date.now(); }
      m.terakhir = Date.now();
      simpan();
      return k;
    },

    draft: function (kunci, kode) {
      var s = baca();
      if (kode === undefined) return s.draft[kunci];
      if (kode === null) delete s.draft[kunci]; else s.draft[kunci] = kode;
      simpan();
    },

    /**
     * Nilai satu materi: 50% kuis + 50% tantangan (yang lulus tanpa membuka solusi).
     * bank = window.BANK[id]
     */
    nilai: function (id, bank) {
      var m = materi(id);
      var nTantangan = (bank && bank.tantangan && bank.tantangan.length) || 0;
      var lulus = 0;
      for (var tid in m.tantangan) {
        if (m.tantangan[tid].lulus && m.tantangan[tid].lulusTanpaSolusi) lulus++;
      }
      lulus = Math.min(lulus, nTantangan);
      var kuisTotal = (m.kuis && m.kuis.total) || (bank && (bank.kuisAcak || (bank.kuis && bank.kuis.length))) || 0;
      var kuisPersen = m.kuis && kuisTotal ? Math.round(m.kuis.terbaik / kuisTotal * 100) : null;
      var tantanganPersen = nTantangan ? Math.round(lulus / nTantangan * 100) : null;
      var akhir = null;
      if (kuisPersen !== null || lulus > 0) {
        var a = kuisPersen || 0, b = tantanganPersen || 0;
        akhir = nTantangan ? Math.round((a + b) / 2) : a;
      }
      return {
        kuis: kuisPersen,
        kuisBenar: m.kuis ? m.kuis.terbaik : 0,
        kuisTotal: kuisTotal,
        kuisPercobaan: m.kuis ? m.kuis.percobaan : 0,
        tantangan: tantanganPersen,
        tantanganLulus: lulus,
        tantanganTotal: nTantangan,
        akhir: akhir
      };
    },

    /** Persentase kelengkapan belajar (bagian dibuka, praktik, kuis, tantangan). */
    persen: function (id, bank) {
      var m = materi(id);
      var nb = m.totalBagian || 0;
      var nPraktik = bank && bank.latihan ? Object.keys(bank.latihan).length : 0;
      var nTantangan = bank && bank.tantangan ? bank.tantangan.length : 0;
      var total = nb + nPraktik + nTantangan + 1;
      if (!nb && !Object.keys(m.bagian).length && !m.kuis) return 0;
      var selesai = Math.min(Object.keys(m.bagian).length, nb || Infinity) +
        Math.min(Object.keys(m.praktik).length, nPraktik) +
        Math.min(Object.keys(m.tantangan).filter(function (k) { return m.tantangan[k].lulus; }).length, nTantangan) +
        (m.kuis ? 1 : 0);
      return Math.max(0, Math.min(100, Math.round(selesai / total * 100)));
    },

    reset: function () {
      cache = { profil: baca().profil, materi: {}, draft: {} };
      simpan();
    }
  };

  root.Progress = P;
})(typeof window !== 'undefined' ? window : globalThis);
