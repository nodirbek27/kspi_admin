import axiosInstance from ".";

const endPoint = "institut/tuzilma/";

const getInstitutTuzilmasi = () => axiosInstance.get(endPoint);

const postInstitutTuzilmasi = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const putInstitutTuzilmasi = (id, item) => {
    return axiosInstance.put(`${endPoint}${id}/`, item);
}

const APIinstitutTuzilmasi = {getInstitutTuzilmasi, postInstitutTuzilmasi, putInstitutTuzilmasi};

export default APIinstitutTuzilmasi;