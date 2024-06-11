import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import "./index.scss";
import Login from "./pages/Login";

const IndexPage: Function = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    }, []);
    return <></>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
