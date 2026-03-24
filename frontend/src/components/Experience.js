// ============================================
// EXPERIENCE FORM
// Add work experience with AI bullet point enhancement
// ============================================

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { improveBullets } from '../services/api';
import { FaPlus, FaTrash, FaMagic, FaSpinner } from 'react-icons/fa';

function Experience() {
  const { state, dispatch } = useResume();
  const [improvingIndex, setImprovingIndex] = useState(-1);

  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        bulletPoints: []
      }
    });
  };

  const updateField = (index, field, value) => {
    const updated = { ...state.experience[index], [field]: value };
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { index, data: updated } });
  };

  const removeExperience = (index) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: index });
  };

  // AI: Convert description into professional bullet points
  const handleImproveBullets = async (index) => {
    const exp = state.experience[index];
    if (!exp.description && exp.bulletPoints.length === 0) return;
    
    setImprovingIndex(index);
    try {
      const text = exp.description || exp.bulletPoints.join('. ');
      const res = await improveBullets(text, state.targetRole);
      updateField(index, 'bulletPoints', res.data.data);
    } catch (err) {
      console.error('Failed to improve bullets:', err);
    }
    setImprovingIndex(-1);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">💼 Experience</h2>
        <button className="btn btn-secondary btn-sm" onClick={addExperience}>
          <FaPlus /> Add Experience
        </button>
      </div>

      {state.experience.length === 0 && (
        <div className="empty-state">
          <p>No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      )}

      {state.experience.map((exp, index) => (
        <div key={index} className="form-card">
          <div className="form-card-header">
            <h3>Experience #{index + 1}</h3>
            <button className="btn-icon danger" onClick={() => removeExperience(index)}>
              <FaTrash />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                placeholder="Google, Inc."
                value={exp.company}
                onChange={(e) => updateField(index, 'company', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={exp.position}
                onChange={(e) => updateField(index, 'position', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                placeholder="Jan 2023"
                value={exp.startDate}
                onChange={(e) => updateField(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                placeholder="Present"
                value={exp.current ? 'Present' : exp.endDate}
                onChange={(e) => updateField(index, 'endDate', e.target.value)}
                disabled={exp.current}
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateField(index, 'current', e.target.checked)}
                />
                Currently working here
              </label>
            </div>
          </div>

          {/* Description textarea */}
          <div className="form-group full-width">
            <div className="label-with-action">
              <label>Description (write naturally, AI will enhance)</label>
              <button
                className="btn btn-ai btn-sm"
                onClick={() => handleImproveBullets(index)}
                disabled={improvingIndex === index}
              >
                {improvingIndex === index ? (
                  <><FaSpinner className="spin" /> Enhancing...</>
                ) : (
                  <><FaMagic /> AI Enhance</>
                )}
              </button>
            </div>
            <textarea
              rows="3"
              placeholder="Describe what you did... e.g., 'Built web apps using React, worked on API development, helped improve page load speed'"
              value={exp.description}
              onChange={(e) => updateField(index, 'description', e.target.value)}
            />
          </div>

          {/* AI-Generated Bullet Points */}
          {exp.bulletPoints && exp.bulletPoints.length > 0 && (
            <div className="bullet-points">
              <label>✨ AI-Enhanced Bullet Points:</label>
              {exp.bulletPoints.map((bullet, bIndex) => (
                <div key={bIndex} className="bullet-item">
                  <span className="bullet-dot">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => {
                      const newBullets = [...exp.bulletPoints];
                      newBullets[bIndex] = e.target.value;
                      updateField(index, 'bulletPoints', newBullets);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Experience;