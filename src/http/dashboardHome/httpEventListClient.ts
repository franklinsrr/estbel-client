import { AxiosInstance } from 'axios';
import { httpClient } from '../httpClient';
import { IEventRequestResponse } from '@/interfaces/events';
import { EventsAttendanceChartHistory } from '@/interfaces/chart';

/**
 * HttpEventListClient is a class that handles the HTTP requests for the event list.
 */
export class HttpEventListClient {
  constructor(private readonly httpClient: AxiosInstance) {}

  /**
   * Get the event list
   * @returns {Promise<IEventRequestResponse>} The event list
   */
  getEventList = async (): Promise<IEventRequestResponse> => {
    const response = await this.httpClient.get<IEventRequestResponse>(
      'stats/events-with-attendances'
    );
    return response.data;
  };

  /**
   * Get the events history comparison data
   * @returns {Promise<EventsAttendanceChartHistory[]>} The events history data
   */
  getEventsHistoryComparison = async (): Promise<
    EventsAttendanceChartHistory[]
  > => {
    const response = await this.httpClient.get<EventsAttendanceChartHistory[]>(
      'stats/attendance-chart/550e8400-e29b-41d4-a716-446655440001/550e8400-e29b-41d4-a716-446655440002'
    );
    return response.data;
  };
}

export const httpEventListClient = new HttpEventListClient(httpClient);
