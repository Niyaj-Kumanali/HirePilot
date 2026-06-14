import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/auth.slice';
import { useAppDispatch } from '../../store/hooks';
import { AUTH_SERVICE } from '../../api/services/authApi';
import TextField from '../../components/ui/TextField';

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

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
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
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    AUTH_SERVICE.register(formData)
      .then((res) => {
        console.log('Registration successful:', res);
        setSuccessMessage(`Welcome ${formData.firstName}! Your account has been created successfully.`);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
        setAgreedToTerms(false);
        setPasswordStrength('');
        setTimeout(() => setSuccessMessage(''), 3000);
        dispatch(authActions.login());
        navigate("/");
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        setErrors({ submit: err.message || 'Registration failed. Please try again.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAgreedToTerms(checked);
      if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordStrength(getPasswordStrength(value));
    if (errors[name] || errors.submit) setErrors(prev => ({ ...prev, [name]: undefined, submit: undefined }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 'weak') return '#ef4444';
    if (passwordStrength === 'medium') return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthValue = () => {
    if (passwordStrength === 'weak') return 33;
    if (passwordStrength === 'medium') return 66;
    return 100;
  };

  const handleSocialAuth = () => {
    setIsLoading(true);
    setErrors({});
    setTimeout(() => {
      setSuccessMessage('Welcome! Account created successfully.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
      setAgreedToTerms(false);
      setPasswordStrength('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login());
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f172a] flex items-center justify-center p-2.5 relative before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      <div className="w-full max-w-[520px] relative z-1">
        <div className="bg-white dark:bg-[#1a1d23] p-3 sm:p-5 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043] shadow-lg mb-2.5">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black mb-1 tracking-tight text-[#202124] dark:text-[#e8eaed]">
              Create Account
            </h2>
            <p className="text-[#5f6368] dark:text-[#9aa0a6] font-medium">
              Join us and get started in seconds
            </p>
          </div>

          {successMessage && (
            <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-[#e6f4ea] dark:bg-[#1e3525] text-[#1e7e34] dark:text-[#81c995] text-sm font-medium">
              <CheckCircle size={20} />
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-[#fce8e6] dark:bg-[#3c1f1f] text-[#c5221f] dark:text-[#f28b82] text-sm font-medium">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.25">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.75">
              <TextField
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                iconLeft={<User size={20} />}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                iconLeft={<User size={20} />}
                fullWidth
              />
            </div>

            {/* Email */}
            <TextField
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              iconLeft={<Mail size={20} />}
              fullWidth
            />

            {/* Phone */}
            <TextField
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              iconLeft={<Phone size={20} />}
              fullWidth
            />

            {/* Password */}
            <div>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                iconLeft={<Lock size={20} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center text-[#5f6368] dark:text-[#9aa0a6]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                fullWidth
              />
              {formData.password && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="flex-1 h-1 rounded-full bg-[#e0e0e0] dark:bg-[#3c4043] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${getPasswordStrengthValue()}%`, backgroundColor: getPasswordStrengthColor() }} />
                  </div>
                  <span className="text-xs font-bold min-w-[60px]" style={{ color: getPasswordStrengthColor() }}>
                    {passwordStrength === 'weak' && 'Weak'}
                    {passwordStrength === 'medium' && 'Medium'}
                    {passwordStrength === 'strong' && 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                iconLeft={<Lock size={20} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex items-center justify-center text-[#5f6368] dark:text-[#9aa0a6]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                fullWidth
              />
            </div>

            {/* Terms Checkbox */}
            <div className="bg-[#fafafa] dark:bg-[#0f172a] rounded-xl border border-[#e0e0e0] dark:border-[#3c4043] p-1.5 mt-1.25">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={agreedToTerms} onChange={handleInputChange} className="w-4 h-4 rounded border-[#e0e0e0] dark:border-[#3c4043] text-primary focus:ring-primary" />
                <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                  I agree to the{' '}
                  <Link to="/terms-of-service" className="text-primary font-bold no-underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-primary font-bold no-underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && (
                <div className="flex items-center gap-0.75 mt-0.5 text-[#c5221f] dark:text-[#f28b82]">
                  <AlertCircle size={16} />
                  <span className="text-xs">{errors.terms}</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-1.75 rounded-xl font-bold text-sm
                bg-gradient-to-r from-primary to-secondary text-white
                shadow-[0_8px_24px_rgba(168,85,247,0.3)]
                hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(168,85,247,0.4)]
                disabled:opacity-80
                transition-all duration-200
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-3.5">
            <div className="flex-1 border-t border-[#e0e0e0] dark:border-[#3c4043]" />
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
              or continue with
            </span>
            <div className="flex-1 border-t border-[#e0e0e0] dark:border-[#3c4043]" />
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <button
              onClick={handleSocialAuth}
              className="flex items-center justify-center gap-2 py-1.75 rounded-xl font-bold text-sm border-2 border-[#e0e0e0] dark:border-[#3c4043] text-[#202124] dark:text-[#e8eaed] bg-transparent hover:border-2 hover:-translate-y-0.5 hover:bg-primary/5 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc04" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              onClick={handleSocialAuth}
              className="flex items-center justify-center gap-2 py-1.75 rounded-xl font-bold text-sm border-2 border-[#e0e0e0] dark:border-[#3c4043] text-[#202124] dark:text-[#e8eaed] bg-transparent hover:border-2 hover:-translate-y-0.5 hover:bg-primary/5 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          <p className="text-sm text-center text-[#5f6368] dark:text-[#9aa0a6]">
            Already have an account?{' '}
            <Link to="/signin" className="font-bold text-primary no-underline hover:underline">Sign in</Link>
          </p>
        </div>

        <p className="text-xs text-center text-[#5f6368] dark:text-[#9aa0a6] block mt-2.5">
          By signing up, you agree to our{' '}
          <Link to="/terms-of-service" className="text-primary font-semibold no-underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy-policy" className="text-primary font-semibold no-underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
