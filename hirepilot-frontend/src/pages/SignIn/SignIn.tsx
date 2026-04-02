import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { authActions } from '../../store/auth/auth.slice';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import { AUTH_SERVICE } from '../../api/services/authApi';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

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

  const handleAuthSubmit = () => {
    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage(`Welcome back!`);
      setEmail('');
      setPassword('');
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(authActions.login())
      navigate("/")
    }, 500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
    if (errors.email || errors.submit) {
      setErrors({ ...errors, email: undefined, submit: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
    if (errors.password || errors.submit) {
      setErrors({ ...errors, password: undefined, submit: undefined });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2.5,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            mb: 2.5
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={900} gutterBottom sx={{ letterSpacing: '-0.03em' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              Sign in to your account and continue learning
            </Typography>
          </Box>

          {/* Success Message */}
          {successMessage && (
            <Alert
              icon={<CheckCircle size={20} />}
              severity="success"
              sx={{ mb: 3 }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Error Message */}
          {errors.submit && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 1.5 }}
            >
              {errors.submit}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                }
              }}
            />

            {/* Password Field */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={700} component="label">
                  Password
                </Typography>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" fontWeight={700} color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                  }
                }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                py: 1.75,
                borderRadius: 1.5,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                '&:disabled': {
                  opacity: 0.8,
                }
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3.5 }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              or continue with
            </Typography>
          </Divider>

          {/* OAuth Buttons */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
            <Button
              variant="outlined"
              onClick={handleAuthSubmit}
              sx={{
                py: 1.75,
                borderRadius: 1.5,
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc04" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
              </svg>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Google</Box>
            </Button>
            <Button
              variant="outlined"
              onClick={handleAuthSubmit}
              sx={{
                py: 1.75,
                borderRadius: 1.5,
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Facebook</Box>
            </Button>
          </Box>

          {/* Sign Up Link */}
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography component="span" variant="body2" fontWeight={700} color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Paper>

        {/* Footer */}
        <Typography variant="caption" textAlign="center" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
          By signing in, you agree to our{' '}
          <Link to="/terms-of-service" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy-policy" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;