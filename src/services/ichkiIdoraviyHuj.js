import axiosInstance from "./index";

const ep = "faoliyat/ichki_idoraviy_hujatlar/";

const get = () => axiosInstance.get(ep);

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
};
const put = (id, item) => {
    return axiosInstance.put(`${ep}${id}/`, item);
};
const del = (id) => {
    return axiosInstance.delete(`${ep}${id}/`);
};

const APIIchkiIdorHuj = { get, post, put, del };

export default APIIchkiIdorHuj;