import CTA from "../../components/Sections/CTA/CTA";
import Features from "../../components/Sections/Features/Features";
import Hero from "../../components/Sections/Hero/Hero";
import HowItWorks from "../../components/Sections/HowItWorks/HowItWorks";
import TrainingTracks from "../../components/Sections/TrainingTracks/TrainingTracks";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div><Hero /></div>
      <div><HowItWorks /></div>
      <div><Features /></div>
      <div><TrainingTracks /></div>
      <div><CTA /></div>
    </div>
  );
};

export default Home;
