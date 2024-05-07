import axiosInstance from "./index";

const ep = "home/statistika/";
const epPost = "home/statistika/create/";
const epDel = "home/statistika/delete/";
const epPut = "home/statistika/update/";

const get = () => axiosInstance.get(ep);

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  return axiosInstance.post(`${epPost}`, item);
};
const put = (id, item) => {
  return axiosInstance.put(`${epPut}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${epDel}${id}/`);
};

const APIStatistika = { get, getbyId, post, put, del };

export default APIStatistika;