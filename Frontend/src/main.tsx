import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import "./index.scss";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

type Web3ContextType = {
    web3: any;
    setWeb3: Dispatch<SetStateAction<any>>;
    contract: any;
    setContract: Dispatch<SetStateAction<any>>;
    account: any;
    setAccount: Dispatch<SetStateAction<any>>;
};

export const Context = createContext<Web3ContextType | null>(null);

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
    {
        path: "/panel",
        element: <Panel />,
    },
]);

const Parent = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    web3,
                    setWeb3,
                    contract,
                    setContract,
                    account,
                    setAccount,
                }}
            >
                <RouterProvider router={router} />
            </Context.Provider>
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Parent />);
