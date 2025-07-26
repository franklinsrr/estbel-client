import { AttendanceChartHistoryState } from '@/interfaces/chart';

export const INITIAL_STATS2_EVENT_CHART_STATE: AttendanceChartHistoryState = {
  historyError: null,
  isHistoryLoading: false,
  history: [],
  getEventsAttendanceChartHistory: () => Promise.resolve(),
};
