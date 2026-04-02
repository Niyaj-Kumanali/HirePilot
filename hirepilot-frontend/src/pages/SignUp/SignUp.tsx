import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/auth.slice';
import { useAppDispatch } from '../../store/hooks';
import { AUTH_SERVICE } from '../../api/services/authApi';
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
  Checkbox,
  FormControlLabel,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';

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
  const theme = useTheme();

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

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }

    if (errors[name] || errors.submit) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        submit: undefined,
      }));
    }
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
      <Box sx={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>
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
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              Join us and get started in seconds
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
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
            {/* Name Fields Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.75 }}>
              <TextField
                fullWidth
                label="First Name"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
              <TextField
                fullWidth
                label="Last Name"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />

            {/* Phone Field */}
            <TextField
              fullWidth
              label="Phone Number (Optional)"
              type="tel"
              placeholder="+1 (555) 123-4567"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />

            {/* Password Field */}
            <Box>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
              {formData.password && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={getPasswordStrengthValue()}
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: 1,
                      bgcolor: 'divider',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getPasswordStrengthColor(),
                      }
                    }}
                  />
                  <Typography variant="caption" fontWeight={700} sx={{ color: getPasswordStrengthColor(), minWidth: 60 }}>
                    {passwordStrength === 'weak' && '⚠️ Weak'}
                    {passwordStrength === 'medium' && '📊 Medium'}
                    {passwordStrength === 'strong' && '✓ Strong'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />

            {/* Terms Checkbox */}
            <Box
              sx={{
                bgcolor: 'background.default',
                borderRadius: 1.5,
                border: `1px solid ${theme.palette.divider}`,
                p: 1.5,
                mt: 1.25
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
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
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link to="/terms-of-service" style={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none' }}>
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" style={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {errors.terms && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, color: 'error.main' }}>
                  <AlertCircle size={16} />
                  <Typography variant="caption">{errors.terms}</Typography>
                </Box>
              )}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                'Sign Up'
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

          {/* Sign In Link */}
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{' '}
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Typography component="span" variant="body2" fontWeight={700} color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Sign in
              </Typography>
            </Link>
          </Typography>
        </Paper>

        {/* Footer */}
        <Typography variant="caption" textAlign="center" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
          By signing up, you agree to our{' '}
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

export default SignUp;