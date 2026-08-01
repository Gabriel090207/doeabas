import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
    children: ReactNode;
}

export function PublicRoute({
    children,
}: PublicRouteProps) {

    const {
        authenticated,
        loading,
    } = useAuth();

    if (loading) {
        return <>{children}</>;
    }

    if (authenticated) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <>{children}</>;

}