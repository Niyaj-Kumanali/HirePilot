interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<string, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-10 h-10 border-4',
};

const Spinner = ({ size = 'md', className = '', ...props }: SpinnerProps) => {
  return (
    <div
      className={[
        'rounded-full border-[#e0e0e0] dark:border-[#3c4043] border-t-primary animate-spin',
        sizeMap[size],
        className,
      ].join(' ')}
      {...props}
    />
  );
};

export default Spinner;
