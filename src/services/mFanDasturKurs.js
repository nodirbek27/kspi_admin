import axiosInstance from "./index";

const ep = "talaba/magistr_fan_dastur_kurs/";

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

const APIMagDanDasKurs = { get, post, patch, del };

export default APIMagDanDasKurs;
