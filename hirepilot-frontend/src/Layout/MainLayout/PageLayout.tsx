import React from 'react';

interface PageLayoutProps {
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  sidebar,
  sidebarWidth = 72,
  children,
}) => {
  return (
    <main className="min-h-screen relative before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      <div className="relative z-1 pr-2 md:pr-2 lg:pr-2 pl-2 md:pl-0 lg:pl-0">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-start">
          {sidebar && (
            <div
              className="hidden lg:block sticky top-[70px] transition-[width] duration-200 ease-out-expo"
              style={{ width: sidebarWidth }}
            >
              {sidebar}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageLayout;
