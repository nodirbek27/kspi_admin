import axiosInstance from ".";

const endPoint = "institut/tuzilma/";

const getInstitutTuzilmasi = () => axiosInstance.get(endPoint);

const postInstitutTuzilmasi = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const putInstitutTuzilmasi = (id, item) => {
    return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delInstitutTuzilmasi = (id) => {
    return axiosInstance.delete(`${endPoint}${id}/`);
  };

const APIinstitutTuzilmasi = {getInstitutTuzilmasi, postInstitutTuzilmasi, putInstitutTuzilmasi, delInstitutTuzilmasi};

export default APIinstitutTuzilmasi;