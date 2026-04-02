// components/ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

/**
 * Component to protect routes that require authentication.
 * 
 * If the user is not authenticated, it redirects them to the sign-in page.
 * 
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - The component to render if authenticated.
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
