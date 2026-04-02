import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppSelector } from './store/hooks';
import { getTheme } from './theme/theme';

function App() {
  const mode = useAppSelector(state => state.theme.mode);

  const theme = useMemo(() => getTheme(mode as 'light' | 'dark'), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app-root'>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App
