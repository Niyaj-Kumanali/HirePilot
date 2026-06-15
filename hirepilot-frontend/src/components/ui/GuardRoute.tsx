import type { JSX } from 'react';

interface GuardRouteProps {
  children: JSX.Element;
}

const GuardRoute = ({ children }: GuardRouteProps) => {
  return children;
};

export default GuardRoute;
