import type { ReactNode } from 'react';

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const PageTransition = ({ children, className = '', ...props }: PageTransitionProps) => {
  return (
    <div className={`w-full h-full animate-[fadeIn_400ms_ease-out] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default PageTransition;
