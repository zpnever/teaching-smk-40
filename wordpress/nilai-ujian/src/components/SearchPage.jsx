import React, { useState } from 'react';
import { SearchIcon, AlertCircleIcon, ShieldLockIcon, BookOpenIcon, AwardIcon, CalendarIcon, UserIcon } from './Icons';
import { lookupStudent } from '../data/studentsData';

export function SearchPage({ onSelectStudent }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputValue.trim();

    if (!query) {
      setErrorMessage('Silakan masukkan nama lengkap Anda terlebih dahulu.');
      return;
    }

    const student = lookupStudent(query);

    if (student) {
      setErrorMessage(null);
      onSelectStudent(student);
    } else {
      setErrorMessage(
        'Data siswa tidak ditemukan. Pastikan format nama lengkap sudah benar (huruf kecil semua tanpa spasi, contoh: danusukohandiyanto). Perbedaan satu huruf saja menyebabkan data tidak muncul.'
      );
    }
  };

  const handleInputChange = (e) => {
    // Keep it clean: allow typing naturally, lowercase by default if desired
    setInputValue(e.target.value.toLowerCase().replace(/\s+/g, ''));
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="search-view">
      {/* Hero Welcome */}
      <section className="search-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Portal Transparansi Hasil Penilaian</span>
            <h2 className="hero-title">Hasil Penilaian Tengah Semester (PTS)</h2>
            <p className="hero-desc">
              Silakan masukkan nama lengkap Anda untuk memeriksa hasil evaluasi dan perolehan nilai mata pelajaran Content Management System (CMS) WordPress.
            </p>
          </div>
        </div>
      </section>

      {/* Main Search Card */}
      <section className="search-section">
        <div className="container search-container">
          <div className="search-card">
            <div className="card-header-simple">
              <h3 className="card-title">Verifikasi Nama Siswa</h3>
              <p className="card-subtitle">
                Akses nilai bersifat mandiri. Masukkan nama lengkap sesuai ketentuan format di bawah.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="search-form" noValidate>
              <div className="form-group">
                <label htmlFor="student-name-input" className="form-label">
                  Nama Lengkap Siswa
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <UserIcon />
                  </span>
                  <input
                    id="student-name-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="contoh: danusukohandiyanto"
                    autoComplete="off"
                    spellCheck="false"
                    className={`form-input ${errorMessage ? 'input-error' : ''}`}
                    autoFocus
                  />
                  {inputValue && (
                    <button
                      type="button"
                      className="btn-clear"
                      onClick={() => {
                        setInputValue('');
                        setErrorMessage(null);
                      }}
                      title="Hapus input"
                      aria-label="Hapus input"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <div className="format-hint">
                  <span className="hint-label">Aturan Format:</span>
                  <span className="hint-text">
                    Nama lengkap, <strong>huruf kecil semua tanpa spasi</strong>. Contoh: <code>danusukohandiyanto</code> (dari Danu Suko Handiyanto).
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="alert-message alert-error" role="alert">
                  <AlertCircleIcon className="alert-icon" />
                  <div className="alert-content">
                    <p className="alert-title">Nama Tidak Ditemukan</p>
                    <p className="alert-text">{errorMessage}</p>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-submit">
                <SearchIcon />
                <span>Lihat Hasil Nilai</span>
              </button>
            </form>

            <div className="privacy-badge">
              <ShieldLockIcon className="privacy-icon" />
              <p className="privacy-text">
                <strong>Privasi Terjamin:</strong> Data sensitif seperti NISN tidak ditampilkan pada portal ini demi melindungi keamanan data pribadi siswa.
              </p>
            </div>
          </div>

          {/* Exam Summary Info Cards */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon-box">
                <BookOpenIcon />
              </div>
              <div className="info-text">
                <h4 className="info-heading">Mata Pelajaran</h4>
                <p className="info-detail">CMS WordPress (Pilihan RPL)</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-box">
                <AwardIcon />
              </div>
              <div className="info-text">
                <h4 className="info-heading">Standar Ketuntasan (KKM)</h4>
                <p className="info-detail">Nilai Minimum: <strong>78</strong></p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-box">
                <CalendarIcon />
              </div>
              <div className="info-text">
                <h4 className="info-heading">Waktu Pelaksanaan</h4>
                <p className="info-detail">24 September 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
