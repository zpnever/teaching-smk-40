import React from 'react';
import { SchoolIcon } from './Icons';

export function Header() {
  return (
    <header className="app-header">
      <div className="container header-container">
        <div className="header-brand">
          <div className="brand-icon-wrapper">
            <SchoolIcon className="brand-icon" />
          </div>
          <div className="brand-text">
            <h1 className="school-title">SMK NEGERI 40 JAKARTA</h1>
            <p className="school-subtitle">Rekayasa Perangkat Lunak &bull; Kelas XI RPL</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="exam-badge">PTS CMS WordPress</span>
          <span className="semester-badge">Semester Ganjil 2026/2027</span>
        </div>
      </div>
    </header>
  );
}
