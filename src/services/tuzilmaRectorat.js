import axiosInstance from ".";

const ep = "tuzilma/rektorat/";
const epN = "tuzilma/rektorat/rahbar/";

const get = () => axiosInstance.get(ep);
const getN = () => axiosInstance.get(epN);

const getById = (id) => {
    return axiosInstance.get(`${ep}${id}`);
};

const del = (id) => axiosInstance.delete(`${ep}${id}/`)

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};

const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
};

const APITuzilmaRectorat = {
    get,
    getN,
    getById,
    del,
    post,
    patch,
};

export default APITuzilmaRectorat;
