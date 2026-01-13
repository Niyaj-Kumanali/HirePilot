import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader, CheckCircle, AlertCircle } from 'lucide-react';

import './signup.scss'
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/auth.slice';
import { useAppDispatch } from '../../store/hooks';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPasswordStrength = (password: string) => {
    if (!password) return '';
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'medium';
    return 'strong';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage(
        `Welcome ${formData.firstName}! Your account has been created successfully.`
      );
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setAgreedToTerms(false);
      setPasswordStrength('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/dashboard")
    }, 1500);
  };

  const handleAuthSubmit = () => {
    setTimeout(() => {
      setSuccessMessage(
        `Welcome ! Your account has been created successfully.`
      );
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setAgreedToTerms(false);
      setPasswordStrength('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/dashboard")
    }, 500);
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-content">

          {/* Card */}
          <div className="signup-card">

            {/* Header */}
            <div className="signup-header">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Join us and get started in seconds</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="signup-alert signup-alert-success">
                <div className="signup-alert-icon">
                  <CheckCircle size={20} />
                </div>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <div className="signup-form">

              {/* Name Fields Row */}
              <div className="signup-form-row">
                {/* First Name */}
                <div className="signup-form-group">
                  <label className="signup-label">First Name</label>
                  <div className="signup-input-wrapper">
                    <User size={20} className="signup-input-icon" />
                    <input
                      type="text"
                      className={`signup-input ${errors.firstName ? 'error' : ''}`}
                      placeholder="John"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.firstName && (
                    <span className="signup-error">{errors.firstName}</span>
                  )}
                </div>

                {/* Last Name */}
                <div className="signup-form-group">
                  <label className="signup-label">Last Name</label>
                  <div className="signup-input-wrapper">
                    <User size={20} className="signup-input-icon" />
                    <input
                      type="text"
                      className={`signup-input ${errors.lastName ? 'error' : ''}`}
                      placeholder="Doe"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.lastName && (
                    <span className="signup-error">{errors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="signup-form-group">
                <label className="signup-label">Email Address</label>
                <div className="signup-input-wrapper">
                  <Mail size={20} className="signup-input-icon" />
                  <input
                    type="email"
                    className={`signup-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                  <span className="signup-error">{errors.email}</span>
                )}
              </div>

              {/* Phone Field */}
              <div className="signup-form-group">
                <label className="signup-label">Phone Number (Optional)</label>
                <div className="signup-input-wrapper">
                  <Phone size={20} className="signup-input-icon" />
                  <input
                    type="tel"
                    className={`signup-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+1 (555) 123-4567"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.phone && (
                  <span className="signup-error">{errors.phone}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="signup-form-group">
                <label className="signup-label">Password</label>
                <div className="signup-input-wrapper">
                  <Lock size={20} className="signup-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`signup-input ${errors.password ? 'error' : ''}`}
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.password && (
                  <div className={`signup-password-strength ${passwordStrength}`}>
                    <div className="signup-password-strength-bar"></div>
                    <span className="signup-password-strength-text">
                      {passwordStrength === 'weak' && '⚠️ Weak'}
                      {passwordStrength === 'medium' && '📊 Medium'}
                      {passwordStrength === 'strong' && '✓ Strong'}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="signup-error">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="signup-form-group">
                <label className="signup-label">Confirm Password</label>
                <div className="signup-input-wrapper">
                  <Lock size={20} className="signup-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="signup-error">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="signup-terms">
                <label className="signup-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({
                          ...prev,
                          terms: undefined,
                        }));
                      }
                    }}
                    className="signup-checkbox"
                  />
                  <span className="signup-checkbox-text">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="signup-link">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" className="signup-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <div className="signup-terms-error">
                    <AlertCircle size={16} />
                    <span>{errors.terms}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="signup-btn signup-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="signup-btn-loader" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="signup-divider">
              <div className="signup-divider-line"></div>
              <span className="signup-divider-text">or continue with</span>
              <div className="signup-divider-line"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="signup-oauth">
              <button className="signup-btn signup-btn-oauth signup-btn-google" onClick={handleAuthSubmit}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc04" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
                </svg>
                <span>Google</span>
              </button>
              <button className="signup-btn signup-btn-oauth signup-btn-facebook" onClick={handleAuthSubmit}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Sign In Link */}
            <p className="signup-signin-text">
              Already have an account?{' '}
              <Link to="/signin" className="signup-signin-link">Sign in</Link>
            </p>
          </div>

          {/* Footer */}
          <div className="signup-footer">
            <p className="signup-footer-text">
              By signing up, you agree to our{' '}
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

export default SignUp;