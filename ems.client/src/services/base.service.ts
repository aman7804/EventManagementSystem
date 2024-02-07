/* eslint-disable no-console */
import { INTERNAL_SERVER_ERROR, SOMETHING_WENT_WRONG } from "utils/constants";
import { HttpStatusCodes } from "utils/enums";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Config, { NODE_ENV_TYPES } from "config";
import { getCookie, hideLoader } from "utils/helper";
import { toast } from "react-toastify";

axios.defaults.baseURL = Config.env.BaseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config);
    let isTokenRequired = true;
    if (config.url?.includes("/login")) {
      isTokenRequired = false;
    }
    if (isTokenRequired === true) {
      const token = getCookie("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.url) {
      config.headers["Cache-Control"] =
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0";
      config.headers.Pragma = "no-cache";
      config.headers.Expires = "0";
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoader();
    return response.data;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
      case HttpStatusCodes.BadRequest:
        break;
      case HttpStatusCodes.InternalServerError:
        if (Config.env.NodeEnv === NODE_ENV_TYPES.Development) {
          console.log(INTERNAL_SERVER_ERROR);
          toast.error(
            error.response?.data?.toString().split("\n")[0] || error.message
          );
        } else {
          console.log(SOMETHING_WENT_WRONG);
        }
        break;
      default:
        toast.error(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message,
        );
        break;
    }

    hideLoader();

    return Promise.reject(error);
  },
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};