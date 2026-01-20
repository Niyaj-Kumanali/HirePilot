import { useEffect } from 'react';
import './App.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { useAppSelector } from './store/hooks';

function App() {
  const mode = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    const applyTheme = (currentMode: typeof mode) => {
      let isDark = currentMode === 'dark';
      if (currentMode === 'auto') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    applyTheme(mode);

    // Listen for system theme changes if in 'auto' mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (mode === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [mode]);

  return (
    <div className='app-wrapper'>
      <Navbar />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App
