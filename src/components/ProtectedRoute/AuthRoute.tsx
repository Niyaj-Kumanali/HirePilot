import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AuthRoute;
