import axios from "axios";


//Lưu accessToken ở memory
let accessToken: string | null = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await api.post("/refresh-token");
        accessToken = res.data.accessToken;
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        console.log(e);
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export default api;
