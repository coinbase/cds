import { getFileComponentSets } from '@cds/figma-api';

import type { ComponentSet } from './IconSource';

/** Lists every component set published from the Figma file. The endpoint is cheap. */
export async function fetchComponentSets(fileId: string): Promise<ComponentSet[]> {
  const response = await getFileComponentSets(fileId);
  return response.meta.component_sets;
}
