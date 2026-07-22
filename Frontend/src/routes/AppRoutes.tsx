import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Campaigns from "../pages/Campaigns/Campaigns";
import About from "../pages/About/About";
import Transparency from "../pages/Transparency/Transparency";
import Login from "../pages/Login/Login";

function AppRoutes() {

    return (

        <BrowserRouter>

        <ScrollToTop />

            <Routes>

                {/* Rotas com Header e Footer */}

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/campanhas"
                        element={<Campaigns />}
                    />

                    <Route
                        path="/sobre"
                        element={<About />}
                    />

                    <Route
                        path="/transparencia"
                        element={<Transparency />}
                    />

                </Route>

                {/* Rotas sem Layout */}

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;