import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://citypulsebackend.onrender.com/api", // Base URL for the API
});

// Add an interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (
      !config.url.includes("/users/register") &&
      !config.url.includes("/users/login") &&
      !config.url.includes("/admin/login") &&
      !config.url.includes("/users/updateProfile") &&
      !config.url.includes("/users/updatePassword") &&
      !config.url.includes("/feedbacks*") &&
      !config.url.includes("/admin/count") &&
      !config.url.includes("/admin/feedback-count") &&
      !config.url.includes("/admin/allusers") &&
      !config.url.includes("/admin/allfeedbacks") &&
      !config.url.includes("/admin/approve/*") &&
      !config.url.includes("/admin/unapproved") &&
      !config.url.includes("/admin/status*") &&
      !config.url.includes("/forums/like/*") &&
      !config.url.includes("/forums/comment") &&
      !config.url.includes("/forums/all")
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
