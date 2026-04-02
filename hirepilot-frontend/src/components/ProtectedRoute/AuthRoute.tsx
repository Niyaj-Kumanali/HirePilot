import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

/**
 * Component to restrict routes that only guest users (unauthenticated) should see.
 * 
 * If the user is already authenticated, it redirects them to the home page.
 * Used for pages like Login and Sign Up.
 * 
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - The component to render if unauthenticated.
 */
const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthRoute;
