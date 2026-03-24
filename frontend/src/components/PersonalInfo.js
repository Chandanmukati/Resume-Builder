// ============================================
// PERSONAL INFO FORM
// Collects basic contact details and summary
// ============================================

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { improveSummary } from '../services/api';
import { FaMagic, FaSpinner } from 'react-icons/fa';

function PersonalInfo() {
  const { state, dispatch } = useResume();
  const [loading, setLoading] = useState(false);
  
  const info = state.personalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [name]: value }
    });
  };

  // Target role handler (used by AI for context)
  const handleRoleChange = (e) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { field: 'targetRole', value: e.target.value }
    });
  };

  // AI Summary generation
  const handleImproveSummary = async () => {
    setLoading(true);
    try {
      // Pass current summary, top skills, and target role to AI
      const topSkills = [
        ...state.skills.technical, 
        ...state.skills.soft
      ].slice(0, 5);
      
      const res = await improveSummary(info.summary, topSkills, state.targetRole);
      
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { summary: res.data.data }
      });
    } catch (err) {
      console.error('Failed to improve summary:', err);
    }
    setLoading(false);
  };

  return (
    <div className="form-section">
      <h2 className="form-section-title">👤 Personal Information</h2>
      
      <div className="form-group full-width" style={{ marginBottom: '1.5rem' }}>
        <label>Target Job Role (Used by AI to tailor content)</label>
        <input
          type="text"
          placeholder="e.g. Senior Frontend Developer"
          value={state.targetRole}
          onChange={handleRoleChange}
          style={{ borderColor: '#8b5cf6', backgroundColor: '#f5f3ff' }}
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={info.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={info.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 234 567 8900"
            value={info.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="New York, NY"
            value={info.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={info.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub / Portfolio</label>
          <input
            type="text"
            name="github"
            placeholder="github.com/johndoe"
            value={info.github}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group full-width" style={{ marginTop: '1rem' }}>
        <div className="label-with-action">
          <label>Professional Summary</label>
          <button 
            className="btn btn-ai btn-sm" 
            onClick={handleImproveSummary}
            disabled={loading}
          >
            {loading ? <><FaSpinner className="spin"/> Generating...</> : <><FaMagic /> Auto-Generate with AI</>}
          </button>
        </div>
        <textarea
          name="summary"
          rows="4"
          placeholder="A brief summary of your professional background and goals..."
          value={info.summary}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;