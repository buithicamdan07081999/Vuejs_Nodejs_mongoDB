import axios from "@/axios";

// Base URL: /api/user đã được dùng trong main.js hoặc proxy
export const register = (name, email, password) => {
  return axios.post("/user/register", { name, email, password });
};

export const login = (email, password) => {
  return axios.post("/user/login", { email, password });
};

export const getProfile = () => {
  return axios.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateProfile = (data) => {
  return axios.put("/user/profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};