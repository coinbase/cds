/**
 * Finds the closest non-disabled node to the start index, searching forward and backward
 * @param valueNodes - The nodes to search through
 * @param startIndex - The index to start searching from
 * @returns The index of the closest non-disabled node or null if there are no non-disabled nodes
 */
export const findClosestNonDisabledNodeIndex = (
  valueNodes: HTMLElement[],
  startIndex: number,
): number | null => {
  let nextIndex = null;
  let prevIndex = null;

  for (let i = 0; i < valueNodes.length; i++) {
    const isDisabled = (valueNodes[i] as HTMLElement).hasAttribute('disabled');
    if (isDisabled) continue;
    if (i > startIndex && nextIndex === null) nextIndex = i;
    if (i < startIndex) prevIndex = i;
  }

  // If there are no non-disabled nodes, return null
  if (nextIndex === null && prevIndex === null) return null;

  // Return the closest non-disabled node
  if (nextIndex === null) return prevIndex;
  if (prevIndex === null) return nextIndex;
  return startIndex - prevIndex < nextIndex - startIndex ? prevIndex : nextIndex;
};
