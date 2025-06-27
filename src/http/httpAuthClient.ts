import { IAuth, IAuthRequestResponse } from '@/interfaces/auth';
import { AxiosInstance } from 'axios';
import { httpClient } from './httpClient';
import { IJWT } from '@/interfaces/jwt';
import { jwt } from '@/lib/jwt';

class HTTPAuthClient {
  constructor(
    private readonly httpClient: AxiosInstance,
    private readonly jwt: IJWT
  ) {}

  /**
   * Login the user
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<IAuth>} The user's auth
   */
  async login(email: string, password: string): Promise<IAuth> {
    const response = await this.httpClient.post<IAuthRequestResponse>(
      '/auth/login',
      {
        email,
        password,
      }
    );

    const token = response.data.accessToken;
    const decoded = (await this.jwt.decode(token)) as unknown as {
      sub: string;
      iat: number;
      exp: number;
    };
    return {
      accessToken: token,
      decodedToken: decoded,
    };
  }

  /**
   * Refresh the access token using the refresh token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<IAuth>} The new auth with refreshed tokens
   */
  async refreshToken(refreshToken: string): Promise<IAuth> {
    const response = await this.httpClient.post<IAuthRequestResponse>(
      '/auth/refresh-token',
      {
        refreshToken,
      }
    );

    const token = response.data.accessToken;
    const decoded = (await this.jwt.decode(token)) as unknown as {
      sub: string;
      iat: number;
      exp: number;
    };

    return {
      accessToken: token,
      decodedToken: decoded,
    };
  }

  async logout() {
    await this.httpClient.post('/auth/logout');
  }
}

export const httpAuthClient = new HTTPAuthClient(httpClient, jwt);
