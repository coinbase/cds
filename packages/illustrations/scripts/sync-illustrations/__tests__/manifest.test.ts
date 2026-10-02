import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { ColorPalette } from '../colorPalette';
import type { Illustration } from '../illustration';
import { manifestIllustrations, readManifest, writeManifest } from '../manifest';

const illustration = (overrides: Partial<Illustration>): Illustration => ({
  nodeId: '1:1',
  type: 'spotIcon',
  name: 'wallet',
  description: 'wallet',
  hash: 'hash',
  version: 0,
  width: 32,
  height: 32,
  createdAt: '2022-01-01T00:00:00.000Z',
  lastUpdated: '2022-01-01T00:00:00.000Z',
  ...overrides,
});

describe('manifest', () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-illustrations-manifest-'));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('reads an empty manifest when the file does not exist', () => {
    expect(readManifest(path.join(dir, 'manifest.json'))).toEqual({
      lastUpdated: '',
      colors: {},
      items: {},
    });
  });

  it('round-trips, keyed by node id in type then name order, and records the palette', () => {
    const manifestPath = path.join(dir, 'nested', 'manifest.json');
    const illustrations = [
      illustration({ nodeId: '1:3', type: 'spotIcon', name: 'wallet' }),
      illustration({ nodeId: '1:1', type: 'pictogram', name: 'zebra' }),
      illustration({ nodeId: '1:2', type: 'pictogram', name: 'avatar' }),
    ];

    const written = writeManifest(manifestPath, {
      illustrations,
      palette: new ColorPalette([{ name: 'primary', light: '#0052FF', dark: '#578BFA' }]),
    });

    expect(written.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    const read = readManifest(manifestPath);
    expect(read.colors).toEqual({ primary: { light: '#0052FF', dark: '#578BFA' } });
    expect(Object.keys(read.items)).toEqual(['1:2', '1:1', '1:3']);
    expect(read.items['1:3']).not.toHaveProperty('nodeId');
    expect(manifestIllustrations(read)).toEqual([
      illustrations[2],
      illustrations[1],
      illustrations[0],
    ]);
    expect(fs.readFileSync(manifestPath, 'utf-8')).toMatch(/\n$/);
  });

  it('writes entry fields in a fixed order so edits never reorder them', () => {
    const manifestPath = path.join(dir, 'manifest.json');
    writeManifest(manifestPath, {
      illustrations: [illustration({})],
      palette: new ColorPalette([]),
    });
    expect(Object.keys(JSON.parse(fs.readFileSync(manifestPath, 'utf-8')).items['1:1'])).toEqual([
      'type',
      'name',
      'hash',
      'width',
      'height',
      'description',
      'createdAt',
      'lastUpdated',
      'version',
    ]);
  });
});
