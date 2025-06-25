import * as jose from 'jose';
import { IAuth } from '@/interfaces/auth';

export class JWT {
  async decode(token: string): Promise<IAuth> {
    const payload = jose.decodeJwt(token);
    return payload as unknown as IAuth;
  }
}

export const jwt = new JWT();
