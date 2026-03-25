import React from 'react';

const ClassicTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience   = [],
    education    = [],
    skills       = { technical: [], soft: [], tools: [], languages: [] },
    projects     = [],
  } = data;

  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template classic-template" style={{ fontFamily: 'Georgia, serif' }}>
      
      <div className="classic-header">
        <h1 className="t-name">{personalInfo.fullName || 'John Doe'}</h1>
        
        <div className="t-contact-row" style={{ marginTop: '8px' }}>
          {personalInfo.location && <span>{personalInfo.location} | </span>}
          {personalInfo.phone && <span>{personalInfo.phone} | </span>}
          {personalInfo.email && <span>{personalInfo.email} </span>}
        </div>
        
        <div className="t-contact-row">
          {personalInfo.linkedin && <span>{personalInfo.linkedin} | </span>}
          {personalInfo.github && <span>{personalInfo.github} | </span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="t-section">
          <p className="t-summary" style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '10px' }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title classic-title">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className="t-entry">
              <div className="t-entry-header">
                <div>
                  <span className="t-entry-title">{exp.company}</span>
                  {exp.company && exp.position && <span> — </span>}
                  <span style={{ fontStyle: 'italic' }}>{exp.position}</span>
                </div>
                <span className="t-date">{exp.startDate} {exp.startDate && exp.endDate && '-'} {exp.endDate}</span>
              </div>
              
              {exp.description && <p className="t-description">{exp.description}</p>}
              
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="t-bullets classic-bullets">
                  {exp.bulletPoints.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title classic-title">EDUCATION</h2>
          {education.map((edu, i) => (
            <div key={i} className="t-entry" style={{ marginBottom: '8px' }}>
              <div className="t-entry-header">
                <div>
                  <span className="t-entry-title">{edu.institution}</span>
                </div>
                <span className="t-date">{edu.startDate} {edu.startDate && edu.endDate && '-'} {edu.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontStyle: 'italic' }}>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>
              {edu.achievements && <p className="t-description">{edu.achievements}</p>}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title classic-title">PROJECTS</h2>
          {projects.map((proj, i) => (
            <div key={i} className="t-entry" style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span className="t-entry-title">{proj.name}</span>
                {proj.technologies && proj.technologies.length > 0 && (
                  <span style={{ fontStyle: 'italic', fontSize: '9pt', color: '#555' }}>
                    ({proj.technologies.join(', ')})
                  </span>
                )}
              </div>
              {proj.link && <a href={proj.link} className="t-link" style={{ color: '#333' }}>{proj.link}</a>}
              {proj.description && <p className="t-description">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {hasSkills && (
        <div className="t-section">
          <h2 className="t-section-title classic-title">SKILLS</h2>
          <div className="t-skills-classic">
            {skills.technical && skills.technical.length > 0 && (
              <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <p><strong>Tools & Platforms:</strong> {skills.tools.join(', ')}</p>
            )}
            {skills.soft && skills.soft.length > 0 && (
              <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ClassicTemplate;