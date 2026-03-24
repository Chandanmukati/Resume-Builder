// ============================================
// TEMPLATES PAGE
// Showcase of available resume templates
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, blue-accented design with clear sections and tech tags. Perfect for software engineers and tech professionals.',
    color: '#2563eb',
    bgColor: '#eff6ff',
    tags: ['Tech', 'ATS-Friendly', 'Two-tone'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional, elegant layout with serif fonts and centered header. Great for finance, law, and executive roles.',
    color: '#1f2937',
    bgColor: '#f9fafb',
    tags: ['Traditional', 'Serif', 'Centered'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A modern two-column design with green accents and clean typography. Ideal for designers and creative professionals.',
    color: '#059669',
    bgColor: '#f0fdf4',
    tags: ['Creative', 'Two-Column', 'Modern'],
  },
];

function Templates() {
  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Resume Templates</h1>
        <p>Choose a professional template designed to impress recruiters and pass ATS systems.</p>
      </div>

      <div className="templates-grid">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="template-card">
            
            {/* Visual Preview */}
            <div className="template-preview-box" style={{ backgroundColor: tmpl.bgColor, borderTopColor: tmpl.color }}>
              <div className="mini-preview">
                <div className="mini-header" style={{ backgroundColor: tmpl.color }}>
                  <div className="mini-name" />
                  <div className="mini-subtitle" />
                </div>
                <div className="mini-body">
                  <div className="mini-section" />
                  <div className="mini-line" />
                  <div className="mini-line" />
                  <div className="mini-line short" />
                  <div className="mini-section" />
                  <div className="mini-line" />
                  <div className="mini-line short" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="template-info">
              <h3>{tmpl.name}</h3>
              <p>{tmpl.description}</p>
              <div className="template-tags">
                {tmpl.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
              </div>
              <Link
                to={`/builder?template=${tmpl.id}`}
                className="btn btn-primary"
              >
                Use {tmpl.name} Template <FaArrowRight />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
