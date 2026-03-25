// ============================================
// TRAINING FORM
// Training programs / bootcamps / internships
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Training() {
  const { state, dispatch } = useResume();

  const add = () => dispatch({
    type: 'ADD_TRAINING',
    payload: { organization: '', role: '', startDate: '', endDate: '', description: '', bullets: [] }
  });

  const update = (index, field, value) => {
    dispatch({ type: 'UPDATE_TRAINING', payload: { index, data: { ...state.training[index], [field]: value } } });
  };

  const remove = (index) => dispatch({ type: 'REMOVE_TRAINING', payload: index });

  const updateBullet = (tIdx, bIdx, value) => {
    const bullets = [...state.training[tIdx].bullets];
    bullets[bIdx] = value;
    update(tIdx, 'bullets', bullets);
  };

  const addBullet = (tIdx) => {
    const bullets = [...(state.training[tIdx].bullets || []), ''];
    update(tIdx, 'bullets', bullets);
  };

  const removeBullet = (tIdx, bIdx) => {
    const bullets = state.training[tIdx].bullets.filter((_, i) => i !== bIdx);
    update(tIdx, 'bullets', bullets);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🎓 Training</h2>
        <button className="btn btn-secondary btn-sm" onClick={add}><FaPlus /> Add Training</button>
      </div>

      {state.training.length === 0 && (
        <div className="empty-state">
          <p>Add training programs, bootcamps, or internships here.</p>
        </div>
      )}

      {state.training.map((t, i) => (
        <div key={i} className="form-card">
          <div className="form-card-header">
            <h3>Training #{i + 1}</h3>
            <button className="btn-icon danger" onClick={() => remove(i)}><FaTrash /></button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Organization / Program *</label>
              <input type="text" placeholder="Board Infinity" value={t.organization}
                onChange={(e) => update(i, 'organization', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role / Course Title</label>
              <input type="text" placeholder="Data Structures & Algorithms" value={t.role}
                onChange={(e) => update(i, 'role', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="text" placeholder="Jun '25" value={t.startDate}
                onChange={(e) => update(i, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="text" placeholder="Jul '25" value={t.endDate}
                onChange={(e) => update(i, 'endDate', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="2" placeholder="Brief description of what you learned..."
                value={t.description} onChange={(e) => update(i, 'description', e.target.value)} />
            </div>
          </div>

          {/* Bullets */}
          <div className="form-group full-width" style={{ marginTop: '8px' }}>
            <div className="label-with-action">
              <label>Key Achievements (Bullet Points)</label>
              <button className="btn btn-secondary btn-sm" onClick={() => addBullet(i)}><FaPlus /> Add Bullet</button>
            </div>
            {(t.bullets || []).map((b, j) => (
              <div key={j} className="bullet-item" style={{ marginTop: '6px' }}>
                <span className="bullet-dot">•</span>
                <input type="text" value={b} placeholder="Completed intensive training in..."
                  onChange={(e) => updateBullet(i, j, e.target.value)} />
                <button className="btn-icon danger" onClick={() => removeBullet(i, j)}><FaTrash /></button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Training;
