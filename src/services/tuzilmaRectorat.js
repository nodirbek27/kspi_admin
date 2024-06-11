import axiosInstance from ".";

const ep = "tuzilma/rektorat/";
const epN = "tuzilma/rektorat_rahbar/";

const get = () => axiosInstance.get(ep);
const getN = () => axiosInstance.get(epN);

const getById = (id) => {
    return axiosInstance.get(`${ep}${id}`);
};

const del = (id) => axiosInstance.delete(`${ep}${id}/`)

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};

const postN = (item) => {
    return axiosInstance.post(`${epN}`, item);
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
    postN,
    patch,
};

export default APITuzilmaRectorat;
