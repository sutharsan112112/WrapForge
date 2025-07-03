import axios from 'axios';

const axios = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if deployed
  headers: { 'Content-Type': 'application/json' },
});

export default axios;