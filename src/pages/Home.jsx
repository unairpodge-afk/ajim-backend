import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { auth } from '../supabase';

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchArticles();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await auth.getSession();
    setUser(data?.session?.user || null);
  };

  const fetchArticles = async () => {
    try {
      const data = await api.getArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClick = () => {
    if (user) {
      navigate('/submit');
    } else {
      navigate('/login');
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Veritas Islamic Journal</h1>
          <p className="hero-subtitle">
            Open Access, Peer-Reviewed Journal for Islamic Medical and Health Research
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleSubmitClick}>
              Submit Article
            </button>
            <Link to="/articles" className="btn btn-secondary">
              Browse Articles
            </Link>
          </div>
        </div>
        <div className="hero-decoration">
          <span className="hero-badge">Open Access</span>
          <span className="hero-badge">Peer Reviewed</span>
          <span className="hero-badge">Halal Certified</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">150+</span>
            <span className="stat-label">Published Articles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Reviewers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">Issues/Year</span>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="latest-articles">
        <div className="section-container">
          <div className="section-header">
            <h2>Latest Articles</h2>
            <p>Recent publications from our journal</p>
          </div>

          {loading ? (
            <div className="loading">Loading articles...</div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <p>No articles published yet. Be the first to submit!</p>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="article-status">{article.status}</div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-abstract">{article.abstract}</p>
                  <div className="article-meta">
                    <span className="article-author">
                      👤 {article.profiles?.full_name || 'Unknown'}
                    </span>
                    <span className="article-university">
                      🏫 {article.profiles?.university_affiliation || 'N/A'}
                    </span>
                  </div>
                  {article.keywords && (
                    <div className="article-keywords">
                      {article.keywords.split(',').map((kw, i) => (
                        <span key={i} className="keyword-tag">{kw.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div className="article-date">
                    📅 {new Date(article.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/articles" className="btn btn-outline">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-preview">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2>About VERITAS</h2>
              <p>
                VERITAS - Veritas Islamic Journal is an open-access, peer-reviewed
                journal that publishes original research articles, reviews, and case reports
                in the field of Islamic medicine and health sciences.
              </p>
              <ul className="about-features">
                <li>✓ Open Access - Free access to all published articles</li>
                <li>✓ Rapid Publication - Fast peer review process</li>
                <li>✓ Global Reach - Indexed in major databases</li>
                <li>✓ Quality Assured - Rigorous peer review</li>
                <li>✓ Sharia Compliant - Islamic medical ethics</li>
              </ul>
              <Link to="/about" className="btn btn-primary">
                Learn More
              </Link>
            </div>
            <div className="about-image">
              <div className="about-card">
                <h4>Impact Factor</h4>
                <span className="about-stat">2.5</span>
              </div>
              <div className="about-card">
                <h4>CiteScore</h4>
                <span className="about-stat">3.2</span>
              </div>
              <div className="about-card">
                <h4>SJR</h4>
                <span className="about-stat">0.85</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Submit Your Research?</h2>
          <p>Join our community of researchers and contribute to advancing Islamic medical science.</p>
          <button className="btn btn-primary btn-large" onClick={handleSubmitClick}>
            Submit Your Article
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
