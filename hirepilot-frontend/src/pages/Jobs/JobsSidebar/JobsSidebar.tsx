import { X, Filter, RotateCcw, ChevronDown, Pin, PinOff, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';

interface FilterConfig {
  /** Display label for the filter (e.g. "Location", "Job Type"). */
  label: string;
  /** The current selected filter value. */
  value: string;
  /** Callback to update the filter value. */
  onChange: (value: string | number) => void;
  /** List of available options for this filter. */
  options: string[];
  /** Lucide icon component to represent the filter. */
  icon: React.ComponentType<{ size: number }>;
}

interface JobsFiltersSidebarProps {
  /** Array of filter configurations. */
  filters: FilterConfig[];
  /** Count of currently active (non-empty) filters. */
  activeFilters: number;
  /** Callback to clear all active filters. */
  onReset: () => void;
  /** Mobile drawer state. */
  mobileOpen: boolean;
  /** Callback to close the mobile drawer. */
  onMobileClose: () => void;
}

/**
 * Enhanced Sidebar for filtering job listings.
 * 
 * Features:
 * - Hover-to-expand behavior on desktop.
 * - Stick/Lock functionality for persistent view.
 * - Dynamic active filter indicator.
 * - Collapsible dropdown categories.
 * - Full Mobile Drawer support.
 */
const JobsSidebar = ({
  filters,
  activeFilters,
  onReset,
  mobileOpen,
  onMobileClose,
}: JobsFiltersSidebarProps) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleLock = () => setIsLocked(!isLocked);
  const expandAndLock = () => setIsLocked(true);

  const showFullContent = isHovered || isLocked || mobileOpen;

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 100%)`,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          onClick={toggleLock}
          sx={{ cursor: 'pointer', flex: 1, transition: 'all 0.2s ease' }}
        >
          <Box
            sx={{
              position: 'relative',
              p: 1.2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
              color: 'primary.contrastText',
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            }}
          >
            <Filter size={18} strokeWidth={2.5} />
            {activeFilters > 0 && <Box sx={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.4rem' }} > {activeFilters} </Box>}
          </Box>
          {showFullContent && (
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight={800}
                sx={{
                  fontSize: '0.95rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Filters
              </Typography>
            </Box>
          )}
        </Stack>

        {showFullContent && (
          <Stack direction="row" spacing={0.75}>
            <IconButton
              size="small"
              onClick={toggleLock}
              title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                color: isLocked ? 'primary.main' : 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                },
              }}
            >
              {isLocked ? <Pin size={18} /> : <PinOff size={18} />}
            </IconButton>
            <IconButton
              size="small"
              onClick={onMobileClose}
              sx={{
                display: { xs: 'flex', lg: 'none' },
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: `1.5px solid ${alpha(theme.palette.divider, 0.6)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: alpha(theme.palette.error.main, 0.1),
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                },
              }}
            >
              <X size={18} />
            </IconButton>
          </Stack>
        )}
      </Box>

      {/* Filter Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '3px',
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.3),
            },
          },
        }}
      >
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
      </Box>

      {/* Footer */}
      {showFullContent && (


        <Box
          sx={{
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            background: `linear-gradient(90deg, transparent 0%, ${alpha(
              theme.palette.primary.main,
              0.02
            )} 100%)`,
            p: 2,
          }}
        >
          <Button
            onClick={onReset}
            fullWidth
            startIcon={<RotateCcw size={18} />}
            disabled={activeFilters === 0}
            sx={{
              borderRadius: '10px',
              fontWeight: 700,
              py: 1.2,
              textTransform: 'none',
              justifyContent: 'center',

              background:
                activeFilters > 0
                  ? `linear-gradient(135deg, ${alpha(
                    theme.palette.error.main,
                    0.1
                  )} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`
                  : 'transparent',

              border: `1.5px dashed ${activeFilters > 0
                ? theme.palette.error.main
                : alpha(theme.palette.divider, 0.5)
                }`,

              color:
                activeFilters > 0
                  ? theme.palette.error.main
                  : theme.palette.text.disabled,

              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',

              '&:hover': {
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.error.main,
                  0.15
                )} 0%, ${alpha(theme.palette.error.main, 0.08)} 100%)`,
                borderColor: theme.palette.error.main,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Clear All
          </Button>
        </Box>

      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: showFullContent ? 300 : 72,
          flexShrink: 0,
          transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'sticky',
          top: 70,
          left: 0,
          height: 'calc(100vh - 70px)',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 300,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

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
  const theme = useTheme();

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
    <Box sx={{ position: 'relative' }}>
      <Box
        // fullWidth
        onClick={handleTriggerClick}
        sx={{
          display: 'flex',
          justifyContent: compact ? 'center' : 'space-between',
          p: 1.5,
          borderRadius: '12px',
          background: isActive
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
            : alpha(theme.palette.background.paper, 0.4),
          border: `0.5px solid ${isActive ? alpha(theme.palette.primary.main, 0.4) : alpha(theme.palette.divider, 0.4)}`,
          color: 'text.primary',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: isActive
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`
              : alpha(theme.palette.background.paper, 0.6),
            borderColor: 'primary.main',
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
          <Box
            sx={{
              color: isActive ? 'primary.main' : 'text.secondary',
              display: 'flex',
              transition: 'color 0.2s ease',
            }}
          >
            <Icon size={18} />
          </Box>
          {!compact && (
            <Box sx={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <Typography
                variant="caption"
                display="block"
                fontWeight={700}
                sx={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {label}
              </Typography>
            </Box>
          )}
        </Stack>
        {!compact && (
          <ChevronDown
            size={18}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: isActive ? theme.palette.primary.main : 'currentColor',
            }}
          />
        )}
      </Box>

      {!compact && isOpen && (
        <Box
          sx={{
            overflowY: 'auto',
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: '180px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.15)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}`,
            backdropFilter: 'blur(12px)',
            animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '@keyframes slideDown': {
              from: {
                opacity: 0,
                transform: 'translateY(-8px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '3px',
            },
          }}
        >
          {listItems.map(({ option, label: itemLabel }) => (
            <Button
              key={option || 'all'}
              fullWidth
              onClick={() => {
                onChange(option);
                onToggle(label);
              }}
              sx={{
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                textAlign: 'left',
                borderRadius: 0,
                color: value === option ? 'primary.main' : 'text.primary',
                background: value === option
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.08),
                },
                fontSize: '0.7rem',
                fontWeight: value === option ? 700 : 500,
              }}
            >
              <Typography variant="body2">{itemLabel}</Typography>
              {value === option && (
                <Check size={18} style={{ color: theme.palette.primary.main }} />
              )}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default JobsSidebar;