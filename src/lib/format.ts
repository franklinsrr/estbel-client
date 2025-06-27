/**
 * Get a consistent color for an event name
 * @param {string} eventName - The event name to get a color for
 * @returns {string} The color for the event name
 */
export const getEventNameColor = (eventName: string): string => {
  const colors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
  ];

  // Create a simple hash of the event name to ensure consistency
  let hash = 0;
  for (let i = 0; i < eventName.length; i++) {
    const char = eventName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return colors[Math.abs(hash) % colors.length];
};
