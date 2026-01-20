import { X, Filter, RotateCcw, ChevronDown, Briefcase, TrendingUp, MapPin, Pin, PinOff } from 'lucide-react';
import './JobsSidebar.scss';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobsFiltersSidebarProps {
  jobTypes: string[];
  jobLevels: string[];
  locations: string[];
  filterType: string;
  filterLevel: string;
  filterLocation: string;
  onFilterTypeChange: (value: string) => void;
  onFilterLevelChange: (value: string) => void;
  onFilterLocationChange: (value: string) => void;
  onReset: () => void;
  activeFilters: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const JobsSidebar = ({
  jobTypes,
  jobLevels,
  locations,
  filterType,
  filterLevel,
  filterLocation,
  onFilterTypeChange,
  onFilterLevelChange,
  onFilterLocationChange,
  onReset,
  activeFilters,
  mobileOpen,
  onMobileClose,
}: JobsFiltersSidebarProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => setIsLocked(!isLocked);
  const expandAndLock = () => setIsLocked(true);

  const showFullContent = isHovered || isLocked || mobileOpen;

  return (
    <div
      className="jobs-sidebar-outer-wrapper"
      ref={menuRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile Backdrop */}
      <div
        className={`jobs-sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <motion.aside
        className={`jobs-filter-sidebar ${mobileOpen ? 'open' : ''} ${showFullContent ? 'expanded' : 'collapsed'}`}
        role="complementary"
        aria-label="Job Filters"
        initial={false}
        animate={{
          width: showFullContent ? 320 : 80,
        }}
        transition={{
          type: 'tween',
          ease: [0.4, 0, 0.2, 1],
          duration: 0.35
        }}
      >
        {/* Header */}
        <div className="jobs-filter-header">
          <div className="jobs-filter-title" onClick={toggleLock} style={{ cursor: 'pointer' }}>
            <div className="jobs-filter-icon-box">
              <Filter size={22} strokeWidth={2.5} />
            </div>
            <AnimatePresence>
              {showFullContent && (
                <motion.div
                  className="jobs-filter-title-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <span className="jobs-filter-title-main">Filters</span>
                  {activeFilters > 0 && (
                    <span className="jobs-filter-count">
                      {activeFilters} selected
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showFullContent && (
              <motion.div
                className="header-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  className={`lock-btn ${isLocked ? 'active' : ''}`}
                  onClick={toggleLock}
                  title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
                >
                  {isLocked ? <Pin size={18} /> : <PinOff size={18} />}
                </button>
                <button
                  className="jobs-close-mobile-btn"
                  onClick={onMobileClose}
                  aria-label="Close filters"
                  type="button"
                >
                  <X size={22} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="jobs-filter-body">
          <FilterDropdown
            label="Job Type"
            activeValue={filterType}
            onChange={onFilterTypeChange}
            options={jobTypes}
            icon={<Briefcase size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />

          <FilterDropdown
            label="Experience Level"
            activeValue={filterLevel}
            onChange={onFilterLevelChange}
            options={jobLevels}
            icon={<TrendingUp size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />

          <FilterDropdown
            label="Location"
            activeValue={filterLocation}
            onChange={onFilterLocationChange}
            options={locations}
            icon={<MapPin size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />
        </div>

        {/* Footer */}
        <AnimatePresence>
          {showFullContent && (
            <motion.div
              className="jobs-filter-footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <button
                className={`jobs-reset-btn ${activeFilters === 0 ? 'disabled' : ''}`}
                onClick={onReset}
                disabled={activeFilters === 0}
                type="button"
                aria-label="Clear all filters"
              >
                <RotateCcw size={16} />
                <span>Clear All</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  activeValue: string;
  onChange: (value: string) => void;
  options: string[];
  icon: React.ReactNode;
  compact: boolean;
  onExpand: () => void;
}

const FilterDropdown = ({
  label,
  activeValue,
  onChange,
  options,
  icon,
  compact,
  onExpand
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (compact) {
      onExpand();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const selectedLabel = activeValue || `All ${label}s`;

  return (
    <div className={`jobs-filter-dropdown ${compact ? 'compact' : ''}`} ref={dropdownRef}>
      <button
        className="filter-dropdown-trigger"
        onClick={handleTriggerClick}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="dropdown-trigger-content">
          <span className="dropdown-icon">{icon}</span>
          {!compact && (
            <motion.div
              className="dropdown-label-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="dropdown-label-text">{label}</span>
              <span className="dropdown-selected">{selectedLabel}</span>
            </motion.div>
          )}
        </div>
        {!compact && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronDown
              size={20}
              className="dropdown-chevron"
            />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && !compact && (
          <motion.div
            className="filter-dropdown-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.button
              className={`dropdown-item ${activeValue === '' ? 'active' : ''}`}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              type="button"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              <span>All {label}s</span>
              {activeValue === '' && <span className="checkmark">✓</span>}
            </motion.button>
            {options.map((option, index) => (
              <motion.button
                key={option}
                className={`dropdown-item ${activeValue === option ? 'active' : ''}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + (index + 1) * 0.03 }}
              >
                <span>{option}</span>
                {activeValue === option && <span className="checkmark">✓</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobsSidebar;