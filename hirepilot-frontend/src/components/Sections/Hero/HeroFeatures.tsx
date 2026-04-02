import { Stack, Box, Typography, useTheme } from "@mui/material";
import { BrainCircuit, TrendingUp, CheckCircle } from "lucide-react";

const FEATURES = [
    { icon: BrainCircuit, text: 'AI Mock Interviews' },
    { icon: TrendingUp, text: 'Skill Gap Analysis' },
    { icon: CheckCircle, text: 'Readiness Scoring' }
];

const HeroFeatures = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            sx={{ mb: 5 }}
        >
            {FEATURES.map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                        color: 'text.primary'
                    }}
                >
                    <feature.icon size={20} color={theme.palette.warning.main} />
                    <Typography variant="body1" fontWeight={600}>
                        {feature.text}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
};

export default HeroFeatures;
