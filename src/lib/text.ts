import { IMember } from '@/interfaces/member';

/**
 * Truncate text to a maximum length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length of the text
 * @returns {string} The truncated text
 */
export const truncateText = (text: string, maxLength: number = 60): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get the status label
 * @param status - The status
 * @returns {string} The status label
 */
export const getStatusLabel = (status: IMember['memberStatus']['name']) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Format the birthday text
 * @param person - The person
 * @returns {string} The birthday text
 */
export const formatBirthayText = (person: IMember) => {
  return `Nombre: ${person.firstName} ${person.lastName}\nTeléfono: ${person.phone}\nEstado: ${getStatusLabel(person.memberStatus.name)}\nFecha de cumpleaños: ${person.birthdate}`;
};
