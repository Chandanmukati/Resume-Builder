// ============================================
// AI ROUTES
// Endpoints for all AI features
// ============================================

const express = require('express');
const router = express.Router();
const {
  improveBullets,
  improveSummary,
  matchJob,
  getATSScore,
  chat,
  suggestSkills
} = require('../controllers/aiController');

router.post('/improve-bullets', improveBullets);   // Enhance bullet points
router.post('/improve-summary', improveSummary);   // Improve summary
router.post('/match-job', matchJob);               // Job description matching
router.post('/ats-score', getATSScore);            // ATS compatibility score
router.post('/chat', chat);                        // AI chat assistant
router.post('/suggest-skills', suggestSkills);     // Role-based skill suggestions

module.exports = router;