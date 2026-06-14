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
        'bg-white/80 dark:bg-[#1a1d23]/80',
        'backdrop-blur-md',
        'border-white/60 dark:border-white/10',
        'shadow-card',
        'transition-all duration-300 ease-out-expo',
        isClickable
          ? 'cursor-pointer hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-[#1a1d23]/90 hover:border-primary/30 hover:shadow-card-hover'
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
