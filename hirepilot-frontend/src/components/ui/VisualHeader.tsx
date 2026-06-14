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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 text-[0.8rem] font-bold text-primary shadow-card mb-4 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {badge}
        </div>
      )}

      <h2 className="font-extrabold text-[#202124] dark:text-[#e8eaed] mb-3 tracking-tight leading-[1.1] text-[3rem] md:text-[3.5rem] lg:text-[4rem]">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className="text-[#5f6368] dark:text-[#9aa0a6] text-[1.2rem] md:text-[1.1rem] lg:text-[1rem] leading-relaxed max-w-[900px] mb-3"
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
