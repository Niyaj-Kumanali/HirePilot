import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  ...props
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const glassClasses =
    'bg-white/60 dark:bg-[#1a1d23]/60 backdrop-blur-[8px] border border-white/10 dark:border-white/5 shadow-sm';

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-2 p-1 ${className}`}
      {...props}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={[
          'w-12 h-12 rounded-xl flex items-center justify-center',
          glassClasses,
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'hover:bg-white dark:hover:bg-[#1a1d23] hover:border-primary hover:text-primary hover:shadow-md hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0',
          'text-[#5f6368] dark:text-[#9aa0a6]',
        ].join(' ')}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        className={[
          'flex items-center gap-1 p-0.75 rounded-2xl',
          glassClasses,
          'bg-white/40 dark:bg-[#1a1d23]/40 backdrop-blur-[4px]',
        ].join(' ')}
      >
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={[
              'min-w-10 w-10 h-10 rounded-[10px] p-0 font-bold text-sm',
              'transition-all duration-200',
              currentPage === page
                ? 'bg-primary text-white shadow-[0_4px_12px_rgba(168,85,247,0.3)] hover:bg-primary-dark'
                : 'bg-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary',
            ].join(' ')}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={[
          'w-12 h-12 rounded-xl flex items-center justify-center',
          glassClasses,
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'hover:bg-white dark:hover:bg-[#1a1d23] hover:border-primary hover:text-primary hover:shadow-md hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0',
          'text-[#5f6368] dark:text-[#9aa0a6]',
        ].join(' ')}
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;
