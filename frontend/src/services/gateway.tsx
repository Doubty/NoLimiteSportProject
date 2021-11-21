import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://nls-gateway.herokuapp.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getListEvents() {
  return api.get("/eventos");
}

export default api;
