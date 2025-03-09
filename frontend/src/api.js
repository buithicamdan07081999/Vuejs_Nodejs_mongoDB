import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Địa chỉ backend
});

export default API;
