// ============================================
// SKILLS FORM
// Manage skills with AI suggestions
// ============================================

import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { suggestSkills } from '../services/api';
import { FaPlus, FaTimes, FaMagic, FaSpinner } from 'react-icons/fa';

function Skills() {
  const { state, dispatch } = useResume();
  const [inputs, setInputs] = useState({ technical: '', soft: '', tools: '' });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  // Auto-fetch suggestions if they change target role
  useEffect(() => {
    if (state.targetRole && state.targetRole.length > 3) {
      handleGetSuggestions(state.targetRole);
    }
  }, [state.targetRole]);

  const handleAddSkill = (category) => {
    const val = inputs[category].trim();
    if (!val) return;

    const currentSkills = state.skills[category] || [];
    if (!currentSkills.includes(val)) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: { category, skills: [...currentSkills, val] }
      });
    }
    
    setInputs(prev => ({ ...prev, [category]: '' }));
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(category);
    }
  };

  const removeSkill = (category, index) => {
    const newSkills = [...state.skills[category]];
    newSkills.splice(index, 1);
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: { category, skills: newSkills }
    });
  };

  const handleGetSuggestions = async (roleOverride) => {
    const role = roleOverride || state.targetRole || state.personalInfo.summary;
    if (!role) return;

    setLoading(true);
    try {
      const res = await suggestSkills(role);
      setSuggestions(res.data.data);
    } catch (err) {
      console.error('Failed to get skill suggestions', err);
    }
    setLoading(false);
  };

  const addSuggestion = (category, skill) => {
    const safeCategory = category === 'certifications' ? 'tools' : category; // map certs to tools if needed, or create new category
    
    // Ensure category array exists
    if (!state.skills[safeCategory]) {
      dispatch({ type: 'UPDATE_SKILLS', payload: { category: safeCategory, skills: [] } });
    }

    const currentSkills = state.skills[safeCategory] || [];
    if (!currentSkills.includes(skill)) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: { category: safeCategory, skills: [...currentSkills, skill] }
      });
    }
  };

  const renderCategory = (title, category, placeholder) => {
    const skills = state.skills[category] || [];
    
    return (
      <div className="skill-category">
        <label className="form-group label">{title}</label>
        <div className="skill-input-row">
          <input
            type="text"
            placeholder={placeholder}
            value={inputs[category]}
            onChange={(e) => setInputs(prev => ({ ...prev, [category]: e.target.value }))}
            onKeyDown={(e) => handleKeyDown(e, category)}
          />
          <button className="btn btn-secondary" onClick={() => handleAddSkill(category)}>
            <FaPlus />
          </button>
        </div>
        
        <div className="skills-tags">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button type="button" onClick={() => removeSkill(category, index)}>
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="form-section-title">🛠️ Skills</h2>
        <button 
          className="btn btn-ai btn-sm" 
          onClick={() => handleGetSuggestions()}
          disabled={loading || (!state.targetRole && !state.personalInfo.summary)}
        >
          {loading ? <><FaSpinner className="spin" /> Loading...</> : <><FaMagic /> AI Suggestions</>}
        </button>
      </div>
      
      {!state.targetRole && (
        <p className="suggestion-hint" style={{ marginTop: '-10px', marginBottom: '15px' }}>
          💡 Set a Target Job Role in "Personal Info" for better AI skill suggestions.
        </p>
      )}

      {renderCategory('Technical Skills', 'technical', 'React, Node.js, Python... (Press Enter)')}
      {renderCategory('Soft Skills', 'soft', 'Communication, Leadership... (Press Enter)')}
      {renderCategory('Tools & Software', 'tools', 'Git, Docker, Figma... (Press Enter)')}

      {/* AI Suggestions Box */}
      {suggestions && (
        <div className="suggestions-panel fade-in">
          <h3>✨ Recommended Skills for {state.targetRole || 'your role'}</h3>
          <p className="suggestion-hint">Click a skill to add it to your resume.</p>
          
          <div className="suggestion-category">
            <h4>Technical</h4>
            <div className="suggestion-tags">
              {suggestions.technical?.map((skill, i) => (
                <span 
                  key={i} 
                  className={`suggestion-tag ${state.skills.technical?.includes(skill) ? 'added' : ''}`}
                  onClick={() => addSuggestion('technical', skill)}
                >
                  {skill} {state.skills.technical?.includes(skill) && '✓'}
                </span>
              ))}
            </div>
          </div>
          
          <div className="suggestion-category">
            <h4>Soft Skills</h4>
            <div className="suggestion-tags">
              {suggestions.soft?.map((skill, i) => (
                <span 
                  key={i} 
                  className={`suggestion-tag ${state.skills.soft?.includes(skill) ? 'added' : ''}`}
                  onClick={() => addSuggestion('soft', skill)}
                >
                  {skill} {state.skills.soft?.includes(skill) && '✓'}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;