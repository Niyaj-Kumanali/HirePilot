interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) => {
  const base = 'animate-pulse bg-gray-200 dark:bg-[#2a2d35]';

  const variants: Record<string, string> = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={[base, variants[variant], className].join(' ')}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

export default Skeleton;
