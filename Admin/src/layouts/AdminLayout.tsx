import { useState } from "react";

import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { Header } from "../components/Header/Header";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

import "./AdminLayout.css";

export function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <>

            <ScrollToTop />

            <div className="admin-layout">

                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <Header
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main className="admin-content">

                    <Outlet />

                </main>

            </div>

        </>

    );

}