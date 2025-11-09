import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
});

// ✅ Always attach token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔑 Attaching token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
