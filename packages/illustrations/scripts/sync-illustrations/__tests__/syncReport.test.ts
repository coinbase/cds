import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { Illustration } from '../illustration';
import type { SinkResult } from '../sync';
import { countChanges, rejectedAssets, type SyncReport, writeSyncReport } from '../syncReport';

const illustration = (name: string, nodeId: string): Illustration => ({
  nodeId,
  type: 'pictogram',
  name,
  description: '',
  hash: 'hash',
  version: 1,
  width: 8,
  height: 8,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastUpdated: '2024-01-01T00:00:00.000Z',
});

const sinkResult = (sink: string, failures: SinkResult['failures']): SinkResult => ({
  sink,
  written: [],
  removed: [],
  failures,
  published: true,
});

const url = ({ nodeId }: Illustration) => `https://www.figma.com/design/file?node-id=${nodeId}`;

describe('rejectedAssets', () => {
  it('describes each rejected illustration with its Figma link and reason', () => {
    const bad = illustration('bad', '1:3');
    const rejected = rejectedAssets(
      [sinkResult('package', [{ illustration: bad, message: 'uses a color outside the palette' }])],
      url,
    );
    expect(rejected).toEqual([
      {
        name: 'pictogram/bad',
        nodeId: '1:3',
        url: 'https://www.figma.com/design/file?node-id=1:3',
        message: 'uses a color outside the palette',
      },
    ]);
  });

  it('lists an illustration once when several sinks reject it for the same reason', () => {
    const bad = illustration('bad', '1:3');
    const failure = { illustration: bad, message: 'uses a color outside the palette' };
    const rejected = rejectedAssets(
      [sinkResult('ios', [failure]), sinkResult('android', [failure])],
      url,
    );
    expect(rejected).toHaveLength(1);
  });

  it('keeps different reasons for the same illustration', () => {
    const bad = illustration('bad', '1:3');
    const rejected = rejectedAssets(
      [
        sinkResult('ios', [{ illustration: bad, message: 'too detailed for iOS' }]),
        sinkResult('android', [{ illustration: bad, message: 'path data is too large' }]),
      ],
      url,
    );
    expect(rejected.map(({ message }) => message)).toEqual([
      'too detailed for iOS',
      'path data is too large',
    ]);
  });
});

describe('countChanges', () => {
  it('counts every kind of change and is zero without a diff', () => {
    expect(countChanges()).toEqual({ added: 0, updated: 0, renamed: 0, deleted: 0 });
    expect(
      countChanges({
        added: [illustration('a', '1:1')],
        updated: [],
        renamed: [{ ...illustration('b', '1:2'), oldName: 'old' }],
        deleted: [illustration('c', '1:3'), illustration('d', '1:4')],
      }),
    ).toEqual({ added: 1, updated: 0, renamed: 1, deleted: 2 });
  });
});

describe('writeSyncReport', () => {
  const report: SyncReport = {
    target: 'illustrations',
    branch: 'illustrations/2026-11-19',
    breaking: false,
    counts: { added: 1, updated: 0, renamed: 0, deleted: 0 },
    rejected: [],
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
