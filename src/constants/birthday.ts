import { IBirthdaySlice } from '@/interfaces/birthday';

// Obtener la fecha actual
const today = new Date();

export const CURRENT_MONTH = today.getMonth() + 1;

export const CURRENT_DAY = today.getDate();

export const INITIAL_BIRTHDAY_STATE: Omit<
  IBirthdaySlice,
  'getBirthdays' | 'clearBirthdays'
> = {
  birthday: [],
  isBirthdayLoading: false,
  birthdayError: null,
};
