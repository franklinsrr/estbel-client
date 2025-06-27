import * as z from 'zod';
import { forgotPasswordSchema, formSignInSchema } from '@/schemas/auth';

export type TSignInSchema = z.infer<typeof formSignInSchema>;
export type TForgotPassworSchema = z.infer<typeof forgotPasswordSchema>;

export interface TChangePasswordSchema {
  provisionalPassword: string;
  newPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthError {
  message: string;
  error: string;
  statusCode: number;
}

export interface IAuth {
  accessToken: string;
  decodedToken: {
    sub: string;
    iat: number;
    exp: number;
  };
}

export interface IAuthStore {
  auth: IAuth | null;
  setAuth: (auth: IAuth) => void;
  clearAuth: () => void;
}
