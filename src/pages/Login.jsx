import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../supabase';

function Login() {
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await auth.getSession();
    if (data?.session) {
      navigate('/dashboard');
    }
  };

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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    setErrorMessage('');

    if (isRegister) {
      if (!validateRegister()) return;
    } else {
      if (!validateLogin()) return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        // Register new user
        const { data, error } = await auth.register(formData.email, formData.password, formData.fullName);

        if (error) throw error;

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
        // Login user
        const { data, error } = await auth.login(formData.email, formData.password);

        if (error) throw error;

        setSuccessMessage('Login successful! Redirecting to dashboard...');

        // Redirect after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('Please enter your email address:');
    if (email) {
      setLoading(true);
      try {
        const { error } = await auth.resetPassword(email);
        if (error) throw error;
        alert('Password reset link sent! Check your email.');
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <Link to="/" className="branding-logo">
              <span className="logo-icon">🌙</span>
              <span className="logo-text">VERITAS</span>
            </Link>
            <h1>Veritas Islamic Journal</h1>
            <p>
              Join our community of researchers and contribute to advancing Islamic medical science
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
                  : 'Sign in to access your VERITAS account'}
              </p>
            </div>

            {successMessage && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-error">
                <span className="alert-icon">❌</span>
                <span>{errorMessage}</span>
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
                      placeholder="e.g., Universitas Islam Negeri"
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
                    placeholder={isRegister ? 'Min. 6 characters' : 'Enter your password'}
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
              <span>or</span>
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

            {isRegister && (
              <div className="info-notice">
                <span className="info-icon">📧</span>
                <div>
                  <strong>Email Verification</strong>
                  <p>After registration, you'll receive a verification email. Click the link to activate your account.</p>
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
