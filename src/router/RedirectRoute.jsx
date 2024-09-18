import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const RedirectRoute = () => {
    const context = useAuth();
    console.log("this is not letting it work")
    if (context.token) {
        console.log(context.token)
        if (context.token.role === "ADMIN"){
            return <Navigate to="/admin" />;

        }
        else if (context.token.role === "TEACHER"){
            return <Navigate to="/teacher" />;
        }
        return <Navigate to="/dashboard" />;

    }
    return <Outlet />;
};

export default RedirectRoute;
