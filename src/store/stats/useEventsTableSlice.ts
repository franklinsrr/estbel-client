import { StateCreator } from 'zustand';
import { TStore } from '@/interfaces/store';
import { IEventsTableState } from '@/interfaces/events';
import { httpEventListClient } from '@/http/dashboardHome/httpEventListClient';

const INITIAL_EVENTS_TABLE_STATE: Omit<IEventsTableState, 'getEvents'> = {
  events: [],
  isEventsLoading: false,
  eventsError: null,
};

export const useEventsTableSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  IEventsTableState
> = set => ({
  ...INITIAL_EVENTS_TABLE_STATE,

  getEvents: async () => {
    set({ isEventsLoading: true });
    try {
      const res = await httpEventListClient.getEventList();
      set({
        events: res.events,
        eventsError: null,
        isEventsLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      set({ eventsError: errorMessage, isEventsLoading: false });
    }
  },
});
