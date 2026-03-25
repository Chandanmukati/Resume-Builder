import React from 'react';

const ViennaTemplate = ({ data }) => {
  const {
    personalInfo = {}, experience = [], education = [], skills = {}, projects = []
  } = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template vienna-template">
      <div className="vienna-banner">
        <h1 className="vienna-name">{personalInfo.fullName || 'Your Name'}</h1>
        {data.targetRole && <div className="vienna-role">{data.targetRole}</div>}
        <div className="vienna-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean).map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </div>
      <div className="vienna-body">
        <div className="vienna-left">
          {personalInfo.summary && (
            <div className="vienna-section">
              <h2 className="vienna-section-title">Profile</h2>
              <p>{personalInfo.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="vienna-section">
              <h2 className="vienna-section-title">Experience</h2>
              {experience.map((exp, i) => (
                <div key={i} className="vienna-item">
                  <div className="vienna-item-header">
                    <strong>{exp.position}</strong>
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="vienna-item-sub">{exp.company}</div>
                  {exp.description && <p>{exp.description}</p>}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="vienna-bullets">{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="vienna-right">
          {hasSkills && (
            <div className="vienna-section">
              <h2 className="vienna-section-title">Skills</h2>
              {['technical', 'tools', 'soft'].map(cat => (
                skills[cat] && skills[cat].length > 0 && (
                  <div key={cat} className="vienna-skill-box">
                    <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>
                    <div className="vienna-skill-tags">
                      {skills[cat].map((s, i) => <span key={i} className="vienna-tag">{s}</span>)}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
          {education.length > 0 && (
             <div className="vienna-section">
               <h2 className="vienna-section-title">Education</h2>
               {education.map((edu, i) => (
                 <div key={i} className="vienna-item">
                   <strong>{edu.degree}</strong>
                   <div>{edu.institution}</div>
                   <div style={{fontSize:'9pt', color:'#666'}}>{edu.startDate} - {edu.endDate}</div>
                 </div>
               ))}
             </div>
          )}
          {projects.length > 0 && (
             <div className="vienna-section">
               <h2 className="vienna-section-title">Projects</h2>
               {projects.map((proj, i) => (
                 <div key={i} className="vienna-item">
                   <strong>{proj.name}</strong>
                   {proj.technologies?.length > 0 && <div style={{fontSize:'9pt', color:'#8b5cf6', fontWeight: 600, margin: '4px 0'}}>{proj.technologies.join(', ')}</div>}
                   {proj.description && <p style={{fontSize:'9.5pt'}}>{proj.description}</p>}
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViennaTemplate;
