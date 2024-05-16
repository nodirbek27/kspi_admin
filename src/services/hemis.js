import axiosInstance from "./index";

const ep = "home/hemis/";

const get = () => axiosInstance.get(ep);

const post = (item) => {
  return axiosInstance.post(`${ep}`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

const APIHemis = { get, post, del };

export default APIHemis;