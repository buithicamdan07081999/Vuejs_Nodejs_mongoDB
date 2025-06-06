// authService.js
import axios from '@/axios'

export const login = (email, password) =>
  axios.post('/user/login', { email, password })

export const register = (email, password) =>
  axios.post('/user/register', { email, password })

export const loginAdmin = (email, password) =>
  axios.post('/admin/login', { email, password })

export const registerAdmin = (email, password) =>
  axios.post('/admin/register', { email, password })