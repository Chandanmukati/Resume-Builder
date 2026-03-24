// ============================================
// AI CONTROLLER
// Handles all AI-powered endpoints
// ============================================

const aiService = require('../services/aiService');

// @desc    Improve bullet points
// @route   POST /api/ai/improve-bullets
const improveBullets = async (req, res, next) => {
  try {
    const { text, jobRole } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }
    
    const bullets = await aiService.improveBulletPoints(text, jobRole);
    res.json({ success: true, data: bullets });
  } catch (error) {
    next(error);
  }
};

// @desc    Improve professional summary
// @route   POST /api/ai/improve-summary
const improveSummary = async (req, res, next) => {
  try {
    const { summary, skills, role } = req.body;
    const improved = await aiService.improveSummary(summary || '', skills || [], role);
    res.json({ success: true, data: improved });
  } catch (error) {
    next(error);
  }
};

// @desc    Match resume with job description
// @route   POST /api/ai/match-job
const matchJob = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ success: false, error: 'Job description is required' });
    }
    
    const result = await aiService.matchJobDescription(resumeData, jobDescription);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Calculate ATS score
// @route   POST /api/ai/ats-score
const getATSScore = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    const result = await aiService.calculateATSScore(resumeData);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    AI Chat assistant
// @route   POST /api/ai/chat
const chat = async (req, res, next) => {
  try {
    const { message, resumeData } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }
    
    const reply = await aiService.chatAssistant(message, resumeData);
    res.json({ success: true, data: reply });
  } catch (error) {
    next(error);
  }
};

// @desc    Suggest skills for a role
// @route   POST /api/ai/suggest-skills
const suggestSkills = async (req, res, next) => {
  try {
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ success: false, error: 'Role is required' });
    }
    
    const skills = await aiService.suggestSkillsForRole(role);
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  improveBullets,
  improveSummary,
  matchJob,
  getATSScore,
  chat,
  suggestSkills
};