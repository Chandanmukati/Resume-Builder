// ============================================
// BUILDER PAGE - UPDATED
// Now includes: Training, Certificates, Reference Resume
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { saveResume } from '../services/api';

// Form Sections
import PersonalInfo  from '../components/PersonalInfo';
import Education     from '../components/Education';
import Experience    from '../components/Experience';
import Skills        from '../components/Skills';
import Projects      from '../components/Projects';
import Training      from '../components/Training';
import Certificates  from '../components/Certificates';

// AI Panels
import AIChatbot     from '../components/AIChatbot';
import ATSScore      from '../components/ATSScore';
import JobMatcher    from '../components/JobMatcher';
import ReferenceResume from '../components/ReferenceResume';

// Templates
import ModernTemplate    from '../components/templates/ModernTemplate';
import ClassicTemplate   from '../components/templates/ClassicTemplate';
import MinimalTemplate   from '../components/templates/MinimalTemplate';
import ReferenceTemplate from '../components/templates/ReferenceTemplate';
import StockholmTemplate from '../components/templates/StockholmTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import ViennaTemplate    from '../components/templates/ViennaTemplate';
import TechTemplate      from '../components/templates/TechTemplate';
import DublinTemplate    from '../components/templates/DublinTemplate';
import MadridTemplate    from '../components/templates/MadridTemplate';
import AmsterdamTemplate from '../components/templates/AmsterdamTemplate';
import HarvardTemplate   from '../components/templates/HarvardTemplate';
import ExecutiveEdgeTemplate from '../components/templates/ExecutiveEdgeTemplate';
import BoardRoomTemplate   from '../components/templates/BoardRoomTemplate';
import PinnacleProTemplate from '../components/templates/PinnacleProTemplate';
import NeuralTemplate      from '../components/templates/NeuralTemplate';
import SyntaxTemplate      from '../components/templates/SyntaxTemplate';
import CircuitTemplate     from '../components/templates/CircuitTemplate';
import CanvasTemplate      from '../components/templates/CanvasTemplate';
import VividTemplate       from '../components/templates/VividTemplate';
import StandoutTemplate    from '../components/templates/StandoutTemplate';

import {
  FaUser, FaGraduationCap, FaBriefcase, FaTools,
  FaProjectDiagram, FaRobot, FaChartBar, FaSearch,
  FaImage, FaDownload, FaSave, FaSpinner, FaCertificate, FaChalkboardTeacher
} from 'react-icons/fa';

const SECTIONS = [
  { id: 'personal',      label: 'Personal',      icon: <FaUser /> },
  { id: 'experience',    label: 'Experience',     icon: <FaBriefcase /> },
  { id: 'training',      label: 'Training',       icon: <FaChalkboardTeacher /> },
  { id: 'education',     label: 'Education',      icon: <FaGraduationCap /> },
  { id: 'skills',        label: 'Skills',         icon: <FaTools /> },
  { id: 'projects',      label: 'Projects',       icon: <FaProjectDiagram /> },
  { id: 'certificates',  label: 'Certificates',   icon: <FaCertificate /> },
];

const TEMPLATES = {
  modern:    ModernTemplate,
  classic:   ClassicTemplate,
  minimal:   MinimalTemplate,
  stockholm: StockholmTemplate,
  executive: ExecutiveTemplate,
  vienna:    ViennaTemplate,
  tech:      TechTemplate,
  dublin:    DublinTemplate,
  madrid:    MadridTemplate,
  amsterdam: AmsterdamTemplate,
  harvard:   HarvardTemplate,
  reference: ReferenceTemplate,
  executiveEdge: ExecutiveEdgeTemplate,
  boardRoom: BoardRoomTemplate,
  pinnaclePro: PinnacleProTemplate,
  neural:    NeuralTemplate,
  syntax:    SyntaxTemplate,
  circuit:   CircuitTemplate,
  canvas:    CanvasTemplate,
  vivid:     VividTemplate,
  standout:  StandoutTemplate,
};

