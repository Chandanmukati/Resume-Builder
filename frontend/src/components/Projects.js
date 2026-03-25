// ============================================
// PROJECTS FORM — UPDATED
// Includes: name, date, tech stack, description,
//           highlights (bullets), GitHub link
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const EMPTY = {
  name: '',
  date: '',
  description: '',
  technologies: [],
  _rawTech: '',
  link: '',
  highlights: []
};

function Projects() {
  const { state, dispatch } = useResume();

  const add = () => dispatch({ type: 'ADD_PROJECT', payload: { ...EMPTY } });

  const update = (index, field, value) => {
    const updated = { ...state.projects[index], [field]: value };
    dispatch({ type: 'UPDATE_PROJECT', payload: { index, data: updated } });
  };

  const remove = (index) => dispatch({ type: 'REMOVE_PROJECT', payload: index });

  const handleTechChange = (index, value) => {
    const techArray = value.split(',').map(t => t.trim()).filter(t => t);
    const updated = { ...state.projects[index], _rawTech: value, technologies: techArray };
    dispatch({ type: 'UPDATE_PROJECT', payload: { index, data: updated } });
  };

  const addHighlight = (index) => {
    const highlights = [...(state.projects[index].highlights || []), ''];
    update(index, 'highlights', highlights);
  };

  const updateHighlight = (pIdx, hIdx, value) => {
    const highlights = [...state.projects[pIdx].highlights];
    highlights[hIdx] = value;
    update(pIdx, 'highlights', highlights);
  };

  const removeHighlight = (pIdx, hIdx) => {
    const highlights = state.projects[pIdx].highlights.filter((_, i) => i !== hIdx);
    update(pIdx, 'highlights', highlights);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🚀 Projects</h2>
        <button className="btn btn-secondary btn-sm" onClick={add}>
          <FaPlus /> Add Project
        </button>
      </div>

      {state.projects.length === 0 && (
        <div className="empty-state">
          <p>Add technical or personal projects. Include GitHub links!</p>
        </div>
      )}

      {state.projects.map((proj, index) => (
        <div key={index} className="form-card">
          <div className="form-card-header">
            <h3>Project #{index + 1}</h3>
            <button className="btn-icon danger" onClick={() => remove(index)}>
              <FaTrash />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                placeholder="Event Management Website"
                value={proj.name}
                onChange={(e) => update(index, 'name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date (e.g. Nov '25 or Apr '25)</label>
              <input
                type="text"
                placeholder="Apr '25"
                value={proj.date || ''}
                onChange={(e) => update(index, 'date', e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="HTML, CSS, PHP, MySQL"
                value={proj._rawTech !== undefined ? proj._rawTech : proj.technologies.join(', ')}
                onChange={(e) => handleTechChange(index, e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Description (will appear as bullet points in resume)</label>
              <textarea
                rows="3"
                placeholder="Describe what the project does and your key contributions..."
                value={proj.description}
                onChange={(e) => update(index, 'description', e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <div className="label-with-action">
                <label>Bullet Point Highlights</label>
                <button className="btn btn-secondary btn-sm" onClick={() => addHighlight(index)}>
                  <FaPlus /> Add Bullet
                </button>
              </div>
              {(proj.highlights || []).map((h, hIdx) => (
                <div key={hIdx} className="bullet-item" style={{ marginTop: '6px' }}>
                  <span className="bullet-dot">•</span>
                  <input
                    type="text"
                    value={h}
                    placeholder="Built an intuitive admin panel..."
                    onChange={(e) => updateHighlight(index, hIdx, e.target.value)}
                  />
                  <button className="btn-icon danger" onClick={() => removeHighlight(index, hIdx)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group full-width">
              <label>GitHub Repository Link</label>
              <input
                type="url"
                placeholder="https://github.com/Chandanmukati/Event-Management-Website"
                value={proj.link}
                onChange={(e) => update(index, 'link', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;