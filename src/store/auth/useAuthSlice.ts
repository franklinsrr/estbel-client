import { StateCreator } from 'zustand';
import { IAuthSlice, IAuth, IAuthError } from '@/interfaces/auth';
import { TStore } from '@/interfaces/store';
import { INITIAL_AUTH_STATE } from '@/constants/auth';
import { httpAuthClient } from '@/http/httpAuthClient';

/**
 * useAuthStore is a Zustand slice that manages the authentication state.
 * @returns {IAuthStore} The authentication slice.
 */
export const useAuthSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  IAuthSlice
> = set => ({
  ...INITIAL_AUTH_STATE,

  /**
   * Set the authentication state.
   * @param credentials - The credentials to set the authentication state.
   */
  setAuth: async (credentials: { username: string; password: string }) => {
    set({ isLoading: true });
    try {
      const res = await httpAuthClient.login(
        credentials.username,
        credentials.password
      );
      set({ auth: res, error: null, isLoading: false });
    } catch (error) {
      set({ error: error as IAuthError, isLoading: false });
    }
  },

  /**
   * Clear the authentication state.
   */
  clearAuth: () => {
    set({ auth: null, error: null });
  },

  /**
   * Set the authentication state synchronously.
   * @param auth - The authentication state to set.
   */
  setAuthSync: (auth: IAuth) => {
    set({ auth });
  },
});
