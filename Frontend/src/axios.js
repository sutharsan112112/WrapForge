import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Update if hosted elsewhere
});

export default axios;
