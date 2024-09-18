import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
    const context = useAuth();
    console.log("this is not letting it work")
    if (!context.token) return <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
