// src/axios.js
import axios from 'axios';

const instance = axios.create({
  // Đặt URL cơ bản cho API của bạn
  baseURL: 'http://localhost:5000',  // Cập nhật đúng địa chỉ API của bạn
  timeout: 1000,  // Thời gian timeout
});

// Bạn có thể cấu hình thêm headers hoặc interceptor tại đây nếu cần
instance.interceptors.request.use(
  (config) => {
    // Ví dụ: Thêm token vào headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
