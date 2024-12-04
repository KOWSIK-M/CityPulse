import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:2024/api", // Base URL for the API
});

// Add an interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (
      !config.url.includes("/users/register") &&
      !config.url.includes("/users/login") &&
      !config.url.includes("/users/updateProfile") &&
      !config.url.includes("/users/updatePassword") &&
      !config.url.includes("/feedbacks")
    ) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
