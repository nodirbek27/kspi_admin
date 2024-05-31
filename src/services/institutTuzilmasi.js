import axiosInstance from ".";

const endPoint = "institut/tuzilma/";

const getInstitutTuzilmasi = () => axiosInstance.get(endPoint);

const postInstitutTuzilmasi = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const APIinstitutTuzilmasi = {getInstitutTuzilmasi, postInstitutTuzilmasi};

export default APIinstitutTuzilmasi;