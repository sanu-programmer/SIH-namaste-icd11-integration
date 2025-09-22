import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Videos.css';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: '📹' },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
    { id: 'exercise', name: 'Exercise', icon: '💪' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
    { id: 'chronic-conditions', name: 'Chronic Conditions', icon: '❤️' },
    { id: 'preventive-care', name: 'Preventive Care', icon: '🛡️' }
  ];

  const videos = [
    {
      id: 1,
      title: "5 Essential Nutrients for a Healthy Diet",
      description: "Learn about the five most important nutrients your body needs daily and how to incorporate them into your meals.",
      category: "nutrition",
      duration: "8:45",
      thumbnail: "/api/placeholder/400/225",
      views: "15.2K",
      uploadDate: "2 weeks ago",
      featured: true
    },
    {
      id: 2,
      title: "10-Minute Morning Yoga Routine",
      description: "Start your day with this energizing yoga routine that will boost your flexibility and mental clarity.",
      category: "exercise",
      duration: "10:30",
      thumbnail: "/api/placeholder/400/225",
      views: "23.8K",
      uploadDate: "1 week ago",
      featured: false
    },
    {
      id: 3,
      title: "Managing Stress in Daily Life",
      description: "Effective techniques and strategies to manage stress and improve your mental well-being.",
      category: "mental-health",
      duration: "12:15",
      thumbnail: "/api/placeholder/400/225",
      views: "18.5K",
      uploadDate: "3 days ago",
      featured: true
    },
    {
      id: 4,
      title: "Understanding Diabetes: Prevention and Management",
      description: "Comprehensive guide to understanding diabetes, its prevention, and daily management strategies.",
      category: "chronic-conditions",
      duration: "15:20",
      thumbnail: "/api/placeholder/400/225",
      views: "9.3K",
      uploadDate: "1 month ago",
      featured: false
    },
    {
      id: 5,
      title: "Importance of Regular Health Checkups",
      description: "Why regular health screenings are crucial for early detection and prevention of diseases.",
      category: "preventive-care",
      duration: "7:30",
      thumbnail: "/api/placeholder/400/225",
      views: "11.7K",
      uploadDate: "4 days ago",
      featured: false
    },
    {
      id: 6,
      title: "Heart-Healthy Recipes for Beginners",
      description: "Simple and delicious recipes that promote heart health and are easy to prepare at home.",
      category: "nutrition",
      duration: "14:55",
      thumbnail: "/api/placeholder/400/225",
      views: "20.1K",
      uploadDate: "5 days ago",
      featured: false
    },
    {
      id: 7,
      title: "Strength Training for Seniors",
      description: "Safe and effective strength training exercises specifically designed for older adults.",
      category: "exercise",
      duration: "18:40",
      thumbnail: "/api/placeholder/400/225",
      views: "12.9K",
      uploadDate: "2 weeks ago",
      featured: false
    },
    {
      id: 8,
      title: "Sleep Hygiene: Tips for Better Sleep",
      description: "Learn how to improve your sleep quality with these evidence-based sleep hygiene practices.",
      category: "mental-health",
      duration: "9:50",
      thumbnail: "/api/placeholder/400/225",
      views: "16.4K",
      uploadDate: "1 week ago",
      featured: false
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredVideos = videos.filter(video => video.featured);

  const handleVideoPlay = (videoId) => {
    // Navigate to a video player page or show a modal
    // For now, we'll navigate to a video player page
    navigate(`/videos/${videoId}`);
  };

  return (
    <div className="videos-page">
      {/* Header */}
      <div className="videos-header">
        <div className="videos-header-content">
          <h1 className="videos-title">Health Education Videos</h1>
          <p className="videos-subtitle">
            Watch our collection of educational health videos to learn more about wellness, nutrition, exercise, and disease prevention
          </p>
        </div>
      </div>

      <div className="videos-container">
        {/* Featured Videos Section */}
        {featuredVideos.length > 0 && (
          <section className="featured-videos-section">
            <h2 className="section-title">Featured Videos</h2>
            <div className="featured-videos-grid">
              {featuredVideos.map((video) => (
                <div key={video.id} className="featured-video-card">
                  <div className="video-thumbnail-container">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="video-thumbnail"
                    />
                    <div className="video-overlay">
                      <button 
                        className="play-button"
                        onClick={() => handleVideoPlay(video.id)}
                      >
                        ▶
                      </button>
                      <span className="video-duration">{video.duration}</span>
                    </div>
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    <div className="video-meta">
                      <span className="video-views">{video.views} views</span>
                      <span className="video-date">{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {videoCategories.map((category) => (
              <button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Videos Grid */}
        <section className="videos-grid-section">
          <div className="videos-grid-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Videos' : videoCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="videos-count">{filteredVideos.length} videos</span>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="no-videos-found">
              <div className="no-videos-icon">📹</div>
              <h3>No videos found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="videos-grid">
              {filteredVideos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail-container">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="video-thumbnail"
                    />
                    <div className="video-overlay">
                      <button 
                        className="play-button"
                        onClick={() => handleVideoPlay(video.id)}
                      >
                        ▶
                      </button>
                      <span className="video-duration">{video.duration}</span>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    <div className="video-meta">
                      <span className="video-views">{video.views} views</span>
                      <span className="video-date">{video.uploadDate}</span>
                    </div>
                    <div className="video-category">
                      <span className="category-tag">
                        {videoCategories.find(cat => cat.id === video.category)?.icon}
                        {videoCategories.find(cat => cat.id === video.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Educational Resources Section */}
        <section className="educational-resources-section">
          <h2 className="section-title">Additional Educational Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Health Articles</h3>
              <p>Read our comprehensive health articles covering various medical topics</p>
              <Link to="/articles" className="resource-link">Browse Articles</Link>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎯</div>
              <h3>Health Quizzes</h3>
              <p>Test your knowledge with our interactive health quizzes</p>
              <Link to="/quizzes" className="resource-link">Take Quizzes</Link>
            </div>
            <div className="resource-card">
              <div className="resource-icon">💬</div>
              <h3>AI Consultant</h3>
              <p>Get personalized health insights from our AI consultant</p>
              <Link to="/ai-consultant" className="resource-link">Try AI Consultant</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Videos;