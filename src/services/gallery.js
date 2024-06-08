import axiosInstance from "./index";

const ep = "home/galareya/";

const get = () => axiosInstance.get(ep);
const post = (item) => {
  return axiosInstance.post(`${ep}`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

// Turi boyicha
const epTur = "home/galareya_tur/";

const getTur = () => axiosInstance.get(epTur);
const postTur = (item) => {
  return axiosInstance.post(`${epTur}`, item);
};
const putTur = (id, item) => {
  return axiosInstance.patch(`${epTur}${id}/`, item);
};
const delTur = (id) => {
  return axiosInstance.delete(`${epTur}${id}/`);
};

const APIGallery = { get, post, del, getTur, postTur, putTur, delTur };

export default APIGallery;
