import axios from "axios";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "https://kspi.pythonanywhere.com/",
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use((request) => {
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default axiosInstance;
