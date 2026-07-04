import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../supabase';
import { api } from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchUserArticles();
  }, []);

  const checkAuth = async () => {
    const { data } = await auth.getSession();
    if (!data?.session) {
      navigate('/login');
    } else {
      setUser(data.session.user);
    }
  };

  const fetchUserArticles = async () => {
    try {
      const data = await api.getArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    const colors = {
      Submitted: 'status-submitted',
      'In Review': 'status-review',
      'Revisions Required': 'status-revision',
      Accepted: 'status-accepted',
      Published: 'status-published',
      Rejected: 'status-rejected',
    };
    return colors[status] || 'status-submitted';
  };

  return (
    <main className="dashboard-page">
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="user-info">
            <div className="user-avatar">
              {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1>Welcome, {user?.user_metadata?.full_name || 'User'}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          <button className="btn btn-outline btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon">📄</span>
            <div className="stat-info">
              <span className="stat-value">{articles.length}</span>
              <span className="stat-label">Your Submissions</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <div className="stat-info">
              <span className="stat-value">{articles.filter(a => a.status === 'In Review').length}</span>
              <span className="stat-label">Under Review</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-value">{articles.filter(a => a.status === 'Published').length}</span>
              <span className="stat-label">Published</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/submit')}>
              <span className="action-icon">📤</span>
              <span>Submit New Article</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/articles')}>
              <span className="action-icon">📚</span>
              <span>Browse Articles</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">👤</span>
              <span>Edit Profile</span>
            </button>
          </div>
        </section>

        {/* My Submissions */}
        <section className="my-submissions">
          <h2>My Submissions</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <h3>No submissions yet</h3>
              <p>Start by submitting your first article</p>
              <button className="btn btn-primary" onClick={() => navigate('/submit')}>
                Submit Article
              </button>
            </div>
          ) : (
            <div className="submissions-list">
              {articles.map((article) => (
                <div key={article.id} className="submission-item">
                  <div className="submission-header">
                    <span className={`status-badge ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                    <span className="submission-date">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="submission-title">{article.title}</h3>
                  <p className="submission-abstract">{article.abstract}</p>
                  <div className="submission-actions">
                    <button className="btn btn-text">View Details</button>
                    <button className="btn btn-text">Download</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
