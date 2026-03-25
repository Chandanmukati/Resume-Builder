import React from 'react';

const DublinTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = {}, projects = []} = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  const initials = personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ME';

  return (
    <div className="template dublin-template">
      <div className="dublin-header">
        <div className="dublin-monogram">{initials}</div>
        <div className="dublin-header-text">
          <h1 className="dublin-name">{personalInfo.fullName || 'Your Name'}</h1>
          {data.targetRole && <div className="dublin-role">{data.targetRole}</div>}
        </div>
        <div className="dublin-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean).map((item, i) => <div key={i}>{item}</div>)}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="dublin-sidebar-section" style={{marginBottom: '25px'}}>
          <p style={{fontSize: '10pt', color: '#444', lineHeight: '1.6'}}>{personalInfo.summary}</p>
        </div>
      )}

      <div className="dublin-body">
        <div className="dublin-main">
          {experience.length > 0 && (
            <div className="dublin-section">
              <h2 className="dublin-section-title">Experience</h2>
              {experience.map((exp, i) => (
                 <div key={i} className="dublin-item">
                   <div className="dublin-item-header">
                     <strong>{exp.position}</strong>
                     <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                   </div>
                   <div className="dublin-item-sub">{exp.company}</div>
                   {exp.description && <p>{exp.description}</p>}
                   {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                     <ul className="dublin-bullets">{exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}</ul>
                   )}
                 </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div className="dublin-section">
              <h2 className="dublin-section-title">Projects</h2>
              {projects.map((proj, i) => (
                 <div key={i} className="dublin-item">
                   <div className="dublin-item-header">
                     <strong>{proj.name}</strong>
                     {proj.date && <span>{proj.date}</span>}
                   </div>
                   {proj.technologies?.length > 0 && <div className="dublin-item-sub" style={{color: '#f59e0b'}}>{proj.technologies.join(', ')}</div>}
                   {proj.description && <p>{proj.description}</p>}
                 </div>
              ))}
            </div>
          )}
        </div>
        <div className="dublin-sidebar">
           {hasSkills && (
             <div className="dublin-sidebar-section">
               <h3 className="dublin-sidebar-title">Skills</h3>
               {['technical', 'tools', 'soft'].map(cat => (
                 skills[cat] && skills[cat].length > 0 && (
                   <div key={cat} className="dublin-skill-block">
                     <strong>{cat.toUpperCase()}</strong>
                     <div className="dublin-skill-list">{skills[cat].join(', ')}</div>
                   </div>
                 )
               ))}
             </div>
           )}
           {education.length > 0 && (
             <div className="dublin-sidebar-section">
               <h3 className="dublin-sidebar-title">Education</h3>
               {education.map((edu, i) => (
                  <div key={i} className="dublin-edu-item">
                    <strong>{edu.degree}</strong>
                    <div>{edu.institution}</div>
                    <div className="dublin-date">{edu.startDate} - {edu.endDate}</div>
                  </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default DublinTemplate;
