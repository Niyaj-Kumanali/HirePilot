import { X, Filter, RotateCcw, ChevronDown, Pin, PinOff, Check } from 'lucide-react';
import { useState, useMemo } from 'react';

interface FilterConfig {
  label: string;
  value: string;
  onChange: (value: string | number) => void;
  options: string[];
  icon: React.ComponentType<{ size: number }>;
}

interface JobsFiltersSidebarProps {
  filters: FilterConfig[];
  activeFilters: number;
  onReset: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  showFullContent: boolean;
  isLocked: boolean;
  toggleLock: () => void;
  expandAndLock: () => void;
  setIsHovered: (hovered: boolean) => void;
}

interface FilterDropdownProps extends Omit<FilterConfig, 'icon'> {
  icon: React.ComponentType<{ size: number }>;
  compact: boolean;
  onExpand: () => void;
  isOpen: boolean;
  onToggle: (label: string) => void;
}

const FilterDropdown = ({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  compact,
  onExpand,
  isOpen,
  onToggle,
}: FilterDropdownProps) => {
  const handleTriggerClick = () => {
    if (compact) {
      onExpand();
    } else {
      onToggle(label);
    }
  };

  const isActive = value !== '';

  const listItems = useMemo(
    () => [
      { option: '', label: `All ${label}s` },
      ...options.map((opt) => ({ option: opt, label: opt })),
    ],
    [options, label]
  );

  return (
    <div className="relative">
      <button
        onClick={handleTriggerClick}
        className={`
          w-full flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200
          ${compact ? 'justify-center px-2' : 'pl-[19px]'}
          ${isActive
            ? 'bg-primary/8 shadow-sm shadow-primary/5'
            : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
          }
        `}
      >
        <div className={`shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
          <Icon size={18} />
        </div>
        {!compact && (
          <>
            <div className="flex-1 text-left min-w-0 overflow-hidden">
              <div className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                {label}
              </div>
              {isActive && (
                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                  {value}
                </div>
              )}
            </div>
            <ChevronDown
              size={15}
              className={`shrink-0 transition-all duration-200 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`}
            />
          </>
        )}
      </button>

      {!compact && isOpen && (
        <div
          className="mt-1 p-1 rounded-xl border border-primary/15 bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-xl shadow-xl shadow-primary/5 overflow-hidden"
          style={{ scrollbarWidth: 'thin' }}
        >
          {listItems.map(({ option, label: itemLabel }) => (
            <button
              key={option || 'all'}
              onClick={() => {
                onChange(option);
                onToggle(label);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-150
                ${value === option
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                }
              `}
            >
              <span className="whitespace-nowrap">{itemLabel}</span>
              {value === option && <Check size={14} className="text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const JobsSidebar = ({
  filters,
  activeFilters,
  onReset,
  mobileOpen,
  onMobileClose,
  showFullContent,
  isLocked,
  toggleLock,
  expandAndLock,
  setIsHovered,
}: JobsFiltersSidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const sidebarContent = (
    <div className="min-h-[calc(100vh-70px)] flex flex-col">
      {/* Header */}
      <div className={`shrink-0 flex items-center px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.06] ${showFullContent ? 'justify-between' : 'justify-center'}`}>
        <div
          className="flex items-center gap-2 min-w-0 cursor-pointer"
          style={{ marginLeft: showFullContent ? '8px' : 0 }}
          onClick={toggleLock}
        >
          <div className="relative shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-md shadow-primary/20">
            <Filter size={16} strokeWidth={2.5} />
            {activeFilters > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#1a1d23] px-1">
                {activeFilters}
              </span>
            )}
          </div>
          {showFullContent && (
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
              Filters
            </span>
          )}
        </div>

        {showFullContent && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleLock}
              title={isLocked ? 'Unlock Sidebar' : 'Lock Sidebar'}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isLocked
                  ? 'text-primary bg-primary/10 hover:bg-primary/15'
                  : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              {isLocked ? <Pin size={14} /> : <PinOff size={14} />}
            </button>
          </div>
        )}

        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1">
        {filters.map((filter) => (
          <FilterDropdown
            key={filter.label}
            {...filter}
            compact={!showFullContent}
            onExpand={expandAndLock}
            isOpen={openDropdown === filter.label}
            onToggle={(label) => setOpenDropdown(openDropdown === label ? null : label)}
          />
        ))}
      </div>

      {/* Footer */}
      {showFullContent && (
        <div className="shrink-0 px-3 py-2.5 border-t border-black/[0.04] dark:border-white/[0.06]">
          <button
            onClick={onReset}
            disabled={activeFilters === 0}
            className={`
              w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold
              transition-all duration-200
              ${activeFilters > 0
                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/15 active:scale-[0.97]'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <RotateCcw size={14} />
            Clear All
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar — width controlled by PageLayout */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="min-h-[calc(100vh-70px)] rounded-b-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-xl shadow-lg shadow-black/[0.02] dark:shadow-black/[0.2] overflow-hidden"
      >
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="absolute left-0 top-0 h-full w-[300px] shadow-2xl animate-[slideDown_0.3s_ease-out]">
            <div className="h-full bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-xl border-r border-black/[0.04] dark:border-white/[0.06] overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobsSidebar;
