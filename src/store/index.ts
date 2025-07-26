import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { TStore } from '@/interfaces/store';
import { useAuthSlice } from './auth/useAuthSlice';
import { useStats2EventChartSlice } from './stats/useStats2EventChartSlice';
import { useStatsBirthdaySlice } from './stats/useStatsBirthdaySlice';
import { useEventsTableSlice } from './stats/useEventsTableSlice';

/**
 * useStore is a Zustand store that combines all the slices.
 * @returns {TStore} The store.
 */
export const useStore = create<TStore>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...useAuthSlice(...a),
      ...useStats2EventChartSlice(...a),
      ...useStatsBirthdaySlice(...a),
      ...useEventsTableSlice(...a),
    }))
  )
);
