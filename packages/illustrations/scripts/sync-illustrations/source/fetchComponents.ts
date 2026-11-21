import { getFileComponents } from '@cds/figma-api';
import { figmaNodeUrl } from '@cds/figma-api/syncReport';
import type { PublishedComponent } from '@figma/rest-api-spec';

import type { Component } from '../illustration';
import { parseComponentName } from '../parseComponentName';

import type { ComponentListing, InvalidComponent } from './IllustrationSource';

/** Maps a component as the Figma REST API reports it to the sync's own record. */
export const toComponent = (component: PublishedComponent): Component => ({
  nodeId: component.node_id,
  ...parseComponentName(component.name),
  description: component.description,
  createdAt: component.created_at,
  updatedAt: component.updated_at,
  url: figmaNodeUrl(component.file_key, component.node_id),
});

/**
 * Splits the published components into usable ones and ones the sync skips: a name that does not
 * parse, or, when `knownTypes` is given, a type that is not one of them.
 */
export const toComponentListing = (
  published: PublishedComponent[],
  knownTypes?: readonly string[],
): ComponentListing => {
  const components: Component[] = [];
  const invalid: InvalidComponent[] = [];
  const skip = (
    { node_id: nodeId, name, file_key: fileKey }: PublishedComponent,
    category: InvalidComponent['category'],
    message: string,
  ) => invalid.push({ nodeId, name, url: figmaNodeUrl(fileKey, nodeId), message, category });

  for (const component of published) {
    let parsed: Component;
    try {
      parsed = toComponent(component);
    } catch (error) {
      skip(component, 'invalid-name', error instanceof Error ? error.message : String(error));
      continue;
    }
    if (knownTypes && !knownTypes.includes(parsed.type)) {
      skip(
        component,
        'new-type',
        `The type "${parsed.type}" is not a synced type, so this component is not synced.`,
      );
      continue;
    }
    components.push(parsed);
  }
  return { components, invalid };
};

/**
 * Lists every component published from the Figma file. This endpoint is cheap and carries all the
 * metadata the sync needs, so the much heavier node endpoints are never called.
 */
export async function fetchComponents(
  fileId: string,
  knownTypes?: readonly string[],
): Promise<ComponentListing> {
  const response = await getFileComponents(fileId);
  return toComponentListing(response.meta.components, knownTypes);
}
