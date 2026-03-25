import React from 'react';

const TechTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = {}, projects = []} = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template tech-template">
      <div className="tech-header">
        <div className="tech-header-main">
          <h1 className="tech-name">{personalInfo.fullName || 'Your Name'}</h1>
          {data.targetRole && <div className="tech-role">{data.targetRole}</div>}
        </div>
        <div className="tech-contact">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.github && <div>{personalInfo.github}</div>}
        </div>
      </div>
      
      {hasSkills && (
        <div className="tech-section">
          <h2 className="tech-section-title">Technical Skills</h2>
          <div className="tech-skills-grid">
            {['technical', 'tools', 'soft'].map(cat => (
              skills[cat] && skills[cat].length > 0 && (
                <div key={cat} className="tech-skill-cell">
                  <strong>{cat.toUpperCase()}:</strong> {skills[cat].join(', ')}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="tech-section">
          <h2 className="tech-section-title">Experience</h2>
          {experience.map((exp, i) => (
             <div key={i} className="tech-item">
               <div className="tech-item-header">
                 <strong>{exp.position} <span className="tech-company">@ {exp.company}</span></strong>
                 <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
               </div>
               {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                 <ul className="tech-bullets">{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>
               )}
             </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="tech-section">
          <h2 className="tech-section-title">Projects</h2>
          <div className="tech-projects-grid">
            {projects.map((proj, i) => (
               <div key={i} className="tech-project-card">
                 <strong>{proj.name}</strong>
                 {proj.technologies?.length > 0 && <div className="tech-proj-tech">{proj.technologies.join(', ')}</div>}
                 {proj.description && <p>{proj.description}</p>}
               </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="tech-section">
          <h2 className="tech-section-title">Education</h2>
          {education.map((edu, i) => (
             <div key={i} className="tech-item tech-edu-item">
               <strong>{edu.degree} in {edu.field}</strong>
               <span>{edu.institution}, {edu.startDate} - {edu.endDate} {edu.gpa && `(GPA: ${edu.gpa})`}</span>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TechTemplate;
