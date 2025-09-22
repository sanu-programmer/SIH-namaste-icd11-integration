import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, Tag } from 'lucide-react';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: '📚' },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
    { id: 'exercise', name: 'Exercise', icon: '💪' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
    { id: 'prevention', name: 'Disease Prevention', icon: '🛡️' },
    { id: 'wellness', name: 'Wellness', icon: '✨' }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Essential Nutrients for a Healthy Heart',
      excerpt: 'Discover the key nutrients that support cardiovascular health and how to incorporate them into your daily diet.',
      category: 'nutrition',
      author: 'Dr. Sarah Johnson',
      date: '2024-12-15',
      readTime: '5 min',
      image: '/api/placeholder/400/250',
      tags: ['heart-health', 'nutrition', 'prevention']
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Home Workouts',
      excerpt: 'Learn effective exercises you can do at home without any equipment, perfect for maintaining fitness year-round.',
      category: 'exercise',
      author: 'Mike Chen',
      date: '2024-12-12',
      readTime: '8 min',
      image: '/api/placeholder/400/250',
      tags: ['fitness', 'home-workout', 'exercise']
    },
    {
      id: 3,
      title: 'Managing Stress in the Digital Age',
      excerpt: 'Practical strategies for reducing stress and maintaining mental well-being in our hyper-connected world.',
      category: 'mental-health',
      author: 'Dr. Emily Rodriguez',
      date: '2024-12-10',
      readTime: '6 min',
      image: '/api/placeholder/400/250',
      tags: ['stress', 'mental-health', 'wellness']
    },
    {
      id: 4,
      title: 'Preventing Type 2 Diabetes: A Comprehensive Guide',
      excerpt: 'Understanding risk factors and implementing lifestyle changes to prevent or delay the onset of type 2 diabetes.',
      category: 'prevention',
      author: 'Dr. James Wilson',
      date: '2024-12-08',
      readTime: '10 min',
      image: '/api/placeholder/400/250',
      tags: ['diabetes', 'prevention', 'lifestyle']
    },
    {
      id: 5,
      title: 'The Science of Better Sleep',
      excerpt: 'Explore evidence-based techniques for improving sleep quality and establishing healthy sleep patterns.',
      category: 'wellness',
      author: 'Dr. Lisa Park',
      date: '2024-12-05',
      readTime: '7 min',
      image: '/api/placeholder/400/250',
      tags: ['sleep', 'wellness', 'health']
    },
    {
      id: 6,
      title: 'Building a Sustainable Exercise Routine',
      excerpt: 'Tips for creating and maintaining an exercise routine that fits your lifestyle and goals.',
      category: 'exercise',
      author: 'Anna Thompson',
      date: '2024-12-03',
      readTime: '6 min',
      image: '/api/placeholder/400/250',
      tags: ['fitness', 'routine', 'sustainability']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="articles-page">
      {/* Header */}
      <div className="articles-header">
        <div className="articles-header-content">
          <h1 className="articles-title">Health Articles</h1>
          <p className="articles-subtitle">
            Explore our collection of evidence-based health articles written by medical professionals
          </p>
        </div>
      </div>

      <div className="articles-container">
        {/* Search and Filter Section */}
        <section className="search-filter-section">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
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

        {/* Articles Grid */}
        <section className="articles-grid-section">
          <div className="articles-grid-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="articles-count">{filteredArticles.length} articles</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="no-articles-found">
              <div className="no-articles-icon">📄</div>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="article-card">
                  <div className="article-image-container">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="article-image"
                    />
                    <div className="article-category">
                      <span className="category-tag">
                        {categories.find(cat => cat.id === article.category)?.icon}
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <div className="article-author">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                      <div className="article-date">
                        <Calendar size={16} />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="article-read-time">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-tags">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="article-tag">
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to={`/articles/${article.id}`} className="read-more-link">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Additional Resources */}
        <section className="additional-resources-section">
          <h2 className="section-title">More Learning Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">🎥</div>
              <h3>Educational Videos</h3>
              <p>Watch our collection of health education videos</p>
              <Link to="/videos" className="resource-link">Watch Videos</Link>
            </div>
            <div className="resource-card">
              <div className="resource-icon">❓</div>
              <h3>Health Quizzes</h3>
              <p>Test your knowledge with interactive quizzes</p>
              <Link to="/quizzes" className="resource-link">Take Quizzes</Link>
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

export default Articles;