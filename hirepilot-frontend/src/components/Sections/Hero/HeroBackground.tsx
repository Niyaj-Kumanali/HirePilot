const HeroBackground = () => {
    return (
        <>
            <div className="absolute inset-0 pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-1" />
            <div
                className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(168,85,247,0.05)',
                    animation: 'floatAround 6s ease-in-out infinite',
                }}
            />
            <div
                className="absolute bottom-[15%] left-[5%] w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(168,85,247,0.05)',
                    animation: 'floatAroundReverse 8s ease-in-out infinite',
                    animationDelay: '1s',
                }}
            />
        </>
    );
};

export default HeroBackground;
