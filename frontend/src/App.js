// ============================================
// AI RESUME BUILDER
// Production Build Trigger v1.0.1
// ============================================

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ResumeProvider>
      <Router>
        <div className="app">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;