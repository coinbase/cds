import { getFileComponents } from '@cds/figma-api';
import type { PublishedComponent } from '@figma/rest-api-spec';

import type { Component } from '../illustration';
import { parseComponentName } from '../parseComponentName';

/** Maps a component as the Figma REST API reports it to the sync's own record. */
export const toComponent = (component: PublishedComponent): Component => ({
  nodeId: component.node_id,
  ...parseComponentName(component.name),
  description: component.description,
  createdAt: component.created_at,
  updatedAt: component.updated_at,
});

/**
 * Lists every component published from the Figma file. This endpoint is cheap and carries all the
 * metadata the sync needs, so the much heavier node endpoints are never called.
 */
export async function fetchComponents(fileId: string): Promise<Component[]> {
  const response = await getFileComponents(fileId);
  return response.meta.components.map(toComponent);
}
