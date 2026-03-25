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
  {
    id: 'stockholm',
    name: 'Stockholm',
    description: 'A striking two-column design with a dark sidebar. Perfect for tech and modern corporate roles.',
    color: '#1e293b',
    bgColor: '#f8fafc',
    tags: ['Tech', 'Dark Sidebar', 'Modern'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'A classic, top-down approach with strong section dividers. Ideal for executive and finance roles.',
    color: '#000000',
    bgColor: '#ffffff',
    tags: ['Corporate', 'Traditional', 'Serif'],
  },
  {
    id: 'vienna',
    name: 'Vienna',
    description: 'A highly creative layout featuring a solid color top banner. Great for design and marketing.',
    color: '#4c1d95',
    bgColor: '#f5f3ff',
    tags: ['Creative', 'Banner', 'Colorful'],
  },
  {
    id: 'tech',
    name: 'Tech Grid',
    description: 'A dense, grid-based layout designed to fit massive lists of technical skills and projects.',
    color: '#059669',
    bgColor: '#f0fdf4',
    tags: ['Engineering', 'Grid', 'Dense'],
  },
  {
    id: 'dublin',
    name: 'Dublin',
    description: 'Features a unique monogram initial logo at the top left. Clean and modern for all professions.',
    color: '#0f766e',
    bgColor: '#f0fdfa',
    tags: ['Initial Logo', 'Creative', 'Clean'],
  },
  {
    id: 'madrid',
    name: 'Madrid',
    description: 'An elegant, generously spaced minimalist design strictly using beautiful Serif typography.',
    color: '#222222',
    bgColor: '#fafafa',
    tags: ['Minimalist', 'Serif', 'Elegant'],
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    description: 'A soft, light-accented sidebar with a friendly and highly approachable aesthetic.',
    color: '#2563eb',
    bgColor: '#eff6ff',
    tags: ['Friendly', 'Sidebar', 'Light'],
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'The strict academic standard template. Highly preferred by universities and top consultancies.',
    color: '#333333',
    bgColor: '#ffffff',
    tags: ['Academic', 'Strict', 'One-Column'],
  },
  {
    id: 'executiveEdge',
    name: 'Executive Edge',
    description: 'Corporate single column design featuring navy and white colors.',
    color: '#1e3a8a',
    bgColor: '#ffffff',
    tags: ['Corporate', 'Navy'],
  },
  {
    id: 'boardRoom',
    name: 'Board Room',
    description: 'Two column sidebar layout with professional charcoal and gray tones.',
    color: '#374151',
    bgColor: '#f3f4f6',
    tags: ['Professional', 'Sidebar'],
  },
  {
    id: 'pinnaclePro',
    name: 'Pinnacle Pro',
    description: 'Premium single column design with an elegant black and gold theme.',
    color: '#000000',
    bgColor: '#d4af37',
    tags: ['Premium', 'Gold'],
  },
  {
    id: 'neural',
    name: 'Neural',
    description: 'Tech themed two column template featuring dark blue with cyan accents.',
    color: '#06b6d4',
    bgColor: '#0f172a',
    tags: ['Tech', 'Dark Mode'],
  },
  {
    id: 'syntax',
    name: 'Syntax',
    description: 'Developer style template with a dark background and bright green accents.',
    color: '#10b981',
    bgColor: '#111827',
    tags: ['Developer', 'Dark Mode'],
  },
  {
    id: 'circuit',
    name: 'Circuit',
    description: 'Modern tech layout mixing blue-gray with sharp electric blue highlights.',
    color: '#3b82f6',
    bgColor: '#475569',
    tags: ['Modern Tech', 'Blue-Gray'],
  },
  {
    id: 'canvas',
    name: 'Canvas',
    description: 'Creative asymmetric setup with striking coral and clean white backgrounds.',
    color: '#f43f5e',
    bgColor: '#ffffff',
    tags: ['Creative', 'Asymmetric'],
  },
  {
    id: 'vivid',
    name: 'Vivid',
    description: 'Bold two column structure highlighted by a purple gradient sidebar.',
    color: '#8b5cf6',
    bgColor: '#f3e8ff',
    tags: ['Bold', 'Purple'],
  },
  {
    id: 'standout',
    name: 'Standout',
    description: 'Card based sections design in balanced teal and dark gray colors.',
    color: '#14b8a6',
    bgColor: '#1f2937',
    tags: ['Card Layout', 'Teal'],
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
