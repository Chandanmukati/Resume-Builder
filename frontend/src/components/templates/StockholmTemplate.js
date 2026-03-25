import React from 'react';

const StockholmTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience   = [],
    education    = [],
    skills       = { technical: [], soft: [], tools: [], languages: [] },
    projects     = [],
  } = data;

  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template stockholm-template">
      <div className="stockholm-sidebar">
        <div className="stockholm-header">
          <h1 className="stockholm-name">{personalInfo.fullName || 'Your Name'}</h1>
          {data.targetRole && <div className="stockholm-role">{data.targetRole}</div>}
        </div>
        
        <div className="stockholm-contact">
          <h3 className="stockholm-sidebar-title">Contact</h3>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.github && <div>{personalInfo.github}</div>}
        </div>

        {hasSkills && (
          <div className="stockholm-skills">
            <h3 className="stockholm-sidebar-title">Skills</h3>
            {['technical', 'tools', 'soft'].map(category => (
               skills[category] && skills[category].length > 0 && (
                 <div key={category} className="stockholm-skill-category">
                   <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong>
                   <div className="stockholm-skill-list">{skills[category].join(', ')}</div>
                 </div>
               )
            ))}
          </div>
        )}
        
        {education.length > 0 && (
          <div className="stockholm-education">
            <h3 className="stockholm-sidebar-title">Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="stockholm-edu-item">
                <strong>{edu.degree}</strong>
                <div>{edu.institution}</div>
                <div>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="stockholm-main">
        {personalInfo.summary && (
          <div className="stockholm-section">
            <h2 className="stockholm-section-title">Profile</h2>
            <p>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="stockholm-section">
            <h2 className="stockholm-section-title">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="stockholm-item">
                <div className="stockholm-item-header">
                  <strong>{exp.position}</strong>
                  <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="stockholm-item-sub">{exp.company}</div>
                {exp.description && <p>{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <ul>{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="stockholm-section">
            <h2 className="stockholm-section-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="stockholm-item">
                <div className="stockholm-item-header">
                  <strong>{proj.name}</strong>
                  {proj.date && <span>{proj.date}</span>}
                </div>
                {proj.technologies?.length > 0 && (
                  <div className="stockholm-item-sub">{proj.technologies.join(' · ')}</div>
                )}
                {proj.description && <p>{proj.description}</p>}
                {proj.highlights?.length > 0 && (
                  <ul>{proj.highlights.map((h, j) => <li key={j}>{h}</li>)}</ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockholmTemplate;
