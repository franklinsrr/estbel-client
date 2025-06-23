import { IAuthStore } from '@/interfaces/auth';

/**
 * SIGNIN_DEFAULT_VALUES is the default values for the sign in form.
 * @type {TSignInSchema}
 */
export const SIGNIN_DEFAULT_VALUES = {
  email: '',
  password: '',
};

/**
 * FORGOT_PASSWORD_DEFAULT_VALUES is the default values for the forgot password form.
 * @type {TForgotPassworSchema}
 */
export const FORGOT_PASSWORD_DEFAULT_VALUES = {
  email: '',
};

/**
 * CHANGE_PASSWORD_DEFAULT_VALUES is the default values for the change password form.
 * @type {TChangePasswordSchema}
 */
export const CHANGE_PASSWORD_DEFAULT_VALUES = {
  provisionalPassword: '',
  newPassword: '',
};

/**
 * INITIAL_AUTH_STATE is the initial state for the authentication store.
 * @type {IAuthStore}
 */
export const INITIAL_AUTH_STATE: IAuthStore = {
  auth: null,
  setAuth: () => {},
  clearAuth: () => {},
};
