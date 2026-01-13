import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader, CheckCircle } from 'lucide-react';


import './signin.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { authActions } from '../../store/auth/auth.slice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage(`Welcome back! Signed in as ${email}`);
      setEmail('');
      setPassword('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/dashboard")
    }, 1500);
  };

  const handleAuthSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage(`Welcome back!`);
      setEmail('');
      setPassword('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/dashboard")
    }, 500);
  };



  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: undefined });
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: undefined });
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="signin-content">

          {/* Card */}
          <div className="signin-card">

            {/* Header */}
            <div className="signin-header">
              <h1 className="signin-title">Welcome Back</h1>
              <p className="signin-subtitle">Sign in to your account and continue learning</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="signin-alert signin-alert-success">
                <div className="signin-alert-icon">
                  <CheckCircle size={20} />
                </div>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <div className="signin-form" onSubmit={handleSubmit}>

              {/* Email Field */}
              <div className="signin-form-group">
                <label className="signin-label">Email Address</label>
                <div className="signin-input-wrapper">
                  <Mail size={20} className="signin-input-icon" />
                  <input
                    type="email"
                    className={`signin-input ${errors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {errors.email && (
                  <span className="signin-error">{errors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="signin-form-group">
                <div className="signin-password-header">
                  <label className="signin-label">Password</label>
                  <Link to="/forgot-password" className="signin-forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="signin-input-wrapper">
                  <Lock size={20} className="signin-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`signin-input ${errors.password ? 'error' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="signin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="signin-error">{errors.password}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="signin-btn signin-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="signin-btn-loader" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="signin-divider">
              <div className="signin-divider-line"></div>
              <span className="signin-divider-text">or continue with</span>
              <div className="signin-divider-line"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="signin-oauth">
              <button className="signin-btn signin-btn-oauth signin-btn-google" onClick={handleAuthSubmit}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc04" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
                </svg>
                <span>Google</span>
              </button>
              <button className="signin-btn signin-btn-oauth signin-btn-facebook" onClick={handleAuthSubmit}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="signin-signup-text">
              Don't have an account?{' '}
              <Link to="/signup" className="signin-signup-link">Sign up</Link>
            </p>
          </div>

          {/* Footer */}
          <div className="signin-footer">
            <p className="signin-footer-text">
              By signing in, you agree to our{' '}
              <Link to="/terms-of-service">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;