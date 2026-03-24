// ============================================
// HOME PAGE
// Landing page with features showcase
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaRobot, FaFileAlt, FaChartBar, FaBriefcase,
  FaDownload, FaPalette, FaBolt, FaArrowRight
} from 'react-icons/fa';

const features = [
  { icon: <FaRobot />, title: 'AI-Powered Writing', desc: 'Let AI enhance your bullet points, generate summaries, and suggest the best words for your industry.' },
  { icon: <FaChartBar />, title: 'ATS Score & Optimization', desc: 'Know how your resume scores before sending. Get actionable tips to pass the automated screening.' },
  { icon: <FaBriefcase />, title: 'Job Description Matching', desc: 'Paste any job description and instantly see your match score, missing keywords, and recommendations.' },
  { icon: <FaPalette />, title: 'Beautiful Templates', desc: 'Choose from Modern, Classic, or Minimal designs. All templates are print-ready and ATS-compatible.' },
  { icon: <FaDownload />, title: 'One-Click PDF Export', desc: 'Download your polished resume as a professional PDF ready to send to employers.' },
  { icon: <FaBolt />, title: 'AI Chat Assistant', desc: 'Have questions? Chat with your personal resume coach powered by AI, available at any moment.' },
];

const steps = [
  { num: '1', title: 'Fill Your Info', desc: 'Enter your personal details, work history, skills, and projects using our guided forms.' },
  { num: '2', title: 'Let AI Enhance', desc: 'Use the AI features to improve bullet points, auto-generate summaries, and match job descriptions.' },
  { num: '3', title: 'Download & Apply', desc: 'Pick a template, preview your resume in real-time, and download it as a professional PDF.' },
];

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="hero-title">
          Build Your Dream Resume<br />
          <span className="gradient-text">Powered by AI ✨</span>
        </h1>
        <p className="hero-subtitle">
          Create an ATS-optimized, professionally designed resume in minutes.
          Let AI write, enhance, and score your resume for any job.
        </p>

        <div className="hero-actions">
          <Link to="/builder" className="btn btn-primary btn-lg">
            <FaFileAlt /> Start Building Free <FaArrowRight />
          </Link>
          <Link to="/templates" className="btn btn-outline btn-lg">
            <FaPalette /> View Templates
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Resume Templates</span>
          </div>
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">AI Features</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">ATS Compatible</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">Everything You Need to Land the Job</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
