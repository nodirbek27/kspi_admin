import axiosInstance from ".";

const endPoint = "institut/qabulxona/";

const getInstitutQabulxona = () => axiosInstance.get(endPoint);

const postInstitutQabulxona = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};
const delInstitutQabulxona = (id) => {
  return axiosInstance.delete(`${endPoint}${id}/`);
};

const APIinstitutQabulxona = { getInstitutQabulxona, postInstitutQabulxona, delInstitutQabulxona };

export default APIinstitutQabulxona;
