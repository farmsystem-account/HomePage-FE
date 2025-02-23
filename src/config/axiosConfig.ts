import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN', // Replace with your token if needed
  },
});

export default axiosInstance;