import HeroBackground from './HeroBackground';
import HeroHeader from './HeroHeader';
import HeroFeatures from './HeroFeatures';

const Hero = () => {
  return (
    <section
      aria-label="Hero section"
      role="region"
      className="
        relative min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]
        flex items-center justify-center overflow-hidden
        bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0%,rgba(168,85,247,0.08)_50%,rgba(255,255,255,0.6)_100%)]
        dark:bg-[linear-gradient(135deg,rgba(15,23,42,1)_0%,rgba(15,23,42,1)_50%,rgba(15,23,42,1)_100%)]
        backdrop-blur-[1px]
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05)_0%,transparent_50%)]
        before:dark:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1)_0%,transparent_50%)]
        before:pointer-events-none before:z-0
        after:absolute after:inset-0
        after:bg-[linear-gradient(0deg,rgba(255,255,255,0.3)_0%,transparent_50%,rgba(255,255,255,0.3)_100%)]
        after:dark:bg-[linear-gradient(0deg,rgba(15,23,42,0.3)_0%,transparent_50%,rgba(15,23,42,0.3)_100%)]
        after:pointer-events-none after:z-0
      "
    >
      {/* Decorative Blobs */}
      <div
        className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute bottom-[-5%] left-[-15%] w-[350px] h-[350px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />

      {/* Background Layer */}
      <HeroBackground />

      {/* Content Layer */}
      <div className="relative z-1 mx-auto w-full max-w-7xl px-2 sm:px-3 md:px-4 py-4 sm:py-5 md:py-8 flex flex-col items-center">
        <div className="text-center w-full animate-[fadeInUp_0.9s_cubic-bezier(0.4,0,0.2,1)_forwards]">
          <div className="[&:nth-child(1)]:animate-[fadeInUp_0.9s_cubic-bezier(0.4,0,0.2,1)_0.1s_forwards] [&:nth-child(1)]:opacity-0">
            <HeroHeader />
          </div>
          <div className="[&:nth-child(2)]:animate-[fadeInUp_0.9s_cubic-bezier(0.4,0,0.2,1)_0.3s_forwards] [&:nth-child(2)]:opacity-0">
            <HeroFeatures />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
