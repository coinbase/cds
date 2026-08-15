import { spawnSync } from 'node:child_process';

import { projectsNeedingVersion } from '../ci/getProjectsNeedingVersion';
import { getCurrentCIBranch } from '../ci/getCurrentCIBranch';
import { getChangedFiles } from '../ci/getChangedFiles';
import { getAffectedPackages } from '../ci/getAffectedPackages';

jest.mock('node:child_process', () => ({ spawnSync: jest.fn() }));
jest.mock('../ci/getCurrentCIBranch', () => ({ getCurrentCIBranch: jest.fn() }));
jest.mock('../ci/getChangedFiles', () => ({ getChangedFiles: jest.fn() }));
jest.mock('../ci/getAffectedPackages', () => ({ getAffectedPackages: jest.fn() }));
jest.mock('../ci/logging', () => ({
  logInfo: jest.fn(),
  logSuccess: jest.fn(),
  logError: jest.fn(),
  logWarn: jest.fn(),
  color: { project: (s) => s, muted: (s) => s, shell: (s) => s },
  logNewLine: jest.fn(),
}));

const logInfo = jest.fn();

describe('projectsNeedingVersion', () => {
  beforeEach(() => {
    getCurrentCIBranch.mockReturnValue('feature-branch');
    getChangedFiles.mockResolvedValue([]);
    getAffectedPackages.mockResolvedValue({});
    spawnSync.mockReturnValue({ status: 0, stdout: '' });
  });

  afterEach(() => jest.clearAllMocks());

  it('returns [] on master branch and skips package checks entirely', async () => {
    getCurrentCIBranch.mockReturnValue('master');
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toEqual([]);
    expect(getAffectedPackages).not.toHaveBeenCalled();
  });

  it('does NOT short-circuit on release branches', async () => {
    getCurrentCIBranch.mockReturnValue('release-8.x');
    getAffectedPackages.mockResolvedValue({ web: { data: { root: 'packages/web' } } });
    getChangedFiles.mockResolvedValue(['packages/web/src/Button.tsx']);
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toEqual(['web']);
  });

  it('returns [] when no packages are affected', async () => {
    getAffectedPackages.mockResolvedValue({});
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toEqual([]);
  });

  it('returns the project name when CHANGELOG.md is not in changedFiles', async () => {
    getChangedFiles.mockResolvedValue(['packages/web/src/Button.tsx']);
    getAffectedPackages.mockResolvedValue({ web: { data: { root: 'packages/web' } } });
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toEqual(['web']);
  });

  it('excludes a project whose CHANGELOG.md is in changedFiles (already bumped)', async () => {
    getChangedFiles.mockResolvedValue(['packages/web/src/Button.tsx', 'packages/web/CHANGELOG.md']);
    getAffectedPackages.mockResolvedValue({ web: { data: { root: 'packages/web' } } });
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toEqual([]);
  });

  it('returns the project when CHANGELOG.md changed from base but local source changes are pending', async () => {
    getChangedFiles.mockResolvedValue([
      'packages/mobile/package.json',
      'packages/mobile/CHANGELOG.md',
      'packages/mobile/src/Button.tsx',
    ]);
    spawnSync.mockReturnValue({ status: 0, stdout: 'packages/mobile/src/Button.tsx\n' });
    getAffectedPackages
      .mockResolvedValueOnce({ mobile: { data: { root: 'packages/mobile' } } })
      .mockResolvedValueOnce({ mobile: { data: { root: 'packages/mobile' } } });

    const result = await projectsNeedingVersion(logInfo);

    expect(result).toEqual(['mobile']);
  });

  it('excludes a project when its local changelog is pending with the source change', async () => {
    getChangedFiles.mockResolvedValue([
      'packages/mobile/package.json',
      'packages/mobile/CHANGELOG.md',
      'packages/mobile/src/Button.tsx',
    ]);
    spawnSync.mockReturnValue({
      status: 0,
      stdout: 'packages/mobile/src/Button.tsx\npackages/mobile/CHANGELOG.md\n',
    });
    getAffectedPackages
      .mockResolvedValueOnce({ mobile: { data: { root: 'packages/mobile' } } })
      .mockResolvedValueOnce({ mobile: { data: { root: 'packages/mobile' } } });

    const result = await projectsNeedingVersion(logInfo);

    expect(result).toEqual([]);
  });

  it('correctly separates versioned and unversioned packages', async () => {
    getChangedFiles.mockResolvedValue([
      'packages/web/src/Button.tsx',
      'packages/mobile/src/Button.tsx',
      'packages/mobile/CHANGELOG.md',
    ]);
    getAffectedPackages.mockResolvedValue({
      web: { data: { root: 'packages/web' } },
      mobile: { data: { root: 'packages/mobile' } },
    });
    const result = await projectsNeedingVersion(logInfo);
    expect(result).toContain('web');
    expect(result).not.toContain('mobile');
  });

  it('passes options through to getAffectedPackages', async () => {
    const options = { exclude: ['internal'] };
    await projectsNeedingVersion(logInfo, options);
    expect(getAffectedPackages).toHaveBeenCalledWith(
      expect.objectContaining({ onlyPublishable: true, exclude: ['internal'] }),
    );
  });
});
