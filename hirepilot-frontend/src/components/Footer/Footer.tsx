import React, { useMemo } from 'react';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Stack,
    IconButton,
    Divider,
    useTheme,
    alpha,
    Tooltip,
} from '@mui/material';
import Logo from '../Logo/Logo';

interface SocialLink {
    icon: React.ComponentType<{ size: number }>;
    label: string;
    to: string;
}

interface FooterLink {
    label: string;
    to: string;
}

const SOCIAL_LINKS: SocialLink[] = [
    { icon: Linkedin, label: 'LinkedIn', to: 'https://linkedin.com/in/nawaj-kumanali' },
    { icon: Github, label: 'GitHub', to: 'https://github.com/nawaz-kumanali' },
];

const PLATFORM_LINKS: FooterLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Job Board', to: '/jobs' },
    { label: 'Mock Prep', to: '/interview' },
    { label: 'About Us', to: '/about' },
];

const LEGAL_LINKS: FooterLink[] = [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
];

const CONTACT_INFO = {
    email: 'iamnawazahmad777@gmail.com',
    location: 'Nipani, Karnataka, India',
};

const BRAND_DESCRIPTION =
    'The ultimate companion for modern developers. Practice, prepare, and land your dream job with AI-driven mock interviews.';

/**
 * Global application footer.
 * 
 * Contains brand information, platform navigation links, 
 * legal disclaimers, contact info, and social media connectivity.
 * Features a theme-aware gradient top border and glassmorphic social buttons.
 */
const Footer: React.FC = () => {
    const theme = useTheme();

    const linkStyles = useMemo(
        () => ({
            position: 'relative',
            display: 'inline-block',
            width: 'fit-content',
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            transition: 'all 0.2s ease',

            '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -2,
                width: 0,
                height: 2,
                backgroundColor: theme.palette.primary.main,
                transition: 'width 0.25s ease',
            },

            '&:hover': {
                color: theme.palette.primary.main,
            },

            '&:hover::after': {
                width: '100%',
            },
        }),
        [theme]
    );


    const socialButtonStyles = useMemo(
        () => ({
            border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.background.default, 0.6),
            backdropFilter: 'blur(6px)',
            transition: 'all 0.3s ease',

            '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: 'translateY(-3px)',
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
        }),
        [theme]
    );

    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'background.paper',
                borderTop: `1px solid ${theme.palette.divider}`,
                py: { xs: 5, md: 8 },
                mt: 'auto',

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: `linear-gradient(to bottom, ${alpha(
                        theme.palette.primary.main,
                        0.05
                    )}, transparent)`,
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 4, md: 6 }}>
                    {/* Brand Section */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Stack spacing={2}>
                            <Logo />

                            <Box
                                sx={{
                                    width: 40,
                                    height: 4,
                                    borderRadius: 2,
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    maxWidth: 360,
                                    lineHeight: 1.7,
                                    color: 'text.secondary',
                                }}
                            >
                                {BRAND_DESCRIPTION}
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                {SOCIAL_LINKS.map(({ icon: Icon, label, to }) => (
                                    <Tooltip key={label} title={label} arrow>
                                        <IconButton
                                            component="a"
                                            href={to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            sx={{
                                                ...socialButtonStyles,
                                                width: 40,
                                                height: 40,
                                            }}
                                        >
                                            <Icon size={16} />
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Platform */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <Stack spacing={2}>
                            <Typography
                                variant="overline"
                                sx={{
                                    letterSpacing: 1.5,
                                    fontWeight: 700,
                                    color: 'text.secondary',
                                }}
                            >
                                PLATFORM
                            </Typography>

                            <Stack spacing={1.5}>
                                {PLATFORM_LINKS.map(({ label, to }) => (
                                    <Link
                                        key={label}
                                        component={RouterLink}
                                        to={to}
                                        variant="body2"
                                        sx={linkStyles}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Stack spacing={2}>
                            <Typography
                                variant="overline"
                                sx={{
                                    letterSpacing: 1.5,
                                    fontWeight: 700,
                                    color: 'text.secondary',
                                }}
                            >
                                CONTACT
                            </Typography>

                            <Stack spacing={2}>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <Mail size={16} />
                                    <Link
                                        href={`mailto:${CONTACT_INFO.email}`}
                                        variant="body2"
                                        sx={{ ...linkStyles, wordBreak: 'break-all' }}
                                    >
                                        {CONTACT_INFO.email}
                                    </Link>
                                </Stack>

                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <MapPin size={16} />
                                    <Typography variant="body2" color="text.secondary">
                                        {CONTACT_INFO.location}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 5, opacity: 0.4 }} />

                {/* Bottom Section */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                >
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} HirePilot.
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        {LEGAL_LINKS.map(({ label, to }) => (
                            <Link
                                key={label}
                                component={RouterLink}
                                to={to}
                                variant="caption"
                                sx={linkStyles}
                            >
                                {label}
                            </Link>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
