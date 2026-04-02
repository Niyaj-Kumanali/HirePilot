import { Outlet, useLocation } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PageTransition from '../../components/PageTransition/PageTransition';

/**
 * The primary layout wrapper for the application.
 * 
 * Features:
 * - Persistent Navbar and Footer
 * - Integrated PageTransition using Framer Motion
 * - Flexbox stack to ensure footer stays at bottom
 * - Adaptive main content height
 */
const MainLayout = () => {
    const location = useLocation();

    return (
        <Stack sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 70px)'
            }}>
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </Box>
            <Footer />
        </Stack>
    );
};

export default MainLayout;
