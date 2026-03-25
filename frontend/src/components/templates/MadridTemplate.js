import React from 'react';

const MadridTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = {}, projects = []} = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template madrid-template">
      <div className="madrid-header">
        <h1 className="madrid-name">{personalInfo.fullName || 'Your Name'}</h1>
        {data.targetRole && <div className="madrid-role">{data.targetRole}</div>}
        <div className="madrid-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean).join('  |  ')}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="madrid-section madrid-summary">
          <p>{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="madrid-section">
          <h2 className="madrid-section-title">Experience</h2>
          {experience.map((exp, i) => (
             <div key={i} className="madrid-item">
               <div className="madrid-item-top">
                 <span className="madrid-item-title">{exp.position}</span>
                 <span className="madrid-item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
               </div>
               <div className="madrid-item-subtitle">{exp.company}</div>
               {exp.description && <p className="madrid-desc">{exp.description}</p>}
               {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                 <ul className="madrid-bullets">{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>
               )}
             </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="madrid-section">
          <h2 className="madrid-section-title">Projects</h2>
          {projects.map((proj, i) => (
             <div key={i} className="madrid-item">
               <div className="madrid-item-top">
                 <span className="madrid-item-title">{proj.name}</span>
                 {proj.date && <span className="madrid-item-date">{proj.date}</span>}
               </div>
               {proj.technologies?.length > 0 && <div className="madrid-item-subtitle">{proj.technologies.join(', ')}</div>}
               {proj.description && <p className="madrid-desc">{proj.description}</p>}
               {proj.highlights?.length > 0 && <ul className="madrid-bullets">{proj.highlights.map((h, j) => <li key={j}>{h}</li>)}</ul>}
             </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="madrid-section">
          <h2 className="madrid-section-title">Education</h2>
          {education.map((edu, i) => (
             <div key={i} className="madrid-item">
               <div className="madrid-item-top">
                 <span className="madrid-item-title">{edu.degree} in {edu.field}</span>
                 <span className="madrid-item-date">{edu.startDate} - {edu.endDate}</span>
               </div>
               <div className="madrid-item-subtitle">{edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
             </div>
          ))}
        </div>
      )}

      {hasSkills && (
        <div className="madrid-section">
          <h2 className="madrid-section-title">Skills</h2>
          <div className="madrid-skills-container">
            {['technical', 'tools', 'soft'].map(cat => (
              skills[cat] && skills[cat].length > 0 && (
                <div key={cat} className="madrid-skill-line">
                  <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}:</strong> {skills[cat].join(', ')}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MadridTemplate;
