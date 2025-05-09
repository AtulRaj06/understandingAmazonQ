import axios from 'axios';
import { logger } from '../utils/logger';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    // Log the request
    logger.info(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    logger.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    // Log the successful response
    logger.info(`API Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    // Log the error response
    if (error.response) {
      logger.error('API Error Response:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data,
      });
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      logger.error('API No Response:', { request: error.request });
    } else {
      // Something happened in setting up the request
      logger.error('API Request Setup Error:', { message: error.message });
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check endpoint
  getHealth: () => api.get('/health'),
  
  // Example CRUD operations for a resource
  getItems: () => api.get('/items'),
  getItem: (id) => api.get(`/items/${id}`),
  createItem: (data) => api.post('/items', data),
  updateItem: (id, data) => api.put(`/items/${id}`, data),
  deleteItem: (id) => api.delete(`/items/${id}`),
  
  // Example authentication methods
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};