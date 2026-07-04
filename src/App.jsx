import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Submit from './pages/Submit';
import About from './pages/About';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">AJIM</span>
            </div>
            <nav className="nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/articles" className="nav-link">Articles</Link>
              <Link to="/submit" className="nav-link">Submit</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/login" className="nav-link btn-login">Login</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>AJIM</h3>
              <p>Asian Journal of Medicine and Health</p>
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
              <p>Email: editor@ajim-journal.com</p>
              <p>Universitas Airlangga</p>
              <p>Surabaya, Indonesia</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 AJIM - Asian Journal of Medicine and Health. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
