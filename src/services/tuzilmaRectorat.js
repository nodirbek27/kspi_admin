import axiosInstance from ".";

const ep = "tuzilma/rektorat/";
const epN = "tuzilma/rektorat_rahbar/";

const get = () => axiosInstance.get(ep);
const getN = () => axiosInstance.get(epN);

const del = (id) => axiosInstance.delete(`${ep}${id}/`)
const delN = (id) => axiosInstance.delete(`${epN}${id}/`)

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};

const postN = (item) => {
    return axiosInstance.post(`${epN}`, item);
};

const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
};

const patchN = (id, item) => {
    return axiosInstance.patch(`${epN}${id}/`, item);
};

const APITuzilmaRectorat = {
    get,
    getN,
    del,
    delN,
    post,
    postN,
    patch,
    patchN,
};

export default APITuzilmaRectorat;
