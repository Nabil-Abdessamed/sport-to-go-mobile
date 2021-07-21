import axios from "axios";
import { store } from "@redux/stores";

const ACCEPT = "application/json";
const CONTENT_TYPE = "Content-Type";
export const BASE_URL = "https://sport-to-go-api.herokuapp.com";

const baseConfig = {
  baseURL: BASE_URL,
  timeout: 15000,
};

export function getAuthorization() {
  const state = store.getState();
  const {
    auth: { token },
  } = state;
  return "Bearer " + token;
}

export const authApiConfig = axios.create(baseConfig);
authApiConfig.interceptors.request.use(
  (config) => {
    config.headers.common["Accept"] = ACCEPT;
    config.headers.common["Content-Type"] = CONTENT_TYPE;
    return config;
  },
  (error) => {
    return error;
  }
);

authApiConfig.interceptors.response.use(
  (success) => {
    return {
      data: success.data,
      status: success.status,
    };
  },
  (error) => {
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
    return {
      data: "Internal Server Error",
      status: 500,
    };
  }
);

export const globalApiConfig = axios.create(baseConfig);
globalApiConfig.interceptors.request.use(
  (config) => {
    const Authorization = getAuthorization();
    config.headers.common["Accept"] = ACCEPT;
    config.headers.common["Content-Type"] = CONTENT_TYPE;
    config.headers.common["Authorization"] = Authorization;
    return config;
  },
  (error) => error
);

globalApiConfig.interceptors.response.use(
  (success) => {
    return {
      data: success.data,
      status: success.status,
    };
  },
  (error) => {
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
    return {
      data: "Internal Server Error",
      status: 500,
    };
  }
);

export const fileApiConfig = axios.create(baseConfig);
fileApiConfig.interceptors.request.use(
  (config) => {
    const Authorization = getAuthorization();
    config.headers.common["Accept"] = ACCEPT;
    config.headers.common["responseType"] = "stream";
    config.headers.common["Authorization"] = Authorization;
    return config;
  },
  (error) => error
);
