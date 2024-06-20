import axiosInstance from ".";

const ep = "tuzilma/kafedra/";
const epR = "tuzilma/kafedra_rahbar/";
const epH = "tuzilma/kafedra_hodim/"

const get = () => axiosInstance.get(ep);
const getR = () => axiosInstance.get(epR);
const getH = () => axiosInstance.get(epH);

const del = (id) => axiosInstance.delete(`${ep}${id}/`)
const delR = (id) => axiosInstance.delete(`${epR}${id}/`)
const delH = (id) => axiosInstance.delete(`${epH}${id}/`)

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};

const postR = (item) => {
    return axiosInstance.post(`${epR}`, item);
};
const postH = (item) => {
    return axiosInstance.post(`${epH}`, item);
};

const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
};

const patchR = (id, item) => {
    return axiosInstance.patch(`${epR}${id}/`, item);
};

const patchH = (id, item) => {
    return axiosInstance.patch(`${epH}${id}/`, item);
};
const APITuzilmaKafedra = {
    get,
    getR,
    getH,
    del,
    delR,
    delH,
    post,
    postR,
    postH,
    patch,
    patchR,
    patchH,
};

export default APITuzilmaKafedra;
