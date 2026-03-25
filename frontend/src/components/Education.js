// ============================================
// EDUCATION FORM — UPDATED
// Includes: institution, degree, field, GPA,
//           percentage, location, start/end date, achievements
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const EMPTY = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  gpa: '',
  percentage: '',
  location: '',
  achievements: ''
};

function Education() {
  const { state, dispatch } = useResume();

  const add = () => dispatch({ type: 'ADD_EDUCATION', payload: { ...EMPTY } });

  const update = (index, field, value) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { index, data: { ...state.education[index], [field]: value } }
    });
  };

  const remove = (index) => dispatch({ type: 'REMOVE_EDUCATION', payload: index });

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🎓 Education</h2>
        <button className="btn btn-secondary btn-sm" onClick={add}>
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
            <button className="btn-icon danger" onClick={() => remove(index)}>
              <FaTrash />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                placeholder="Lovely Professional University"
                value={edu.institution}
                onChange={(e) => update(index, 'institution', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Phagwara, Punjab"
                value={edu.location || ''}
                onChange={(e) => update(index, 'location', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Technology"
                value={edu.degree}
                onChange={(e) => update(index, 'degree', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                placeholder="Computer Science and Engineering"
                value={edu.field}
                onChange={(e) => update(index, 'field', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>CGPA</label>
              <input
                type="text"
                placeholder="6.59"
                value={edu.gpa}
                onChange={(e) => update(index, 'gpa', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Percentage (if applicable)</label>
              <input
                type="text"
                placeholder="62%"
                value={edu.percentage || ''}
                onChange={(e) => update(index, 'percentage', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                placeholder="Aug '23"
                value={edu.startDate}
                onChange={(e) => update(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                placeholder="Present"
                value={edu.endDate}
                onChange={(e) => update(index, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Achievements / Coursework</label>
            <textarea
              rows="2"
              placeholder="Dean's List, relevant coursework..."
              value={edu.achievements}
              onChange={(e) => update(index, 'achievements', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;