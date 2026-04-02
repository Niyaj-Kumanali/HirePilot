import React, { useEffect } from 'react';
import { Target, Users, Zap, Shield, Rocket, Trophy } from 'lucide-react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import { Box, Container, Card, Stack, Typography, useTheme, alpha, keyframes } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
`;

const AboutUs: React.FC = () => {
    const theme = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background glows */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.1),
                    filter: 'blur(80px)',
                    animation: `${float} 8s ease-in-out infinite`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: alpha(theme.palette.secondary.main, 0.1),
                    filter: 'blur(80px)',
                    animation: `${floatReverse} 10s ease-in-out infinite`,
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
                {/* Header */}
                <Box sx={{ mb: 8 }}>
                    <VisualHeader
                        badge="Our Story"
                        title="Empowering Future"
                        gradient_title="Engineers"
                        subtitle="At HirePilot, we're building the most advanced AI-driven career acceleration platform for the next generation of developers."
                    />
                </Box>

                <Stack spacing={6}>
                    {/* Mission Section */}
                    <Card sx={{ p: 4, borderRadius: 3 }}>
                        <Stack spacing={2} alignItems="center" textAlign="center">
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'primary.main',
                                }}
                            >
                                <Target size={32} />
                            </Box>
                            <Typography variant="h4" fontWeight={700}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.7 }}>
                                We believe that every talented developer deserves their dream job.
                                Our mission is to bridge the gap between preparation and performance by providing
                                state-of-the-art AI tools for mock interviews, skill assessment, and personalized learning.
                            </Typography>
                        </Stack>
                    </Card>

                    {/* Stats Grid */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {[
                            { icon: Users, value: '10k+', label: 'Active Users' },
                            { icon: Rocket, value: '5k+', label: 'Interviews Conducted' },
                            { icon: Trophy, value: '2k+', label: 'Successful Placements' },
                        ].map(({ icon: Icon, value, label }, i) => (
                            <Card key={i} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                                <Stack spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 2,
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'primary.main',
                                        }}
                                    >
                                        <Icon size={28} />
                                    </Box>
                                    <Typography variant="h3" fontWeight={800} color="primary.main">
                                        {value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                        {label}
                                    </Typography>
                                </Stack>
                            </Card>
                        ))}
                    </Box>

                    {/* Features Section */}
                    <Box>
                        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 99,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                }}
                            >
                                The Advantage
                            </Typography>
                            <Typography variant="h4" fontWeight={700}>
                                Why Choose HirePilot?
                            </Typography>
                        </Stack>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            {[
                                {
                                    icon: Zap,
                                    title: 'AI-Powered Insights',
                                    description: 'Get real-time feedback on your interview performance with advanced AI analysis and behavioral mapping.',
                                },
                                {
                                    icon: Shield,
                                    title: 'Risk-Free Practice',
                                    description: 'Build confidence without pressure. Our mock interviews simulate real-world high-stakes scenarios.',
                                },
                                {
                                    icon: Rocket,
                                    title: 'Career Acceleration',
                                    description: 'Go from candidate to hire faster with our data-driven matching system and role-specific preparation.',
                                },
                            ].map(({ icon: Icon, title, description }, i) => (
                                <Card key={i} sx={{ p: 4, borderRadius: 3 }}>
                                    <Stack spacing={2}>
                                        <Icon size={24} color={theme.palette.primary.main} />
                                        <Typography variant="h6" fontWeight={700}>
                                            {title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                            {description}
                                        </Typography>
                                    </Stack>
                                </Card>
                            ))}
                        </Box>
                    </Box>

                    {/* Story Section */}
                    <Card sx={{ p: 4, borderRadius: 3 }}>
                        <Stack spacing={2} alignItems="center" textAlign="center">
                            <Typography variant="h4" fontWeight={700}>
                                The Inspiration
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, lineHeight: 1.7 }}>
                                HirePilot started as a simple idea: what if a developer could have an expert mentor available 24/7?
                                We saw brilliant minds struggling not with code, but with the pressure of high-stakes technical interviews.
                                By leveraging the latest in AI technology, we've built a platform that doesn't just test your skills—it helps you evolve them into a career.
                            </Typography>
                        </Stack>
                    </Card>
                </Stack>
            </Container>
        </Box>
    );
};

export default AboutUs;
