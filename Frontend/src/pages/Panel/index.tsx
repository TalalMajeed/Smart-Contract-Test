import "./styles.scss";
import { createRef, useContext, useEffect } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
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
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!web3 || !contract || !account) navigate("/login");
        readData();
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

    const ADDINPUT = createRef<HTMLInputElement>();
    const REMOVEINPUT = createRef<HTMLInputElement>();

    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);

    const [addStatus, setAddStatus] = useState(["info", "Mining Transaction"]);
    const [removeStatus, setRemoveStatus] = useState([
        "info",
        "Mining Transaction",
    ]);

    const addChain = async () => {
        console.log(ADDINPUT);
        const candidate = ADDINPUT.current?.value;
        ADDINPUT.current!.value = "";
        if (!candidate) return;
        setAddLoading(true);

        try {
            await contract.methods
                .addCandidate(candidate)
                .send({ from: account });
            await readData();
        } catch (error) {
            console.log(error);
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

        try {
            await contract.methods
                .removeCandidate(candidate)
                .send({ from: account });
            await readData();
        } catch (error) {
            console.log(error);
        } finally {
            setRemoveLoading(false);
        }
    };

    return !(web3 && contract && account) ? null : (
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
                </section>
            </div>
            <section>
                <h1>Current Candidates</h1>
                <div id="candidates">
                    {candidates.length > 0 ? null : (
                        <Alert severity="info">No candidates found</Alert>
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
