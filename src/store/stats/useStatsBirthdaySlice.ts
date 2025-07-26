import { StateCreator } from 'zustand';
import { IBirthdaySlice } from '@/interfaces/birthday';
import { TStore } from '@/interfaces/store';
import { INITIAL_BIRTHDAY_STATE } from '@/constants/birthday';
import { httpBirthdayClient } from '@/http/dashboardHome/httpBirthdayClient';

/**
 * useStatsBirthdaySlice is a Zustand slice that manages the birthday state.
 */
export const useStatsBirthdaySlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  IBirthdaySlice
> = set => ({
  ...INITIAL_BIRTHDAY_STATE,

  /**
   * Get the birthday people
   */
  getBirthdays: async () => {
    set({ isLoading: true });
    try {
      const res = await httpBirthdayClient.getBirthday();
      set({ birthday: res, error: null, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: errorMessage, isLoading: false });
    }
  },

  /**
   * Clear the birthday state.
   */
  clearBirthdays: () => {
    set({ birthday: [], error: null });
  },
});
