import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AIConsultant.css';

const AIConsultant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI health consultant. I can help you understand symptoms, provide general health information, and guide you on when to seek medical attention. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [consultationMode, setConsultationMode] = useState('general');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, consultationMode);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage, mode) => {
    const responses = {
      general: [
        "I understand your concern. Based on the information provided, I'd recommend maintaining a healthy lifestyle with regular exercise and balanced nutrition.",
        "That's a common question. Generally, it's advisable to stay hydrated and get adequate rest. However, if symptoms persist, please consult a healthcare professional.",
        "Thank you for sharing that. From a general health perspective, monitoring your symptoms and maintaining good hygiene practices is important."
      ],
      symptoms: [
        "I can help you understand those symptoms. However, please note that this is general information and not a substitute for professional medical advice.",
        "Those symptoms could have various causes. It's important to consider their duration, severity, and any accompanying symptoms.",
        "Symptom analysis requires careful consideration. I'd recommend documenting when they occur and their patterns to discuss with a healthcare provider."
      ],
      emergency: [
        "If you're experiencing a medical emergency, please call emergency services immediately (911 in the US). This AI consultant is not for emergency situations.",
        "For emergency medical situations, please contact your local emergency services right away. Your safety is the top priority.",
        "I'm not equipped to handle emergency situations. Please seek immediate medical attention if you believe this is an emergency."
      ]
    };

    const modeResponses = responses[mode] || responses.general;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const quickQuestions = {
    general: [
      "How can I improve my sleep quality?",
      "What are the benefits of regular exercise?",
      "How much water should I drink daily?"
    ],
    symptoms: [
      "I have a headache, what could it be?",
      "What causes fatigue and tiredness?",
      "Why do I feel dizzy sometimes?"
    ],
    emergency: [
      "When should I go to the emergency room?",
      "What are signs of a heart attack?",
      "How do I know if it's an emergency?"
    ]
  };

  return (
    <div className="ai-consultant-page">
      {/* Header */}
      <div className="ai-consultant-header">
        <div className="ai-consultant-header-content">
          <h1 className="ai-consultant-title">AI Health Consultant</h1>
          <p className="ai-consultant-subtitle">
            Get personalized health insights and guidance from our AI-powered consultant
          </p>
        </div>
      </div>

      <div className="ai-consultant-container">
        {/* Consultation Mode Selector */}
        <div className="consultation-modes">
          <button
            className={`mode-button ${consultationMode === 'general' ? 'active' : ''}`}
            onClick={() => setConsultationMode('general')}
          >
            General Health
          </button>
          <button
            className={`mode-button ${consultationMode === 'symptoms' ? 'active' : ''}`}
            onClick={() => setConsultationMode('symptoms')}
          >
            Symptom Analysis
          </button>
          <button
            className={`mode-button emergency-mode ${consultationMode === 'emergency' ? 'active' : ''}`}
            onClick={() => setConsultationMode('emergency')}
          >
            Emergency Info
          </button>
        </div>

        <div className="ai-consultant-content">
          {/* Chat Interface */}
          <div className="chat-interface">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-bubble">
                    <p className="message-text">{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai typing">
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="quick-questions">
              <p className="quick-questions-title">Quick Questions:</p>
              <div className="quick-questions-list">
                {quickQuestions[consultationMode].map((question, index) => (
                  <button
                    key={index}
                    className="quick-question-button"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
              <div className="chat-input-container">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your health question here..."
                  className="chat-input"
                  rows="1"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="send-button"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="info-panel">
            <div className="info-card">
              <h3>💡 Important Notice</h3>
              <p>
                This AI consultant provides general health information and is not a substitute 
                for professional medical advice, diagnosis, or treatment. Always consult with 
                qualified healthcare providers for medical concerns.
              </p>
            </div>

            <div className="info-card">
              <h3>🏥 Emergency Situations</h3>
              <p>
                If you're experiencing a medical emergency, please call emergency services 
                immediately. This tool is not designed for emergency medical situations.
              </p>
            </div>

            <div className="info-card">
              <h3>📋 Health Records</h3>
              <p>
                Consider keeping a health journal to track symptoms and share with your 
                healthcare provider during consultations.
              </p>
            </div>

            <div className="info-card">
              <h3>🔗 Additional Resources</h3>
              <div className="resource-links">
                <Link to="/bookings" className="resource-link">Book Appointment</Link>
                <Link to="/videos" className="resource-link">Health Videos</Link>
                <Link to="/peer-support" className="resource-link">Peer Support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;