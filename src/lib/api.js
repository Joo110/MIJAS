// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // مثال: http://localhost:9090
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

const AUTH_REGEX = /\/User\/(login|refresh-token|register)/i;

// ============ Refresh helper ============
async function doRefresh() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  // ✅ endpoint الصح
  const base = import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") || "";
  const url = `${base}/api/v1/User/refresh-token`;

  const { data } = await axios.post(
    url,
    { refreshToken },
    { headers: { "Content-Type": "application/json" }, withCredentials: false }
  );

  if (!data?.token) throw new Error("Refresh: no token in response");

  // ✅ خزّن التوكنات الجديدة
  localStorage.setItem("token", data.token);
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  return data.token;
}

// ============ Request interceptor ============
api.interceptors.request.use(
  (config) => {
    if (!AUTH_REGEX.test(config.url || "")) {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ Response interceptor ============
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const original = error.config || {};

    if (AUTH_REGEX.test(original.url || "")) {
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const newToken = await doRefresh();

        queue.forEach((p) => p.resolve(newToken));
        queue = [];
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        queue.forEach((p) => p.reject(e));
        queue = [];
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
