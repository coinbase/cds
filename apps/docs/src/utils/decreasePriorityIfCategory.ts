import type { KBarAction, KBarCustomAction } from '@coinbase/docusaurus-plugin-kbar/types';

export default function decreasePriorityIfCategory<T extends KBarAction | KBarCustomAction>(
  item: T,
) {
  return item.parent ? item : { ...item, priority: -1 };
}
