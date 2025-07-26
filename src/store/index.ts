import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { TStore } from '@/interfaces/store';
import { useAuthSlice } from './auth/useAuthSlice';
import { useEventChartSlice } from './stats/useEventChartSlice';
import { useBirthdayListSlice } from './stats/useBirthdayListSlice';
import { useEventsTableSlice } from './stats/useEventsTableSlice';

/**
 * useStore is a Zustand store that combines all the slices.
 * @returns {TStore} The store.
 */
export const useStore = create<TStore>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...useAuthSlice(...a),
      ...useEventChartSlice(...a),
      ...useBirthdayListSlice(...a),
      ...useEventsTableSlice(...a),
    }))
  )
);
