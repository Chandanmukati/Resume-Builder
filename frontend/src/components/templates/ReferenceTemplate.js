import React from 'react';

// ============================================
// REFERENCE TEMPLATE — DITTO EXACT CLONE
// Matches Chandan Mukati's resume EXACTLY:
//   • Large blue bold name
//   • 2-row contact: LinkedIn | Email / GitHub | Mobile
//   • Horizontal rule separator
//   • Maroon bold UPPERCASE sections with maroon underline
//   • Skills as label-row table
//   • Training / Projects / Certificates / Education
// ============================================

// ─── Style constants ────────────────────────────────────────────────────────
const PAGE = {
  padding: '36px 42px',
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: '10.5pt',
  color: '#111',
  lineHeight: '1.5',
  background: '#fff',
};

const SECTION_TITLE = {
  fontSize: '11pt',
  fontWeight: 'bold',
  color: '#8B0000',           // dark maroon — exactly like the reference
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '1.5px solid #8B0000',
  paddingBottom: '2px',
  marginBottom: '6px',
  marginTop: '12px',
};

const LABEL_CELL = {
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  paddingRight: '8px',
  paddingBottom: '3px',
  verticalAlign: 'top',
  fontSize: '10.5pt',
};

const VAL_CELL = {
  paddingBottom: '3px',
  verticalAlign: 'top',
  fontSize: '10.5pt',
};

const ENTRY_DATE = {
  float: 'right',
  fontSize: '10pt',
  color: '#000',
  fontStyle: 'normal',
  marginLeft: '8px',
  whiteSpace: 'nowrap',
};

const BULLET_LIST = {
  marginLeft: '20px',
  marginTop: '2px',
  marginBottom: '4px',
  padding: 0,
  fontSize: '10pt',
};

// ─── Helper: clear floats ────────────────────────────────────────────────────
const Clearfix = () => <div style={{ clear: 'both' }} />;

// ─── Helper: section heading ─────────────────────────────────────────────────
const SectionTitle = ({ children }) => (
  <div style={SECTION_TITLE}>{children}</div>
);

// ─── Helper: entry row (title | date, subtitle) ──────────────────────────────
const EntryRow = ({ title, subtitle, date, techStack }) => (
  <div style={{ marginBottom: '6px', marginTop: '4px' }}>
    <div>
      {date && <span style={ENTRY_DATE}>{date}</span>}
      <span style={{ fontWeight: 'bold', fontSize: '10.5pt' }}>{title}</span>
      {' '}
      {subtitle && (
        <span style={{ fontStyle: 'italic', fontSize: '10.5pt' }}>
          {subtitle}
        </span>
      )}
      {techStack && (
        <span style={{ fontStyle: 'italic', fontSize: '10pt', color: '#111' }}>
          {' | '}{techStack}
        </span>
      )}
    </div>
    <Clearfix />
  </div>
);

// ─── Helper: bullet list ─────────────────────────────────────────────────────
const Bullets = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <ul style={BULLET_LIST}>
      {items.map((b, i) => (
        <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
      ))}
    </ul>
  );
};

