import axios from 'axios';

const axios = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust to your backend
});

export default axios;