import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import "./index.scss";
import Login from "./pages/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import store from "./store";
import { Provider } from "react-redux";

const { palette } = createTheme();
const theme = createTheme({
    palette: {
        primary: palette.augmentColor({
            color: {
                main: "#367a48",
            },
        }),
    },
});

const IndexPage = () => {
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
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </ThemeProvider>
);
