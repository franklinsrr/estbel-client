import { httpClient } from '@/http/httpClient';
import { IMember } from '@/interfaces/member';
import { CURRENT_MONTH, CURRENT_DAY } from '@/constants/birthday';

export const httpBirthdayClient = {
  /**
   * Get the birthday people
   * @returns {Promise<IMember[]>} The birthday people
   */
  getBirthday: async (): Promise<IMember[]> => {
    const res = await httpClient.get<IMember[]>(
      `/stats/birthday/${CURRENT_MONTH}/${CURRENT_DAY}`
    );
    return res.data;
  },
};
