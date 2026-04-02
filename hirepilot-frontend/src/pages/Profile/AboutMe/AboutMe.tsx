import React from 'react';
import { User } from 'lucide-react';
import { Card, Stack, Typography, useTheme } from '@mui/material';

interface AboutMeProps {
    bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ bio }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <User size={22} color={theme.palette.primary.main} />
                <Typography variant="h5" fontWeight={700}>
                    About Me
                </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {bio || 'Passionately developing high-impact software solutions with a focus on modern web technologies.'}
            </Typography>
        </Card>
    );
};

export default AboutMe;
