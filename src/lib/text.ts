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
