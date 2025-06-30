import { IMember } from './member';

export interface IBirthdaySlice {
  birthday: IMember[];
  isLoading: boolean;
  error: string | null;
  getBirthdays: () => Promise<void>;
  clearBirthdays: () => void;
}
