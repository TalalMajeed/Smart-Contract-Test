import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            "process.env.BLOCKCHAIN": JSON.stringify(env.BLOCKCHAIN),
            "process.env.CONTRACT": JSON.stringify(env.CONTRACT),
            "process.env.ACCOUNT": JSON.stringify(env.ACCOUNT),
        },
        plugins: [react()],
    };
});
