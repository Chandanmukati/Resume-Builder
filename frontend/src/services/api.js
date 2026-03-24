// ============================================
// API SERVICE
// Axios calls to the backend
// ============================================

import axios from 'axios';

const BASE = 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE });

// ---- Resume CRUD ----
export const saveResume    = (data)      => api.post('/resumes', data);
export const getResumes    = ()          => api.get('/resumes');
export const getResume     = (id)        => api.get(`/resumes/${id}`);
export const updateResume  = (id, data)  => api.put(`/resumes/${id}`, data);
export const deleteResume  = (id)        => api.delete(`/resumes/${id}`);

// ---- AI Features ----
export const improveBullets      = (text, jobRole)             => api.post('/ai/improve-bullets',  { text, jobRole });
export const improveSummary      = (summary, skills, role)     => api.post('/ai/improve-summary',  { summary, skills, role });
export const matchJobDescription = (resumeData, jobDescription)=> api.post('/ai/match-job',        { resumeData, jobDescription });
export const getATSScore         = (resumeData)                => api.post('/ai/ats-score',        { resumeData });
export const aiChat              = (message, resumeData)       => api.post('/ai/chat',             { message, resumeData });
export const suggestSkills       = (role)                      => api.post('/ai/suggest-skills',   { role });

export default api;
