import { Fade, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <Fade in={true} timeout={400}>
            <Box sx={{ width: '100%', height: '100%' }}>
                {children}
            </Box>
        </Fade>
    );
};

export default PageTransition;
