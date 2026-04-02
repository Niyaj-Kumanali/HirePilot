import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroHeader = () => {
    return (
        <Box sx={{ mb: 4 }}>
            {/* Main headline */}
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.1,
                    color: 'text.primary',
                }}
            >
                Train Smarter.
                <br />
                Interview Better.
            </Typography>

            {/* Subheadline */}
            <Typography
                variant="h2"
                sx={{
                    fontSize: { xs: '1rem', md: '1.25rem', lg: '1.4rem' },
                    maxWidth: 700,
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.6,
                    color: 'text.secondary',
                    fontWeight: 400,
                }}
            >
                Master your next interview with AI-powered mock sessions, real-time
                feedback, and personalized training paths
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6, flexWrap: 'wrap' }}>
                <Button
                    component={Link}
                    to="/jobs"
                    variant="outlined"
                    size="large"
                    sx={{
                        py: 1,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 50,
                        borderWidth: 1.5,
                        borderColor: 'primary.main',
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: 'primary.main',
                            borderWidth: 1.5,
                        }
                    }}
                >
                    Browse Jobs
                </Button>
            </Box>

            {/* Social proof */}
            <Typography variant="body1" color="text.secondary">
                Join <Box component="span" fontWeight={800} color="text.primary">10,000+</Box> candidates who've improved their
                interview skills
            </Typography>
        </Box>
    );
};

export default HeroHeader;
