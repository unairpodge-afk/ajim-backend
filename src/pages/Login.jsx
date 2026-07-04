import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    university: '',
    role: 'author',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.university) {
      newErrors.university = 'University affiliation is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (isRegister) {
      if (!validateRegister()) return;
    } else {
      if (!validateLogin()) return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isRegister) {
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      setIsRegister(false);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        university: '',
        role: 'author',
      });
    } else {
      // For demo, show success
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      // In real app: redirect to dashboard
    }

    setLoading(false);
  };

  const handleForgotPassword = () => {
    const email = prompt('Please enter your email address:');
    if (email) {
      alert(`Password reset link sent to ${email}`);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <Link to="/" className="branding-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">AJIM</span>
            </Link>
            <h1>Asian Journal of Medicine and Health</h1>
            <p>
              Join our community of researchers and contribute to advancing medical science
              through open access publishing.
            </p>

            <div className="branding-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Submit manuscripts online</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Track submission status</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Communicate with editors</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Access peer review process</span>
              </div>
            </div>

            <div className="branding-stats">
              <div className="branding-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Authors</span>
              </div>
              <div className="branding-stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Reviewers</span>
              </div>
              <div className="branding-stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <div className="form-header">
              <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
              <p>
                {isRegister
                  ? 'Fill in your details to register as an author or reviewer'
                  : 'Sign in to access your AJIM account'}
              </p>
            </div>

            {successMessage && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              {isRegister && (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="university">University Affiliation *</label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="e.g., Universitas Airlangga"
                      className={errors.university ? 'error' : ''}
                    />
                    {errors.university && <span className="error-text">{errors.university}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role *</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="author">Author</option>
                      <option value="reviewer">Reviewer</option>
                    </select>
                    <span className="help-text">
                      Authors submit manuscripts, Reviewers evaluate submissions
                    </span>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password {isRegister ? '*' : ''}
                  {!isRegister && (
                    <button
                      type="button"
                      className="forgot-password"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </button>
                  )}
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isRegister ? 'Min. 8 characters' : 'Enter your password'}
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {isRegister && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : isRegister ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="form-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="btn-social">
                <span className="social-icon">🔵</span>
                Google
              </button>
              <button type="button" className="btn-social">
                <span className="social-icon">🔷</span>
                Microsoft
              </button>
              <button type="button" className="btn-social">
                <span className="social-icon">🔗</span>
                ORCID
              </button>
            </div>

            <div className="form-footer">
              {isRegister ? (
                <p>
                  Already have an account?{' '}
                  <button type="button" className="link-btn" onClick={() => setIsRegister(false)}>
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button type="button" className="link-btn" onClick={() => setIsRegister(true)}>
                    Register here
                  </button>
                </p>
              )}
            </div>

            {!isRegister && (
              <div className="demo-notice">
                <span className="demo-icon">💡</span>
                <div>
                  <strong>Demo Mode</strong>
                  <p>Enter any email and password to test the login (8+ chars for password).</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
