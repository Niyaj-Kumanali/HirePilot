import React from 'react';

interface VisualHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: React.CSSProperties['textAlign'];
}

const VisualHeader: React.FC<VisualHeaderProps> = ({
  badge,
  title,
  highlight,
  subtitle = '',
  align = 'center',
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`} style={{ textAlign: align }} {...props}>
      {badge && (
        <div
          className={[
            'inline-flex items-center gap-1',
            'px-2.25 py-1 rounded-full',
            'bg-white dark:bg-[#1a1d23]',
            'border border-[#e0e0e0] dark:border-[#3c4043]',
            'text-[0.85rem] font-bold text-primary',
            'mb-4 uppercase',
            'shadow-button',
            'animate-[slideDown_0.6s_ease-out]',
          ].join(' ')}
        >
          <span
            className="w-2 h-2 rounded-full bg-primary mr-0.5"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          />
          {badge}
        </div>
      )}

      <h2
        className={[
          'font-extrabold text-[#202124] dark:text-[#e8eaed]',
          'mb-3 tracking-tight leading-[1.1]',
          'text-[3rem] md:text-[3.5rem] lg:text-[4rem]',
          'animate-[slideDown_0.6s_ease-out]',
        ].join(' ')}
      >
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={[
            'text-[#5f6368] dark:text-[#9aa0a6]',
            'text-[1.2rem] md:text-[1.1rem] lg:text-[1rem]',
            'leading-relaxed max-w-[900px]',
            'mb-3',
            'animate-[slideDown_0.6s_ease-out]',
          ].join(' ')}
          style={{
            marginLeft: align === 'center' ? 'auto' : 0,
            marginRight: align === 'center' ? 'auto' : 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default VisualHeader;
