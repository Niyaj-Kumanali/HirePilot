import HeroBackground from './HeroBackground';
import HeroHeader from './HeroHeader';

const Hero = () => {
  return (
    <section
      aria-label="Hero section"
      role="region"
      className="
        min-h-[calc(100vh-70px)]
        flex items-center py-12 md:py-8
        relative overflow-hidden
      "
    >
      <HeroBackground />

      <div className="mx-auto w-full max-w-7xl px-4 relative z-1 flex flex-col items-center">
        <HeroHeader />
      </div>
    </section>
  );
};

export default Hero;
