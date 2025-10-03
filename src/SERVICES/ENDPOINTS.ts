import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3005/api`;
const authBaseURL = `/auth`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ATH_URLS
export const AUTH_URLS = {
  LOGIN: `${authBaseURL}/login`,
  REGISTER: `${authBaseURL}/register`,
  FORGET_PASSWORD: `${authBaseURL}/forgot-password`,
  RESET_PASSWORD: `${authBaseURL}/reset-password`,
  CHANGE_PASSWORD: `${authBaseURL}/change-password`,
};