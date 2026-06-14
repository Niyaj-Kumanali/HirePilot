import React from 'react';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  color?: string;
  height?: string | number;
  showLabel?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#a855f7',
  height = 6,
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-bold text-[#5f6368] dark:text-[#9aa0a6]">
              {label}
            </span>
          )}
          <span className="text-sm font-bold text-[#202124] dark:text-[#e8eaed]">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height,
          backgroundColor: 'var(--progress-track, rgba(0,0,0,0.08))',
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
