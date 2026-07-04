import { useState, useEffect } from 'react';
import { api } from '../api';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, statusFilter]);

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

  const filterArticles = () => {
    let filtered = [...articles];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.abstract.toLowerCase().includes(term) ||
          article.keywords?.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    setFilteredArticles(filtered);
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
    <main className="articles-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>Published Articles</h1>
          <p>Browse and explore research articles from VERITAS</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title, abstract, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="In Review">In Review</option>
              <option value="Revisions Required">Revisions Required</option>
              <option value="Accepted">Accepted</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="results-count">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="articles-section">
        <div className="articles-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📚</span>
              <h3>No articles found</h3>
              <p>
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No articles have been published yet'}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="articles-list">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="article-item"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="article-header">
                    <span className={`status-badge ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                    <span className="article-date">
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="article-title">{article.title}</h2>

                  <div className="article-authors">
                    <span className="author-icon">👤</span>
                    <span className="author-name">
                      {article.profiles?.full_name || 'Unknown Author'}
                    </span>
                    <span className="author-university">
                      {article.profiles?.university_affiliation || 'N/A'}
                    </span>
                  </div>

                  <p className="article-abstract">{article.abstract}</p>

                  {article.keywords && (
                    <div className="article-keywords">
                      {article.keywords.split(',').map((kw, i) => (
                        <span key={i} className="keyword">
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="article-actions">
                    <button className="btn btn-outline btn-sm">Read More →</button>
                    <button className="btn btn-text">📄 PDF</button>
                    <button className="btn btn-text">📧 Cite</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>
              ✕
            </button>

            <div className="modal-header">
              <span className={`status-badge ${getStatusColor(selectedArticle.status)}`}>
                {selectedArticle.status}
              </span>
              <span className="modal-date">
                Published: {new Date(selectedArticle.created_at).toLocaleDateString()}
              </span>
            </div>

            <h1 className="modal-title">{selectedArticle.title}</h1>

            <div className="modal-authors">
              <div className="author-info">
                <span className="author-icon">👤</span>
                <div>
                  <strong>{selectedArticle.profiles?.full_name || 'Unknown Author'}</strong>
                  <p>{selectedArticle.profiles?.university_affiliation || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h3>Abstract</h3>
              <p>{selectedArticle.abstract}</p>
            </div>

            {selectedArticle.keywords && (
              <div className="modal-section">
                <h3>Keywords</h3>
                <div className="article-keywords">
                  {selectedArticle.keywords.split(',').map((kw, i) => (
                    <span key={i} className="keyword">
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn btn-primary">📄 Download PDF</button>
              <button className="btn btn-outline">📧 Cite This Article</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Articles;
