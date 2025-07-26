import { StateCreator } from 'zustand';
import { IBirthdaySlice } from '@/interfaces/birthday';
import { TStore } from '@/interfaces/store';
import { INITIAL_BIRTHDAY_STATE } from '@/constants/birthday';
import { httpBirthdayClient } from '@/http/dashboardHome/httpBirthdayClient';

/**
 * Zustand slice creator for managing birthday list state
 *
 * @param set - Zustand setter function to update the store state
 * @returns Birthday slice state object with birthday data and actions
 *
 * @example
 * ```typescript
 * const { birthday, isLoading, error, getBirthdays, clearBirthdays } = useStore();
 *
 * // Fetch birthdays
 * await getBirthdays();
 *
 * // Clear birthday data
 * clearBirthdays();
 * ```
 */
export const useBirthdayListSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  IBirthdaySlice
> = set => ({
  ...INITIAL_BIRTHDAY_STATE,

  /**
   * Fetches the list of birthday people from the API
   * Updates loading state and handles errors appropriately
   *
   * @async
   * @function getBirthdays
   * @returns {Promise<void>} Promise that resolves when the fetch operation completes
   *
   * @throws {Error} When the API request fails
   *
   * @example
   * ```typescript
   * try {
   *   await getBirthdays();
   *   console.log('Birthdays loaded successfully');
   * } catch (error) {
   *   console.error('Failed to load birthdays:', error);
   * }
   * ```
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
   * Clears the birthday state, resetting birthday data and error state
   * Useful for cleanup or when switching contexts
   *
   * @function clearBirthdays
   * @returns {void}
   *
   * @example
   * ```typescript
   * // Clear all birthday data
   * clearBirthdays();
   * ```
   */
  clearBirthdays: () => {
    set({ birthday: [], error: null, isLoading: false });
  },
});
