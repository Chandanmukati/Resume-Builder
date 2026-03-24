// ============================================
// AI SERVICE
// Handles all AI operations using OpenAI API
// Falls back to built-in logic if no API key
// ============================================

const OpenAI = require('openai');

// Initialize OpenAI client (only if API key exists)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ==========================================
// 1. IMPROVE BULLET POINTS
// Converts basic text into professional resume bullets
// ==========================================
async function improveBulletPoints(rawText, jobRole = '') {
  if (openai) {
    // ---------- USE OPENAI ----------
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `You are an expert resume writer. Convert the following work description 
                  into 3-5 powerful, ATS-friendly bullet points. Use action verbs, 
                  include metrics where possible, and tailor for ${jobRole || 'a tech role'}.
                  Return ONLY the bullet points, one per line, starting with •`
      }, {
        role: 'user',
        content: rawText
      }],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return response.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim());
  }
  
  // ---------- FALLBACK: Built-in Enhancement ----------
  return enhanceBulletPointsLocally(rawText);
}

// ==========================================
// 2. IMPROVE SUMMARY
// Creates a professional summary from basic input
// ==========================================
async function improveSummary(basicSummary, skills = [], role = '') {
  if (openai) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `You are an expert resume writer. Create a compelling 2-3 sentence 
                  professional summary for a ${role || 'software developer'}. 
                  Incorporate these skills naturally: ${skills.join(', ')}.
                  Make it ATS-friendly and impactful.`
      }, {
        role: 'user',
        content: basicSummary
      }],
      temperature: 0.7,
      max_tokens: 200
    });
    return response.choices[0].message.content.trim();
  }
  
  return generateSummaryLocally(basicSummary, skills, role);
}

// ==========================================
// 3. MATCH JOB DESCRIPTION
// Analyzes resume against a job posting
// ==========================================
async function matchJobDescription(resumeData, jobDescription) {
  if (openai) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `You are an ATS expert. Analyze the resume against the job description.
                  Return a JSON object with:
                  {
                    "score": (0-100),
                    "matchedKeywords": ["keyword1", "keyword2"],
                    "missingKeywords": ["keyword1", "keyword2"],
                    "suggestions": ["suggestion1", "suggestion2"],
                    "strengths": ["strength1", "strength2"]
                  }`
      }, {
        role: 'user',
        content: `RESUME:\n${JSON.stringify(resumeData)}\n\nJOB DESCRIPTION:\n${jobDescription}`
      }],
      temperature: 0.3,
      max_tokens: 800
    });
    
    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      return matchJobLocally(resumeData, jobDescription);
    }
  }
  
  return matchJobLocally(resumeData, jobDescription);
}

// ==========================================
// 4. CALCULATE ATS SCORE
// Scores resume for ATS compatibility
// ==========================================
async function calculateATSScore(resumeData) {
  if (openai) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `You are an ATS scoring system. Score this resume 0-100 based on:
                  - Contact info completeness (10 pts)
                  - Summary quality (15 pts)
                  - Experience with metrics (25 pts)
                  - Skills relevance (20 pts)
                  - Education details (10 pts)
                  - Projects quality (10 pts)
                  - Overall formatting (10 pts)
                  Return JSON: {"score": N, "breakdown": {...}, "improvements": [...]}`
      }, {
        role: 'user',
        content: JSON.stringify(resumeData)
      }],
      temperature: 0.3,
      max_tokens: 600
    });
    
    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      return scoreResumeLocally(resumeData);
    }
  }
  
  return scoreResumeLocally(resumeData);
}

// ==========================================
// 5. AI CHAT ASSISTANT
// Answers resume-related questions
// ==========================================
async function chatAssistant(message, resumeData) {
  if (openai) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `You are a helpful resume assistant. The user is building their resume.
                  Here's their current resume data: ${JSON.stringify(resumeData)}.
                  Help them improve their resume, suggest better wording, recommend skills,
                  and provide actionable advice. Keep responses concise and practical.`
      }, {
        role: 'user',
        content: message
      }],
      temperature: 0.7,
      max_tokens: 500
    });
    return response.choices[0].message.content.trim();
  }
  
  return chatFallback(message, resumeData);
}

