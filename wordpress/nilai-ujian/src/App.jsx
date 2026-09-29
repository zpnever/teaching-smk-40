import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchPage } from './components/SearchPage';
import { ResultPage } from './components/ResultPage';
import { Footer } from './components/Footer';

export function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedStudent]);

  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        {!selectedStudent ? (
          <SearchPage onSelectStudent={setSelectedStudent} />
        ) : (
          <ResultPage
            student={selectedStudent}
            onBack={() => setSelectedStudent(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
