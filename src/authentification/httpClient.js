import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://smartparking-production.up.railway.app", 
    withCredentials: true,  
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;
