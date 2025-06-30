import * as z from 'zod';
import { forgotPasswordSchema, formSignInSchema } from '@/schemas/auth';

export type TSignInSchema = z.infer<typeof formSignInSchema>;
export type TForgotPassworSchema = z.infer<typeof forgotPasswordSchema>;

export interface TChangePasswordSchema {
  provisionalPassword: string;
  newPassword: string;
}

export interface IAuthRequestResponse {
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

export interface IAuthSlice {
  auth: IAuth | null;
  isLoading: boolean;
  error: IAuthError | null;
  setAuth: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  setAuthSync: (auth: IAuth) => void;
  clearAuth: () => void;
}
