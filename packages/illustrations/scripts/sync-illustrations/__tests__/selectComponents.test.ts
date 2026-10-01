import type { GetFileComponentsResponse } from '@figma/rest-api-spec';

import { type Component, type Illustration } from '../illustration';
import { selectComponents } from '../selectComponents';
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
      lastUpdated: '',
      syncAll: false,
    });
    expect(toSync.length).toBe(remoteNodeIds.size);
  });

  it('only syncs components updated after the last sync', () => {
    const lastUpdated = '2026-01-01T00:00:00.000Z';
    const { toSync } = selectComponents({ components, previous: [], lastUpdated, syncAll: false });

    expect(toSync.length).toBeGreaterThan(0);
    expect(toSync.every(({ updatedAt }) => updatedAt > lastUpdated)).toBe(true);
    expect(toSync.map(({ name }) => name)).not.toContain('baseErrorMedium');
  });

  it('syncs everything regardless of dates when syncAll is set', () => {
    const { toSync, remoteNodeIds } = selectComponents({
      components,
      previous: [],
      lastUpdated: '2099-01-01T00:00:00.000Z',
      syncAll: true,
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
        lastUpdated: '',
        syncAll: false,
      });
      const [older, newer] = [...futures()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      expect(toSync.filter(({ name }) => name === 'futures')).toEqual([older]);
      expect(duplicates).toContainEqual(newer);
      expect(remoteNodeIds.has(newer.nodeId)).toBe(false);
    });

    it('keeps the component the manifest already knows', () => {
      const [, newer] = [...futures()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const { toSync, duplicates } = selectComponents({
        components,
        previous: [previousFrom(newer)],
        lastUpdated: '',
        syncAll: false,
      });

      expect(toSync.filter(({ name }) => name === 'futures')).toEqual([newer]);
      expect(duplicates.map(({ name }) => name)).toEqual(['futures', 'instoDecentralizedExchange']);
    });
  });
});
