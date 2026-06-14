import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, ...props }) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={[
        'relative overflow-hidden rounded-[20px] border p-6',
        'bg-white/70 dark:bg-[#1a1d23]/70',
        'backdrop-blur-[12px]',
        'border-white/60 dark:border-white/10',
        'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isClickable
          ? 'cursor-pointer hover:-translate-y-1 hover:bg-white dark:hover:bg-[#1a1d23] hover:border-primary hover:shadow-lg'
          : 'cursor-default',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
