import axiosInstance from ".";

const endPoint = "institut/bank_rekviziti/";

const getBankRekviziti = () => axiosInstance.get(endPoint);

const postBankRekviziti = (item) => {
    return axiosInstance.post(`${endPoint}`, item)
}

const patchBankRekviziti = (id, item) => {
    return axiosInstance.patch(`${endPoint}${id}/`, item);
}

const delBankRekviziti = (id) => {
    return axiosInstance.delete(`${endPoint}${id}/`);
  };

const APIBankRekviziti = {getBankRekviziti, postBankRekviziti, patchBankRekviziti, delBankRekviziti};

export default APIBankRekviziti;