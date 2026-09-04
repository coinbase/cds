import type { CellPriority } from '../types/CellBaseProps';

export const hasCellPriority = (
  priorityToMatch: CellPriority,
  priority?: CellPriority | CellPriority[],
) => {
  if (!priority) return false;
  if (Array.isArray(priority)) return priority.includes(priorityToMatch);
  return priority === priorityToMatch;
};
