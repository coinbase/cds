export const sortByCreatedAt = (
  a: { createdAt: string; name: string },
  b: { createdAt: string; name: string },
) => {
  const prevDate = new Date(a.createdAt).valueOf();
  const nextDate = new Date(b.createdAt).valueOf();
  const dateDiff = prevDate - nextDate;
  return dateDiff !== 0 ? dateDiff : a.name.localeCompare(b.name);
};
