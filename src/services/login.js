import axiosInstance from "./index";

const ep = "api/token/";

const post = (item) => {
  return axiosInstance.post(ep, item);
};

const APILogin = { post };

export default APILogin;
