import CTA from "../../components/Sections/CTA/CTA";
import Features from "../../components/Sections/Features/Features";
import Hero from "../../components/Sections/Hero/Hero";
import HowItWorks from "../../components/Sections/HowItWorks/HowItWorks";
import TrainingTracks from "../../components/Sections/TrainingTracks/TrainingTracks";
import { motion, type Variants } from "framer-motion";
import "./home.scss";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Home = () => {
  return (
    <motion.div
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants}><Hero /></motion.div>
      <motion.div variants={itemVariants}><HowItWorks /></motion.div>
      <motion.div variants={itemVariants}><Features /></motion.div>
      <motion.div variants={itemVariants}><TrainingTracks /></motion.div>
      <motion.div variants={itemVariants}><CTA /></motion.div>
    </motion.div>
  );
};

export default Home;
