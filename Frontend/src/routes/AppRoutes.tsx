import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import PrivateRoute from "./PrivateRoute";

import MainLayout from "../layouts/MainLayout";

import MonthlyDonor from "../pages/MonthlyDonor/MonthlyDonor";
import MonthlyCheckout from "../pages/MonthlyCheckout/MonthlyCheckout";

import Home from "../pages/Home/Home";

import Campaigns from "../pages/Campaigns/Campaigns";
import CampaignDetails from "../pages/CampaignDetails/CampaignDetails";
import Checkout from "../pages/Checkout/Checkout";

import About from "../pages/About/About";
import Transparency from "../pages/Transparency/Transparency";
import Login from "../pages/Login/Login";

import Profile from "../pages/Profile/Profile";
import MyDonations from "../pages/MyDonations/MyDonations";
import MyWallet from "../pages/MyWallet/MyWallet";

function AppRoutes() {

    return (

        <BrowserRouter>

        <ScrollToTop />

            <Routes>

                {/* Rotas com Header e Footer */}

                <Route element={<MainLayout />}>


                    <Route
                        path="/seja-doador-mensal"
                        element={<MonthlyDonor />}
                    />

                    <Route
                        path="/checkout-mensal"
                        element={<MonthlyCheckout />}
                    />

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/campanhas"
                        element={<Campaigns />}
                    />

                    <Route
                        path="/campanha/:slug"
                        element={<CampaignDetails />}
                    />

                    <Route
                        path="/checkout/:slug"
                        element={<Checkout />}
                    />

                    <Route
                        path="/sobre"
                        element={<About />}
                    />

                    <Route
                        path="/transparencia"
                        element={<Transparency />}
                    />


                    <Route
                        path="/perfil"
                        element={

                            <PrivateRoute>

                                <Profile />

                            </PrivateRoute>

                        }
                    />

                    <Route
                        path="/minhas-doacoes"
                        element={

                            <PrivateRoute>

                                <MyDonations />

                            </PrivateRoute>

                        }
                    />

                    <Route
                        path="/minha-carteira"
                        element={

                            <PrivateRoute>

                                <MyWallet />

                            </PrivateRoute>

                        }
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