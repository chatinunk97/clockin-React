import axios from "axios";
import { BACKEND_URL } from "../../env";
import {
  getAccessToken,
  removeAccessToken,
  getAccessTokenDB,
  removeAccessTokenDB,
} from "../utils/local-storage";

axios.defaults.baseURL = BACKEND_URL;

export const clockAxios = axios.create();
export const dashboardAxios = axios.create();

clockAxios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clockAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeAccessToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

dashboardAxios.interceptors.request.use((config) => {
  const token = getAccessTokenDB();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

dashboardAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
      removeAccessTokenDB();
      window.location.href = "/manage/login";
    }
    return Promise.reject(error);
  }
);
