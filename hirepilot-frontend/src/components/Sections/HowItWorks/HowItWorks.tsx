import { Search, BrainCircuit, BarChartHorizontal, CheckCircle } from "lucide-react";
import VisualHeader from "../../VisualHeader/VisualHeader";
import HIWCard from "./HIWCard/HIWCard";
import { Box, Container, Grid } from '@mui/material';

const steps = [
  {
    step: "01",
    title: "Browse & Choose",
    desc: "Explore jobs and select roles that match your career goals. Get instant readiness scores.",
    Icon: <Search size={28} />,
  },
  {
    step: "02",
    title: "Train with AI",
    desc: "Practice with AI-powered mock interviews tailored to your target role and experience level.",
    Icon: <BrainCircuit size={28} />,
  },
  {
    step: "03",
    title: "Get Insights",
    desc: "Receive detailed feedback on your performance, skill gaps, and areas to improve.",
    Icon: <BarChartHorizontal size={28} />,
  },
  {
    step: "04",
    title: "Apply with Confidence",
    desc: "Once you're interview-ready, apply to jobs knowing you're prepared to succeed.",
    Icon: <CheckCircle size={28} />,
  },
];

/**
 * "How It Works" section explaining the 4-step user journey.
 * 
 * Uses `HIWCard` to display each step (Browse, Train, Insights, apply).
 * Animates as a responsive grid of steps.
 */
const HowItWorks = () => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 4 }, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <VisualHeader
            badge="The Process"
            title="Your Journey to get"
            gradient_title="Hired"
            subtitle="A simple, structured approach to mastering the interview process and landing your dream job."
          />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.step} sx={{ display: 'flex' }}>
              <HIWCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;