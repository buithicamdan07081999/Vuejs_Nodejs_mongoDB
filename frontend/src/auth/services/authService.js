// authService.js
import axios from 'axios'

const APIUser = 'http://localhost:5000/api/user'
const APIAdmin = 'http://localhost:5000/api/admin'

export const login = (email, password) =>
  axios.post(`${APIUser}/login`, { email, password })
export const register = (email, password) =>
  axios.post(`${APIUser}/register`, { email, password })
  
export const loginAdmin = (email, password) =>
  axios.post(`${APIAdmin}/login`, { email, password })
export const registerAdmin = (email, password) =>
  axios.post(`${APIAdmin}/register`, { email, password })