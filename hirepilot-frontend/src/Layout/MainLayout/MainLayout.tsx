import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PageTransition from '../../components/PageTransition/PageTransition';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col min-h-[calc(100vh-70px)] pb-6">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
