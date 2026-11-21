import type { GetFileComponentsResponse } from '@figma/rest-api-spec';

import { type Component, type Illustration } from '../illustration';
import { selectComponents } from '../select';
import { toComponent } from '../source/fetchComponents';

import componentsFixture from './__fixtures__/getFileComponents.json';

/** The real file's published components, as `FigmaSource` would report them. */
const components: Component[] = (
  componentsFixture as unknown as GetFileComponentsResponse
).meta.components.map(toComponent);

const previousFrom = (component: Component): Illustration => ({
  nodeId: component.nodeId,
  type: component.type,
  name: component.name,
  description: component.description,
  hash: 'hash',
  version: 0,
  width: 48,
  height: 48,
  createdAt: component.createdAt,
  lastUpdated: component.updatedAt,
});

describe('selectComponents', () => {
  it('syncs every component when there is no previous sync', () => {
    const { toSync, remoteNodeIds } = selectComponents({
      components,
      previous: [],
      fullCompare: false,
    });
    expect(toSync.length).toBe(remoteNodeIds.size);
  });

  it('only syncs components that are new or whose updatedAt differs from the manifest', () => {
    const [unchanged, changed, added] = components;
    const { toSync } = selectComponents({
      components: [unchanged, changed, added],
      previous: [previousFrom(unchanged), { ...previousFrom(changed), lastUpdated: '2020-01-01' }],
      fullCompare: false,
    });

    expect(toSync.map(({ nodeId }) => nodeId)).toEqual([changed.nodeId, added.nodeId]);
  });

  it('syncs a component whose name or type changed even when its updatedAt did not', () => {
    const [renamed, retyped, unchanged] = components;
    const { toSync } = selectComponents({
      components: [renamed, retyped, unchanged],
      previous: [
        { ...previousFrom(renamed), name: 'oldName' },
        { ...previousFrom(retyped), type: 'oldType' as Illustration['type'] },
        previousFrom(unchanged),
      ],
      fullCompare: false,
    });

    expect(toSync.map(({ nodeId }) => nodeId)).toEqual([renamed.nodeId, retyped.nodeId]);
  });

  it('syncs a component whose name only changes capitalization', () => {
    const [renamed] = components;
    const { toSync } = selectComponents({
      components: [{ ...renamed, name: renamed.name.toUpperCase() }],
      previous: [previousFrom(renamed)],
      fullCompare: false,
    });

    expect(toSync.map(({ nodeId }) => nodeId)).toEqual([renamed.nodeId]);
  });

  it('does not depend on the order or the age of the updates', () => {
    const [older, newer] = [...components].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    const { toSync } = selectComponents({
      components: [older, newer],
      previous: [
        { ...previousFrom(older), lastUpdated: '2099-01-01' },
        { ...previousFrom(newer), lastUpdated: '2099-01-01' },
      ],
      fullCompare: false,
    });

    expect(toSync).toHaveLength(2);
  });

  it('syncs everything even when the manifest is up to date when fullCompare is set', () => {
    const { toSync, remoteNodeIds } = selectComponents({
      components,
      previous: components.map(previousFrom),
      fullCompare: true,
    });
    expect(toSync.length).toBe(remoteNodeIds.size);
  });

  describe('duplicate type/name components', () => {
    const futures = () => components.filter(({ name }) => name === 'futures');

    it('exist in the real file fixture', () => {
      expect(futures()).toHaveLength(2);
    });

    it('keeps the oldest component when neither is known', () => {
      const { toSync, duplicates, remoteNodeIds } = selectComponents({
        components,
        previous: [],
        fullCompare: false,
      });
      const [older, newer] = [...futures()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      expect(toSync.filter(({ name }) => name === 'futures')).toEqual([older]);
      expect(duplicates).toContainEqual({ component: newer, keptBy: older });
      expect(remoteNodeIds.has(newer.nodeId)).toBe(false);
    });

    it('keeps the component the manifest already knows', () => {
      const [, newer] = [...futures()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const { toSync, duplicates } = selectComponents({
        components,
        previous: [{ ...previousFrom(newer), lastUpdated: '2020-01-01' }],
        fullCompare: false,
      });

      expect(toSync.filter(({ name }) => name === 'futures')).toEqual([newer]);
      expect(duplicates.map(({ component }) => component.name)).toEqual([
        'futures',
        'instoDecentralizedExchange',
      ]);
    });
  });
});
