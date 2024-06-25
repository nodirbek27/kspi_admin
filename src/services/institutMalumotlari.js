import axiosInstance from ".";

const endPoint = "institut/institut_malumotlari/";

const getInstitutMalumotlari = () => axiosInstance.get(endPoint);

const getByIdInstitutMalumotlari = (id) => {
  return axiosInstance.get(`${endPoint}${id}`)
};

const postInstitutMalumotlari = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const patchInstitutMalumotlari = (id, item) => {
  return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delInstitutMalumotlari = (id) => {
  return axiosInstance.delete(`${endPoint}${id}/`);
};

const APIInstitutMalumotlari = {getInstitutMalumotlari, getByIdInstitutMalumotlari, postInstitutMalumotlari, patchInstitutMalumotlari, delInstitutMalumotlari};

export default APIInstitutMalumotlari;