// ==========================================
// 6. SUGGEST SKILLS BY ROLE
// Recommends skills for a given job role
// ==========================================
async function suggestSkillsForRole(role) {
  if (openai) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: `Suggest the top skills for a ${role} position.
                  Return JSON: {
                    "technical": ["skill1", "skill2", ...],
                    "soft": ["skill1", "skill2", ...],
                    "tools": ["tool1", "tool2", ...],
                    "certifications": ["cert1", "cert2", ...]
                  }`
      }],
      temperature: 0.5,
      max_tokens: 400
    });
    
    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      return suggestSkillsLocally(role);
    }
  }
  
  return suggestSkillsLocally(role);
}


// =====================================================
// FALLBACK FUNCTIONS (Work without OpenAI API key)
// These provide basic AI-like functionality for demos
// =====================================================

function enhanceBulletPointsLocally(rawText) {
  // Action verbs to make bullets more impactful
  const actionVerbs = [
    'Developed', 'Implemented', 'Designed', 'Optimized', 'Led',
    'Architected', 'Streamlined', 'Automated', 'Delivered', 'Spearheaded'
  ];
  
  const sentences = rawText.split(/[.\n]/).filter(s => s.trim().length > 10);
  
  return sentences.slice(0, 5).map((sentence, i) => {
    let cleaned = sentence.trim();
    // Remove common weak starts
    cleaned = cleaned.replace(/^(I |We |My |Was |Did |Helped )/i, '');
    // Capitalize and add action verb if not starting with one
    const hasActionVerb = actionVerbs.some(v => 
      cleaned.toLowerCase().startsWith(v.toLowerCase())
    );
    
    if (!hasActionVerb) {
      cleaned = `${actionVerbs[i % actionVerbs.length]} ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
    }
    
    // Add metrics placeholder if none exist
    if (!/\\d/.test(cleaned)) {
      cleaned += ', resulting in improved efficiency and performance';
    }
    
    return cleaned;
  });
}

function generateSummaryLocally(basic, skills, role) {
  const skillStr = skills.slice(0, 4).join(', ') || 'modern technologies';
  const roleStr = role || 'Software Developer';
  
  return `Results-driven ${roleStr} with hands-on experience in ${skillStr}. ${basic ? basic + '. ' : ''}Passionate about building scalable applications and solving complex problems. Proven ability to deliver high-quality solutions in collaborative team environments.`;
}

function matchJobLocally(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase();
  const resumeText = JSON.stringify(resumeData).toLowerCase();
  
  // Extract keywords from job description
  const techKeywords = [
    'javascript', 'python', 'react', 'node', 'typescript', 'java', 'sql',
    'aws', 'docker', 'kubernetes', 'git', 'agile', 'rest', 'api',
    'mongodb', 'postgresql', 'redis', 'graphql', 'ci/cd', 'testing',
    'html', 'css', 'angular', 'vue', 'express', 'django', 'flask',
    'machine learning', 'data structures', 'algorithms', 'linux',
    'microservices', 'cloud', 'devops', 'security', 'performance'
  ];
  
  const matched = [];
  const missing = [];
  
  techKeywords.forEach(keyword => {
    if (jdLower.includes(keyword)) {
      if (resumeText.includes(keyword)) {
        matched.push(keyword);
      } else {
        missing.push(keyword);
      }
    }
  });
  
  const score = matched.length > 0 
    ? Math.min(95, Math.round((matched.length / (matched.length + missing.length)) * 100))
    : 45;
  
  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    suggestions: [
      missing.length > 0 ? `Add these missing keywords: ${missing.slice(0, 5).join(', ')}` : 'Great keyword coverage!',
      'Use the exact phrases from the job description in your experience section',
      'Quantify your achievements with metrics (numbers, percentages, dollar amounts)',
      'Match the job title language in your experience descriptions',
      'Add relevant projects that demonstrate required skills'
    ],
    strengths: [
      matched.length > 3 ? `Strong keyword match (${matched.length} keywords found)` : 'Resume has relevant content',
      resumeData.experience?.length > 0 ? 'Has work experience listed' : 'Consider adding experience',
      resumeData.projects?.length > 0 ? 'Projects section strengthens application' : 'Add relevant projects'
    ]
  };
}

function scoreResumeLocally(resumeData) {
  let score = 0;
  const breakdown = {};
  const improvements = [];
  
  // Contact info (10 pts)
  const info = resumeData.personalInfo || {};
  let contactScore = 0;
  if (info.fullName) contactScore += 2;
  if (info.email) contactScore += 2;
  if (info.phone) contactScore += 2;
  if (info.linkedin) contactScore += 2;
  if (info.github) contactScore += 2;
  breakdown.contactInfo = contactScore;
  if (contactScore < 8) improvements.push('Complete all contact information including LinkedIn and GitHub');
  
  // Summary (15 pts)
  const summaryLen = (info.summary || '').length;
  breakdown.summary = summaryLen > 150 ? 15 : summaryLen > 50 ? 10 : summaryLen > 0 ? 5 : 0;
  if (breakdown.summary < 15) improvements.push('Write a compelling 2-3 sentence professional summary');
  
  // Experience (25 pts)
  const exp = resumeData.experience || [];
  let expScore = Math.min(15, exp.length * 5);
  exp.forEach(e => {
    if (e.bulletPoints?.length > 0 || (e.description && e.description.length > 50)) expScore += 2;
  });
  breakdown.experience = Math.min(25, expScore);
  if (breakdown.experience < 20) improvements.push('Add more detail to experience with quantified achievements');
  
  // Skills (20 pts)
  const skills = resumeData.skills || {};
  const totalSkills = [
    ...(skills.technical || []),
    ...(skills.soft || []),
    ...(skills.tools || [])
  ].length;
  breakdown.skills = Math.min(20, totalSkills * 2);
  if (breakdown.skills < 15) improvements.push('Add more relevant technical and soft skills');
  
  // Education (10 pts)
  const edu = resumeData.education || [];
  breakdown.education = Math.min(10, edu.length * 5);
  if (breakdown.education < 10) improvements.push('Include complete education details with GPA if strong');
  
  // Projects (10 pts)
  const proj = resumeData.projects || [];
  breakdown.projects = Math.min(10, proj.length * 3);
  if (breakdown.projects < 8) improvements.push('Add 2-3 relevant projects with tech stack and links');
  
  // Formatting (10 pts)
  breakdown.formatting = 7; // Base score
  if (info.summary && exp.length > 0 && totalSkills > 3) breakdown.formatting = 10;
  
  score = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  return { score: Math.min(100, score), breakdown, improvements };
}

function suggestSkillsLocally(role) {
  const roleSkills = {
    'frontend developer': {
      technical: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/SASS', 'Redux', 'Next.js', 'Webpack', 'Jest', 'Responsive Design'],
      soft: ['UI/UX Sense', 'Attention to Detail', 'Communication', 'Problem Solving'],
      tools: ['VS Code', 'Chrome DevTools', 'Figma', 'Git', 'npm/yarn', 'Storybook'],
      certifications: ['Meta Front-End Developer Certificate', 'AWS Cloud Practitioner']
    },
    'backend developer': {
      technical: ['Node.js', 'Python', 'Express.js', 'REST APIs', 'SQL', 'MongoDB', 'Redis', 'GraphQL', 'Microservices', 'Authentication/JWT'],
      soft: ['Analytical Thinking', 'System Design', 'Documentation', 'Debugging'],
      tools: ['Postman', 'Docker', 'Git', 'Linux', 'AWS/GCP', 'PostgreSQL'],
      certifications: ['AWS Solutions Architect', 'MongoDB Developer Certification']
    },
    'full stack developer': {
      technical: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Docker'],
      soft: ['Problem Solving', 'Communication', 'Teamwork', 'Time Management', 'Adaptability'],
      tools: ['Git/GitHub', 'VS Code', 'Postman', 'AWS', 'Docker', 'CI/CD', 'Jira'],
      certifications: ['AWS Developer Associate', 'MongoDB Certification', 'Google Cloud']
    },
    'data scientist': {
      technical: ['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn'],
      soft: ['Statistical Thinking', 'Communication', 'Business Acumen', 'Storytelling'],
      tools: ['Jupyter Notebook', 'Tableau', 'Power BI', 'Git', 'AWS SageMaker', 'Spark'],
      certifications: ['Google Data Analytics', 'IBM Data Science', 'AWS ML Specialty']
    },
    'devops engineer': {
      technical: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS/GCP/Azure', 'Linux', 'Python', 'Bash', 'Ansible', 'Monitoring'],
      soft: ['Problem Solving', 'Automation Mindset', 'Collaboration', 'Documentation'],
      tools: ['Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'ELK Stack', 'Helm'],
      certifications: ['AWS DevOps Engineer', 'CKA (Kubernetes)', 'HashiCorp Terraform']
    }
  };
  
  const key = Object.keys(roleSkills).find(k => 
    role.toLowerCase().includes(k) || k.includes(role.toLowerCase())
  );
  
  return roleSkills[key] || roleSkills['full stack developer'];
}

function chatFallback(message, resumeData) {
  const msgLower = message.toLowerCase();
  
  if (msgLower.includes('summary') || msgLower.includes('objective')) {
    return `Here's a tip for your summary: Start with your title + years of experience, mention 2-3 key skills, and end with what value you bring. For example: "Results-driven developer with experience in ${(resumeData?.skills?.technical || ['React', 'Node.js']).slice(0, 3).join(', ')}. Passionate about building scalable applications that solve real-world problems."`;
  }
  
  if (msgLower.includes('skill') || msgLower.includes('technology')) {
    return `Based on your profile, consider adding these trending skills:\n• Cloud services (AWS/GCP/Azure)\n• Docker & containerization\n• CI/CD pipelines\n• TypeScript\n• System Design\n\nTip: Match your skills section to the job description keywords for better ATS scores.`;
  }
  
  if (msgLower.includes('experience') || msgLower.includes('bullet')) {
    return `To make your experience stand out:\n1. Start each bullet with a strong action verb (Developed, Implemented, Optimized)\n2. Include metrics: "Improved API response time by 40%"\n3. Show impact: "Led migration that reduced costs by $10K/month"\n4. Use the STAR format: Situation, Task, Action, Result\n5. Keep 3-5 bullets per role`;
  }
  
  if (msgLower.includes('project')) {
    return `Strong projects for your resume:\n1. Name it clearly (not "Project 1")\n2. Include the tech stack used\n3. Add a live link or GitHub repo\n4. Describe the problem it solves\n5. Mention key features and your role\n\nSuggested projects for developers:\n• Full-stack web app with auth\n• REST/GraphQL API\n• Real-time chat application\n• ML-powered tool\n• CLI tool or npm package`;
  }
  
  if (msgLower.includes('ats') || msgLower.includes('score') || msgLower.includes('applicant')) {
    return `ATS Optimization Tips:\n1. Use standard section headings (Experience, Education, Skills)\n2. Include keywords from the job description\n3. Avoid graphics, tables, or columns in ATS submissions\n4. Use standard fonts\n5. Save as PDF\n6. Don't put important info in headers/footers\n7. Spell out acronyms at least once`;
  }
  
  return `Great question! Here are some general resume tips:\n1. Keep it to 1 page for less than 5 years experience\n2. Tailor your resume for each application\n3. Proofread carefully — no typos!\n4. Use consistent formatting throughout\n5. Put your strongest sections first\n\nWhat specific section would you like help with? (summary, experience, skills, projects)`;
}


// ==========================================
// EXPORT ALL AI FUNCTIONS
// ==========================================
module.exports = {
  improveBulletPoints,
  improveSummary,
  matchJobDescription,
  calculateATSScore,
  chatAssistant,
  suggestSkillsForRole
};