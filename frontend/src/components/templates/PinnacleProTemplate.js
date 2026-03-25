import React from 'react';

const PinnacleProTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience   = [],
    education    = [],
    skills       = { technical: [], soft: [], tools: [], languages: [] },
    projects     = [],
  } = data;

  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template pinnacle-pro-template">
      
      {/* Header */}
      <div className="pinnacle-pro-header">
        <h1 className="t-name">{personalInfo.fullName || 'John Doe'}</h1>
        {data.targetRole && <div className="t-role">{data.targetRole}</div>}
        
        <div className="t-contact-row">
          {personalInfo.email && <span>{personalInfo.email} • </span>}
          {personalInfo.phone && <span>{personalInfo.phone} • </span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        
        <div className="t-contact-row">
          {personalInfo.linkedin && <span>{personalInfo.linkedin} • </span>}
          {personalInfo.github && <span>{personalInfo.github} • </span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="t-section">
          <p className="t-summary">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title pinnacle-pro-title">Experience</h2>
          
          {experience.map((exp, i) => (
            <div key={i} className="t-entry">
              <div className="t-entry-header">
                <span className="t-entry-title">{exp.position}</span>
                <span className="t-date">{exp.startDate} {exp.startDate && exp.endDate && '-'} {exp.endDate}</span>
              </div>
              <div className="t-entry-subtitle">{exp.company}</div>
              
              {exp.description && <p className="t-description">{exp.description}</p>}
              
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="t-bullets">
                  {exp.bulletPoints.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title pinnacle-pro-title">Projects</h2>
          
          {projects.map((proj, i) => (
            <div key={i} className="t-entry">
              <div className="t-entry-header">
                <span className="t-entry-title">{proj.name}</span>
                {proj.link && <a href={proj.link} className="t-link">{proj.link}</a>}
              </div>
              
              {proj.technologies && proj.technologies.length > 0 && (
                <div className="t-tech-tags">
                  {proj.technologies.map((tech, j) => (
                    <span key={j} className="t-tech-tag">{tech}</span>
                  ))}
                </div>
              )}
              
              {proj.description && <p className="t-description">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div className="t-section">
          <h2 className="t-section-title pinnacle-pro-title">Skills</h2>
          
          <div className="t-skills-grid">
            {skills.technical && skills.technical.length > 0 && (
              <div className="t-skill-row">
                <strong>Languages & Frameworks: </strong> 
                <span>{skills.technical.join(', ')}</span>
              </div>
            )}
            
            {skills.tools && skills.tools.length > 0 && (
              <div className="t-skill-row">
                <strong>Tools & Platforms: </strong> 
                <span>{skills.tools.join(', ')}</span>
              </div>
            )}
            
            {skills.soft && skills.soft.length > 0 && (
              <div className="t-skill-row">
                <strong>Interpersonal: </strong> 
                <span>{skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="t-section">
          <h2 className="t-section-title pinnacle-pro-title">Education</h2>
          
          {education.map((edu, i) => (
            <div key={i} className="t-entry">
              <div className="t-entry-header">
                <span className="t-entry-title">{edu.institution}</span>
                <span className="t-date">{edu.startDate} {edu.startDate && edu.endDate && '-'} {edu.endDate}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="t-entry-subtitle">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                {edu.gpa && <span className="t-gpa">GPA: {edu.gpa}</span>}
              </div>
              
              {edu.achievements && <p className="t-description">{edu.achievements}</p>}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default PinnacleProTemplate;
