import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../supabase';

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
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

  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    setErrorMessage('');

    try {
      const { data, error } = await auth.signInWithGoogle();

      if (error) throw error;

      // If successful, Supabase will redirect
      // If not, user will be redirected automatically
    } catch (error) {
      console.error('Google sign in error:', error);
      setErrorMessage(error.message || 'Failed to sign in with Google. Please try again.');
      setSocialLoading(null);
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

            {/* Social Login Buttons */}
            <div className="social-login-buttons">
              <button
                type="button"
                className="btn-social-google"
                onClick={handleGoogleSignIn}
                disabled={socialLoading === 'google' || loading}
              >
                {socialLoading === 'google' ? (
                  <span className="loading-spinner-small"></span>
                ) : (
                  <>
                    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            <div className="form-divider">
              <span>or</span>
            </div>

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
