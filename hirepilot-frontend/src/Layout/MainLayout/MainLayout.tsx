import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PageTransition from '../../components/ui/PageTransition';
import Skeleton from '../../components/ui/Skeleton';

const PageFallback = () => (
  <div className="w-full max-w-7xl mx-auto px-4 py-10 space-y-6">
    <div className="text-center space-y-3 mb-8">
      <Skeleton variant="rounded" width={140} height={28} className="mx-auto" />
      <Skeleton variant="text" width="50%" height={40} className="mx-auto" />
      <Skeleton variant="text" width="35%" height={20} className="mx-auto" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
      <Skeleton variant="rounded" width={72} height={400} />
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} variant="rounded" width="100%" height={180} />
        ))}
      </div>
    </div>
  </div>
);

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col min-h-[calc(100vh-70px)] pb-8">
                <Suspense fallback={<PageFallback />}>
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
