const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-1" />
      <div
        className="absolute top-[15%] right-[15%] w-[250px] h-[250px] rounded-full pointer-events-none opacity-10 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatAround 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[20%] left-[8%] w-[180px] h-[180px] rounded-full pointer-events-none opacity-10 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatAroundReverse 8s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
    </>
  );
};

export default HeroBackground;
