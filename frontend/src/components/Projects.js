// ============================================
// PROJECTS FORM
// Add technical or personal projects
// ============================================

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Projects() {
  const { state, dispatch } = useResume();

  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        name: '',
        description: '',
        technologies: [],
        link: '',
        highlights: []
      }
    });
  };

  const updateField = (index, field, value) => {
    const updated = { ...state.projects[index], [field]: value };
    dispatch({ type: 'UPDATE_PROJECT', payload: { index, data: updated } });
  };

  const removeProject = (index) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: index });
  };

  // Helper to handle comma-separated technologies
  const handleTechChange = (index, value) => {
    // We store as array, but edit as string
    const techArray = value.split(',').map(t => t.trim()).filter(t => t);
    
    // Update the actual technologies array
    updateField(index, 'technologies', techArray);
    
    // Also track the raw string value temporarily for the input field
    // by storing it in a temporary property (this is a simple hack for React controlled inputs)
    const updated = { ...state.projects[index], _rawTech: value, technologies: techArray };
    dispatch({ type: 'UPDATE_PROJECT', payload: { index, data: updated } });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🚀 Projects</h2>
        <button className="btn btn-secondary btn-sm" onClick={addProject}>
          <FaPlus /> Add Project
        </button>
      </div>

      {state.projects.length === 0 && (
        <div className="empty-state">
          <p>No projects added yet. Including technical projects helps stand out!</p>
        </div>
      )}

      {state.projects.map((proj, index) => (
        <div key={index} className="form-card">
          <div className="form-card-header">
            <h3>Project #{index + 1}</h3>
            <button className="btn-icon danger" onClick={() => removeProject(index)}>
              <FaTrash />
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                placeholder="E-commerce Platform"
                value={proj.name}
                onChange={(e) => updateField(index, 'name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Link (URL)</label>
              <input
                type="text"
                placeholder="github.com/user/repo"
                value={proj.link}
                onChange={(e) => updateField(index, 'link', e.target.value)}
              />
            </div>
            
            <div className="form-group full-width">
              <label>Technologies Used (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={proj._rawTech !== undefined ? proj._rawTech : proj.technologies.join(', ')}
                onChange={(e) => handleTechChange(index, e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="3"
                placeholder="Describe the project, your role, and what you achieved..."
                value={proj.description}
                onChange={(e) => updateField(index, 'description', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;