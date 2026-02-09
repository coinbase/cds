import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { ProcessedDoc, ProcessedPropItem } from '../types';

import type { EntryPointCacheEntry } from './docgenCache';
import { computeEntryPointHash, loadDocgenCache, saveDocgenCache } from './docgenCache';

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'docgen-cache-test-'));
}

function createTempFile(dir: string, name: string, content: string): string {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

function mockDoc(displayName: string): ProcessedDoc {
  return { displayName, filePath: `/mock/${displayName}.tsx` } as unknown as ProcessedDoc;
}

function mockPropItem(name: string, parent: string): ProcessedPropItem {
  return { name, parent, type: 'string' } as unknown as ProcessedPropItem;
}

function mockCacheEntry(overrides?: Partial<EntryPointCacheEntry>): EntryPointCacheEntry {
  return {
    hash: 'abc123',
    docs: [mockDoc('Button')],
    parentTypeProps: [mockPropItem('onClick', 'HTMLAttributes')],
    typeAliases: [['SpacingValue', 'number | string']],
    ...overrides,
  };
}

describe('computeEntryPointHash', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir();
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('returns a consistent hash for the same files and tsconfig', () => {
    const tsconfig = createTempFile(tempDir, 'tsconfig.json', '{"compilerOptions": {}}');
    const fileA = createTempFile(tempDir, 'a.tsx', 'export const A = 1;');
    const fileB = createTempFile(tempDir, 'b.tsx', 'export const B = 2;');

    const hash1 = computeEntryPointHash([fileA, fileB], tsconfig);
    const hash2 = computeEntryPointHash([fileA, fileB], tsconfig);

    expect(hash1).toBe(hash2);
  });

  it('produces the same hash regardless of file order', () => {
    const tsconfig = createTempFile(tempDir, 'tsconfig.json', '{}');
    const fileA = createTempFile(tempDir, 'a.tsx', 'A');
    const fileB = createTempFile(tempDir, 'b.tsx', 'B');

    const hash1 = computeEntryPointHash([fileA, fileB], tsconfig);
    const hash2 = computeEntryPointHash([fileB, fileA], tsconfig);

    expect(hash1).toBe(hash2);
  });

  it('produces a different hash when a source file changes', () => {
    const tsconfig = createTempFile(tempDir, 'tsconfig.json', '{}');
    const file = createTempFile(tempDir, 'comp.tsx', 'version 1');

    const hash1 = computeEntryPointHash([file], tsconfig);

    fs.writeFileSync(file, 'version 2', 'utf-8');
    const hash2 = computeEntryPointHash([file], tsconfig);

    expect(hash1).not.toBe(hash2);
  });

  it('produces a different hash when the tsconfig changes', () => {
    const tsconfig = createTempFile(tempDir, 'tsconfig.json', '{"v": 1}');
    const file = createTempFile(tempDir, 'comp.tsx', 'unchanged');

    const hash1 = computeEntryPointHash([file], tsconfig);

    fs.writeFileSync(tsconfig, '{"v": 2}', 'utf-8');
    const hash2 = computeEntryPointHash([file], tsconfig);

    expect(hash1).not.toBe(hash2);
  });

  it('handles missing files gracefully', () => {
    const tsconfig = createTempFile(tempDir, 'tsconfig.json', '{}');
    const missingFile = path.join(tempDir, 'does-not-exist.tsx');

    expect(() => computeEntryPointHash([missingFile], tsconfig)).not.toThrow();
  });
});

describe('saveDocgenCache / loadDocgenCache', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir();
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('round-trips cache data through save and load', () => {
    const entry = mockCacheEntry();
    saveDocgenCache(tempDir, { '/path/to/tsconfig.json': entry });

    const loaded = loadDocgenCache(tempDir);

    expect(loaded).not.toBeNull();
    expect(loaded!.entryPoints['/path/to/tsconfig.json']).toEqual(entry);
  });

  it('returns null when no cache file exists', () => {
    const loaded = loadDocgenCache(tempDir);
    expect(loaded).toBeNull();
  });

  it('returns null when cache file contains invalid JSON', () => {
    fs.writeFileSync(path.join(tempDir, '.docgen-cache.json'), 'not json', 'utf-8');

    const loaded = loadDocgenCache(tempDir);
    expect(loaded).toBeNull();
  });

  it('returns null when cache version does not match', () => {
    const staleCache = { version: '0', entryPoints: {} };
    fs.writeFileSync(path.join(tempDir, '.docgen-cache.json'), JSON.stringify(staleCache), 'utf-8');

    const loaded = loadDocgenCache(tempDir);
    expect(loaded).toBeNull();
  });

  it('preserves multiple entry points', () => {
    const entryA = mockCacheEntry({ hash: 'aaa' });
    const entryB = mockCacheEntry({ hash: 'bbb', docs: [mockDoc('Avatar')] });

    saveDocgenCache(tempDir, {
      '/packages/web/tsconfig.json': entryA,
      '/packages/mobile/tsconfig.json': entryB,
    });

    const loaded = loadDocgenCache(tempDir);

    expect(loaded!.entryPoints['/packages/web/tsconfig.json'].hash).toBe('aaa');
    expect(loaded!.entryPoints['/packages/mobile/tsconfig.json'].hash).toBe('bbb');
    expect(loaded!.entryPoints['/packages/mobile/tsconfig.json'].docs[0].displayName).toBe(
      'Avatar',
    );
  });

  it('overwrites previous cache on save', () => {
    saveDocgenCache(tempDir, { '/a': mockCacheEntry({ hash: 'first' }) });
    saveDocgenCache(tempDir, { '/b': mockCacheEntry({ hash: 'second' }) });

    const loaded = loadDocgenCache(tempDir);

    expect(loaded!.entryPoints['/a']).toBeUndefined();
    expect(loaded!.entryPoints['/b'].hash).toBe('second');
  });
});
