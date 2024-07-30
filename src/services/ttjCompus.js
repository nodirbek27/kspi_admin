import axiosInstance from ".";

const endPoint = "talaba/ttj_campus/";

const get = () => axiosInstance.get(endPoint);

const getById = (id) => {
  return axiosInstance.get(`${endPoint}${id}`)
};

const post = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const patch = (id, item) => {
  return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const del = (id) => {
  return axiosInstance.delete(`${endPoint}${id}/`);
};

const APITTJCompus = {get, getById, post, patch, del};

export default APITTJCompus;