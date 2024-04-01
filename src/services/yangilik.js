import axiosInstance from "./index";

const ep = "home/yangilik/"
const epPost = "home/yangilik/create/"
const epPut = "home/yangilik/update/"
const epDel = "home/yangilik/delete/"

const get = () => axiosInstance.get(ep);

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  console.log(item);
  return axiosInstance.post(`${epPost}`, item);
};
const patch = (id, item) => {
  return axiosInstance.patch(`${epPut}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${epDel}${id}/`);
};

const APIYangilik = { get, getbyId, post, patch, del };

export default APIYangilik;
