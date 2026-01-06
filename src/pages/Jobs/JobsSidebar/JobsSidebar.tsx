import { X, Filter, RotateCcw} from 'lucide-react';
import './JobsSidebar.scss';
import { useRef, useEffect } from 'react';

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
  const menuRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          mobileOpen &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          onMobileClose()
        }
      }

      console.log("inside useeffect", mobileOpen)
  
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [mobileOpen, onMobileClose])
  return (
    <div className="jobs-sidebar-outer-wrapper" ref={menuRef}>
      {/* Mobile Backdrop */}
      <div
        className={`jobs-sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={onMobileClose}
      />

      <aside className={`jobs-filter-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="jobs-filter-header">
          <div className="jobs-filter-title">
            <div className="jobs-filter-icon-box">
              <Filter size={18} strokeWidth={2.5} />
            </div>
            <div className="jobs-filter-title-text">
              <span className="jobs-filter-title-main">Filters</span>
              {activeFilters > 0 && (
                <span className="jobs-filter-count">{activeFilters} selected</span>
              )}
            </div>
          </div>
          <button className="jobs-close-mobile-btn" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        <div className="jobs-filter-body">
          <FilterGroup
            label="Job Type"
            activeValue={filterType}
            onChange={onFilterTypeChange}
            options={jobTypes}
            icon="💼"
          />

          <FilterGroup
            label="Experience"
            activeValue={filterLevel}
            onChange={onFilterLevelChange}
            options={jobLevels}
            icon="📈"
          />

          <FilterGroup
            label="Location"
            activeValue={filterLocation}
            onChange={onFilterLocationChange}
            options={locations}
            icon="📍"
          />
        </div>

        <div className="jobs-filter-footer">
          <button 
            className={`jobs-reset-btn ${activeFilters === 0 ? 'disabled' : ''}`} 
            onClick={onReset}
            disabled={activeFilters === 0}
          >
            <RotateCcw size={14} />
            <span>Clear All</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

interface FilterGroupProps {
  label: string;
  activeValue: string;
  onChange: (value: string) => void;
  options: string[];
  icon: string;
}

const FilterGroup = ({ label, activeValue, onChange, options, icon }: FilterGroupProps) => (
  <div className="jobs-filter-group">
    <div className="jobs-filter-label">
      <span className="label-icon">{icon}</span>
      {label}
    </div>
    <div className="jobs-filter-options">
      <button
        className={`filter-chip ${activeValue === '' ? 'active' : ''}`}
        onClick={() => onChange('')}
      >
        All
      </button>
      {options.map((option) => (
        <button
          key={option}
          className={`filter-chip ${activeValue === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default JobsSidebar;