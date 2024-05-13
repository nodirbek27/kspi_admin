import axiosInstance from ".";

const endPoint = "institut/instituthaqida/";
const endPointPost = "institut/instituthaqida/create/";
const endPointPut = "institut/instituthaqida/create/";

const getInstitutHaqida = () => axiosInstance.get(endPoint);

const postInstitutHaqida = (item) => {
  return axiosInstance.post(`${endPointPost}`, item);
};

const putInstitutHaqida = (id, item) => {
  return axiosInstance.put(`${endPointPut}${id}/`, item);
}

const APIInstitutHaqida = {getInstitutHaqida, postInstitutHaqida, putInstitutHaqida};

export default APIInstitutHaqida;