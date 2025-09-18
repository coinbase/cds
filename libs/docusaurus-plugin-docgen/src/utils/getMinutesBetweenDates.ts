export function getMinutesBetweenDates(startDate?: Date, endDate?: Date) {
  if (startDate && endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    return diff / 60000;
  }
  return 0;
}
