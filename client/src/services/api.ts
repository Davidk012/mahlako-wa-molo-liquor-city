import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth endpoints
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
  logout: () => api.post('/auth/logout'),
};

// Equipment endpoints
export const equipmentAPI = {
  getAll: (params?: any) => api.get('/equipment', { params }),
  getById: (id: string) => api.get(`/equipment/${id}`),
  create: (equipmentData: any) => api.post('/equipment', equipmentData),
  update: (id: string, equipmentData: any) => api.put(`/equipment/${id}`, equipmentData),
  delete: (id: string) => api.delete(`/equipment/${id}`),
  checkAvailability: (equipmentId: string, date: string, quantity: number) =>
    api.get(`/equipment/${equipmentId}/availability`, { params: { date, quantity } }),
};

// Package endpoints
export const packageAPI = {
  getAll: (params?: any) => api.get('/packages', { params }),
  getById: (id: string) => api.get(`/packages/${id}`),
  create: (packageData: any) => api.post('/packages', packageData),
  update: (id: string, packageData: any) => api.put(`/packages/${id}`, packageData),
  delete: (id: string) => api.delete(`/packages/${id}`),
  checkAvailability: (packageId: string, date: string) =>
    api.get(`/packages/${packageId}/availability`, { params: { date } }),
};

// Booking endpoints
export const bookingAPI = {
  getAll: (params?: any) => api.get('/bookings', { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  create: (bookingData: any) => api.post('/bookings', bookingData),
  update: (id: string, bookingData: any) => api.put(`/bookings/${id}`, bookingData),
  delete: (id: string) => api.delete(`/bookings/${id}`),
  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/bookings/${id}/status`, { status, notes }),
  getClientBookings: (clientId: string) => api.get(`/bookings/client/${clientId}`),
  getStaffBookings: (staffId: string) => api.get(`/bookings/staff/${staffId}`),
  calculateQuote: (bookingData: any) => api.post('/bookings/quote', bookingData),
};

// Admin endpoints
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  updateUser: (id: string, userData: any) => api.put(`/admin/users/${id}`, userData),
  getReports: (type: string, params?: any) => api.get(`/admin/reports/${type}`, { params }),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings: any) => api.put('/admin/settings', settings),
};

// Payment endpoints
export const paymentAPI = {
  initiatePayment: (paymentData: any) => api.post('/payment/initiate', paymentData),
  verifyPayment: (paymentId: string) => api.get(`/payment/verify/${paymentId}`),
  getPaymentHistory: (bookingId: string) => api.get(`/payment/history/${bookingId}`),
};

// Notification endpoints
export const notificationAPI = {
  sendWhatsApp: (messageData: any) => api.post('/notifications/whatsapp', messageData),
  sendEmail: (emailData: any) => api.post('/notifications/email', emailData),
  getNotifications: (userId: string) => api.get(`/notifications/${userId}`),
  markAsRead: (notificationId: string) => api.patch(`/notifications/${notificationId}/read`),
};

export default api;
