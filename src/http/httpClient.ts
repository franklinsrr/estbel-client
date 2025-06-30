import { useStore } from '@/store';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Configurar interceptor de request globalmente
httpClient.interceptors.request.use(
  config => {
    // Primero intentar obtener del estado de Zustand
    const currentAuth = useStore.getState().auth;

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

// Configurar interceptor de respuesta para manejar refresh token
httpClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    console.log('originalRequest._retry ', originalRequest._retry);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Obtener el access token actual
        const authState = useStore.getState().auth;
        const currentAccessToken =
          authState?.accessToken || localStorage.getItem('accessToken');

        // Hacer petición para renovar el token usando axios directamente (sin interceptors)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/refresh-token`,
          {
            accessToken: currentAccessToken,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${currentAccessToken}`,
            },
          }
        );

        // Actualizar el estado y localStorage con el nuevo access token
        const currentAuth = useStore.getState().auth;
        const newAuth = {
          accessToken: response.data.accessToken,
          decodedToken: currentAuth?.decodedToken || {
            sub: '',
            iat: 0,
            exp: 0,
          },
        };

        localStorage.setItem('accessToken', response.data.accessToken);
        useStore.getState().setAuthSync(newAuth);

        // Reintentar la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error('Error al renovar el token:', refreshError);
        useStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
