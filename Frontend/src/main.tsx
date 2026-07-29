import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(

    <StrictMode>

        <AuthProvider>

            <ToastProvider>

                <App />

            </ToastProvider>

        </AuthProvider>

    </StrictMode>,

);