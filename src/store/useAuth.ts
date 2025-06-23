import { create } from 'zustand';
import { IAuthStore } from '@/interfaces/auth';
import { INITIAL_AUTH_STATE } from '@/constants/auth';

/**
 * useAuthStore is a Zustand store that manages the authentication state.
 * @returns {IAuthStore} The authentication store.
 */
export const useAuthStore = create<IAuthStore>(set => ({
  ...INITIAL_AUTH_STATE,
  setAuth: auth => set({ auth }),
  clearAuth: () => set({ auth: null }),
}));
