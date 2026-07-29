import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {

    children: React.ReactNode;

}

function PrivateRoute({

    children,

}: PrivateRouteProps) {

    const {

        authenticated,

        loading,

    } = useAuth();

    if (loading) {

        return null;

    }

    if (!authenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default PrivateRoute;