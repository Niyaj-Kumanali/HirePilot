import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/theme/themeSlice';
import { Sun, Moon } from 'lucide-react';
import { IconButton, alpha, useTheme } from '@mui/material';

const ThemeToggle: React.FC = () => {
  const themeMode = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isDark = themeMode === 'dark';

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Cycle theme. Current: ${themeMode}.`}
      title={`Theme: ${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}`}
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        bgcolor: alpha(theme.palette.background.paper, 0.05),
        backdropFilter: 'blur(8px)',
        border: 'none',
        borderColor: alpha(theme.palette.common.white, 0.1),
        color: 'text.secondary',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.08),
          color: 'primary.main',
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
        '&:active': {
          transform: 'translateY(0)',
        }
      }}
    >
      {isDark ? (
        <Sun size={20} color={theme.palette.warning.main} style={{ filter: `drop-shadow(0 0 4px ${alpha(theme.palette.warning.main, 0.4)})` }} />
      ) : (
        <Moon size={20} color={theme.palette.primary.main} style={{ filter: `drop-shadow(0 0 4px ${alpha(theme.palette.primary.main, 0.4)})` }} />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
