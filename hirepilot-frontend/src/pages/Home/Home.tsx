import { Box, Fade } from "@mui/material";
import CTA from "../../components/Sections/CTA/CTA";
import Features from "../../components/Sections/Features/Features";
import Hero from "../../components/Sections/Hero/Hero";
import HowItWorks from "../../components/Sections/HowItWorks/HowItWorks";
import TrainingTracks from "../../components/Sections/TrainingTracks/TrainingTracks";

/**
 * The Landing Page of the application.
 * 
 * Features a sequence of animated sections (Hero, HowItWorks, Features, etc.) 
 * to introduce users to the platform's value proposition.
 */
const Home = () => {
  return (
    <Box
      className="home-page"
      sx={{
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <Fade in={true} timeout={800}><Box><Hero /></Box></Fade>
      <Fade in={true} timeout={1000}><Box><HowItWorks /></Box></Fade>
      <Fade in={true} timeout={1200}><Box><Features /></Box></Fade>
      <Fade in={true} timeout={1400}><Box><TrainingTracks /></Box></Fade>
      <Fade in={true} timeout={1600}><Box><CTA /></Box></Fade>
    </Box>
  );
};

export default Home;
