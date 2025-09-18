/**
 * Converts a Date to an ISO 8601 string (YYYY-MM-DD) in the local timezone (not UTC)
 */
export const getISOStringLocal = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};
