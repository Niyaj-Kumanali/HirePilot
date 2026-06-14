import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface GuardRouteProps {
  children: JSX.Element;
  requireAuth?: boolean;
  redirectTo?: string;
}

const GuardRoute = ({ children, requireAuth = true, redirectTo }: GuardRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo || '/signin'} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo || '/'} replace />;
  }

  return children;
};

export default GuardRoute;
