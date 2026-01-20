import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const RootRoute = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
};

export default RootRoute;
