import CTA from "../../components/Sections/CTA/CTA";
import Features from "../../components/Sections/Features/Features";
import Hero from "../../components/Sections/Hero/Hero";
import HowItWorks from "../../components/Sections/HowItWorks/HowItWorks";
import TrainingTracks from "../../components/Sections/TrainingTracks/TrainingTracks";

const SECTION_BG_EVEN = "bg-primary/[0.02] dark:bg-white/[0.015]";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <div className={SECTION_BG_EVEN}><HowItWorks /></div>
      <div><Features /></div>
      <div className={SECTION_BG_EVEN}><TrainingTracks /></div>
      <div><CTA /></div>
    </div>
  );
};

export default Home;
