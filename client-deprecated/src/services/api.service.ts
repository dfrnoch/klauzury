import axios from "axios";

function setupAPIClient(ctx: any = undefined) {
    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return api;
}

export const api = setupAPIClient();