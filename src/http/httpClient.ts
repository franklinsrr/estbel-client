import { useAuthStore } from '@/store/useAuth';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Configurar interceptor de request globalmente
httpClient.interceptors.request.use(
  config => {
    console.log('🔍 Interceptor ejecutándose...');

    // Primero intentar obtener del estado de Zustand
    const currentAuth = useAuthStore.getState().auth;

    if (currentAuth?.accessToken) {
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken || storedToken !== currentAuth.accessToken) {
        localStorage.setItem('accessToken', currentAuth.accessToken);
      }

      config.headers.Authorization = `Bearer ${currentAuth.accessToken}`;
    } else {
      // Fallback a localStorage
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
