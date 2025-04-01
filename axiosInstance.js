import axios from 'axios';

// Create an axios instance with the base URL from the .env file
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // This will use the API URL from your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default axiosInstance;
