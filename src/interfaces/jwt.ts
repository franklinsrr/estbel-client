import { IAuth } from './auth';

export interface IJWT {
  decode(token: string): Promise<IAuth>;
}
