// ============================================
// CERTIFICATES FORM
// Certifications with link, platform, date
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Certificates() {
  const { state, dispatch } = useResume();

  const add = () => dispatch({
    type: 'ADD_CERTIFICATE',
    payload: { name: '', platform: '', link: '', date: '' }
  });

  const update = (index, field, value) => {
    dispatch({
      type: 'UPDATE_CERTIFICATE',
      payload: { index, data: { ...state.certificates[index], [field]: value } }
    });
  };

  const remove = (index) => dispatch({ type: 'REMOVE_CERTIFICATE', payload: index });

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🏆 Certificates</h2>
        <button className="btn btn-secondary btn-sm" onClick={add}><FaPlus /> Add Certificate</button>
      </div>

      {state.certificates.length === 0 && (
        <div className="empty-state">
          <p>Add certifications from Coursera, LPU, FreeCodeCamp, etc.</p>
        </div>
      )}

      {state.certificates.map((cert, i) => (
        <div key={i} className="form-card">
          <div className="form-card-header">
            <h3>Certificate #{i + 1}</h3>
            <button className="btn-icon danger" onClick={() => remove(i)}><FaTrash /></button>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label>Certificate Name *</label>
              <input type="text" placeholder="Programming in C++: Data Structure & Algorithms"
                value={cert.name} onChange={(e) => update(i, 'name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Platform / Issuer</label>
              <input type="text" placeholder="Lovely Professional University"
                value={cert.platform} onChange={(e) => update(i, 'platform', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="text" placeholder="Jul '25"
                value={cert.date} onChange={(e) => update(i, 'date', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label>Certificate / Credential Link</label>
              <input type="url" placeholder="https://coursera.org/verify/..."
                value={cert.link} onChange={(e) => update(i, 'link', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
