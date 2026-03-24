// ============================================
// ATS SCORE COMPONENT
// Scores the resume for ATS compatibility
// ============================================

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { getATSScore } from '../services/api';
import { FaChartBar, FaSpinner, FaTimes } from 'react-icons/fa';

function ATSScore({ onClose }) {
  const { state } = useResume();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleScore = async () => {
    setLoading(true);
    try {
      const res = await getATSScore(state);
      setResults(res.data.data);
    } catch (err) {
      console.error('Failed to get ATS score:', err);
    }
    setLoading(false);
  };

  const getColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="ats-panel">
      <div className="panel-header" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
        <h3><FaChartBar /> ATS Compatibility Score</h3>
        <button className="btn-icon" onClick={onClose}><FaTimes /></button>
      </div>

      {!results ? (
        <div className="ats-start">
          <p>
            ATS (Applicant Tracking Systems) filter resumes before they reach a recruiter.
            Score your resume to find issues and get actionable improvements.
          </p>
          <button
            className="btn btn-primary"
            onClick={handleScore}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? <><FaSpinner className="spin" /> Analyzing...</> : '🔍 Analyze My Resume'}
          </button>
        </div>
      ) : (
        <div className="ats-results fade-in">
          <div className="score-circle" style={{
            borderColor: getColor(results.score),
            color: getColor(results.score)
          }}>
            <span className="score-number">{results.score}</span>
            <span className="score-label">/ 100</span>
          </div>

          {results.breakdown && (
            <div className="score-breakdown">
              <h4>Score Breakdown</h4>
              {Object.entries(results.breakdown).map(([key, val]) => (
                <div key={key} className="breakdown-item">
                  <span className="breakdown-label">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  </span>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${(val / 25) * 100}%`,
                        background: getColor(results.score)
                      }}
                    />
                  </div>
                  <span className="breakdown-value">{val}</span>
                </div>
              ))}
            </div>
          )}

          {results.improvements && results.improvements.length > 0 && (
            <div className="improvements">
              <h4>💡 How to Improve</h4>
              <ul>
                {results.improvements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="btn btn-secondary" onClick={() => setResults(null)} style={{ marginTop: '1rem', width: '100%' }}>
            Re-analyze
          </button>
        </div>
      )}
    </div>
  );
}

export default ATSScore;
