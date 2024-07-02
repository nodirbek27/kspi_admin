import axiosInstance from ".";

const endPoint = "talaba/ttj_ariza/";

const get = () => axiosInstance.get(endPoint);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const patch = (id, item) => {
    return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const del = (id) => {
    return axiosInstance.delete(`${endPoint}${id}/`);
  };

const APITTJAriza = {get, post, patch, del};

export default APITTJAriza;