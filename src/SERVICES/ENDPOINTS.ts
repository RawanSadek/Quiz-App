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
      config.headers.Authorization = `Bearer ${token}`;
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

// QUESTIONS_URLS
export const QUESTIONS_URLS = {
  GET_ALL: `${baseURL}/question`,
  CREATE_QUESTION: `${baseURL}/question`,
  SEARCH: `${baseURL}/question/search`,
  GET_BY_ID: (id:string)=> `${baseURL}/question/${id}`,
  UPDATE_QUESTION: (id:string)=> `${baseURL}/question/${id}`,
  DELETE_QUESTION: (id:string)=> `${baseURL}/question/${id}`,
};
// RESULTS_URL
export const RESULTS_URLS = {
  GET_ALL: `${baseURL}/quiz/result`,
  GET_BY_ID: (id:string)=> `${baseURL}/quiz/result/${id}`,
};