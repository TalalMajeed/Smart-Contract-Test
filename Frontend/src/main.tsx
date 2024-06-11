import React, { useEffect, useState } from "react";
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
import { createContext } from "react";

export const Context = createContext();

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

const Parent = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Context.Provider
                    value={{ web3, setWeb3, contract, setContract }}
                >
                    <RouterProvider router={router} />
                </Context.Provider>
            </Provider>
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Parent />);
