import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  iconLeft?: React.ReactElement;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary:
    'bg-[#f0f0f0] dark:bg-[#2a2d35] text-[#5f6368] dark:text-[#9aa0a6] border border-[#e0e0e0] dark:border-[#3c4043]',
  outline: 'bg-transparent text-primary border border-primary',
  ghost: 'bg-transparent text-[#5f6368] dark:text-[#9aa0a6]',
  success: 'bg-[#e6f4ea] dark:bg-[#1e3525] text-[#1e7e34] dark:text-[#81c995]',
  warning: 'bg-[#fef7e0] dark:bg-[#332a1a] text-[#e37400] dark:text-[#fdd663]',
  danger: 'bg-[#fce8e6] dark:bg-[#3c1f1f] text-[#c5221f] dark:text-[#f28b82]',
  info: 'bg-[#e8f0fe] dark:bg-[#1a2a3d] text-[#1967d2] dark:text-[#8ab4f8]',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  iconLeft,
  className = '',
  onClick,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'h-6 text-[0.7rem]' : 'h-8 text-[0.8rem]';

  return (
    <span
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 font-bold rounded-full px-2.5 select-none',
        sizeClass,
        variantClasses[variant] || variantClasses.secondary,
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {children}
    </span>
  );
};

export default Badge;
