import axiosInstance from "./index";

const ep = "home/yangilik/";

const get = () => axiosInstance.get(ep + "get/");

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  console.log(item);
  return axiosInstance.post(`${ep + "post/"}`, item);
};
const put = (id, item) => {
  return axiosInstance.put(`${ep}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

const APIYangilik = { get, getbyId, post, put, del };

export default APIYangilik;
