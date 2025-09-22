import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

const Quizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizzes = [
    {
      id: 1,
      title: 'Heart Health Basics',
      description: 'Test your knowledge about cardiovascular health and heart disease prevention.',
      category: 'Heart Health',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: 15,
      icon: '❤️',
      color: 'red'
    },
    {
      id: 2,
      title: 'Nutrition Fundamentals',
      description: 'Learn about essential nutrients and healthy eating habits.',
      category: 'Nutrition',
      difficulty: 'Beginner',
      questions: 12,
      timeLimit: 18,
      icon: '🥗',
      color: 'green'
    },
    {
      id: 3,
      title: 'Mental Wellness',
      description: 'Understanding mental health and stress management techniques.',
      category: 'Mental Health',
      difficulty: 'Intermediate',
      questions: 8,
      timeLimit: 12,
      icon: '🧠',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Exercise & Fitness',
      description: 'Test your knowledge about physical activity and exercise science.',
      category: 'Fitness',
      difficulty: 'Intermediate',
      questions: 10,
      timeLimit: 15,
      icon: '💪',
      color: 'blue'
    },
    {
      id: 5,
      title: 'Diabetes Prevention',
      description: 'Learn about diabetes risk factors and prevention strategies.',
      category: 'Disease Prevention',
      difficulty: 'Advanced',
      questions: 15,
      timeLimit: 20,
      icon: '🩺',
      color: 'orange'
    },
    {
      id: 6,
      title: 'Sleep Science',
      description: 'Understanding sleep cycles and improving sleep quality.',
      category: 'Sleep Health',
      difficulty: 'Intermediate',
      questions: 9,
      timeLimit: 12,
      icon: '😴',
      color: 'indigo'
    }
  ];

  const sampleQuestions = [
    {
      question: "What is the recommended daily intake of fruits and vegetables?",
      options: ["2-3 servings", "3-4 servings", "5-9 servings", "10+ servings"],
      correct: 2,
      explanation: "The recommended daily intake is 5-9 servings of fruits and vegetables for optimal health."
    },
    {
      question: "Which type of fat is considered heart-healthy?",
      options: ["Saturated fat", "Trans fat", "Monounsaturated fat", "Cholesterol"],
      correct: 2,
      explanation: "Monounsaturated fats, found in foods like avocados and olive oil, are heart-healthy fats."
    },
    {
      question: "How many hours of sleep do adults typically need per night?",
      options: ["5-6 hours", "6-7 hours", "7-9 hours", "9-10 hours"],
      correct: 2,
      explanation: "Most adults need 7-9 hours of sleep per night for optimal health and function."
    }
  ];

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! You\'re a health expert!';
    if (percentage >= 60) return 'Good job! Keep learning!';
    return 'Keep studying! You can improve!';
  };

  if (activeQuiz && !showResults) {
    return (
      <div className="quiz-active-page">
        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-progress-bar">
            <div 
              className="quiz-progress-fill"
              style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
            />
          </div>
          <div className="quiz-header-content">
            <h2 className="quiz-title">{activeQuiz.title}</h2>
            <div className="quiz-stats">
              <span className="quiz-stat">
                <CheckCircle size={16} />
                {currentQuestion + 1} / {sampleQuestions.length}
              </span>
              <span className="quiz-stat">
                <Trophy size={16} />
                Score: {score}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="quiz-container">
          <div className="question-card">
            <h3 className="question-text">
              {sampleQuestions[currentQuestion].question}
            </h3>
            <div className="options-grid">
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    selectedAnswer !== null && index === sampleQuestions[currentQuestion].correct ? 'correct' : ''
                  } ${
                    selectedAnswer === index && index !== sampleQuestions[currentQuestion].correct ? 'incorrect' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="explanation-card">
                <h4 className="explanation-title">Explanation:</h4>
                <p className="explanation-text">
                  {sampleQuestions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="quiz-actions">
              <button
                className="next-button"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === sampleQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    
    return (
      <div className="quiz-results-page">
        <div className="results-container">
          <div className="results-card">
            <div className="results-header">
              <Award size={48} className="results-icon" />
              <h2 className="results-title">Quiz Complete!</h2>
              <p className="results-subtitle">{getScoreMessage(percentage)}</p>
            </div>

            <div className="score-display">
              <div className="score-circle">
                <span className={`score-number ${getScoreColor(percentage)}`}>
                  {percentage}%
                </span>
                <span className="score-label">Score</span>
              </div>
              <div className="score-details">
                <div className="score-detail">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>{score} Correct</span>
                </div>
                <div className="score-detail">
                  <XCircle size={20} className="text-red-600" />
                  <span>{sampleQuestions.length - score} Incorrect</span>
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button
                className="retake-button"
                onClick={() => startQuiz(activeQuiz)}
              >
                <RotateCcw size={16} />
                Retake Quiz
              </button>
              <button
                className="back-button"
                onClick={resetQuiz}
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quizzes-page">
      {/* Header */}
      <div className="quizzes-header">
        <div className="quizzes-header-content">
          <h1 className="quizzes-title">Health Quizzes</h1>
          <p className="quizzes-subtitle">
            Test your knowledge with our interactive health quizzes and learn while having fun
          </p>
        </div>
      </div>

      <div className="quizzes-container">
        {/* Quiz Categories */}
        <section className="quiz-categories-section">
          <h2 className="section-title">Choose Your Topic</h2>
          <div className="categories-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-category-card">
                <div className="category-header">
                  <span className="category-icon">{quiz.icon}</span>
                  <span className={`difficulty-badge difficulty-${quiz.color}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <h3 className="category-title">{quiz.title}</h3>
                <p className="category-description">{quiz.description}</p>
                <div className="quiz-info">
                  <div className="quiz-stat">
                    <Clock size={16} />
                    <span>{quiz.timeLimit} min</span>
                  </div>
                  <div className="quiz-stat">
                    <Trophy size={16} />
                    <span>{quiz.questions} questions</span>
                  </div>
                </div>
                <button
                  className="start-quiz-button"
                  onClick={() => startQuiz(quiz)}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Benefits */}
        <section className="learning-benefits-section">
          <h2 className="section-title">Why Take Our Quizzes?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🧠</div>
              <h3>Learn & Retain</h3>
              <p>Interactive learning helps you remember health information better</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey and see how you improve over time</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Personalized</h3>
              <p>Focus on topics that matter most to your health and wellness goals</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h3>Earn Badges</h3>
              <p>Complete quizzes to earn achievement badges and certificates</p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="additional-resources-section">
          <h2 className="section-title">More Learning Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📖</div>
              <h3>Health Articles</h3>
              <p>Read in-depth articles on various health topics</p>
              <Link to="/articles" className="resource-link">Read Articles</Link>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎥</div>
              <h3>Educational Videos</h3>
              <p>Watch engaging videos about health and wellness</p>
              <Link to="/videos" className="resource-link">Watch Videos</Link>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🤖</div>
              <h3>AI Consultant</h3>
              <p>Get personalized health insights from our AI</p>
              <Link to="/ai-consultant" className="resource-link">Try AI Consultant</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quizzes;