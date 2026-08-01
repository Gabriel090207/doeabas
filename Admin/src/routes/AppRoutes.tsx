import {
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";

import { Dashboard } from "../pages/Dashboard/Dashboard";

import { Campaigns } from "../pages/Campaigns/Campaigns";
import { CreateCampaign } from "../pages/CreateCampaign/CreateCampaign";
import { EditCampaign } from "../pages/EditCampaign/EditCampaign";
import { Users } from "../pages/Users/Users";
import { Donations } from "../pages/Donations/Donations";

import { AdminLayout } from "../layouts/AdminLayout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                element={
                    <PrivateRoute>
                        <AdminLayout />
                    </PrivateRoute>
                }
            >

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/campanhas"
                    element={<Campaigns />}
                />

                <Route
                    path="/campanhas/criar"
                    element={<CreateCampaign />}
                />

                <Route
                    path="/campanhas/:slug/editar"
                    element={<EditCampaign />}
                />

                <Route
                    path="/usuarios"
                    element={<Users />}
                />

                <Route
                    path="/doacoes"
                    element={<Donations />}
                />

            </Route>

        </Routes>

    );

}