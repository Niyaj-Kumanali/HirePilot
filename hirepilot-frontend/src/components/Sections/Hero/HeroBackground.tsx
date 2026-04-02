import { Box, keyframes, alpha, useTheme } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
`;

const HeroBackground = () => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 200,
                pointerEvents: 'none',
                zIndex: 1,
            }} />
            {/* Animated background elements */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.05),
                pointerEvents: 'none',
                animation: `${float} 6s ease-in-out infinite`,
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '15%',
                left: '5%',
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.05),
                pointerEvents: 'none',
                animation: `${floatReverse} 8s ease-in-out infinite`,
                animationDelay: '1s',
            }} />
        </>
    );
};

export default HeroBackground;
