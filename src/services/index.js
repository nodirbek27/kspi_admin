import axios from 'axios';

const token = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'https://kspi.pythonanywhere.com/',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});

axiosInstance.interceptors.request.use((request) => {
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // console.error('Request failed:', error);
        // return Promise.reject(error);
        return error;
    }
);

export default axiosInstance;
