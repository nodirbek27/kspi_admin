import axiosInstance from ".";

const endPoint = "institut/institut_rekviziti/";

const getInstitutRekviziti = () => axiosInstance.get(endPoint);

const postInstitutRekviziti = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const patchInstitutRekviziti = (id, item) => {
    return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delInstitutRekviziti = (id) => {
    return axiosInstance.delete(`${endPoint}${id}/`);
  };

const APIinstitutRekviziti = {getInstitutRekviziti, postInstitutRekviziti, patchInstitutRekviziti, delInstitutRekviziti};

export default APIinstitutRekviziti;