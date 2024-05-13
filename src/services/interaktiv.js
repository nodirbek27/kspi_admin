import axiosInstance from "./index";

const epLibrary = "home/elektronkutubxona/";
const epMasofaviy = "home/masofaviytalim/";

const get = () => axiosInstance.get(epLibrary);

const post = (item) => {
  return axiosInstance.post(`${epLibrary}`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${epLibrary}${id}/`);
};

const getMasofaviy = () => axiosInstance.get(epMasofaviy);

const postMasofaviy = (item) => {
  return axiosInstance.post(`${epMasofaviy}`, item);
};
const delMasofaviy = (id) => {
  return axiosInstance.delete(`${epMasofaviy}${id}/`);
};

const APIInteraktiv = { get, post, del, getMasofaviy, postMasofaviy, delMasofaviy };

export default APIInteraktiv;