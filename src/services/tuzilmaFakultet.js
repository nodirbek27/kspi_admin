import axiosInstance from ".";

const ep = "tuzilma/fakultet/";
const epH = "tuzilma/fakultet_rahbar/";

const get = () => axiosInstance.get(ep);
const getH = () => axiosInstance.get(epH);

const del = (id) => axiosInstance.delete(`${ep}${id}/`)
const delH = (id) => axiosInstance.delete(`${epH}${id}/`)

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};

const postH = (item) => {
    return axiosInstance.post(`${epH}`, item);
};

const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
};

const patchH = (id, item) => {
    return axiosInstance.patch(`${epH}${id}/`, item);
};

const APITuzilmaFakultet = {
    get,
    getH,
    del,
    delH,
    post,
    postH,
    patch,
    patchH,
};

export default APITuzilmaFakultet;
