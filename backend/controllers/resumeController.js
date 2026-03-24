// ============================================
// RESUME CONTROLLER
// Handles CRUD operations for resumes
// ============================================

const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resumes
const createResume = async (req, res, next) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all resumes
// @route   GET /api/resumes
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find().sort({ updatedAt: -1 });
    res.json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume not found' });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
const updateResume = async (req, res, next) => {
  try {
    // Increment version on each update
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume not found' });
    }
    
    req.body.version = (resume.version || 1) + 1;
    
    const updated = await Resume.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume
};