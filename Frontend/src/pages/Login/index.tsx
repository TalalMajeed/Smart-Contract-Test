import "./styles.scss";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import Web3 from "web3";
import { useState } from "react";
import VotingSystem from "../../contracts/VotingSystem.json";
import { Context } from "../../main";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setWeb3, setContract, setAccount } = useContext(Context) as any;
    const navigate = useNavigate();

    const loginButton: Object = {
        width: "100%",
        height: "3rem",
        fontSize: "1rem",
    };

    const errorAlert: Object = {
        width: "92%",
        margin: "1rem auto",
        fontSize: "1rem",
        justifyContent: "center",
        marginBottom: "0",
    };

    const [error, setError] = useState<string>("");

    const handleConnect = async () => {
        setLoading(true);
        setError("");
        try {
            const provider = new Web3.providers.HttpProvider(
                process.env.BLOCKCHAIN as string
            );
            if (!provider) throw new Error("Provider not found");

            const template = async () => {
                try {
                    const web3 = new Web3(provider);
                    const contract = new web3.eth.Contract(
                        VotingSystem.abi,
                        process.env.CONTRACT as string
                    );
                    setWeb3(web3);
                    setContract(contract);
                    setAccount(process.env.ACCOUNT as string);
                    navigate("/panel");
                } catch (error) {
                    setError("Connection to Blockchain Failed");
                    throw error;
                }
            };

            await template();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main id="login">
            <section style={{ height: error.length > 0 ? "32rem" : "28rem" }}>
                <h1>Voting System</h1>
                <p>
                    A Web 3.0 Ethereum Based Voting System. Connected to Ganache
                    Local Blockchain
                </p>
                <p>Powered by Solidity Smart Contracts & Truffle</p>
                <div className="spacer"></div>
                <LoadingButton
                    style={loginButton}
                    variant="contained"
                    loading={loading}
                    color="primary"
                    onClick={handleConnect}
                >
                    Connect
                </LoadingButton>
                {error.length > 0 && (
                    <Alert severity="error" style={errorAlert}>
                        Connection to Blockchain Failed
                    </Alert>
                )}
                <p>© Muhammad Talal Majeed</p>
            </section>
        </main>
    );
};

export default Login;
