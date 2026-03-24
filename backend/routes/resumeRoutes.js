const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;