// src/utils/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api', // Base URL for your API routes
  // You can also set other default settings like headers, timeout, etc. here
});

export default axiosClient;