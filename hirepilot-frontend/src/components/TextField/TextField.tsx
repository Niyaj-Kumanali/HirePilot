import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const TextField = ({
  label,
  error,
  fullWidth = false,
  iconLeft,
  iconRight,
  className = '',
  disabled,
  id,
  ...props
}: TextFieldProps) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6] pointer-events-none">
            {iconLeft}
          </div>
        )}
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6]">
            {iconRight}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={[
            'w-full py-2.5 text-sm rounded-xl border outline-none transition-all duration-200',
            'bg-white dark:bg-[#1a1d23]',
            'text-[#202124] dark:text-[#e8eaed]',
            'placeholder:text-[#5f6368] dark:placeholder:text-[#9aa0a6]',
            iconLeft ? 'pl-10' : 'px-4',
            iconRight ? 'pr-10' : '',
            error
              ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
              : 'border-[#e0e0e0] dark:border-[#3c4043] focus:border-primary focus:shadow-[0_0_0_4px_rgba(168,85,247,0.1)]',
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#252830]',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextField;
