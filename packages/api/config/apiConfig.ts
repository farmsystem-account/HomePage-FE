/// <reference types="vite/client" />
import axios from "axios";

const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
  return baseUrl.endsWith("/") ? `${baseUrl}api/` : `${baseUrl}/api/`;
};

const API_BASE_URL = getApiBaseUrl();

const apiConfig = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiConfig;
