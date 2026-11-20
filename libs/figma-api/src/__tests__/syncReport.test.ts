import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  emptyChanges,
  figmaNodeUrl,
  hasChanges,
  isBreaking,
  type SyncReport,
  writeSyncReport,
} from '../syncReport';

describe('figmaNodeUrl', () => {
  it('links to the node with a dashed id', () => {
    expect(figmaNodeUrl('FILE', '12:34')).toBe('https://www.figma.com/design/FILE?node-id=12-34');
  });
});

describe('hasChanges and isBreaking', () => {
  it('sees any kind of change, and only renames and deletes as breaking', () => {
    expect(hasChanges(emptyChanges())).toBe(false);
    expect(hasChanges({ ...emptyChanges(), updated: [{ name: 'a' }] })).toBe(true);
    expect(
      isBreaking({ ...emptyChanges(), added: [{ name: 'a' }], updated: [{ name: 'b' }] }),
    ).toBe(false);
    expect(isBreaking({ ...emptyChanges(), deleted: [{ name: 'a' }] })).toBe(true);
    expect(isBreaking({ ...emptyChanges(), renamed: [{ name: 'a', oldName: 'b' }] })).toBe(true);
  });
});

describe('writeSyncReport', () => {
  const report: SyncReport = {
    target: 'icons',
    bump: 'major',
    changes: { ...emptyChanges(), renamed: [{ name: 'a', oldName: 'b' }] },
    rejected: [{ name: 'add', nodeId: '1:2', url: 'https://figma.com', message: 'fix it' }],
  };

  it('writes the report as JSON, creating the directory', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-report-'));
    const file = path.join(dir, 'nested', 'report.json');
    writeSyncReport(file, report);
    expect(JSON.parse(fs.readFileSync(file, 'utf-8'))).toEqual(report);
    fs.rmSync(dir, { recursive: true });
  });

  it('writes nothing without a path', () => {
    expect(() => writeSyncReport(undefined, report)).not.toThrow();
  });
});
