import axiosInstance from "./index";

const ep = "home/galareya/";
const epPost = "home/galareya/create/";
const epDel = "home/galareya/delete/";

const get = () => axiosInstance.get(ep);
const post = (item) => {
  return axiosInstance.post(`${epPost}`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${epDel}${id}/`);
};

// Turi boyicha
const epTur = "home/galareya/tur/";
const epTurPost = "home/galareya/tur/create/";
const epTurDel = "home/galareya/tur/delete/";
const epTurPut = "home/galareya/tur/update/";

const getTur = () => axiosInstance.get(epTur);
const postTur = (item) => {
  return axiosInstance.post(`${epTurPost}`, item);
};
const putTur = (id, item) => {
  return axiosInstance.patch(`${epTurPut}${id}/`, item);
};
const delTur = (id) => {
  return axiosInstance.delete(`${epTurDel}${id}/`);
};

const APIGallery = { get, post, del, getTur, postTur, putTur, delTur };

export default APIGallery;
