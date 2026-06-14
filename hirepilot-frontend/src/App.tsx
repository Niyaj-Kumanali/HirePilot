import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useAppSelector } from './store/hooks';

function App() {
  const mode = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <div className='app-root'>
      <Outlet />
    </div>
  );
}

export default App
