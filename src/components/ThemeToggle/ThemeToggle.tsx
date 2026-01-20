import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/theme/themeSlice';
import { Sun, Moon } from 'lucide-react';
import './themeToggle.scss';

const ThemeToggle: React.FC = () => {
  const theme = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();

  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle-single"
      onClick={() => dispatch(toggleTheme())}
      type="button"
      aria-label={`Cycle theme. Current: ${theme}.`}
      title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
    >
      <div className="icon-wrapper">
        {isDark ? (
          <Sun size={20} className="sun-icon" />
        ) : (
          <Moon size={20} className="moon-icon" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
