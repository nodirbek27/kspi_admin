import axiosInstance from "./index";

const ep = "faoliyat/xabar_berish/";

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

const APIKorHaqHabBerish = { get, post, patch, del };

export default APIKorHaqHabBerish;