import { IAuth, IAuthResponse } from '@/interfaces/auth';
import { AxiosInstance } from 'axios';
import { httpClient } from './httpClient';
import { IJWT } from '@/interfaces/jwt';
import { jwt } from '@/lib/jwt';

class HTTPAuthClient {
  constructor(
    private readonly httpClient: AxiosInstance,
    private readonly jwt: IJWT
  ) {}

  async login(email: string, password: string): Promise<IAuth> {
    const response = await this.httpClient.post<IAuthResponse>('/auth/login', {
      email,
      password,
    });

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
}

export const httpAuthClient = new HTTPAuthClient(httpClient, jwt);
