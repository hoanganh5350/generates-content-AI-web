import axios from "axios";
import { store } from "../app/store"; 
import { clearAccessToken, setAccessToken } from "../features/auth/authSlice";

let isRefreshing = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    // Ngăn vòng lặp nếu lỗi là từ chính đường /refresh-token
    if (
      err.response?.status === 401 &&
      !original._retry &&
      original.url !== '/auth/refresh-token'
    ) {
      if (isRefreshing) return Promise.reject(err);
      original._retry = true;
      isRefreshing = true;
      try {
        const res = await api.post('/auth/refresh-token');
        store.dispatch(setAccessToken(res.data.accessToken));
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch {
        store.dispatch(clearAccessToken());
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);


export default api;
