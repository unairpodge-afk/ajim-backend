import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Submit from './pages/Submit';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { auth } from './supabase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, []);

  const checkUser = async () => {
    const { data } = await auth.getSession();
    setUser(data?.session?.user || null);
    setLoading(false);
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <Link to="/" className="logo">
              <span className="logo-icon">🌙</span>
              <span className="logo-text">VERITAS</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/articles" className="nav-link">Articles</Link>
              <Link to="/submit" className="nav-link">Submit</Link>
              <Link to="/about" className="nav-link">About</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <button className="nav-link btn-logout" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login" className="nav-link btn-login">Login</Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/articles" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Articles</Link>
            <Link to="/submit" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Submit</Link>
            <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link btn-login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>VERITAS</h3>
              <p>Veritas Islamic Journal</p>
              <p>Open Access, Peer-Reviewed Journal</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/articles">Articles</Link>
              <Link to="/submit">Submit</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: editor@veritas-journal.com</p>
              <p>Islamic University</p>
              <p>Indonesia</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 VERITAS - Veritas Islamic Journal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
