// ============================================
// EDUCATION FORM
// Add/edit/remove education entries
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Education() {
  const { state, dispatch } = useResume();

  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: ''
      }
    });
  };

  const updateField = (index, field, value) => {
    const updated = { ...state.education[index], [field]: value };
    dispatch({ type: 'UPDATE_EDUCATION', payload: { index, data: updated } });
  };

  const removeEducation = (index) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: index });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🎓 Education</h2>
        <button className="btn btn-secondary btn-sm" onClick={addEducation}>
          <FaPlus /> Add Education
        </button>
      </div>

      {state.education.length === 0 && (
        <div className="empty-state">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}

      {state.education.map((edu, index) => (
        <div key={index} className="form-card">
          <div className="form-card-header">
            <h3>Education #{index + 1}</h3>
            <button className="btn-icon danger" onClick={() => removeEducation(index)}>
              <FaTrash />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                placeholder="University of California"
                value={edu.institution}
                onChange={(e) => updateField(index, 'institution', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => updateField(index, 'degree', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                placeholder="Computer Science"
                value={edu.field}
                onChange={(e) => updateField(index, 'field', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>GPA</label>
              <input
                type="text"
                placeholder="3.8/4.0"
                value={edu.gpa}
                onChange={(e) => updateField(index, 'gpa', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                placeholder="Aug 2020"
                value={edu.startDate}
                onChange={(e) => updateField(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                placeholder="May 2024"
                value={edu.endDate}
                onChange={(e) => updateField(index, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Achievements / Coursework</label>
            <textarea
              rows="2"
              placeholder="Dean's List, Relevant coursework: Data Structures, Algorithms..."
              value={edu.achievements}
              onChange={(e) => updateField(index, 'achievements', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;