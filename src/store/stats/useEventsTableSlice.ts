import { StateCreator } from 'zustand';
import { TStore } from '@/interfaces/store';
import { IEventsTableState } from '@/interfaces/events';
import { httpEventListClient } from '@/http/dashboardHome/httpEventListClient';

/**
 * Initial state for the events table slice
 * Excludes the 'getEvents' function from the state interface
 */
const INITIAL_EVENTS_TABLE_STATE: Omit<IEventsTableState, 'getEvents'> = {
  events: [],
  isEventsLoading: false,
  eventsError: null,
};

/**
 * Zustand slice creator for managing events table state
 *
 * @param set - Zustand setter function to update the store state
 * @returns Events table state object with data and actions
 *
 * @example
 * ```typescript
 * const { events, isEventsLoading, eventsError, getEvents } = useStore();
 *
 * // Fetch events
 * await getEvents();
 * ```
 */
export const useEventsTableSlice: StateCreator<
  TStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  IEventsTableState
> = set => ({
  ...INITIAL_EVENTS_TABLE_STATE,

  /**
   * Fetches the list of events from the API
   * Updates loading state and handles errors appropriately
   *
   * @async
   * @function getEvents
   * @returns {Promise<void>} Promise that resolves when the fetch operation completes
   *
   * @throws {Error} When the API request fails
   *
   * @example
   * ```typescript
   * try {
   *   await getEvents();
   *   console.log('Events loaded successfully');
   * } catch (error) {
   *   console.error('Failed to load events:', error);
   * }
   * ```
   */
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
