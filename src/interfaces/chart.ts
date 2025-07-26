export interface EventsAttendanceChartHistory {
  date: string;
  event1: number;
  event2: number;
}

export interface AttendanceChartHistoryState {
  historyError: string | null;
  isHistoryLoading: boolean;
  history: EventsAttendanceChartHistory[];
  getEventsAttendanceChartHistory: () => Promise<void>;
}
