import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  PrinterIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  UserIcon,
  BookOpenIcon,
  CalendarIcon
} from './Icons';

export function ResultPage({ student, onBack }) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'tepat', 'perlu-perbaikan'
  const [openItems, setOpenItems] = useState(() => {
    // Default open all items so student can review easily
    const initial = {};
    student.jawaban.forEach((j) => {
      initial[j.no] = true;
    });
    return initial;
  });

  const isLulus = student.nilai >= 78;

  const toggleItem = (no) => {
    setOpenItems((prev) => ({
      ...prev,
      [no]: !prev[no]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter answers
  const filteredJawaban = student.jawaban.filter((j) => {
    if (filterStatus === 'all') return true;
    const isTepat = j.skor >= 9 || (j.status && j.status.toLowerCase() === 'tepat');
    if (filterStatus === 'tepat') return isTepat;
    if (filterStatus === 'perlu-perbaikan') return !isTepat;
    return true;
  });

  const countTepat = student.jawaban.filter(
    (j) => j.skor >= 9 || (j.status && j.status.toLowerCase() === 'tepat')
  ).length;
  const countPerluPerbaikan = student.jawaban.length - countTepat;

  return (
    <div className="result-view">
      {/* Top Action Bar (hidden when printing) */}
      <section className="action-bar no-print">
        <div className="container action-container">
          <button type="button" onClick={onBack} className="btn-secondary">
            <ArrowLeftIcon />
            <span>Kembali ke Pencarian</span>
          </button>
          <button type="button" onClick={handlePrint} className="btn-primary">
            <PrinterIcon />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </section>

      <div className="container result-content">
        {/* Printable Official Header */}
        <div className="official-print-header print-only">
          <div className="school-heading">
            <h2>SMK NEGERI 40 JAKARTA</h2>
            <p>Konsentrasi Keahlian: Rekayasa Perangkat Lunak (RPL)</p>
            <p className="print-doc-title">LEMBAR LAPORAN HASIL PENILAIAN TENGAH SEMESTER (PTS)</p>
          </div>
          <hr className="print-divider" />
        </div>

        {/* Student Profile Card */}
        <section className="student-profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <UserIcon />
            </div>
            <div className="profile-main">
              <span className="profile-badge-label">Peserta Ujian PTS</span>
              <h2 className="student-name">{student.nama}</h2>
              <div className="student-meta-chips">
                <span className="meta-chip">
                  <strong>Kelas:</strong> {student.kelas}
                </span>
                <span className="meta-chip">
                  <BookOpenIcon className="chip-icon" />
                  <strong>Mata Pelajaran:</strong> {student.mata_pelajaran}
                </span>
                <span className="meta-chip">
                  <CalendarIcon className="chip-icon" />
                  <strong>Tanggal:</strong> {student.waktu_ujian}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Score & Status Section */}
        <section className="score-summary-grid">
          {/* Score Card */}
          <div className={`score-card ${isLulus ? 'score-lulus' : 'score-remedial'}`}>
            <span className="score-label">Perolehan Nilai Akhir</span>
            <div className="score-number-display">
              <span className="score-value">{student.nilai}</span>
              <span className="score-total">/ 100</span>
            </div>
            <div className="score-badges">
              <span className={`status-pill ${isLulus ? 'pill-success' : 'pill-warning'}`}>
                {isLulus ? 'LULUS (TUNTAS)' : 'BELUM TUNTAS'}
              </span>
              <span className="predikat-pill">
                Predikat: <strong>{student.predikat}</strong>
              </span>
            </div>
            <div className="kkm-reference">
              <span>Kriteria Ketuntasan Minimal (KKM): <strong>{student.kkm || 78}</strong></span>
            </div>
          </div>

          {/* Sincere Message Card (Ucapan Selamat / Semangat) */}
          <div className={`message-card ${isLulus ? 'message-card-lulus' : 'message-card-remedial'}`}>
            <div className="message-header">
              <div className="message-icon-box">
                {isLulus ? <CheckCircleIcon /> : <AlertCircleIcon />}
              </div>
              <h3 className="message-title">
                {isLulus ? 'Selamat atas Pencapaian Anda!' : 'Tetap Semangat & Jangan Berputus Asa!'}
              </h3>
            </div>
            <div className="message-body">
              {isLulus ? (
                <>
                  <p>
                    Selamat kepada <strong>{student.nama}</strong>! Anda telah berhasil mencapai dan melampaui Kriteria Ketuntasan Minimal (KKM: 78) pada Penilaian Tengah Semester ini dengan capaian nilai yang sangat memuaskan.
                  </p>
                  <p className="message-sub">
                    Pemahaman konsep dan teknis WordPress yang Anda tunjukkan sudah sangat baik. Pertahankan dedikasi belajar ini dan terus tingkatkan kompetensi keahlian Anda di Rekayasa Perangkat Lunak.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Kepada <strong>{student.nama}</strong>, perolehan nilai Anda saat ini adalah <strong>{student.nilai}</strong> dan belum mencapai batas KKM (78).
                  </p>
                  <p className="message-sub">
                    Jangan berkecil hati. Setiap tahapan belajar adalah kesempatan untuk bertumbuh. Silakan pelajari kembali catatan koreksi guru pada rincian soal di bawah ini dan persiapkan diri dengan baik untuk sesi remedial/pengayaan berikutnya.
                  </p>
                </>
              )}
            </div>
            <div className="message-footer">
              <span className="evaluator-note">
                Guru Penguji: <strong>{student.penilai}</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Detailed Question Review Section */}
        <section className="answers-section">
          <div className="answers-header">
            <div>
              <h3 className="section-title">Rincian Evaluasi Jawaban Siswa</h3>
              <p className="section-subtitle">
                Berikut rincian butir soal, jawaban yang dikumpulkan, serta catatan penilaian dari guru penguji.
              </p>
            </div>

            {/* Filter Tabs (hidden when printing) */}
            <div className="filter-tabs no-print" role="tablist">
              <button
                type="button"
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                Semua Soal ({student.jawaban.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${filterStatus === 'tepat' ? 'active' : ''}`}
                onClick={() => setFilterStatus('tepat')}
              >
                Tepat ({countTepat})
              </button>
              <button
                type="button"
                className={`filter-btn ${filterStatus === 'perlu-perbaikan' ? 'active' : ''}`}
                onClick={() => setFilterStatus('perlu-perbaikan')}
              >
                Perlu Evaluasi ({countPerluPerbaikan})
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="questions-list">
            {filteredJawaban.map((item) => {
              const isOpen = openItems[item.no];
              const isTepat = item.skor >= 9 || (item.status && item.status.toLowerCase() === 'tepat');
              const isSebagian = item.skor >= 6 && item.skor < 9;

              let statusBadgeClass = 'badge-kurang';
              let statusLabel = 'Kurang Tepat';
              if (isTepat) {
                statusBadgeClass = 'badge-tepat';
                statusLabel = 'Tepat / Sempurna';
              } else if (isSebagian) {
                statusBadgeClass = 'badge-sebagian';
                statusLabel = 'Sebagian Tepat';
              }

              return (
                <div key={item.no} className="question-card">
                  <div 
                    className="question-card-header" 
                    onClick={() => toggleItem(item.no)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleItem(item.no);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <div className="header-left">
                      <span className="question-number-pill">Soal #{item.no}</span>
                      <span className={`answer-status-badge ${statusBadgeClass}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="header-right">
                      <div className="score-pill">
                        <span className="score-current">{item.skor}</span>
                        <span className="score-max">/ 10</span>
                      </div>
                      <span className="toggle-icon no-print">
                        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </span>
                    </div>
                  </div>

                  <div className={`question-body ${isOpen ? 'is-open' : 'is-closed'}`}>
                    <div className="question-text-box">
                      <h4 className="box-label">Pertanyaan Ujian:</h4>
                      <p className="question-content">{item.soal}</p>
                    </div>

                    <div className="student-answer-box">
                      <h4 className="box-label">Jawaban Anda:</h4>
                      <p className="student-answer-text">{item.jawaban_siswa || '(Tidak ada jawaban)'}</p>
                    </div>

                    {item.alasan_penilaian && (
                      <div className="feedback-box">
                        <h4 className="feedback-label">Catatan & Evaluasi Penilai:</h4>
                        <p className="feedback-text">{item.alasan_penilaian}</p>
                      </div>
                    )}

                    {item.kunci_jawaban && (
                      <details className="key-reference-box">
                        <summary className="key-reference-summary">
                          <span>Kunci Jawaban / Konsep Standar</span>
                        </summary>
                        <p className="key-reference-content">{item.kunci_jawaban}</p>
                      </details>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Printable Signature & Validation (only visible on print) */}
        <div className="print-signature-section print-only">
          <div className="signature-grid">
            <div className="sig-column">
              <p>Mengetahui,</p>
              <p className="sig-role">Orang Tua / Wali Siswa</p>
              <div className="sig-space"></div>
              <p className="sig-name">( ............................................ )</p>
            </div>
            <div className="sig-column">
              <p>Jakarta, 24 September 2026</p>
              <p className="sig-role">Guru Penguji & Pengampu</p>
              <div className="sig-space"></div>
              <p className="sig-name"><strong>{student.penilai}</strong></p>
              <p className="sig-sub">Mata Pelajaran CMS WordPress</p>
            </div>
          </div>
        </div>

        {/* Back to top or new search */}
        <div className="bottom-nav-bar no-print">
          <button type="button" onClick={onBack} className="btn-secondary">
            <ArrowLeftIcon />
            <span>Cari Nama Siswa Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
