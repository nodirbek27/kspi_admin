import axiosInstance from "./index";

const ep = "home/elon/";
const epPost = "home/elon/create/";
const epDel = "home/elon/delete/";
const epPut = "home/elon/update/";

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

const APIElon = { get, getbyId, post, put, del };

export default APIElon;