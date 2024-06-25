import axiosInstance from ".";

const endPoint = "institut/institut_haqida/";

const getInstitutHaqida = () => axiosInstance.get(endPoint);

const getByIdInstitutHaqida = (id) => {
  return axiosInstance.get(`${endPoint}${id}`)
};

const postInstitutHaqida = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const patchInstitutHaqida = (id, item) => {
  return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delInstitutHaqida = (id) => {
  return axiosInstance.delete(`${endPoint}${id}/`);
};

const APIInstitutHaqida = {getInstitutHaqida, getByIdInstitutHaqida, postInstitutHaqida, patchInstitutHaqida, delInstitutHaqida};

export default APIInstitutHaqida;