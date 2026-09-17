import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { fetchRoute } from '../fetchRoute';

const docContent = '# Button\n';
const secretContent = 'SECRET=value\n';

let tempDir: string;
let docsPath: string;

beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cds-mcp-'));
  docsPath = path.join(tempDir, 'mcp-docs');

  fs.mkdirSync(path.join(docsPath, 'web/components'), { recursive: true });
  fs.writeFileSync(path.join(docsPath, 'web/components/Button.txt'), docContent);
  fs.writeFileSync(path.join(tempDir, '.env'), secretContent);
});

afterEach(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

describe('fetchRoute', () => {
  it('reads a doc inside the docs directory', () => {
    expect(fetchRoute(docsPath, 'web/components/Button.txt')).toBe(docContent);
  });

  it('returns null for a route that does not exist', () => {
    expect(fetchRoute(docsPath, 'web/components/Nonexistent.txt')).toBeNull();
  });

  it.each([
    ['relative traversal', () => '../.env'],
    ['nested traversal', () => 'web/components/../../../.env'],
    ['deep traversal', () => '../../../../../../etc/passwd'],
    ['absolute path', () => path.join(tempDir, '.env')],
  ])('returns null for %s', (_name, getRoute) => {
    expect(fetchRoute(docsPath, getRoute())).toBeNull();
  });

  it('returns null for a symlink pointing outside the docs directory', () => {
    fs.symlinkSync(path.join(tempDir, '.env'), path.join(docsPath, 'web/leak.txt'));

    expect(fetchRoute(docsPath, 'web/leak.txt')).toBeNull();
  });
});
