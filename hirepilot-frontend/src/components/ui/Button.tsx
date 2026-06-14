import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
}

const sizeClasses: Record<string, string> = {
    small: 'px-3 py-1.5 text-xs min-h-8',
    medium: 'px-5 py-2.5 text-sm min-h-10',
    large: 'px-6 py-3 text-base min-h-12',
};

const variantClasses: Record<string, string> = {
    primary:
        'bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0',
    secondary:
        'bg-transparent text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5',
    ghost:
        'bg-transparent text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/8',
    danger:
        'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white',
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    iconLeft,
    iconRight,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            className={[
                'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                sizeClasses[size],
                variantClasses[variant],
                fullWidth ? 'w-full' : '',
                className,
            ].join(' ')}
            {...props}
        >
            {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </button>
    );
};

export default Button;
