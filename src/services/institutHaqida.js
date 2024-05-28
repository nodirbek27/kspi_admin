import axiosInstance from ".";

const endPoint = "institut/instituthaqida/";

const getInstitutHaqida = () => axiosInstance.get(endPoint);

const getByIdInstitutHaqida = (id) => {
  return axiosInstance.get(`${endPoint}${id}`)
};

const postInstitutHaqida = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const putInstitutHaqida = (id, item) => {
  return axiosInstance.put(`${endPoint}${id}/`, item);
}

const APIInstitutHaqida = {getInstitutHaqida, getByIdInstitutHaqida, postInstitutHaqida, putInstitutHaqida};

export default APIInstitutHaqida;