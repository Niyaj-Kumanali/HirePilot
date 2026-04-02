import { Play } from "lucide-react";
import Scanner from "../../Scanner/Scanner";
import VisualHeader from "../../VisualHeader/VisualHeader";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Button, useTheme, alpha } from '@mui/material';

const CTA = () => {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Light Grid Background */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.1)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.1)} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'grid', gap: 2, justifyItems: { xs: 'center', md: 'start' }, textAlign: { xs: 'center', md: 'left' } }}>
              <VisualHeader
                badge="Free for early adopters"
                title="Ready to land your"
                gradient_title="dream job?"
                subtitle="Master the art of the interview with AI feedback that's actually useful. No fluff, just results."
                align="left"
              />

              <Box sx={{ mt: 3 }}>
                <Link to="/jobs" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<Play size={18} fill="currentColor" />}
                    sx={{
                      py: 1.5,
                      px: 3.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      bgcolor: 'text.primary',
                      color: 'background.paper',
                      '&:hover': {
                        bgcolor: 'text.secondary',
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      }
                    }}
                  >
                    Get Started Now
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <Scanner />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CTA;