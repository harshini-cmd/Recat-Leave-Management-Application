import axios from 'axios';

// Create a custom Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace this with your actual API base URL
});

export default api;