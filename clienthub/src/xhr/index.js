import axios from "axios";
import CONFIG from "../config";
const httpClient = () => {
  let api = axios.create({
    baseURL: CONFIG.API_URL,
  });

  api.interceptors.request.use((config) => {
    if (config.method)
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";

    return config;
  });

  api.interceptors.response.use(
    (res) => {
      const { statusText, config, data } = res;
      // console.log("data");
      // console.log(res);
      // console.log(data);
      if (statusText && statusText === "expired") {
        //window.open(CONFIG.SESSION_EXPIRED_URL, "_self")
      }
      return res;
    },
    (err) => {
      // console.log("err ===>>>>>>", err);
      window.open(CONFIG.SESSION_EXPIRED_URL, "_self");
      // console.log("status ====> ", err)
      // if ([401, 403].indexOf(err.response?.status) !== -1) {
      // window.open(CONFIG.SESSION_EXPIRED_URL, "_self")
      //    if(config.url != "/getCourses"){

      // }
      //  }
      // const error = (err.response && err.response.data.message) || err.message;
      // if (axios.isCancel(err)) {
      //     return Promise.resolve(err.message);
      // } else {
      //     return Promise.reject(error);
      // }
    }
  );
  return api;
};
export default httpClient;
