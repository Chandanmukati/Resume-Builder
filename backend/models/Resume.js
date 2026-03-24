const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
  personalInfo: {
    fullName:  { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, default: '' },
    linkedin:  { type: String, default: '' },
    github:    { type: String, default: '' },
    portfolio: { type: String, default: '' },
    location:  { type: String, default: '' },
    summary:   { type: String, default: '' }
  },
  education: [{
    institution: { type: String, required: true },
    degree:      { type: String, required: true },
    field:       { type: String, default: '' },
    startDate:   { type: String, default: '' },
    endDate:     { type: String, default: '' },
    gpa:         { type: String, default: '' },
    achievements: { type: String, default: '' }
  }],
  experience: [{
    company:     { type: String, required: true },
    position:    { type: String, required: true },
    startDate:   { type: String, default: '' },
    endDate:     { type: String, default: '' },
    current:     { type: Boolean, default: false },
    description: { type: String, default: '' },
    bulletPoints: [{ type: String }]
  }],
  skills: {
    technical:  [{ type: String }],
    soft:       [{ type: String }],
    tools:      [{ type: String }],
    languages:  [{ type: String }]
  },
  projects: [{
    name:        { type: String, required: true },
    description: { type: String, default: '' },
    technologies: [{ type: String }],
    link:        { type: String, default: '' },
    highlights:  [{ type: String }]
  }],
  template:    { type: String, default: 'modern' },
  targetRole:  { type: String, default: '' },
  atsScore:    { type: Number, default: 0 },
  version:     { type: Number, default: 1 },
  targetJobDescription: { type: String, default: '' },
  matchedKeywords:      [{ type: String }],
  missingKeywords:      [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('Resume', resumeSchema);