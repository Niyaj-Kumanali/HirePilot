import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select...',
  error,
  fullWidth = false,
  className = '',
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          'w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm rounded-xl border outline-none transition-all duration-200',
          'bg-white dark:bg-[#1a1d23]',
          error
            ? 'border-red-500'
            : 'border-[#e0e0e0] dark:border-[#3c4043] hover:border-primary',
          open && !error && 'border-primary shadow-[0_0_0_4px_rgba(168,85,247,0.1)]',
          selected ? 'text-[#202124] dark:text-[#e8eaed]' : 'text-[#5f6368] dark:text-[#9aa0a6]',
        ].join(' ')}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} text-[#5f6368] dark:text-[#9aa0a6]`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 max-h-60 overflow-y-auto rounded-xl border border-primary/20 bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-xl shadow-xl shadow-primary/5 py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={[
                'w-full text-left px-4 py-2 text-sm transition-all duration-150',
                value === opt.value
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary/8',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;
