import axiosInstance from "./index";

const ep = "home/yangilik/"
const epPost = "home/yangilik/post/"

const get = () => axiosInstance.get(ep);

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  console.log(item);
  return axiosInstance.post(`${epPost}`, item);
};
const patch = (id, item) => {
  return axiosInstance.patch(`${ep}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

const APIYangilik = { get, getbyId, post, patch, del };

export default APIYangilik;
