import axiosInstance from ".";

const endPoint = "institut/instituthaqida/";

const getInstitutHaqida = () => axiosInstance.get(endPoint);

const postInstitutHaqida = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const APIInstitutHaqida = {getInstitutHaqida, postInstitutHaqida};

export default APIInstitutHaqida;