import axiosInstance from ".";

const endPoint = "institut/kengash/";

const getInstitutKengashi = () => axiosInstance.get(endPoint);

const postInstitutKengashi = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const patchInstitutKengashi = (id, item) => {
    return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delInstitutKengashi = (id) => {
    return axiosInstance.delete(`${endPoint}${id}/`);
  };

const APIinstitutKengashi = {getInstitutKengashi, postInstitutKengashi, patchInstitutKengashi, delInstitutKengashi};

export default APIinstitutKengashi;