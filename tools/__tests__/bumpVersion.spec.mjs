import { getRemoteRepoUrl, bumpVersion } from '../bumpVersion.mjs';
import { createProjectGraphAsync } from '@nx/devkit';
import execa from 'execa';
import fs from 'fs';
import { projectsNeedingVersion } from '../ci/getProjectsNeedingVersion';

jest.mock('@nx/devkit', () => ({ createProjectGraphAsync: jest.fn() }));
jest.mock('execa', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(() => Promise.resolve()),
  },
}));
jest.mock('../ci/getProjectsNeedingVersion', () => ({
  projectsNeedingVersion: jest.fn().mockResolvedValue([]),
}));
jest.mock('../ci/logging', () => ({
  log: jest.fn(),
  logInfo: jest.fn(),
  logWarn: jest.fn(),
  logNewLine: jest.fn(),
  color: { project: (s) => s, muted: (s) => s },
}));

const FAKE_PKG = { name: '@coinbase/cds-web', version: '8.0.0' };

function setupFileMocks({ existsChangelog = true } = {}) {
  fs.existsSync.mockReturnValue(existsChangelog);
  fs.promises.readFile.mockImplementation((filePath) => {
    if (String(filePath).includes('package.json')) {
      return Promise.resolve(JSON.stringify(FAKE_PKG));
    }
    return Promise.resolve('# Changelog\n');
  });
  fs.promises.writeFile.mockResolvedValue(undefined);
}

describe('getRemoteRepoUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.CB_GHA_REPO;
  });

  it('uses CB_GHA_REPO env var when set, skipping git', async () => {
    process.env.CB_GHA_REPO = 'coinbase/cds';
    const url = await getRemoteRepoUrl();
    expect(url).toBe('https://github.com/coinbase/cds');
    expect(execa).not.toHaveBeenCalled();
  });

  it('converts SSH URL to HTTPS and strips .git', async () => {
    execa.mockResolvedValue({ stdout: 'git@github.com:coinbase/cds.git' });
    const url = await getRemoteRepoUrl();
    expect(url).toBe('https://github.com/coinbase/cds');
  });

  it('strips .git suffix from HTTPS URL', async () => {
    execa.mockResolvedValue({ stdout: 'https://github.com/coinbase/cds.git' });
    const url = await getRemoteRepoUrl();
    expect(url).toBe('https://github.com/coinbase/cds');
  });

  it('leaves HTTPS URL without .git unchanged', async () => {
    execa.mockResolvedValue({ stdout: 'https://github.com/coinbase/cds' });
    const url = await getRemoteRepoUrl();
    expect(url).toBe('https://github.com/coinbase/cds');
  });
});

describe('bumpVersion', () => {
  beforeEach(() => {
    createProjectGraphAsync.mockResolvedValue({
      nodes: { web: { data: { root: 'packages/web' } } },
    });
    execa.mockResolvedValue({ stdout: 'https://github.com/coinbase/cds' });
    projectsNeedingVersion.mockResolvedValue([]);
    setupFileMocks();
  });

  afterEach(() => jest.clearAllMocks());

  function getWriteCalls() {
    const calls = fs.promises.writeFile.mock.calls;
    const pkgCall = calls.find(([p]) => String(p).includes('package.json'));
    const changelogCalls = calls.filter(([p]) => String(p).includes('CHANGELOG'));
    return { pkgCall, changelogCalls };
  }

  it('increments patch version and writes updated package.json', async () => {
    await bumpVersion('web', { bump: 'patch', message: 'Fix button bug', pr: '456' });
    const { pkgCall } = getWriteCalls();
    expect(pkgCall).toBeDefined();
    expect(JSON.parse(pkgCall[1]).version).toBe('8.0.1');
  });

  it('increments minor version', async () => {
    await bumpVersion('web', { bump: 'minor', message: 'Add new feature' });
    const { pkgCall } = getWriteCalls();
    expect(JSON.parse(pkgCall[1]).version).toBe('8.1.0');
  });

  it('increments major version', async () => {
    await bumpVersion('web', { bump: 'major', message: 'Breaking change' });
    const { pkgCall } = getWriteCalls();
    expect(JSON.parse(pkgCall[1]).version).toBe('9.0.0');
  });

  it('writes an Unreleased entry and skips package.json write for bump=none', async () => {
    await bumpVersion('web', { bump: 'none', message: 'Update tests' });
    const { pkgCall, changelogCalls } = getWriteCalls();
    expect(pkgCall).toBeUndefined();
    expect(changelogCalls[changelogCalls.length - 1][1]).toContain('## Unreleased');
  });

  it('includes version section header and PR link in changelog', async () => {
    await bumpVersion('web', { bump: 'patch', message: 'Fix bug', pr: '99' });
    const { changelogCalls } = getWriteCalls();
    const written = changelogCalls[changelogCalls.length - 1][1];
    expect(written).toContain('## 8.0.1');
    expect(written).toContain('#99');
    expect(written).toContain('/pull/99');
  });

  it('creates CHANGELOG.md when it does not exist before inserting the version section', async () => {
    setupFileMocks({ existsChangelog: false });
    await bumpVersion('web', { bump: 'patch', message: 'Fix bug' });
    const { changelogCalls } = getWriteCalls();
    expect(changelogCalls[0][1]).toBe('# Changelog');
    expect(changelogCalls.length).toBeGreaterThanOrEqual(2);
  });

  it('throws when pr contains non-numeric characters', async () => {
    await expect(
      bumpVersion('web', { bump: 'patch', message: 'Fix bug', pr: 'abc' }),
    ).rejects.toThrow('Invalid pr: abc');
  });

  describe('prerelease (RC) versions', () => {
    const RC_PKG = { name: '@coinbase/cds-web', version: '9.0.0-rc.1' };

    beforeEach(() => {
      fs.promises.readFile.mockImplementation((filePath) => {
        if (String(filePath).includes('package.json')) {
          return Promise.resolve(JSON.stringify(RC_PKG));
        }
        return Promise.resolve('# Changelog\n');
      });
    });

    it('increments the RC number for a patch bump', async () => {
      await bumpVersion('web', { bump: 'patch', message: 'Fix RC bug' });
      const { pkgCall } = getWriteCalls();
      expect(JSON.parse(pkgCall[1]).version).toBe('9.0.0-rc.2');
    });

    it('increments the RC number for a minor bump', async () => {
      await bumpVersion('web', { bump: 'minor', message: 'Add feature to RC' });
      const { pkgCall } = getWriteCalls();
      expect(JSON.parse(pkgCall[1]).version).toBe('9.0.0-rc.2');
    });

    it('increments the RC number for a major bump', async () => {
      await bumpVersion('web', { bump: 'major', message: 'Breaking change in RC' });
      const { pkgCall } = getWriteCalls();
      expect(JSON.parse(pkgCall[1]).version).toBe('9.0.0-rc.2');
    });

    it('writes an Unreleased entry and skips package.json write for bump=none', async () => {
      await bumpVersion('web', { bump: 'none', message: 'Update RC docs' });
      const { pkgCall, changelogCalls } = getWriteCalls();
      expect(pkgCall).toBeUndefined();
      expect(changelogCalls[changelogCalls.length - 1][1]).toContain('## Unreleased');
    });
  });
});
