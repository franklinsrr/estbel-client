import { StateCreator } from 'zustand';
import { TStore } from '@/interfaces/store';
import { INITIAL_STATS2_EVENT_CHART_STATE } from '@/constants/stats';
import { AttendanceChartHistoryState } from '@/interfaces/chart';
import { httpEventListClient } from '@/http/dashboardHome/httpEventListClient';

/**
 * Zustand slice creator for managing event chart state and attendance history
 *
 * @param set - Zustand setter function to update the store state
 * @returns Event chart state object with attendance history data and actions
 *
 * @example
 * ```typescript
 * const { history, isHistoryLoading, historyError, getEventsAttendanceChartHistory } = useStore();
 *
 * // Fetch attendance chart history
 * await getEventsAttendanceChartHistory();
 * ```
 */
export const useEventChartSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  AttendanceChartHistoryState
> = set => ({
  ...INITIAL_STATS2_EVENT_CHART_STATE,

  /**
   * Fetches events attendance chart history data from the API
   * Updates loading state and handles errors appropriately
   *
   * @async
   * @function getEventsAttendanceChartHistory
   * @returns {Promise<void>} Promise that resolves when the fetch operation completes
   *
   * @throws {Error} When the API request fails
   *
   * @example
   * ```typescript
   * try {
   *   await getEventsAttendanceChartHistory();
   *   console.log('Chart history loaded successfully');
   * } catch (error) {
   *   console.error('Failed to load chart history:', error);
   * }
   * ```
   */
  getEventsAttendanceChartHistory: async () => {
    set({ isHistoryLoading: true });
    try {
      const res = await httpEventListClient.getEventsHistoryComparison();

      set({
        history: res,
        historyError: null,
        isHistoryLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      set({ historyError: errorMessage, isHistoryLoading: false });
    }
  },
});
