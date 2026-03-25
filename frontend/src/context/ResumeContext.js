// ============================================
// RESUME CONTEXT
// Global state management for all resume data
// ============================================

import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext(null);

const initialState = {
  personalInfo: {
    fullName: '', email: '', phone: '', linkedin: '',
    github: '', portfolio: '', location: '', summary: ''
  },
  education: [],
  experience: [],
  skills: { technical: [], soft: [], tools: [], languages: [] },
  projects: [],

  // ── NEW SECTIONS ──
  training: [],        // Training programs
  certificates: [],    // Certifications

  // ── REFERENCE RESUME ──
  referenceImage: null,   // base64 of uploaded reference
  referenceStyle: null,   // AI-detected style object

  template: 'modern',
  targetRole: '',
  atsScore: 0,
  targetJobDescription: '',
  matchedKeywords: [],
  missingKeywords: []
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };

    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };

    // ── Education ──
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION': {
      const edu = [...state.education];
      edu[action.payload.index] = action.payload.data;
      return { ...state, education: edu };
    }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, i) => i !== action.payload) };

    // ── Experience ──
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE': {
      const exp = [...state.experience];
      exp[action.payload.index] = action.payload.data;
      return { ...state, experience: exp };
    }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((_, i) => i !== action.payload) };

    // ── Skills ──
    case 'UPDATE_SKILLS':
      return { ...state, skills: { ...state.skills, [action.payload.category]: action.payload.skills } };

    // ── Projects ──
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT': {
      const proj = [...state.projects];
      proj[action.payload.index] = action.payload.data;
      return { ...state, projects: proj };
    }
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((_, i) => i !== action.payload) };

    // ── Training ──
    case 'ADD_TRAINING':
      return { ...state, training: [...state.training, action.payload] };
    case 'UPDATE_TRAINING': {
      const t = [...state.training];
      t[action.payload.index] = action.payload.data;
      return { ...state, training: t };
    }
    case 'REMOVE_TRAINING':
      return { ...state, training: state.training.filter((_, i) => i !== action.payload) };

    // ── Certificates ──
    case 'ADD_CERTIFICATE':
      return { ...state, certificates: [...state.certificates, action.payload] };
    case 'UPDATE_CERTIFICATE': {
      const c = [...state.certificates];
      c[action.payload.index] = action.payload.data;
      return { ...state, certificates: c };
    }
    case 'REMOVE_CERTIFICATE':
      return { ...state, certificates: state.certificates.filter((_, i) => i !== action.payload) };

    // ── Reference Resume ──
    case 'SET_REFERENCE':
      return { ...state, referenceImage: action.payload };
    case 'SET_REFERENCE_STYLE':
      if (action.payload) {
        return {
          ...state,
          referenceStyle: action.payload,
          template: 'reference'   // Auto-switch to reference template
        };
      }
      return { ...state, referenceStyle: null };

    // ── Template / misc ──
    case 'SET_TEMPLATE':
      return { ...state, template: action.payload };
    case 'SET_ATS_SCORE':
      return { ...state, atsScore: action.payload };
    case 'LOAD_RESUME':
      return { ...initialState, ...action.payload };
    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}

export default ResumeContext;
