import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://flask-hello-world-six-bay-54.vercel.app",
    // baseURL: "http://127.0.0.1:5000",
    withCredentials: true,  
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;
