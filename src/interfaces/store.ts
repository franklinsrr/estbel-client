import { IAuthSlice } from './auth';
import { AttendanceChartHistoryState } from './chart';
import { IBirthdaySlice } from './birthday';
import { IEventsTableState } from './events';

export type TStore = Omit<IAuthSlice, 'error'> &
  Omit<AttendanceChartHistoryState, 'historyError'> &
  Omit<IBirthdaySlice, 'error'> &
  Omit<IEventsTableState, 'eventsError'> &
  AttendanceChartHistoryState &
  IEventsTableState & {
    error:
      | IAuthSlice['error']
      | AttendanceChartHistoryState['historyError']
      | IBirthdaySlice['error']
      | IEventsTableState['eventsError'];
  };
