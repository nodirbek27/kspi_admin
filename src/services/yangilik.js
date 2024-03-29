import axiosInstance from "./index";

const epGet = "home/yangilik/get/"
const epPost = "home/yangilik/post/"
const epDel = "home/yangilik/delete/"
const epPut = "home/yangilik/update/"

const get = () => axiosInstance.get(epGet);

const getbyId = (id) => {
  return axiosInstance.get(`${epGet}${id}/`);
};
const post = (item) => {
  console.log(item);
  return axiosInstance.post(`${epPost}`, item);
};
const put = (id, item) => {
  return axiosInstance.put(`${epPut}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${epDel}${id}/`);
};

const APIYangilik = { get, getbyId, post, put, del };

export default APIYangilik;
