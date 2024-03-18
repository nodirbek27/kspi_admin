import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"

const Root = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Root;