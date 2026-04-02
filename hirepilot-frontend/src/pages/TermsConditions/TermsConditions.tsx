import React, { useEffect } from 'react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import { Box, Container, Card, Stack, Typography, useTheme, alpha, keyframes } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, 15px); }
`;

const TermsConditions: React.FC = () => {
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
                        title="Terms &"
                        gradient_title="Conditions"
                        subtitle="Understanding our agreement and the rules of the HirePilot platform."
                    />
                </Box>

                <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                    <Stack spacing={4}>
                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                1. Agreement to Terms
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                By accessing or using HirePilot, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                2. Use License
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                                Permission is granted to temporarily use the materials (information or software) on HirePilot's website for personal, non-commercial transitory viewing only.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
                                This is the grant of a license, not a transfer of title, and under this license you may not:
                            </Typography>
                            <Stack component="ul" spacing={1} sx={{ pl: 3 }}>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    Modify or copy the materials.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    Use the materials for any commercial purpose.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    Attempt to decompile or reverse engineer any software contained on HirePilot.
                                </Typography>
                                <Typography component="li" variant="body1" color="text.secondary">
                                    Remove any copyright or other proprietary notations from the materials.
                                </Typography>
                            </Stack>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                3. Disclaimer
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                The materials on HirePilot are provided on an 'as is' basis. HirePilot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                4. Limitations
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                In no event shall HirePilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HirePilot.
                            </Typography>
                        </Box>

                        <Box component="section">
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                5. Governing Law
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                These terms and conditions are governed by and construed in accordance with the laws of Karnataka, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </Typography>
                        </Box>
                    </Stack>
                </Card>
            </Container>
        </Box>
    );
};

export default TermsConditions;
