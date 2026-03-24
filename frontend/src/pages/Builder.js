// ============================================
// BUILDER PAGE
// Split-pane layout: form on left, preview on right
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { saveResume, getATSScore } from '../services/api';

// Form Sections
import PersonalInfo from '../components/PersonalInfo';
import Education    from '../components/Education';
import Experience   from '../components/Experience';
import Skills       from '../components/Skills';
import Projects     from '../components/Projects';

// AI Panels
import AIChatbot  from '../components/AIChatbot';
import ATSScore   from '../components/ATSScore';
import JobMatcher from '../components/JobMatcher';

// Templates
import ModernTemplate  from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';

import {
  FaUser, FaGraduationCap, FaBriefcase, FaTools,
  FaProjectDiagram, FaRobot, FaChartBar, FaBriefcase as FaJob,
  FaDownload, FaSave, FaSpinner
} from 'react-icons/fa';

// ---- Section tabs configuration ----
const SECTIONS = [
  { id: 'personal',    label: 'Personal',   icon: <FaUser /> },
  { id: 'experience',  label: 'Experience', icon: <FaBriefcase /> },
  { id: 'education',   label: 'Education',  icon: <FaGraduationCap /> },
  { id: 'skills',      label: 'Skills',     icon: <FaTools /> },
  { id: 'projects',    label: 'Projects',   icon: <FaProjectDiagram /> },
];

const TEMPLATES = {
  modern:  ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

function Builder() {
  const { state, dispatch } = useResume();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('personal');
  const [activePanel, setActivePanel]     = useState(null); // 'chatbot' | 'ats' | 'jobmatch'
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const previewRef = useRef(null);

  // Apply template from URL if coming from Templates page
  useEffect(() => {
    const tmpl = searchParams.get('template');
    if (tmpl && TEMPLATES[tmpl]) {
      dispatch({ type: 'SET_TEMPLATE', payload: tmpl });
    }
  }, []);

  // ---- PDF Download ----
  const handleDownload = () => {
    if (!previewRef.current) return;
    const opt = {
      margin: 0,
      filename: `${state.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // Load html2pdf lazily
    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf().set(opt).from(previewRef.current).save();
    });
  };

  // ---- Save to backend ----
  const handleSave = async () => {
    setSaving(true);
    try {
      await saveResume(state);
      setSaveMsg('✅ Saved successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveMsg('❌ Save failed — is the backend running?');
      setTimeout(() => setSaveMsg(''), 4000);
    }
    setSaving(false);
  };

  // ---- Toggle AI panel ----
  const togglePanel = (panel) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  // ---- Render active template ----
  const TemplateComponent = TEMPLATES[state.template] || ModernTemplate;

  return (
    <div className="builder-page">

      {/* ========= LEFT: FORM PANEL ========= */}
      <div className="builder-form-panel">

        {/* Section Tabs */}
        <div className="section-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`section-tab ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="tab-icon">{s.icon}</span>
              <span className="tab-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Active Form Section */}
        <div className="form-content">
          {activeSection === 'personal'   && <PersonalInfo />}
          {activeSection === 'experience' && <Experience   />}
          {activeSection === 'education'  && <Education    />}
          {activeSection === 'skills'     && <Skills       />}
          {activeSection === 'projects'   && <Projects     />}
        </div>

        {/* AI Panels (shown below form when active) */}
        {activePanel === 'chatbot'   && <AIChatbot  onClose={() => setActivePanel(null)} />}
        {activePanel === 'ats'       && <ATSScore   onClose={() => setActivePanel(null)} />}
        {activePanel === 'jobmatch'  && <JobMatcher />}

        {/* AI Tools Bar */}
        <div className="ai-tools-bar">
          <button
            className={`btn btn-sm ${activePanel === 'chatbot' ? 'btn-ai' : 'btn-secondary'}`}
            onClick={() => togglePanel('chatbot')}
          >
            <FaRobot /> AI Chat
          </button>
          <button
            className={`btn btn-sm ${activePanel === 'ats' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => togglePanel('ats')}
          >
            <FaChartBar /> ATS Score
          </button>
          <button
            className={`btn btn-sm ${activePanel === 'jobmatch' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => togglePanel('jobmatch')}
          >
            <FaJob /> Job Match
          </button>
        </div>
      </div>

      {/* ========= RIGHT: PREVIEW PANEL ========= */}
      <div className="builder-preview-panel">

        {/* Toolbar */}
        <div className="preview-toolbar">
          <div className="template-selector">
            <label>Template:</label>
            <select
              value={state.template}
              onChange={(e) => dispatch({ type: 'SET_TEMPLATE', payload: e.target.value })}
            >
              <option value="modern">🔷 Modern</option>
              <option value="classic">📄 Classic</option>
              <option value="minimal">🌿 Minimal</option>
            </select>
          </div>

          <div className="preview-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? <FaSpinner className="spin" /> : <FaSave />} Save
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownload}>
              <FaDownload /> Download PDF
            </button>
          </div>
        </div>

        {saveMsg && <div className="save-message">{saveMsg}</div>}

        {/* Resume Preview */}
        <div className="preview-container">
          <div className="resume-preview" ref={previewRef}>
            <TemplateComponent data={state} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Builder;
