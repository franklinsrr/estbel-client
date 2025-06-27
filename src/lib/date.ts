/**
 * Convert a string or Date object to a Date object
 * @param {string | Date} dateString - The date string or Date object to convert
 * @returns {Date} The converted Date object
 */
export const convertToDate = (dateString: string | Date): Date => {
  return typeof dateString === 'string' ? new Date(dateString) : dateString;
};
