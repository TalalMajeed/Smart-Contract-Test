import "./styles.scss";
import { createRef, useContext, useEffect } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { AlertColor, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { useState } from "react";

const Panel = () => {
    const navigate = useNavigate();
    const { web3, contract, account } = useContext(Context) as any;

    const [candidates, setCandidates] = useState([]) as any;

    const readData = async () => {
        try {
            const data = await contract.methods.getAllCandidates().call();
            setCandidates(data);
        } catch (error) {
            console.log(error);
        }
    };

    const registerEvents = async () => {
        console.log("Registering");
        try {
            contract.events.allEvents().on("data", (event: any) => {
                console.log("New Event:", event);
                readData();
            });
        } catch (error) {
            console.log("Event Registration Error:", error);
        }
    };
    useEffect(() => {
        if (!web3 || !contract || !account) {
            navigate("/login");
            return;
        }
        readData();
        registerEvents();
    }, []);

    const customButton: Object = {
        width: "100%",
        height: "3rem",
        fontSize: "1rem",
    };

    const customInput: Object = {
        width: "100%",
        marginBottom: "2rem",
    };

    const customAlert: Object = {
        margin: "1rem auto 0 auto",
        fontSize: "1rem",
    };

    const ADDINPUT = createRef<HTMLInputElement>();
    const REMOVEINPUT = createRef<HTMLInputElement>();

    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);

    const [addStatus, setAddStatus] = useState(["", ""]);
    const [removeStatus, setRemoveStatus] = useState(["", ""]);

    const addChain = async () => {
        const candidate = ADDINPUT.current?.value;
        ADDINPUT.current!.value = "";
        if (!candidate) return;
        setAddLoading(true);
        setAddStatus(["info", "Mining Transaction"]);

        try {
            await contract.methods
                .addCandidate(candidate)
                .send({ from: account });
            await readData();
            setAddStatus(["success", "Transaction Successful"]);
        } catch (error) {
            console.log(error);
            setAddStatus(["error", "Transaction Failed"]);
        } finally {
            setAddLoading(false);
        }
    };

    const removeChain = async () => {
        const candidate = REMOVEINPUT.current?.value;
        REMOVEINPUT.current!.value = "";
        if (!candidate) {
            setRemoveLoading(false);
            return;
        }
        setRemoveLoading(true);
        setRemoveStatus(["info", "Mining Transaction"]);

        try {
            await contract.methods
                .removeCandidate(candidate)
                .send({ from: account });
            await readData();
            setRemoveStatus(["success", "Transaction Successful"]);
        } catch (error) {
            console.log(error);
            setRemoveStatus(["error", "Transaction Failed"]);
        } finally {
            setRemoveLoading(false);
        }
    };

    return !(web3 || contract || account) ? null : (
        <main id="panel">
            <div id="holder">
                <section>
                    <h1>Add New Candidate</h1>
                    <TextField
                        label="Candidate Name"
                        variant="outlined"
                        style={customInput}
                        inputRef={ADDINPUT}
                    />
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        style={customButton}
                        onClick={addChain}
                        loading={addLoading}
                    >
                        Add Candidate
                    </LoadingButton>
                    {addStatus[0] != "" ? (
                        <Alert
                            style={customAlert}
                            severity={addStatus[0] as AlertColor}
                        >
                            {addStatus[1]}
                        </Alert>
                    ) : null}
                </section>
                <section>
                    <h1>Remove Candidate</h1>
                    <TextField
                        label="Candidate Name"
                        variant="outlined"
                        style={customInput}
                        inputRef={REMOVEINPUT}
                    />
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        style={customButton}
                        onClick={removeChain}
                        loading={removeLoading}
                    >
                        Remove Candidate
                    </LoadingButton>
                    {removeStatus[0] != "" ? (
                        <Alert
                            style={customAlert}
                            severity={removeStatus[0] as AlertColor}
                        >
                            {removeStatus[1]}
                        </Alert>
                    ) : null}
                </section>
            </div>
            <section>
                <h1>Current Candidates</h1>
                <div id="candidates">
                    {candidates.length > 0 ? null : (
                        <Alert style={customAlert} severity="info">
                            No candidates found
                        </Alert>
                    )}
                    {candidates.map((candidate: string, index: number) => (
                        <div key={index} className="candidate">
                            <p>{index + 1}</p>
                            <p>{candidate}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Panel;
