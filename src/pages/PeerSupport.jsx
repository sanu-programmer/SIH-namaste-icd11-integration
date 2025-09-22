import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PeerSupport.css';

const PeerSupport = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const categories = [
    { id: 'general', name: 'General Support', icon: '💬', color: '#3b82f6' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠', color: '#8b5cf6' },
    { id: 'chronic-conditions', name: 'Chronic Conditions', icon: '❤️', color: '#ef4444' },
    { id: 'recovery', name: 'Recovery Stories', icon: '🌟', color: '#f59e0b' },
    { id: 'caregivers', name: 'Caregivers', icon: '🤝', color: '#10b981' },
    { id: 'young-adults', name: 'Young Adults', icon: '🌱', color: '#06b6d4' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Newly diagnosed with diabetes - feeling overwhelmed",
      author: "AnonymousUser123",
      category: "chronic-conditions",
      replies: 15,
      views: 234,
      lastActivity: "2 hours ago",
      isPinned: true,
      tags: ["diabetes", "new-diagnosis", "support"]
    },
    {
      id: 2,
      title: "My journey with anxiety - 6 months progress update",
      author: "HopefulHeart",
      category: "mental-health",
      replies: 28,
      views: 445,
      lastActivity: "4 hours ago",
      isPinned: false,
      tags: ["anxiety", "progress", "recovery"]
    },
    {
      id: 3,
      title: "Caregiver burnout - how do you cope?",
      author: "TiredButTrying",
      category: "caregivers",
      replies: 12,
      views: 189,
      lastActivity: "6 hours ago",
      isPinned: false,
      tags: ["caregiver", "burnout", "self-care"]
    },
    {
      id: 4,
      title: "Young adult with chronic pain - anyone else?",
      author: "YoungWarrior",
      category: "young-adults",
      replies: 8,
      views: 156,
      lastActivity: "1 day ago",
      isPinned: false,
      tags: ["chronic-pain", "young-adult", "connection"]
    },
    {
      id: 5,
      title: "5 years cancer-free today! 🎉",
      author: "SurvivorStrong",
      category: "recovery",
      replies: 42,
      views: 678,
      lastActivity: "3 hours ago",
      isPinned: true,
      tags: ["cancer", "survivor", "celebration"]
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: "Diabetes Support Circle",
      description: "A supportive community for people living with diabetes",
      members: 1247,
      nextMeeting: "Tomorrow, 7:00 PM",
      category: "chronic-conditions",
      isActive: true
    },
    {
      id: 2,
      name: "Anxiety Warriors",
      description: "Sharing strategies and support for managing anxiety",
      members: 2156,
      nextMeeting: "Wednesday, 6:30 PM",
      category: "mental-health",
      isActive: true
    },
    {
      id: 3,
      name: "Caregiver Connection",
      description: "Support for those caring for loved ones",
      members: 892,
      nextMeeting: "Friday, 8:00 PM",
      category: "caregivers",
      isActive: true
    },
    {
      id: 4,
      name: "Young Adults United",
      description: "For young adults navigating health challenges",
      members: 1543,
      nextMeeting: "Thursday, 7:30 PM",
      category: "young-adults",
      isActive: false
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Crisis Hotlines",
      description: "24/7 support for immediate help",
      icon: '🚨',
      type: 'emergency',
      links: [
        { name: "National Suicide Prevention Lifeline", url: "tel:988" },
        { name: "Crisis Text Line", url: "sms:741741" }
      ]
    },
    {
      id: 2,
      title: "Educational Resources",
      description: "Articles and guides on various health topics",
      icon: '📚',
      type: 'education',
      links: [
        { name: "Mental Health Guide", url: "/resources/mental-health" },
        { name: "Chronic Conditions Handbook", url: "/resources/chronic-conditions" }
      ]
    },
    {
      id: 3,
      title: "Professional Support",
      description: "Find therapists and counselors near you",
      icon: '👨‍⚕️',
      type: 'professional',
      links: [
        { name: "Find a Therapist", url: "/find-therapist" },
        { name: "Book Appointment", url: "/bookings" }
      ]
    }
  ];

  const handleNewPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      // In a real app, this would submit to a backend
      console.log('New post:', newPost);
      setNewPost({ title: '', content: '', category: 'general' });
      setShowNewPostForm(false);
      alert('Your post has been submitted and will be reviewed by moderators.');
    }
  };

  const filteredPosts = forumPosts.filter(post => 
    activeTab === 'forums' || post.category === activeTab
  );

  return (
    <div className="peer-support-page">
      {/* Header */}
      <div className="peer-support-header">
        <div className="peer-support-header-content">
          <h1 className="peer-support-title">Peer Support Community</h1>
          <p className="peer-support-subtitle">
            Connect with others who understand your journey. Share experiences, find support, and build meaningful connections.
          </p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">10.2K</span>
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">847</span>
              <span className="stat-label">Active Discussions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="peer-support-container">
        {/* Navigation Tabs */}
        <div className="support-tabs">
          <button
            className={`tab-button ${activeTab === 'forums' ? 'active' : ''}`}
            onClick={() => setActiveTab('forums')}
          >
            💬 Discussion Forums
          </button>
          <button
            className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            👥 Support Groups
          </button>
          <button
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Resources
          </button>
        </div>

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="tab-content">
            {/* Category Filters */}
            <div className="category-filters">
              <button
                className="category-filter active"
                onClick={() => setActiveTab('forums')}
              >
                All Discussions
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="category-filter"
                  onClick={() => setActiveTab(category.id)}
                  style={{ borderColor: category.color }}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* New Post Button */}
            <div className="new-post-section">
              <button
                className="new-post-button"
                onClick={() => setShowNewPostForm(!showNewPostForm)}
              >
                ✍️ Start New Discussion
              </button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <div className="new-post-form">
                <h3>Start a New Discussion</h3>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="What's your discussion about?"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="form-select"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Share your thoughts, questions, or experiences..."
                    className="form-textarea"
                    rows="5"
                  />
                </div>
                <div className="form-actions">
                  <button
                    className="cancel-button"
                    onClick={() => setShowNewPostForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="submit-button"
                    onClick={handleNewPost}
                  >
                    Post Discussion
                  </button>
                </div>
              </div>
            )}

            {/* Forum Posts */}
            <div className="forum-posts">
              {filteredPosts.map((post) => (
                <div key={post.id} className={`forum-post ${post.isPinned ? 'pinned' : ''}`}>
                  <div className="post-header">
                    <div className="post-category">
                      <span className="category-icon">
                        {categories.find(c => c.id === post.category)?.icon}
                      </span>
                      <span className="category-name">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                    {post.isPinned && <span className="pinned-badge">📌 Pinned</span>}
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-meta">
                    <span className="post-author">by {post.author}</span>
                    <span className="post-activity">{post.lastActivity}</span>
                  </div>
                  <div className="post-stats">
                    <span className="post-replies">💬 {post.replies} replies</span>
                    <span className="post-views">👁️ {post.views} views</span>
                  </div>
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="post-tag">#{tag}</span>
                    ))}
                  </div>
                  <button className="join-discussion-button">
                    Join Discussion
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Groups Tab */}
        {activeTab === 'groups' && (
          <div className="tab-content">
            <div className="support-groups-grid">
              {supportGroups.map((group) => (
                <div key={group.id} className="support-group-card">
                  <div className="group-header">
                    <h3 className="group-name">{group.name}</h3>
                    {group.isActive && <span className="active-badge">Active</span>}
                  </div>
                  <p className="group-description">{group.description}</p>
                  <div className="group-stats">
                    <span className="group-members">👥 {group.members.toLocaleString()} members</span>
                    <span className="group-meeting">📅 {group.nextMeeting}</span>
                  </div>
                  <div className="group-category">
                    <span className="category-icon">
                      {categories.find(c => c.id === group.category)?.icon}
                    </span>
                    {categories.find(c => c.id === group.category)?.name}
                  </div>
                  <button 
                    className={`join-group-button ${!group.isActive ? 'disabled' : ''}`}
                    disabled={!group.isActive}
                  >
                    {group.isActive ? 'Join Group' : 'Group Full'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="tab-content">
            <div className="resources-grid">
              {resources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-header">
                    <span className="resource-icon">{resource.icon}</span>
                    <h3 className="resource-title">{resource.title}</h3>
                  </div>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-links">
                    {resource.links.map((link, index) => (
                      <Link key={index} to={link.url} className="resource-link">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="community-guidelines">
          <h3>Community Guidelines</h3>
          <div className="guidelines-grid">
            <div className="guideline-item">
              <span className="guideline-icon">🤝</span>
              <span className="guideline-text">Be supportive and respectful</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">🔒</span>
              <span className="guideline-text">Maintain confidentiality</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">🚫</span>
              <span className="guideline-text">No medical advice</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">💝</span>
              <span className="guideline-text">Share from experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;