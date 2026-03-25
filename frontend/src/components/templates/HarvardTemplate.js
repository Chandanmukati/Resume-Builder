import React from 'react';

const HarvardTemplate = ({ data }) => {
  const { personalInfo = {}, experience = [], education = [], skills = {}, projects = []} = data;
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);

  return (
    <div className="template harvard-template">
      <div className="harvard-header">
        <h1 className="harvard-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="harvard-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean).join(' | ')}
        </div>
      </div>

      {education.length > 0 && (
        <div className="harvard-section">
          <h2 className="harvard-section-title">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="harvard-item">
              <div className="harvard-item-top">
                <strong>{edu.institution}</strong>
                <span>{edu.location || ''}</span>
              </div>
              <div className="harvard-item-sub">
                <em>{edu.degree} in {edu.field}</em>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              {edu.gpa && <div className="harvard-desc">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (
        <div className="harvard-section">
          <h2 className="harvard-section-title">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="harvard-item">
              <div className="harvard-item-top">
                <strong>{exp.company}</strong>
                <span>{exp.location || ''}</span>
              </div>
              <div className="harvard-item-sub">
                <em>{exp.position}</em>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <p className="harvard-desc">{exp.description}</p>}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="harvard-bullets">
                  {exp.bulletPoints.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="harvard-section">
          <h2 className="harvard-section-title">Academic & Personal Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="harvard-item">
              <div className="harvard-item-top">
                <strong>{proj.name}</strong>
                {proj.date && <span>{proj.date}</span>}
              </div>
              {proj.technologies?.length > 0 && <div className="harvard-desc"><em>Technologies: {proj.technologies.join(', ')}</em></div>}
              {proj.description && <p className="harvard-desc">{proj.description}</p>}
              {proj.highlights?.length > 0 && (
                <ul className="harvard-bullets">
                  {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {hasSkills && (
        <div className="harvard-section">
          <h2 className="harvard-section-title">Skills & Interests</h2>
          <div className="harvard-skills">
            {['technical', 'tools', 'soft'].map(category => (
              skills[category] && skills[category].length > 0 && (
                <div key={category} className="harvard-skill-line">
                  <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> {skills[category].join(', ')}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default HarvardTemplate;
