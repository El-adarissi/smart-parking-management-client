import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://web-production-ee3f.up.railway.app",
    // baseURL: "http://127.0.0.1:5000",
    withCredentials: true,  
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;
