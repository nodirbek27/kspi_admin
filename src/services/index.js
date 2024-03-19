import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.kspi.uz/v1/',
    headers: {
        "Content-Type": "application/json"
    }
});


axiosInstance.interceptors.request.use((request) => {
    return request;
});

axiosInstance.interceptors.response.use((response) => {
    return response;
});

export default axiosInstance;