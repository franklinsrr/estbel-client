import { httpClient } from '../httpClient';
import { IEvent } from '@/interfaces/events';

export const getEventListClient = async (): Promise<IEvent> => {
  const response = await httpClient.get<IEvent>(
    '/stats/events-with-attendances'
  );
  return response.data;
};
