// utils/axios.js or directly in axios call
import axios from 'axios';

const axios = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // 👈 This is essential for CORS with auth
});

export default axios;
