import { Link } from 'react-router-dom';

function About() {
  const editorialBoard = [
    { name: 'Prof. Dr. Ahmad Abdullah', role: 'Editor-in-Chief', affiliation: 'Islamic University of Indonesia' },
    { name: 'Prof. Dr. Muhammad Hassan', role: 'Deputy Editor', affiliation: 'Al-Azhar University' },
    { name: 'Dr. Fatima Zahra', role: 'Associate Editor', affiliation: 'Universitas Islam Negeri' },
    { name: 'Dr. Yusuf Ibrahim', role: 'Associate Editor', affiliation: 'King Saud University' },
    { name: 'Prof. Dr. Omar Khalid', role: 'Islamic Ethics Editor', affiliation: 'University of Karachi' },
    { name: 'Dr. Aisha Rahman', role: 'Assistant Editor', affiliation: 'International Islamic University Malaysia' },
  ];

  const indexing = [
    { name: 'Scopus', logo: '📚' },
    { name: 'Web of Science', logo: '🌐' },
    { name: 'PubMed', logo: '🔬' },
    { name: 'DOAJ', logo: '📖' },
    { name: 'Google Scholar', logo: '🔍' },
    { name: 'CrossRef', logo: '📎' },
  ];

  const policies = [
    {
      icon: '📋',
      title: 'Peer Review Process',
      description: 'All submissions undergo rigorous double-blind peer review by experts in Islamic medicine and biomedical sciences.',
    },
    {
      icon: '⚡',
      title: 'Rapid Publication',
      description: 'Average time from submission to first decision: 3-4 weeks.',
    },
    {
      icon: '🔓',
      title: 'Open Access',
      description: 'All published articles are freely accessible worldwide under CC BY-NC license.',
    },
    {
      icon: '📊',
      title: 'Article Processing',
      description: 'Transparent APC structure with no hidden fees. Fee waivers available for authors from developing countries.',
    },
    {
      icon: '☪',
      title: 'Islamic Ethics',
      description: 'All research must adhere to Islamic ethical guidelines and principles.',
    },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="journal-badge">Est. 2024</span>
          <h1>Journal of Islamic Medicine and Science</h1>
          <p className="about-subtitle">
            A peer-reviewed, open-access journal dedicated to advancing medical research
            and healthcare practices based on Islamic principles and modern medical science.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="section-container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                VERITAS aims to publish high-quality original research, reviews, and case reports
                that contribute to the advancement of medical science while maintaining Islamic values
                and ethical principles. We are committed to fostering collaboration among researchers,
                clinicians, and healthcare professionals across the Muslim world and beyond.
              </p>
              <p>
                Our journal provides a platform for sharing innovative findings, clinical
                experiences, and evidence-based practices that address contemporary health
                challenges from an Islamic perspective.
              </p>
            </div>
            <div className="mission-stats">
              <div className="stat-card">
                <span className="stat-icon">📄</span>
                <span className="stat-value">500+</span>
                <span className="stat-label">Published Articles</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <span className="stat-value">200+</span>
                <span className="stat-label">Contributing Authors</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🌏</span>
                <span className="stat-value">40+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📈</span>
                <span className="stat-value">98%</span>
                <span className="stat-label">Acceptance Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="about-section scope-section">
        <div className="section-container">
          <h2 className="section-title">Scope of the Journal</h2>
          <p className="section-intro">
            VERITAS publishes original research and review articles in all areas of Islamic medicine and health sciences.
          </p>

          <div className="scope-grid">
            <div className="scope-card">
              <span className="scope-icon">❤️</span>
              <h3>Islamic Medicine</h3>
              <p>Prophetic medicine (Tibb Nabawi), herbal medicine in Islam, holistic healthcare</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🧠</span>
              <h3>Neuroscience</h3>
              <p>Brain research, neurological disorders, cognitive health from Islamic perspective</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🦠</span>
              <h3>Infectious Diseases</h3>
              <p>Epidemiology, virology, public health in Muslim communities</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🩺</span>
              <h3>Internal Medicine</h3>
              <p>Diabetes, endocrinology, gastroenterology with Islamic ethical considerations</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🔪</span>
              <h3>Islamic Bioethics</h3>
              <p>Organ transplantation, end-of-life care, reproductive health ethics</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">👶</span>
              <h3>Family Health</h3>
              <p>Pediatrics, maternal health, reproductive health in Islamic context</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🩸</span>
              <h3>Halal Pharma</h3>
              <p>Halal pharmaceuticals, drug development, toxicology with Islamic guidelines</p>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🏥</span>
              <h3>Public Health</h3>
              <p>Community health, health policy, environmental health in Islamic framework</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Board */}
      <section className="about-section board-section">
        <div className="section-container">
          <h2 className="section-title">Editorial Board</h2>
          <p className="section-intro">
            Our editorial board comprises distinguished researchers and clinicians from leading Islamic institutions worldwide.
          </p>

          <div className="board-grid">
            {editorialBoard.map((member, index) => (
              <div key={index} className="board-card">
                <div className="board-avatar">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="board-info">
                  <h4>{member.name}</h4>
                  <span className="board-role">{member.role}</span>
                  <span className="board-affiliation">{member.affiliation}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="board-cta">
            <p>Interested in joining our editorial board?</p>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Indexing */}
      <section className="about-section indexing-section">
        <div className="section-container">
          <h2 className="section-title">Indexing & Abstracting</h2>
          <p className="section-intro">
            VERITAS is indexed in major international databases to ensure maximum visibility of published articles.
          </p>

          <div className="indexing-grid">
            {indexing.map((db, index) => (
              <div key={index} className="indexing-card">
                <span className="indexing-logo">{db.logo}</span>
                <span className="indexing-name">{db.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="about-section policies-section">
        <div className="section-container">
          <h2 className="section-title">Journal Policies</h2>

          <div className="policies-grid">
            {policies.map((policy, index) => (
              <div key={index} className="policy-card">
                <span className="policy-icon">{policy.icon}</span>
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Fees */}
      <section className="about-section fees-section">
        <div className="section-container">
          <h2 className="section-title">Publication Fees</h2>

          <div className="fees-content">
            <div className="fees-main">
              <h3>Article Processing Charge (APC)</h3>
              <div className="fee-amount">
                <span className="currency">$</span>
                <span className="amount">150</span>
                <span className="per">/ article</span>
              </div>
              <p>
                The APC covers the costs of peer review management, article production,
                hosting, and indexing. There are no additional charges for color figures,
                supplementary materials, or page limits.
              </p>
            </div>

            <div className="fees-waiver">
              <h4>Fee Waivers Available</h4>
              <p>
                We offer full or partial waivers for authors from low and middle-income countries
                (as classified by the World Bank). To request a waiver, please indicate this
                in your cover letter during submission.
              </p>
              <div className="waiver-list">
                <span>✓ No submission fees</span>
                <span>✓ No additional hidden charges</span>
                <span>✓ Waiver programs available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="cta-container">
          <h2>Have Questions?</h2>
          <p>
            Our editorial office is ready to assist you with any inquiries regarding
            submissions, peer review, or publication processes.
          </p>
          <div className="cta-buttons">
            <Link to="/submit" className="btn btn-primary btn-large">
              Submit Your Article
            </Link>
            <a href="mailto:editor@veritas-journal.com" className="btn btn-secondary btn-large">
              Contact Editor
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
