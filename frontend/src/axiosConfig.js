import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      console.error("Token missing!");
      return Promise.reject("No token");
    }

    config.headers.Authorization = `Bearer ${token}`;

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
      if (originalRequest.url.includes("/refresh")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const userObj = JSON.parse(localStorage.getItem("user"));

        const res = await API.post("/refresh", {
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
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default API;
