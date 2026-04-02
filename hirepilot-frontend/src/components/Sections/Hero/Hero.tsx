import { alpha, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import HeroBackground from './HeroBackground';
import HeroHeader from './HeroHeader';
import HeroFeatures from './HeroFeatures';

/**
 * The Hero section of the landing page.
 * 
 * Includes a visually rich animated background, introductory header, 
 * and high-level feature highlights. Uses complex MUI styling and 
 * Framer Motion-inspired CSS animations.
 */
const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const heroStyles = useMemo(
    () => ({
      position: 'relative',
      minHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.4)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 50%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`
        : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 50%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
      backdropFilter: 'blur(1px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(0deg, ${alpha(theme.palette.background.paper, 0.3)} 0%, transparent 50%, ${alpha(theme.palette.background.paper, 0.3)} 100%)`,
        pointerEvents: 'none',
        zIndex: 0,
      },
    }),
    [theme, isMobile]
  );

  const containerStyles = useMemo(
    () => ({
      position: 'relative',
      zIndex: 1,
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 4, sm: 5, md: 8 },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    []
  );

  const contentWrapperStyles = useMemo(
    () => ({
      textAlign: 'center',
      width: '100%',
      animation: 'fadeInUp 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      '@keyframes fadeInUp': {
        from: {
          opacity: 0,
          transform: 'translateY(40px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      '& > *:nth-of-type(1)': {
        animation: 'fadeInUp 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards',
        opacity: 0,
      },
      '& > *:nth-of-type(2)': {
        animation: 'fadeInUp 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards',
        opacity: 0,
      },
    }),
    []
  );

  // Decorative elements
  const decorativeBoxStyles = useMemo(
    () => ({
      position: 'absolute',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 0,
    }),
    []
  );

  return (
    <Box
      component="section"
      aria-label="Hero section"
      role="region"
      sx={heroStyles}
    >
      {/* Decorative Blobs */}
      <Box
        sx={{
          ...decorativeBoxStyles,
          top: '10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />
      <Box
        sx={{
          ...decorativeBoxStyles,
          bottom: '-5%',
          left: '-15%',
          width: '350px',
          height: '350px',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />

      {/* Background Layer */}
      <HeroBackground />

      {/* Content Layer */}
      <Container maxWidth="lg" sx={containerStyles}>
        <Box sx={contentWrapperStyles}>
          <HeroHeader />
          <HeroFeatures />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;