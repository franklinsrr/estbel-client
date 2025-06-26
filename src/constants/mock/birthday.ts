import { IMember } from '@/interfaces/member';

/**
 * getStatusColor is a function that returns the color of the status of a birthday person.
 * @param {BirthdayPerson['status']} status - The status of the birthday person.
 * @returns {string} The color of the status of the birthday person.
 */
export const getStatusColor = (status: IMember['memberStatus']['name']) => {
  switch (status) {
    case 'miembro':
      return 'text-green-600 bg-green-100';
    case 'bautizado':
      return 'text-blue-600 bg-blue-100';
    case 'visitante':
      return 'text-orange-600 bg-orange-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
