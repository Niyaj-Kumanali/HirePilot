import React, { useEffect } from 'react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import { Box, Container, Card, Stack, Typography, Link as MuiLink, useTheme, alpha, keyframes } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, 15px); }
`;

const PrivacyPolicy: React.FC = () => {
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
                    top: '15%',
                    right: '10%',
                    width: 350,
                    height: 350,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    filter: 'blur(80px)',
                    animation: `${float} 10s ease-in-out infinite`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: alpha(theme.palette.secondary.main, 0.08),
                    filter: 'blur(80px)',
                    animation: `${float} 12s ease-in-out infinite`,
                    animationDelay: '1s',
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', py: 8 }}>
                <Box sx={{ mb: 6 }}>
                    <VisualHeader
                        badge="Legal"
                        title="Privacy"
                        gradient_title="Policy"
                        subtitle="Learn how we protect and manage your data at HirePilot."
                    />
                </Box>

                <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                    <Stack spacing={4}>
                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                1. Introduction
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Welcome to HirePilot. We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                2. Information We Collect
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                We collect personal information that you provide to us such as name, email address, and professional background when you register on the platform.
                                We also collect data through your interactions with our AI tools, and mock interviews to improve your experience.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                3. How We Use Your Information
                            </Typography>
                            <Stack component="ul" spacing={1} sx={{ pl: 3 }}>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    To provide and maintain our Service.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    To notify you about changes to our Service.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    To provide AI-driven feedback on your interview performance.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    To monitor the usage of our Service and detect technical issues.
                                </Typography>
                            </Stack>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                4. Data Security
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                5. Your Privacy Rights
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your personal information directly within your account settings section.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                6. Contact Us
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                If you have any questions about this Privacy Policy, please contact us at:{' '}
                                <MuiLink href="mailto:iamnawazahmad777@gmail.com" color="primary.main" fontWeight={600}>
                                    iamnawazahmad777@gmail.com
                                </MuiLink>
                            </Typography>
                        </Box>
                    </Stack>
                </Card>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
