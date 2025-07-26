import { IMember } from './member';

export interface IBirthdaySlice {
  birthday: IMember[];
  isBirthdayLoading: boolean;
  birthdayError: string | null;
  getBirthdays: () => Promise<void>;
  clearBirthdays: () => void;
}
