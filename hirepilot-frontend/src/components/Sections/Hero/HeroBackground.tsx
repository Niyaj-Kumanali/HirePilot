const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 dark:opacity-[0.03] opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div
        className="absolute top-[12%] right-[8%] w-[320px] h-[320px] rounded-full pointer-events-none opacity-15 dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'floatAround 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[18%] left-[5%] w-[220px] h-[220px] rounded-full pointer-events-none opacity-10 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatAroundReverse 10s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      />
      <div
        className="absolute top-[40%] left-[20%] w-[140px] h-[140px] rounded-full pointer-events-none opacity-8 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'floatAround 12s ease-in-out infinite',
          animationDelay: '0.8s',
        }}
      />
    </>
  );
};

export default HeroBackground;
