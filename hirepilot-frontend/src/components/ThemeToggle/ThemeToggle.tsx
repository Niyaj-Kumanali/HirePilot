import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/theme/themeSlice';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const themeMode = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();

  const isDark = themeMode === 'dark';

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Cycle theme. Current: ${themeMode}.`}
      title={`Theme: ${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}`}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm border-none text-gray-500 dark:text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-primary hover:shadow-[0_4px_12px_rgba(168,85,247,0.15)] active:translate-y-0"
    >
      {isDark ? (
        <Sun size={20} className="text-amber-400" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.4))' }} />
      ) : (
        <Moon size={20} className="text-primary" style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }} />
      )}
    </button>
  );
};

export default ThemeToggle;
