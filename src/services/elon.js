import axiosInstance from "./index";

const epGet = "home/elon/";
const epPost = "home/elon/post/";
const epPut = "home/elon/update/";
const epDel = "home/elon/delete/";

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

const APIElon = { get, getbyId, post, put, del };

export default APIElon;