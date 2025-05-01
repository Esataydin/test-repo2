import axios from "axios"
import { ACCESS_TOKEN } from "../../constants"

// const apiUrl = "/choreo-apis/djangoreacttutorial/backend/v1"

const api = axios.create({
    baseURL: "https://dummyjson.com"
});

api.interceptors.request.use(
    (config) => {
        console.log("Request URL:", config.url);  // Log the request URL
        console.log("config", config);
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api