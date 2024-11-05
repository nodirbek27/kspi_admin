import axiosInstance from "./index";

const ep = "institut/prizdent_farmonlari/";

const get = () => axiosInstance.get(ep);

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};
const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
};
const del = (id) => {
    return axiosInstance.delete(`${ep}${id}/`);
};

const APINormativHuj = { get, post, patch, del };

export default APINormativHuj;