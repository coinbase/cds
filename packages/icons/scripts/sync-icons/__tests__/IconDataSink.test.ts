/**
 * @jest-environment node
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { SyncIconsConfig } from '../config';
import type { Manifest, ManifestIconSet } from '../manifest';
import { IconDataSink } from '../sinks/IconDataSink';

const iconSet = (name: string): ManifestIconSet => ({
  nodeId: `n:${name}`,
  name,
  description: 'an icon',
  assetsHash: 'a',
  nameHash: 'n',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastUpdated: '2026-02-01T00:00:00.000Z',
  svgs: [],
});

const writeData = async (names: string[]) => {
  const outputDataPath = fs.mkdtempSync(path.join(os.tmpdir(), 'icon-data-'));
  const manifest: Manifest = { lastUpdated: '', lastUnicode: 0, iconSets: names.map(iconSet) };
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  await new IconDataSink().apply({
    config: { outputDataPath } as SyncIconsConfig,
    manifest,
    write: [],
    remove: [],
  });
  const read = (file: string) => fs.readFileSync(path.join(outputDataPath, file), 'utf-8');
  return { iconName: read('IconName.ts'), names: read('names.ts') };
};

describe('IconDataSink', () => {
  afterEach(() => jest.restoreAllMocks());

  it('writes the icon names as a union, sorted, and as a list', async () => {
    const { iconName, names } = await writeData(['send', 'add']);
    expect(iconName).toContain("export type IconName = \n | 'add'\n | 'send';");
    expect(names).toContain("export const names: IconName[] = [\n  'send',\n  'add'\n];");
  });

  it('escapes a name that is not safe, in every file, even when a manifest has one', async () => {
    const { iconName, names } = await writeData(["a'; globalThis.injected = true; '"]);
    expect(iconName).toContain("'a\\'; globalThis.injected = true; \\''");
    expect(names).toContain("'a\\'; globalThis.injected = true; \\''");
  });
});
