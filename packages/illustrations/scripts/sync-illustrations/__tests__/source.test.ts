import type { GetFileComponentsResponse } from '@figma/rest-api-spec';

import { illustrationTypes } from '../profile';
import { toComponent, toComponentListing } from '../source/fetchComponents';
import { InMemorySource } from '../source/InMemorySource';

import componentsFixture from './__fixtures__/getFileComponents.json';

const figmaComponents = (componentsFixture as unknown as GetFileComponentsResponse).meta.components;

describe('FigmaSource component mapping', () => {
  it('finds every component of the real Figma response usable', () => {
    expect(toComponentListing(figmaComponents).invalid).toEqual([]);
  });

  it('finds every type of the real Figma response among the synced types', () => {
    expect(toComponentListing(figmaComponents, illustrationTypes).invalid).toEqual([]);
  });

  it('does not sync a component of a type that is not listed, and says why', () => {
    const [first] = figmaComponents;
    const { components, invalid } = toComponentListing(
      [first, { ...first, node_id: '2:1', name: 'Spot Wide/someName' }],
      illustrationTypes,
    );

    expect(components.map(({ nodeId }) => nodeId)).toEqual([first.node_id]);
    expect(invalid).toEqual([
      {
        nodeId: '2:1',
        name: 'Spot Wide/someName',
        url: expect.stringContaining('node-id=2-1'),
        message: expect.stringContaining('The type "spotWide" is not a synced type'),
        category: 'new-type',
      },
    ]);
  });

  it('syncs every type when no list is given', () => {
    const [first] = figmaComponents;
    expect(toComponentListing([{ ...first, name: 'Spot Wide/someName' }]).components).toHaveLength(
      1,
    );
  });

  it('lists a component with an unusable name separately instead of failing the listing', () => {
    const [first] = figmaComponents;
    const { components, invalid } = toComponentListing([
      { ...first, node_id: '1:1', name: 'Not a type' },
      first,
      { ...first, node_id: '1:2', name: 'Spot Icon/bad_name' },
    ]);

    expect(components.map(({ nodeId }) => nodeId)).toEqual([first.node_id]);
    expect(invalid).toEqual([
      {
        nodeId: '1:1',
        name: 'Not a type',
        url: expect.stringContaining('node-id=1-1'),
        message: expect.stringContaining('is not in [type]/[name] format'),
        category: 'invalid-name',
      },
      {
        nodeId: '1:2',
        name: 'Spot Icon/bad_name',
        url: expect.stringContaining('node-id=1-2'),
        message: expect.stringContaining('is not camelCase'),
        category: 'invalid-name',
      },
    ]);
  });

  it('maps every published component from the real Figma response', () => {
    const components = figmaComponents.map(toComponent);
    expect(components).toHaveLength(figmaComponents.length);
    expect(components.find(({ nodeId }) => nodeId === '4390:695')).toEqual({
      nodeId: '4390:695',
      type: 'spotIcon',
      name: '2fa',
      description: 'trust, true, genuine, actual, verification, 2fa, authenticate, device',
      createdAt: '2023-11-07T19:19:47.073Z',
      updatedAt: '2026-06-08T19:45:06.046Z',
      url: 'https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99?node-id=4390-695',
    });
  });

  it('normalizes the type across the naming variants design uses', () => {
    const prefixes = new Set(figmaComponents.map(({ name }) => name.split('/')[0].trim()));
    expect(prefixes).toContain('Hero Square');
    expect(prefixes).toContain('HeroSquare');

    const types = new Set(figmaComponents.map(toComponent).map(({ type }) => type));
    expect([...types].sort()).toEqual(['heroSquare', 'pictogram', 'spotIcon', 'spotSquare']);
  });
});

describe('InMemorySource', () => {
  const source = new InMemorySource({
    components: figmaComponents.slice(0, 2).map(toComponent),
    svgs: { a: '<svg a/>', b: '<svg b/>' },
  });

  it('returns the SVGs it was given, reporting progress per node', async () => {
    const progress: [number, number][] = [];
    const svgs = await source.fetchSvgs(['a', 'b'], (done, total) => progress.push([done, total]));
    expect([...svgs]).toEqual([
      ['a', '<svg a/>'],
      ['b', '<svg b/>'],
    ]);
    expect(progress).toEqual([
      [1, 2],
      [2, 2],
    ]);
  });

  it('fails like the real source when a node has no export', async () => {
    await expect(source.fetchSvgs(['missing'])).rejects.toThrow('No SVG for node missing');
  });

  it('hands out copies so callers cannot mutate the source by accident', async () => {
    const { components } = await source.listComponents();
    components.pop();
    expect((await source.listComponents()).components).toHaveLength(2);
  });
});
