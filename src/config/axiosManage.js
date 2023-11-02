import axios from "axios";
import { BACKEND_URL } from '../../env';
import { getAccessTokenDB, removeAccessTokenDB } from "../utils/local-storage";

axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use((config) => {
  const token = getAccessTokenDB();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeAccessTokenDB();
      window.location.href = "/manage/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
