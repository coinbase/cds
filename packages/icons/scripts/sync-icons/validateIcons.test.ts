import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { stringToObject } from './stringToObject';
import { figmaNodeUrl, type SyncReport, writeSyncReport } from './syncReport';
import { iconPropsProblem, iconSetNameProblem } from './validateIcons';

describe('iconSetNameProblem', () => {
  it.each(['ui/add', 'nav/home', ' ui/add '])('accepts "%s"', (name) => {
    expect(iconSetNameProblem(name)).toBeUndefined();
  });

  it.each(['add', 'ui/', 'icons/add', 'ui/add/extra'])(
    'rejects "%s" and says how to fix it',
    (name) => {
      expect(iconSetNameProblem(name)).toContain('Rename the icon set in Figma');
    },
  );
});

describe('iconPropsProblem', () => {
  const problem = (componentName: string) =>
    iconPropsProblem('add', componentName, stringToObject(componentName));

  it('accepts a component named after a size and an active state', () => {
    expect(problem('size=24, active=false')).toBeUndefined();
    expect(problem('active=true, size=16')).toBeUndefined();
  });

  it('names the component and the property that is wrong', () => {
    expect(problem('active=false')).toContain('is missing a "size" property');
    expect(problem('size=large, active=false')).toContain('"size" that is not a number');
    expect(problem('size=24')).toContain('is missing an "active" property');
    expect(problem('size=24, active=maybe')).toContain('"active" that is not true or false');
    expect(problem('size=24')).toContain('"size=24" in icon set "add"');
  });

  it('explains the expected format', () => {
    expect(problem('Default')).toContain('Name icon components like "size=24, active=false"');
  });
});

describe('figmaNodeUrl', () => {
  it('links to the node with a dashed id', () => {
    expect(figmaNodeUrl('FILE', '12:34')).toBe('https://www.figma.com/design/FILE?node-id=12-34');
  });
});

describe('writeSyncReport', () => {
  const report: SyncReport = {
    target: 'icons',
    branch: 'icons/2026-11-19',
    breaking: true,
    counts: { added: 0, updated: 1, renamed: 1, deleted: 0 },
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
