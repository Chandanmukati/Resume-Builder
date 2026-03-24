// ============================================
// AI CHATBOT COMPONENT
// Floating chat assistant for resume help
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { aiChat } from '../services/api';
import { FaTimes, FaPaperPlane, FaRobot, FaSpinner } from 'react-icons/fa';

function AIChatbot({ onClose }) {
  const { state } = useResume();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI resume assistant. 👋 I can help you:\n\n• Write better bullet points\n• Improve your summary\n• Suggest skills for your role\n• Optimize for ATS systems\n\nWhat would you like help with?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick action buttons
  const quickActions = [
    'Help with my summary',
    'Suggest skills for my role',
    'How to improve experience section?',
    'ATS optimization tips'
  ];

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMsg = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiChat(messageText, state);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.data
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please make sure the backend server is running on port 5000."
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <FaRobot /> AI Resume Assistant
        </div>
        <button className="btn-icon" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.role === 'assistant' && <FaRobot className="chat-avatar" />}
            <div className="chat-bubble">
              {msg.content.split('\n').map((line, j) => (
                <React.Fragment key={j}>
                  {line}<br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="chat-message assistant">
            <FaRobot className="chat-avatar" />
            <div className="chat-bubble typing">
              <FaSpinner className="spin" /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="quick-actions">
          {quickActions.map((action, i) => (
            <button key={i} className="quick-action-btn" onClick={() => sendMessage(action)}>
              {action}
            </button>
          ))}
        </div>
      )}

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask anything about your resume..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default AIChatbot;