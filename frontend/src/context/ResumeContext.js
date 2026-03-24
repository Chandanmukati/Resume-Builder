// ============================================
// RESUME CONTEXT
// Global state management for all resume data
// ============================================

import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext(null);

// ---- Initial empty resume state ----
const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    location: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
    tools: [],
    languages: []
  },
  projects: [],
  template: 'modern',
  targetRole: '',
  atsScore: 0,
  targetJobDescription: '',
  matchedKeywords: [],
  missingKeywords: []
};

// ---- Reducer ----
function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };

    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };

    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };

    case 'UPDATE_EDUCATION': {
      const edu = [...state.education];
      edu[action.payload.index] = action.payload.data;
      return { ...state, education: edu };
    }

    case 'REMOVE_EDUCATION': {
      const edu = state.education.filter((_, i) => i !== action.payload);
      return { ...state, education: edu };
    }

    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };

    case 'UPDATE_EXPERIENCE': {
      const exp = [...state.experience];
      exp[action.payload.index] = action.payload.data;
      return { ...state, experience: exp };
    }

    case 'REMOVE_EXPERIENCE': {
      const exp = state.experience.filter((_, i) => i !== action.payload);
      return { ...state, experience: exp };
    }

    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: { ...state.skills, [action.payload.category]: action.payload.skills }
      };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };

    case 'UPDATE_PROJECT': {
      const proj = [...state.projects];
      proj[action.payload.index] = action.payload.data;
      return { ...state, projects: proj };
    }

    case 'REMOVE_PROJECT': {
      const proj = state.projects.filter((_, i) => i !== action.payload);
      return { ...state, projects: proj };
    }

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

// ---- Provider ----
export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

// ---- Hook ----
export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}

export default ResumeContext;
