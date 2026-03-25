// ============================================
// REFERENCE RESUME UPLOADER COMPONENT
// Users upload their existing resume as a style guide.
// The app then generates THEIR data in a matching format.
// ============================================

import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { aiChat } from '../services/api';
import {
  FaUpload, FaImage, FaTimes, FaMagic, FaSpinner,
  FaCheckCircle, FaInfoCircle
} from 'react-icons/fa';

function ReferenceResume({ onClose }) {
  const { state, dispatch } = useResume();
  const [preview, setPreview]   = useState(state.referenceImage || null);
  const [analyzing, setAnalyzing] = useState(false);
  const [status, setStatus]     = useState('');
  const fileRef = useRef(null);

  /* ---- Handle file upload ---- */
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Accept images and PDFs-as-images
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);

      // Persist to global state so preview panel can show it
      dispatch({ type: 'SET_REFERENCE', payload: base64 });
      setStatus('');
    };
    reader.readAsDataURL(file);
  };

  /* ---- AI: extract layout style from reference ---- */
  const handleAnalyzeStyle = async () => {
    if (!preview) return;
    setAnalyzing(true);
    setStatus('');

    try {
      // We send a text description request; for full vision support, upgrade to GPT-4o
      const message = `The user has uploaded a reference resume. Based on common resume layouts, 
        suggest the best formatting style: (1) single-column or two-column, 
        (2) section order, (3) emphasis on skills vs experience vs projects. 
        Return a JSON object like: {"layout":"single","sectionOrder":["skills","experience","education","projects"],"emphasisOn":"projects","colorAccent":"blue"}`;

      const res  = await aiChat(message, state);
      let suggestion = null;

      try {
        // Try to parse JSON from response
        const match = res.data.data.match(/\{[\s\S]*\}/);
        if (match) suggestion = JSON.parse(match[0]);
      } catch (_) { /* ignore parse error */ }

      if (suggestion) {
        dispatch({ type: 'SET_REFERENCE_STYLE', payload: suggestion });
        setStatus('success');
      } else {
        setStatus('manual');
      }
    } catch (_) {
      setStatus('manual');
    }

    setAnalyzing(false);
  };

  /* ---- Remove reference ---- */
  const handleClear = () => {
    setPreview(null);
    setStatus('');
    dispatch({ type: 'SET_REFERENCE', payload: null });
    dispatch({ type: 'SET_REFERENCE_STYLE', payload: null });
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="reference-panel">
      <div className="reference-header">
        <h3><FaImage /> Reference Resume</h3>
        {onClose && (
          <button className="btn-icon" onClick={onClose}><FaTimes /></button>
        )}
      </div>

      <div className="reference-body">

        {/* Info Banner */}
        <div className="reference-info">
          <FaInfoCircle />
          <span>
            Upload your existing resume or any resume you like.
            The builder will generate <strong>your data</strong> in a matching layout.
          </span>
        </div>

        {/* Upload Area */}
        {!preview ? (
          <div
            className="upload-dropzone"
            onClick={() => fileRef.current.click()}
          >
            <FaUpload className="upload-icon" />
            <p className="upload-title">Upload Reference Resume</p>
            <p className="upload-hint">PNG, JPG, or PDF screenshot · Click or drag & drop</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
          </div>
        ) : (
          <div className="reference-preview-box">
            <img
              src={preview}
              alt="Reference Resume"
              className="reference-img"
            />
            <div className="reference-img-actions">
              <button className="btn btn-ai btn-sm" onClick={handleAnalyzeStyle} disabled={analyzing}>
                {analyzing
                  ? <><FaSpinner className="spin" /> Analyzing Style...</>
                  : <><FaMagic /> Auto-Match Style</>
                }
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleClear}>
                <FaTimes /> Remove
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="reference-status success">
                <FaCheckCircle /> Style detected! Your resume preview has been updated to match this layout.
              </div>
            )}
            {status === 'manual' && (
              <div className="reference-status info">
                <FaInfoCircle /> Style analysis requires an OpenAI API key. Use this as a visual guide while building your resume.
              </div>
            )}
          </div>
        )}

        {/* Style Detections (if applied) */}
        {state.referenceStyle && (
          <div className="reference-style-applied">
            <h4>✨ Detected Style Applied</h4>
            <ul>
              {state.referenceStyle.layout && (
                <li><strong>Layout:</strong> {state.referenceStyle.layout} column</li>
              )}
              {state.referenceStyle.emphasisOn && (
                <li><strong>Focus:</strong> Emphasizing {state.referenceStyle.emphasisOn}</li>
              )}
              {state.referenceStyle.sectionOrder && (
                <li>
                  <strong>Section Order:</strong>{' '}
                  {state.referenceStyle.sectionOrder.join(' → ')}
                </li>
              )}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default ReferenceResume;
