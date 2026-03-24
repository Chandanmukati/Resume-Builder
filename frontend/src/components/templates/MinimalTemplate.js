import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template minimal-template" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      <div className="minimal-header">
        <h1 className="t-name" style={{ color: '#111827', letterSpacing: '-0.5px' }}>
          {personalInfo.fullName || 'John Doe'}
        </h1>
        
        {state?.targetRole && <div className="minimal-role">{state.targetRole}</div>}
        
        <div className="minimal-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        
        {personalInfo.summary && (
          <div className="t-section" style={{ marginTop: 0 }}>
            <p className="t-summary" style={{ lineHeight: '1.6' }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        <div className="minimal-two-col">
          
          {/* LEFT COLUMN: Experience & Projects */}
          <div className="col-left">
            {experience && experience.length > 0 && (
              <div className="t-section">
                <h2 className="t-section-title minimal-title">Experience</h2>
                {experience.map((exp, i) => (
                  <div key={i} className="minimal-entry">
                    <div className="minimal-entry-top">
                      <span className="t-entry-title" style={{ color: '#111827' }}>{exp.position}</span>
                      <span className="t-date">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="minimal-company">{exp.company}</div>
                    
                    {exp.description && <p className="t-description" style={{ marginTop: '6px' }}>{exp.description}</p>}
                    
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <ul className="t-bullets" style={{ margin: '6px 0 0 14px' }}>
                        {exp.bulletPoints.map((bullet, j) => (
                          <li key={j} style={{ color: '#4b5563', marginBottom: '4px' }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {projects && projects.length > 0 && (
              <div className="t-section">
                <h2 className="t-section-title minimal-title">Projects</h2>
                {projects.map((proj, i) => (
                  <div key={i} className="minimal-entry">
                    <div className="minimal-entry-top">
                      <span className="t-entry-title" style={{ color: '#111827' }}>{proj.name}</span>
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="minimal-tech">{proj.technologies.join(' · ')}</div>
                    )}
                    {proj.description && <p className="t-description" style={{ marginTop: '6px' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Education & Skills */}
          <div className="col-right">
            {education && education.length > 0 && (
              <div className="t-section">
                <h2 className="t-section-title minimal-title">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="minimal-entry" style={{ marginBottom: '16px' }}>
                    <div className="t-entry-title" style={{ color: '#111827' }}>{edu.degree}</div>
                    <div className="minimal-company">{edu.field}</div>
                    <div className="minimal-company">{edu.institution}</div>
                    <div className="t-date" style={{ marginTop: '2px' }}>{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}

            {hasSkills && (
              <div className="t-section">
                <h2 className="t-section-title minimal-title">Skills</h2>
                
                {skills.technical && skills.technical.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div className="t-entry-title" style={{ color: '#111827', marginBottom: '6px' }}>Technical</div>
                    <div className="minimal-skills">
                      {skills.technical.map((s, i) => <span key={i} className="minimal-skill-tag">{s}</span>)}
                    </div>
                  </div>
                )}
                
                {skills.tools && skills.tools.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div className="t-entry-title" style={{ color: '#111827', marginBottom: '6px' }}>Tools</div>
                    <div className="minimal-skills">
                      {skills.tools.map((s, i) => <span key={i} className="minimal-skill-tag">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;