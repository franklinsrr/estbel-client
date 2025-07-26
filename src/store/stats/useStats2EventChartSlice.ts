import { StateCreator } from 'zustand';
import { TStore } from '@/interfaces/store';
import { INITIAL_STATS2_EVENT_CHART_STATE } from '@/constants/stats';
import { AttendanceChartHistoryState } from '@/interfaces/chart';
import { httpEventListClient } from '@/http/dashboardHome/httpEventListClient';

export const useStats2EventChartSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  AttendanceChartHistoryState
> = set => ({
  ...INITIAL_STATS2_EVENT_CHART_STATE,

  getEventsAttendanceChartHistory: async () => {
    set({ isHistoryLoading: true });
    try {
      const res = await httpEventListClient.getEventsHistoryComparison();
      console.log('Chart slice - API response:', res);
      // The API already returns an array in the correct format
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
