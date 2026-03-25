import React from 'react';

const ExecutiveTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience   = [],
    education    = [],
    skills       = { technical: [], soft: [], tools: [], languages: [] },
    projects     = [],
  } = data;

  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template executive-template">
      <div className="exec-header">
        <h1 className="exec-name">{personalInfo.fullName || 'Your Name'}</h1>
        {data.targetRole && <div className="exec-role">{data.targetRole}</div>}
        <div className="exec-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' • ')}
          <br/>
          {[personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="exec-section">
          <p className="exec-summary">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="exec-section">
          <h2 className="exec-section-title">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className="exec-item">
              <div className="exec-item-header">
                <strong>{exp.company}</strong>
                <span>{exp.location || ''}</span>
              </div>
              <div className="exec-item-subheader">
                <em>{exp.position}</em>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <p className="exec-desc">{exp.description}</p>}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="exec-bullets">
                  {exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="exec-section">
          <h2 className="exec-section-title">SELECTED PROJECTS</h2>
          {projects.map((proj, i) => (
            <div key={i} className="exec-item">
              <div className="exec-item-header">
                <strong>{proj.name}</strong>
                <span>{proj.date || ''}</span>
              </div>
              {proj.technologies?.length > 0 && (
                <div className="exec-item-subheader"><em>Tech Stack: {proj.technologies.join(', ')}</em></div>
              )}
              {proj.description && <p className="exec-desc">{proj.description}</p>}
              {proj.highlights?.length > 0 && (
                <ul className="exec-bullets">
                  {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {(education.length > 0 || hasSkills) && (
        <div className="exec-split-section">
          {education.length > 0 && (
            <div className="exec-col">
              <h2 className="exec-section-title">EDUCATION</h2>
              {education.map((edu, i) => (
                <div key={i} className="exec-item">
                  <strong>{edu.institution}</strong>
                  <div>{edu.degree} in {edu.field}</div>
                  <div>{edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          )}
          {hasSkills && (
            <div className="exec-col">
              <h2 className="exec-section-title">CORE COMPETENCIES</h2>
              {['technical', 'tools', 'soft'].map(category => (
                skills[category] && skills[category].length > 0 && (
                  <div key={category} className="exec-skill-line">
                    <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> {skills[category].join(', ')}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
