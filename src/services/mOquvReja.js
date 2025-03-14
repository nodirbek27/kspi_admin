import axiosInstance from "./index";

const ep = "talaba/magistr_oquv_reja/";

const get = () => axiosInstance.get(ep);

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  return axiosInstance.post(`${ep}`, item);
};

const patch = (id, item) => {
    return axiosInstance.patch(`${ep}${id}/`, item);
  }

const put = (id, item) => {
  return axiosInstance.put(`${ep}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

const APIMOquvReja = { get, getbyId, post, patch, put, del };

export default APIMOquvReja;