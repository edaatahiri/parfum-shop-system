import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const userObj = JSON.parse(localStorage.getItem("user"));

        const res = await axios.post("http://localhost:5000/api/refresh", {
          userId: userObj?.id,
        });

        if (res.status === 200) {
          const { accessToken } = res.data;

          localStorage.setItem("token", accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        console.error("Session ka skaduar plotësisht:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
export default API;
