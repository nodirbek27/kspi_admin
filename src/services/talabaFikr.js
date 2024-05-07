import axiosInstance from "./index";

const ep = "home/talaba/";
const epPost = "home/talaba/create/";
const epDel = "home/talaba/delete/";
const epPut = "home/talaba/update/";

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

const APITalaba = { get, getbyId, post, put, del };

export default APITalaba;