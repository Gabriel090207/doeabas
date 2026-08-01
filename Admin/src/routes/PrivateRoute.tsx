import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {

    const { authenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

}