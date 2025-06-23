import { useAuthStore } from '@/store/useAuth';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

httpClient.interceptors.request.use(config => {
  const auth = useAuthStore.getState().auth;

  if (auth) {
    localStorage.setItem('accessToken', JSON.stringify(auth));
  }

  const accessToken = localStorage.getItem('accessToken') || auth?.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
