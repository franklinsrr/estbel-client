import { httpClient } from '../httpClient';
import { IEventRequestResponse } from '@/interfaces/events';

export const getEventListClient = async (): Promise<IEventRequestResponse> => {
  const response = await httpClient.get<IEventRequestResponse>(
    '/stats/events-with-attendances'
  );
  return response.data;
};
