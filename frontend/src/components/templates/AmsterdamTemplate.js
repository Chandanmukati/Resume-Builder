import React from 'react';

const AmsterdamTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = {}, projects = []} = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template amsterdam-template">
      <div className="amsterdam-sidebar">
        <div className="amsterdam-header">
          <h1 className="amsterdam-name">{personalInfo.fullName || 'Your Name'}</h1>
          {data.targetRole && <div className="amsterdam-role">{data.targetRole}</div>}
        </div>
        
        <div className="amsterdam-contact">
          <h3 className="amsterdam-sidebar-title">Contact</h3>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.github && <div>{personalInfo.github}</div>}
        </div>

        {hasSkills && (
          <div className="amsterdam-skills">
            <h3 className="amsterdam-sidebar-title">Skills</h3>
            {['technical', 'tools', 'soft'].map(cat => (
               skills[cat] && skills[cat].length > 0 && (
                 <div key={cat} className="amsterdam-skill-category">
                   <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>
                   <div className="amsterdam-skill-list">{skills[cat].join(', ')}</div>
                 </div>
               )
            ))}
          </div>
        )}
        
        {education.length > 0 && (
          <div className="amsterdam-education">
            <h3 className="amsterdam-sidebar-title">Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="amsterdam-edu-item">
                <strong>{edu.degree}</strong>
                <div>{edu.institution}</div>
                <div>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="amsterdam-main">
        {personalInfo.summary && (
          <div className="amsterdam-section">
            <h2 className="amsterdam-section-title">Profile</h2>
            <p>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="amsterdam-section">
            <h2 className="amsterdam-section-title">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="amsterdam-item">
                <div className="amsterdam-item-header">
                  <strong>{exp.position}</strong>
                  <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="amsterdam-item-sub">{exp.company}</div>
                {exp.description && <p>{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && <ul>{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="amsterdam-section">
            <h2 className="amsterdam-section-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="amsterdam-item">
                <div className="amsterdam-item-header">
                  <strong>{proj.name}</strong>
                  {proj.date && <span>{proj.date}</span>}
                </div>
                {proj.technologies?.length > 0 && <div className="amsterdam-item-sub" style={{color:'#2563eb'}}>{proj.technologies.join(' · ')}</div>}
                {proj.description && <p>{proj.description}</p>}
                {proj.highlights?.length > 0 && <ul>{proj.highlights.map((h, j) => <li key={j}>{h}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmsterdamTemplate;