// ─── Helper: link in blue ────────────────────────────────────────────────────
const BlueLink = ({ href, children }) => (
  <a
    href={href || '#'}
    target="_blank"
    rel="noreferrer"
    style={{ color: '#1155CC', textDecoration: 'underline' }}
  >
    {children}
  </a>
);

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ReferenceTemplate = ({ data }) => {
  const {
    personalInfo: pi = {},
    skills       = { technical: [], soft: [], tools: [], languages: [] },
    training     = [],
    experience   = [],
    projects     = [],
    certificates = [],
    education    = [],
  } = data;

  const hasSkills =
    skills.technical?.length  > 0 ||
    skills.languages?.length  > 0 ||
    skills.soft?.length       > 0 ||
    skills.tools?.length      > 0;

  return (
    <div style={PAGE}>

      {/* ═══════════════════════════════════
          NAME
      ═══════════════════════════════════ */}
      <div style={{ marginBottom: '4px' }}>
        <h1 style={{
          fontSize: '22pt',
          fontWeight: 'bold',
          color: '#1155CC',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {pi.fullName || 'Your Name'}
        </h1>
      </div>

      {/* ═══════════════════════════════════
          CONTACT — ROW 1: LinkedIn | Email
          CONTact — ROW 2: GitHub   | Mobile
      ═══════════════════════════════════ */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2px' }}>
        <tbody>
          <tr>
            <td style={{ fontSize: '10pt', paddingBottom: '1px' }}>
              {pi.linkedin && (
                <>LinkedIn: <BlueLink href={pi.linkedin}>{pi.linkedin}</BlueLink></>
              )}
            </td>
            <td style={{ fontSize: '10pt', textAlign: 'right', paddingBottom: '1px' }}>
              {pi.email && (
                <>Email: <BlueLink href={`mailto:${pi.email}`}>{pi.email}</BlueLink></>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: '10pt' }}>
              {pi.github && (
                <>Github: <BlueLink href={pi.github}>{pi.github}</BlueLink></>
              )}
            </td>
            <td style={{ fontSize: '10pt', textAlign: 'right' }}>
              {pi.phone && <>Mobile: {pi.phone}</>}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Thin horizontal rule */}
      <hr style={{ border: 'none', borderTop: '1px solid #aaa', margin: '6px 0 0 0' }} />

      {/* ═══════════════════════════════════
          SKILLS
      ═══════════════════════════════════ */}
      {hasSkills && (
        <div>
          <SectionTitle>Skills</SectionTitle>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {skills.technical?.length > 0 && (
                <tr>
                  <td style={{ ...LABEL_CELL, width: '185px' }}>Languages:</td>
                  <td style={VAL_CELL}>{skills.technical.join(', ')}</td>
                </tr>
              )}
              {skills.languages?.length > 0 && (
                <tr>
                  <td style={{ ...LABEL_CELL, width: '185px' }}>Frameworks/Libraries:</td>
                  <td style={VAL_CELL}>{skills.languages.join(', ')}</td>
                </tr>
              )}
              {skills.soft?.length > 0 && (
                <tr>
                  <td style={LABEL_CELL}>Soft Skills:</td>
                  <td style={VAL_CELL}>{skills.soft.join(', ')}.</td>
                </tr>
              )}
              {skills.tools?.length > 0 && (
                <tr>
                  <td style={LABEL_CELL}>Tools:</td>
                  <td style={VAL_CELL}>{skills.tools.join(', ')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══════════════════════════════════
          TRAINING
      ═══════════════════════════════════ */}
      {training.length > 0 && (
        <div>
          <SectionTitle>Training</SectionTitle>
          {training.map((t, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <EntryRow
                title={t.organization}
                subtitle={t.role}
                date={[t.startDate, t.endDate].filter(Boolean).join(' – ')}
              />
              <Bullets items={t.bullets} />
              {t.description && !t.bullets?.length && (
                <p style={{ margin: '2px 0 0 0', fontSize: '10pt' }}>{t.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════
          PROJECTS
      ═══════════════════════════════════ */}
      {projects.length > 0 && (
        <div>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <EntryRow
                title={proj.name}
                techStack={proj.technologies?.join(', ')}
                date={proj.date || ''}
              />
              {proj.description && (
                <ul style={BULLET_LIST}>
                  {proj.description.split(/\.\s+/).filter(Boolean).map((s, j) => (
                    <li key={j} style={{ marginBottom: '2px' }}>{s.trim().endsWith('.') ? s : s + '.'}</li>
                  ))}
                </ul>
              )}
              {proj.highlights?.length > 0 && <Bullets items={proj.highlights} />}
              {proj.link && (
                <p style={{ margin: '3px 0 0 20px', fontSize: '10pt' }}>
                  GitHub Repository: <BlueLink href={proj.link}>{proj.link}</BlueLink>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════
          EXPERIENCE (if no training section used)
      ═══════════════════════════════════ */}
      {experience.length > 0 && training.length === 0 && (
        <div>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <EntryRow
                title={exp.company}
                subtitle={exp.position}
                date={[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
              />
              {exp.description && (
                <p style={{ margin: '2px 0 0 0', fontSize: '10pt' }}>{exp.description}</p>
              )}
              <Bullets items={exp.bulletPoints} />
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════
          CERTIFICATES
      ═══════════════════════════════════ */}
      {certificates.length > 0 && (
        <div>
          <SectionTitle>Certificates</SectionTitle>
          {certificates.map((cert, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '4px',
                fontSize: '10.5pt',
              }}
            >
              <span>
                {cert.name}
                {cert.platform && (
                  <>
                    {' | '}
                    <BlueLink href={cert.link}>{cert.platform}</BlueLink>
                  </>
                )}
              </span>
              <span style={{ whiteSpace: 'nowrap', marginLeft: '12px', fontSize: '10pt' }}>
                {cert.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════
          EDUCATION
      ═══════════════════════════════════ */}
      {education.length > 0 && (
        <div>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              {/* Row 1: Institution name (blue) | Location (right) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', color: '#1155CC', fontSize: '10.5pt' }}>
                  {edu.institution}
                </span>
                <span style={{ fontSize: '10pt', color: '#111' }}>
                  {edu.location || ''}
                </span>
              </div>
              {/* Row 2: Degree */}
              <div style={{ fontSize: '10.5pt' }}>
                {edu.degree}
                {edu.field ? `, ${edu.field}` : ''}
                {edu.gpa ? `; CGPA: ${edu.gpa}` : ''}
                {edu.percentage ? `; Percentage: ${edu.percentage}` : ''}
              </div>
              {/* Row 3: Dates */}
              <div style={{ fontSize: '10pt', color: '#111' }}>
                {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
              </div>
              {edu.achievements && (
                <div style={{ fontSize: '10pt' }}>{edu.achievements}</div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ReferenceTemplate;
