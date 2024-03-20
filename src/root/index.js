import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Root = () => {
    const location = useLocation();

    if (location.pathname === "/") {
        return <Outlet />;
    }

    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Root;
