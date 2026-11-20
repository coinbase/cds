import { getFileComponents } from '@cds/figma-api';
import type { PublishedComponent } from '@figma/rest-api-spec';

import type { Component } from '../illustration';
import { parseComponentName } from '../parseComponentName';

import type { ComponentListing, InvalidComponent } from './IllustrationSource';

/** The URL Figma itself uses to link to a node: the node id with `:` replaced by `-`. */
export const figmaNodeUrl = (fileKey: string, nodeId: string) =>
  `https://www.figma.com/design/${fileKey}?node-id=${nodeId.replace(':', '-')}`;

/** Maps a component as the Figma REST API reports it to the sync's own record. */
export const toComponent = (component: PublishedComponent): Component => ({
  nodeId: component.node_id,
  ...parseComponentName(component.name),
  description: component.description,
  createdAt: component.created_at,
  updatedAt: component.updated_at,
  url: figmaNodeUrl(component.file_key, component.node_id),
});

/** Splits the published components into usable ones and ones whose name does not parse. */
export const toComponentListing = (published: PublishedComponent[]): ComponentListing => {
  const components: Component[] = [];
  const invalid: InvalidComponent[] = [];
  for (const component of published) {
    try {
      components.push(toComponent(component));
    } catch (error) {
      invalid.push({
        nodeId: component.node_id,
        name: component.name,
        url: figmaNodeUrl(component.file_key, component.node_id),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return { components, invalid };
};

/**
 * Lists every component published from the Figma file. This endpoint is cheap and carries all the
 * metadata the sync needs, so the much heavier node endpoints are never called.
 */
export async function fetchComponents(fileId: string): Promise<ComponentListing> {
  const response = await getFileComponents(fileId);
  return toComponentListing(response.meta.components);
}
