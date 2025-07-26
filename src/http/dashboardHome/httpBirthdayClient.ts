import { httpClient } from '@/http/httpClient';
import { IMember } from '@/interfaces/member';
import { CURRENT_MONTH, CURRENT_DAY } from '@/constants/birthday';
import { AxiosInstance } from 'axios';

/**
 * HttpBirthdayClient is a class that handles the HTTP requests for the birthday.
 */
export class HttpBirthdayClient {
  constructor(private readonly httpClient: AxiosInstance) {}

  /**
   * Get the birthday people
   * @returns {Promise<IMember[]>} The birthday people
   */
  getBirthday = async (): Promise<IMember[]> => {
    const res = await this.httpClient.get<IMember[]>(
      `/stats/birthday/${CURRENT_MONTH}/${CURRENT_DAY}`
    );
    return res.data;
  };
}

export const httpBirthdayClient = new HttpBirthdayClient(httpClient);
