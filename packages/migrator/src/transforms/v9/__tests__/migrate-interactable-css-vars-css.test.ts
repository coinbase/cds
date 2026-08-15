import fs from 'fs';
import os from 'os';
import path from 'path';

import {
  applyRenames,
  DEFAULT_IGNORE_PATTERNS,
  parseIgnorePatterns,
  processDirectory,
  VAR_RENAMES,
} from '../migrate-interactable-css-vars-css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'cds-migrator-css-test-'));
}

function writeFile(dir: string, relativePath: string, content: string): string {
  const fullPath = path.join(dir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  return fullPath;
}

function readFile(dir: string, relativePath: string): string {
  return fs.readFileSync(path.join(dir, relativePath), 'utf8');
}

// ---------------------------------------------------------------------------
// applyRenames — pure unit tests
// ---------------------------------------------------------------------------

describe('applyRenames', () => {
  it('renames all 11 CSS vars', () => {
    const input = VAR_RENAMES.map(([oldVar]) => `--custom: var(${oldVar});`).join('\n');
    const output = VAR_RENAMES.map(([, newVar]) => `--custom: var(${newVar});`).join('\n');
    expect(applyRenames(input)).toBe(output);
  });

  it('renames CSS var declarations', () => {
    expect(applyRenames('--interactable-background: transparent;')).toBe(
      '--inter-bg: transparent;',
    );
  });

  it('renames CSS var references inside var()', () => {
    expect(applyRenames('background: var(--interactable-background);')).toBe(
      'background: var(--inter-bg);',
    );
  });

  it('renames multiple vars in a single line', () => {
    expect(
      applyRenames('--interactable-background: blue; --interactable-pressed-background: darkblue;'),
    ).toBe('--inter-bg: blue; --inter-press-bg: darkblue;');
  });

  it('renames vars across multiple lines', () => {
    const input = `
.button {
  --interactable-background: transparent;
  --interactable-hovered-background: rgb(250, 250, 250);
  --interactable-pressed-background: rgb(235, 235, 236);
}`;
    const output = `
.button {
  --inter-bg: transparent;
  --inter-hover-bg: rgb(250, 250, 250);
  --inter-press-bg: rgb(235, 235, 236);
}`;
    expect(applyRenames(input)).toBe(output);
  });

  it('does not match partial names that are not CSS vars', () => {
    expect(applyRenames('interactable-background')).toBe('interactable-background');
    expect(applyRenames('--not-interactable-background')).toBe('--not-interactable-background');
  });

  it('is idempotent', () => {
    const input = '--inter-bg: transparent; --inter-press-bg: blue;';
    expect(applyRenames(input)).toBe(input);
  });

  it('returns the original string unchanged when there are no matches', () => {
    const input = '.btn { background: red; border-radius: 8px; }';
    expect(applyRenames(input)).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// parseIgnorePatterns
// ---------------------------------------------------------------------------

describe('parseIgnorePatterns', () => {
  it('returns DEFAULT_IGNORE_PATTERNS when no --ignore-pattern= args are present', () => {
    expect(parseIgnorePatterns([])).toEqual(DEFAULT_IGNORE_PATTERNS);
    expect(parseIgnorePatterns(['--dry'])).toEqual(DEFAULT_IGNORE_PATTERNS);
  });

  it('parses a single --ignore-pattern= arg', () => {
    expect(parseIgnorePatterns(['--ignore-pattern=**/dist/**'])).toEqual(['**/dist/**']);
  });

  it('parses multiple --ignore-pattern= args', () => {
    expect(
      parseIgnorePatterns([
        '--ignore-pattern=**/node_modules/**',
        '--ignore-pattern=**/.next/**',
        '--dry',
      ]),
    ).toEqual(['**/node_modules/**', '**/.next/**']);
  });

  it('ignores args that do not start with --ignore-pattern=', () => {
    expect(parseIgnorePatterns(['--dry', '--ignore-pattern=**/dist/**', '--unknown=foo'])).toEqual([
      '**/dist/**',
    ]);
  });
});

// ---------------------------------------------------------------------------
// processDirectory — integration tests using a real temp directory
// ---------------------------------------------------------------------------

describe('processDirectory', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = makeTmpDir();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('rewrites CSS files in place', async () => {
    writeFile(
      tmpDir,
      'styles.css',
      '--interactable-background: transparent;\n--interactable-hovered-background: rgb(250,250,250);\n',
    );

    const result = await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'styles.css')).toBe(
      '--inter-bg: transparent;\n--inter-hover-bg: rgb(250,250,250);\n',
    );
    expect(result).toEqual({ processed: 1, changed: 1 });
  });

  it('rewrites SCSS files in place', async () => {
    writeFile(tmpDir, 'theme.scss', '.btn { --interactable-pressed-background: blue; }\n');

    await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'theme.scss')).toBe('.btn { --inter-press-bg: blue; }\n');
  });

  it('rewrites HTML inline style attributes', async () => {
    writeFile(
      tmpDir,
      'index.html',
      '<div style="--interactable-background: var(--primary);"></div>\n',
    );

    await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'index.html')).toBe(
      '<div style="--inter-bg: var(--primary);"></div>\n',
    );
  });

  it('processes files in nested directories', async () => {
    writeFile(tmpDir, 'a/b/deep.css', '--interactable-border-color: red;\n');

    const result = await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'a/b/deep.css')).toBe('--inter-borderColor: red;\n');
    expect(result.changed).toBe(1);
  });

  it('does not modify files with no matching vars', async () => {
    const original = '.btn { background: blue; border-radius: 8px; }\n';
    writeFile(tmpDir, 'unchanged.css', original);

    const result = await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'unchanged.css')).toBe(original);
    expect(result).toEqual({ processed: 1, changed: 0 });
  });

  it('does not modify JS/TS files', async () => {
    const jsContent = "const bg = '--interactable-background';\n";
    writeFile(tmpDir, 'styles.ts', jsContent);

    const result = await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'styles.ts')).toBe(jsContent);
    expect(result.processed).toBe(0);
  });

  it('does not write files when dryRun is true', async () => {
    const original = '--interactable-background: transparent;\n';
    writeFile(tmpDir, 'styles.css', original);

    const result = await processDirectory(tmpDir, true);

    expect(readFile(tmpDir, 'styles.css')).toBe(original);
    expect(result).toEqual({ processed: 1, changed: 1 });
  });

  it('is idempotent: second run is a no-op', async () => {
    writeFile(tmpDir, 'styles.css', '--interactable-background: transparent;\n');

    await processDirectory(tmpDir, false);
    const afterFirstPass = readFile(tmpDir, 'styles.css');

    const secondResult = await processDirectory(tmpDir, false);

    expect(readFile(tmpDir, 'styles.css')).toBe(afterFirstPass);
    expect(secondResult).toEqual({ processed: 1, changed: 0 });
  });

  it('skips node_modules by default', async () => {
    writeFile(
      tmpDir,
      'node_modules/some-lib/styles.css',
      '--interactable-background: transparent;\n',
    );

    const result = await processDirectory(tmpDir, false);

    expect(result.processed).toBe(0);
  });

  it('respects custom ignore patterns forwarded by the runner', async () => {
    writeFile(tmpDir, 'generated/styles.css', '--interactable-background: transparent;\n');
    writeFile(tmpDir, 'src/styles.css', '--interactable-background: transparent;\n');

    const result = await processDirectory(tmpDir, false, ['**/generated/**']);

    expect(result.processed).toBe(1);
    expect(result.changed).toBe(1);
    // generated/ was ignored — file is unchanged
    expect(readFile(tmpDir, 'generated/styles.css')).toBe(
      '--interactable-background: transparent;\n',
    );
    // src/ was processed
    expect(readFile(tmpDir, 'src/styles.css')).toBe('--inter-bg: transparent;\n');
  });

  it('reports correct counts for mixed files', async () => {
    writeFile(tmpDir, 'a.css', '--interactable-background: blue;\n');
    writeFile(tmpDir, 'b.css', '.btn { color: red; }\n');
    writeFile(tmpDir, 'c.scss', '--interactable-hovered-background: green;\n');

    const result = await processDirectory(tmpDir, false);

    expect(result).toEqual({ processed: 3, changed: 2 });
  });
});
