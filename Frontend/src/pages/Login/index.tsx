import "./styles.scss";
import { LoadingButton } from "@mui/lab";

const Login = () => {
    const loginButton: Object = {
        width: "100%",
        height: "3rem",
        fontSize: "1rem",
    };
    return (
        <main id="login">
            <section>
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
                    loading={false}
                    color="primary"
                >
                    Connect
                </LoadingButton>
                <p>© Muhammad Talal Majeed</p>
            </section>
        </main>
    );
};

export default Login;
