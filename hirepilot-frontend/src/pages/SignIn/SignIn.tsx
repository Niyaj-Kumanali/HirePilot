import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { authActions } from '../../store/auth/auth.slice';
import { AUTH_SERVICE } from '../../api/services/authApi';
import TextField from '../../components/ui/TextField';

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    AUTH_SERVICE.login({ email, password }).then((res) => {
      console.log(res)
      setSuccessMessage(`Welcome back! Signed in as ${email}`);
      setEmail('');
      setPassword('');
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/")
    }).catch((err) => {
      console.error('Login error:', err);
      setErrors({ submit: err.message || 'Invalid email or password' });
    }).finally(() => {
      setIsLoading(false);
    })
  };

  const handleSocialAuth = () => {
    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage('Welcome back! Signed in with Google');
      setEmail('');
      setPassword('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login());
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2.5 relative">
      <div className="w-full max-w-[480px] relative z-1">
        <div className="bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md p-3 sm:p-5 rounded-2xl border border-white/60 dark:border-white/10 shadow-card mb-2.5">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black mb-1 tracking-tight text-[#202124] dark:text-[#e8eaed]">
              Welcome Back
            </h2>
            <p className="text-[#5f6368] dark:text-[#9aa0a6] font-medium">
              Sign in to your account and continue learning
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-[#e6f4ea] dark:bg-[#1e3525] text-[#1e7e34] dark:text-[#81c995] text-sm font-medium">
              <CheckCircle size={20} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-[#fce8e6] dark:bg-[#3c1f1f] text-[#c5221f] dark:text-[#f28b82] text-sm font-medium">
              {errors.submit}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            {/* Email Field */}
            <TextField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email || errors.submit) setErrors({ ...errors, email: undefined, submit: undefined });
              }}
              error={errors.email}
              iconLeft={<Mail size={20} />}
              fullWidth
            />

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-[#202124] dark:text-[#e8eaed]">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold text-primary no-underline hover:underline">
                  Forgot password?
                </Link>
              </div>
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password || errors.submit) setErrors({ ...errors, password: undefined, submit: undefined });
                }}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-1.75 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-secondary text-white shadow-button hover:-translate-y-0.5 hover:shadow-card-hover disabled:opacity-80 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-3.5">
            <div className="flex-1 border-t border-white/60 dark:border-white/10" />
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
              or continue with
            </span>
            <div className="flex-1 border-t border-white/60 dark:border-white/10" />
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <button
              onClick={handleSocialAuth}
              className="flex items-center justify-center gap-2 py-1.75 rounded-xl font-bold text-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] bg-white/40 dark:bg-[#1a1d23]/40 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-primary/5 transition-all"
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
              className="flex items-center justify-center gap-2 py-1.75 rounded-xl font-bold text-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] bg-white/40 dark:bg-[#1a1d23]/40 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-primary/5 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-[#5f6368] dark:text-[#9aa0a6]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-primary no-underline hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-[#5f6368] dark:text-[#9aa0a6] block mt-2.5">
          By signing in, you agree to our{' '}
          <Link to="/terms-of-service" className="text-primary font-semibold no-underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy-policy" className="text-primary font-semibold no-underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
