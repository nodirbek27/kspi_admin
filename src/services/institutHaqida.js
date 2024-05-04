import axiosInstance from ".";

const endPoint = "institut/instituthaqida/";
const endPointPost = "institut/instituthaqida/create/";

const getInstitutHaqida = () => axiosInstance.get(endPoint);

const postInstitutHaqida = (item) => {
  return axiosInstance.post(`${endPointPost}`, item);
};

const APIInstitutHaqida = {getInstitutHaqida, postInstitutHaqida};

export default APIInstitutHaqida;