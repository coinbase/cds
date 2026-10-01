import type { GetFileComponentsResponse } from '@figma/rest-api-spec';

import { toComponent } from '../source/fetchComponents';
import { InMemorySource } from '../source/InMemorySource';

import componentsFixture from './__fixtures__/getFileComponents.json';

const figmaComponents = (componentsFixture as unknown as GetFileComponentsResponse).meta.components;

describe('FigmaSource component mapping', () => {
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
    const listed = await source.listComponents();
    listed.pop();
    expect(await source.listComponents()).toHaveLength(2);
  });
});
