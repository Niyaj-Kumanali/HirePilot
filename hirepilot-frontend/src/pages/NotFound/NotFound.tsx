import { ArrowLeft, Home, LayoutDashboard, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Stack, Typography, Button, Card, useTheme, alpha, keyframes } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.6; }
`;

/**
 * Custom 404 Error Page.
 * 
 * Features animated rocket illustration and quick navigation links to 
 * help users find their way back after an invalid route access.
 */
const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Animated background elements */}
      {[
        { top: '10%', left: '10%', size: 200 },
        { top: '60%', right: '15%', size: 150 },
        { bottom: '15%', left: '20%', size: 180 },
      ].map((pos, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: pos.size,
            height: pos.size,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.05),
            animation: `${float} ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
          style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom } as React.CSSProperties}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 8,
            alignItems: 'center',
          }}
        >
          {/* Content */}
          <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }}>
            {/* 404 Display */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '5rem', md: '8rem' }, color: 'text.primary' }}>
                4
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 60, md: 100 },
                  height: { xs: 60, md: 100 },
                  borderRadius: '50%',
                  border: `4px solid ${theme.palette.primary.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 20, md: 30 },
                    height: { xs: 20, md: 30 },
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: `${pulse} 2s ease-in-out infinite`,
                  }}
                />
              </Box>
              <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '5rem', md: '8rem' }, color: 'text.primary' }}>
                4
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h3" fontWeight={700}>
                Page Not Found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
                Oops! The page you're looking for doesn't exist or has been moved. Let us help you get back on track.
              </Typography>
            </Stack>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<Home size={20} />}
                onClick={handleHomeClick}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowLeft size={20} />}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </Stack>

            {/* Quick Navigation */}
            <Box sx={{ width: '100%', mt: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Quick Navigation
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 2,
                }}
              >
                {[
                  { icon: Home, label: 'Home', to: '/' },
                  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
                  { icon: MessageCircle, label: 'Contact', to: '/contact' },
                ].map(({ icon: Icon, label, to }) => (
                  <Card
                    key={to}
                    component={Link}
                    to={to}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Stack spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'primary.main',
                        }}
                      >
                        <Icon size={24} />
                      </Box>
                      <Typography variant="body2" fontWeight={600}>
                        {label}
                      </Typography>
                    </Stack>
                  </Card>
                ))}
              </Box>
            </Box>
          </Stack>

          {/* Illustration */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                animation: `${float} 4s ease-in-out infinite`,
              }}
            >
              <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 'auto' }}>
                <defs>
                  <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={theme.palette.primary.main} />
                    <stop offset="100%" stopColor={theme.palette.secondary.main} />
                  </linearGradient>
                </defs>
                <path d="M60 10 L45 35 L45 95 C45 105 50 110 60 110 C70 110 75 105 75 95 L75 35 Z" fill="url(#rocketGradient)" />
                <circle cx="60" cy="35" r="6" fill="#ffffff" stroke={theme.palette.primary.main} strokeWidth="1.5" />
                <path d="M45 75 L25 95 L35 85 Z" fill={theme.palette.error.main} opacity="0.8" />
                <path d="M75 75 L95 95 L85 85 Z" fill={theme.palette.error.main} opacity="0.8" />
                <path d="M55 95 L50 110 M65 95 L70 110" stroke={theme.palette.primary.main} strokeWidth="2" strokeLinecap="round" />
                <path d="M50 110 Q48 125 50 145 Q52 130 50 110" fill={theme.palette.warning.main} opacity="0.7" />
                <path d="M70 110 Q72 125 70 145 Q68 130 70 110" fill={theme.palette.warning.main} opacity="0.7" />
                <path d="M60 110 Q58 130 60 150 Q62 130 60 110" fill={theme.palette.warning.light} opacity="0.8" />
              </svg>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;