function Builder() {
  const { state, dispatch } = useResume();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('personal');
  const [activePanel, setActivePanel]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const previewRef = useRef(null);

  useEffect(() => {
    const tmpl = searchParams.get('template');
    if (tmpl && TEMPLATES[tmpl]) {
      dispatch({ type: 'SET_TEMPLATE', payload: tmpl });
    }
  }, []);

  // Auto-switch to reference template when image is uploaded
  useEffect(() => {
    if (state.referenceImage && state.template !== 'reference') {
      dispatch({ type: 'SET_TEMPLATE', payload: 'reference' });
    }
  }, [state.referenceImage]);

  const handleDownload = () => {
    if (!previewRef.current) return;
    const opt = {
      margin: 0,
      filename: `${state.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf().set(opt).from(previewRef.current).save();
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveResume(state);
      setSaveMsg('✅ Saved!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('❌ Save failed');
      setTimeout(() => setSaveMsg(''), 4000);
    }
    setSaving(false);
  };

  const togglePanel = (panel) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  const TemplateComponent = TEMPLATES[state.template] || ModernTemplate;

  return (
    <div className="builder-page">

      {/* ═══ LEFT: FORM PANEL ═══ */}
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

        {/* Form Content */}
        <div className="form-content">
          {activeSection === 'personal'     && <PersonalInfo />}
          {activeSection === 'experience'   && <Experience />}
          {activeSection === 'training'     && <Training />}
          {activeSection === 'education'    && <Education />}
          {activeSection === 'skills'       && <Skills />}
          {activeSection === 'projects'     && <Projects />}
          {activeSection === 'certificates' && <Certificates />}
        </div>

        {/* AI / Feature Panels */}
        {activePanel === 'chatbot'    && <AIChatbot    onClose={() => setActivePanel(null)} />}
        {activePanel === 'ats'        && <ATSScore     onClose={() => setActivePanel(null)} />}
        {activePanel === 'jobmatch'   && <JobMatcher />}
        {activePanel === 'reference'  && <ReferenceResume onClose={() => setActivePanel(null)} />}

        {/* Bottom Tools Bar */}
        <div className="ai-tools-bar">
          <button
            className={`btn btn-sm ${activePanel === 'reference' ? 'btn-ai' : 'btn-secondary'}`}
            onClick={() => togglePanel('reference')}
            title="Upload your existing resume as a reference"
          >
            <FaImage />
            {state.referenceImage ? ' Reference ✓' : ' Reference'}
          </button>
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
            <FaSearch /> Job Match
          </button>
        </div>
      </div>

      {/* ═══ RIGHT: PREVIEW PANEL ═══ */}
      <div className="builder-preview-panel">

        {/* Toolbar */}
        <div className="preview-toolbar">
          <div className="template-selector">
            <label>Template:</label>
            <select
              value={state.template}
              onChange={(e) => dispatch({ type: 'SET_TEMPLATE', payload: e.target.value })}
            >
              <optgroup label="Standard">
                <option value="modern">🔷 Modern</option>
                <option value="classic">📄 Classic</option>
                <option value="minimal">🌿 Minimal</option>
              </optgroup>
              <optgroup label="Professional & Corporate">
                <option value="executive">👔 Executive</option>
                <option value="harvard">🏛 Harvard</option>
                <option value="executiveEdge">🏢 Executive Edge</option>
                <option value="boardRoom">📊 Board Room</option>
                <option value="pinnaclePro">⭐ Pinnacle Pro</option>
              </optgroup>
              <optgroup label="Tech & Startup">
                <option value="stockholm">🌃 Stockholm</option>
                <option value="amsterdam">🌷 Amsterdam</option>
                <option value="tech">💻 Tech Grid</option>
                <option value="neural">🧠 Neural</option>
                <option value="syntax">⌨️ Syntax</option>
                <option value="circuit">⚡ Circuit</option>
              </optgroup>
              <optgroup label="Creative">
                <option value="vienna">🎻 Vienna</option>
                <option value="dublin">☘️ Dublin</option>
                <option value="madrid">🎨 Madrid</option>
                <option value="canvas">🎨 Canvas</option>
                <option value="vivid">✨ Vivid</option>
                <option value="standout">🌟 Standout</option>
              </optgroup>
              <optgroup label="Custom">
                <option value="reference">📌 Reference Style</option>
              </optgroup>
            </select>
          </div>

          <div className="preview-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? <FaSpinner className="spin" /> : <FaSave />} Save
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownload}>
              <FaDownload /> PDF
            </button>
          </div>
        </div>

        {saveMsg && <div className="save-message">{saveMsg}</div>}

        {/* Clean full-width resume preview — no side panels */}
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
