import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";

import { Dashboard } from "../pages/Dashboard/Dashboard";

import { Campaigns } from "../pages/Campaigns/Campaigns";
import { CreateCampaign } from "../pages/CreateCampaign/CreateCampaign";
import { EditCampaign } from "../pages/EditCampaign/EditCampaign";

import { AdminLayout } from "../layouts/AdminLayout";

export function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route element={<AdminLayout />}>

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

            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>

    );

}