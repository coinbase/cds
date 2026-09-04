/**
 * Generates an array of Dates for a calendar month. Not localized with Intl. Assumes a Gregorian calendar with "en-US" DateTimeFormat. Treats Sunday as the first day of the week.
 */
export const generateCalendarMonth = (seedDate: Date) => {
  const firstOfMonth = new Date(seedDate.getFullYear(), seedDate.getMonth(), 1);

  const firstOfCalendar = new Date(
    firstOfMonth.getFullYear(),
    firstOfMonth.getMonth(),
    1 - firstOfMonth.getDay(),
  );

  const daysInMonth = new Date(
    firstOfMonth.getFullYear(),
    firstOfMonth.getMonth() + 1,
    0,
  ).getDate();

  const daysFromNextMonth = 7 - ((daysInMonth + firstOfMonth.getDay()) % 7);

  const month = [];

  for (let i = 0; i < firstOfMonth.getDay(); i++) {
    month.push(
      new Date(
        firstOfCalendar.getFullYear(),
        firstOfCalendar.getMonth(),
        firstOfCalendar.getDate() + i,
      ),
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    month.push(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), i));
  }

  if (daysFromNextMonth !== 7) {
    for (let i = 1; i <= daysFromNextMonth; i++) {
      month.push(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1, i));
    }
  }

  return month;
};
