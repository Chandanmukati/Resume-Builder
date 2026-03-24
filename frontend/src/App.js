// ============================================
// APP COMPONENT
// Main app with routing and context provider
// ============================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="app">
          <Header />
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