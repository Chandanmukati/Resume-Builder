// ============================================
// JOB MATCHER COMPONENT
// Analyzes resume against job description
// ============================================

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { matchJobDescription } from '../services/api';
import { FaBriefcase, FaSearch, FaCheck, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

function JobMatcher() {
  const { state, dispatch } = useResume();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleMatch = async () => {
    if (!state.targetJobDescription) return;
    
    setLoading(true);
    try {
      const res = await matchJobDescription(state, state.targetJobDescription);
      const data = res.data.data;
      
      setResults(data);
      
      // Save matched keywords to state for highlighting
      dispatch({ 
        type: 'UPDATE_FIELD', 
        payload: { field: 'matchedKeywords', value: data.matchedKeywords } 
      });
      dispatch({ 
        type: 'UPDATE_FIELD', 
        payload: { field: 'missingKeywords', value: data.missingKeywords } 
      });
      
    } catch (err) {
      console.error('Failed to analyze job description:', err);
    }
    setLoading(false);
  };

  return (
    <div className="job-matcher-panel">
      <div className="panel-header">
        <h3><FaBriefcase /> Job Description Matcher</h3>
      </div>

      <div className="jd-input-section">
        <label>Paste the job description you are targeting:</label>
        <textarea
          rows="5"
          placeholder="e.g. We are looking for a Senior React Developer with experience in Redux, Node.js, and AWS..."
          value={state.targetJobDescription}
          onChange={(e) => dispatch({ 
            type: 'UPDATE_FIELD', 
            payload: { field: 'targetJobDescription', value: e.target.value } 
          })}
        />
        <button 
          className="btn btn-primary w-100" 
          onClick={handleMatch}
          disabled={loading || !state.targetJobDescription.trim()}
        >
          {loading ? <><FaSpinner className="spin" /> Analyzing Match...</> : <><FaSearch /> Analyze Match</>}
        </button>
      </div>

      {results && (
        <div className="match-results fade-in">
          <div className="match-score">
            <div className="match-percentage" style={{ 
              color: results.score >= 80 ? '#10b981' : results.score >= 60 ? '#f59e0b' : '#ef4444' 
            }}>
              {results.score}%
            </div>
            <span className="match-text">Match Score</span>
          </div>

          <div className="match-details">
            <div className="keyword-section">
              <h4 className="text-green"><FaCheck /> Matched Keywords</h4>
              <div className="keyword-tags">
                {results.matchedKeywords.length > 0 ? (
                  results.matchedKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag matched">{kw}</span>
                  ))
                ) : (
                  <p className="suggestion-hint">No keywords matched yet.</p>
                )}
              </div>
            </div>

            <div className="keyword-section">
              <h4 className="text-yellow"><FaExclamationTriangle /> Missing Keywords</h4>
              <div className="keyword-tags">
                {results.missingKeywords.length > 0 ? (
                  results.missingKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag missing">{kw}</span>
                  ))
                ) : (
                  <p className="suggestion-hint">Great job! You matched all detected keywords.</p>
                )}
              </div>
            </div>

            <div className="match-suggestions">
              <h4>💡 Actionable Suggestions</h4>
              <ul>
                {results.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            
            <div className="match-strengths">
              <h4>💪 Your Strengths</h4>
              <ul>
                {results.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;