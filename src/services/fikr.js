import axiosInstance from "./index";

const ep = "home/fikr/";
const epPost = "home/fikr/create/";
const epDel = "home/fikr/delete/";
const epPut = "home/fikr/update/";

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

const APIFikr = { get, getbyId, post, put, del };

export default APIFikr;