import { getAffectedPackages } from '../ci/getAffectedPackages';
import { getCurrentCIBranch } from '../ci/getCurrentCIBranch';
import { getPublishableProjects } from '../ci/getPublishableProjects';

jest.mock('../ci/getCurrentCIBranch', () => ({ getCurrentCIBranch: jest.fn() }));
jest.mock('../ci/getPublishableProjects', () => ({ getPublishableProjects: jest.fn() }));
jest.mock('../ci/getChangedFiles', () => ({ getChangedFiles: jest.fn() }));
jest.mock('../ci/logging', () => ({
  logError: jest.fn(),
}));

function makeProjects(...entries) {
  return Object.fromEntries(entries.map(([name, root]) => [name, { data: { root } }]));
}

describe('getAffectedPackages', () => {
  beforeEach(() => {
    getCurrentCIBranch.mockReturnValue('feature-branch');
    getPublishableProjects.mockResolvedValue({});
  });

  afterEach(() => jest.clearAllMocks());

  describe('master branch short-circuit', () => {
    it('returns {} when on master branch', async () => {
      getCurrentCIBranch.mockReturnValue('master');
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.tsx'],
      });
      expect(result).toEqual({});
    });

    it('does not short-circuit on release branches', async () => {
      getCurrentCIBranch.mockReturnValue('release-8.x');
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.tsx'],
      });
      expect(result).toHaveProperty('web');
    });
  });

  describe('BUMP_REGEX — files that trigger a version bump', () => {
    it('detects src/ changes', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.tsx'],
      });
      expect(result).toHaveProperty('web');
    });

    it('detects package.json changes', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/package.json'],
      });
      expect(result).toHaveProperty('web');
    });

    it('detects android/ changes', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['mobile', 'packages/mobile']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/mobile/android/NativeButton.kt'],
      });
      expect(result).toHaveProperty('mobile');
    });

    it('detects ios/ changes', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['mobile', 'packages/mobile']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/mobile/ios/NativeButton.swift'],
      });
      expect(result).toHaveProperty('mobile');
    });

    it('detects assets/ changes', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['icons', 'packages/icons']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/icons/assets/arrow.svg'],
      });
      expect(result).toHaveProperty('icons');
    });
  });

  describe('DEV_FILES_REGEX — files that should NOT trigger a bump', () => {
    it('ignores .spec.tsx files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.spec.tsx'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('ignores .test.ts files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.test.ts'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('ignores __stories__ files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/__stories__/Button.stories.tsx'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('ignores .figma.tsx files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.figma.tsx'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('ignores .d.ts declaration files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/figma-code-connect.d.ts'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('ignores .snap files', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/__snapshots__/Button.spec.tsx.snap'],
      });
      expect(result).not.toHaveProperty('web');
    });
  });

  describe('project scoping', () => {
    it('does not include changes that belong to a different project', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/mobile/src/Button.tsx'],
      });
      expect(result).not.toHaveProperty('web');
    });

    it('returns all affected projects when multiple have changes', async () => {
      getPublishableProjects.mockResolvedValue(
        makeProjects(['web', 'packages/web'], ['mobile', 'packages/mobile']),
      );
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.tsx', 'packages/mobile/src/Button.tsx'],
      });
      expect(result).toHaveProperty('web');
      expect(result).toHaveProperty('mobile');
    });

    it('returns {} when changed files match no project', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['web', 'packages/web']));
      const result = await getAffectedPackages({
        changedFiles: ['tools/ci/getAffectedPackages.ts'],
      });
      expect(result).toEqual({});
    });
  });

  describe('options', () => {
    it('excludes projects listed in the exclude option', async () => {
      getPublishableProjects.mockResolvedValue(
        makeProjects(['web', 'packages/web'], ['mobile', 'packages/mobile']),
      );
      const result = await getAffectedPackages({
        changedFiles: ['packages/web/src/Button.tsx', 'packages/mobile/src/Button.tsx'],
        exclude: ['web'],
      });
      expect(result).not.toHaveProperty('web');
      expect(result).toHaveProperty('mobile');
    });

    it('includes arbitrary file changes for projectsWithNoSrcFolder', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['icons', 'packages/icons']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/icons/icons.json'],
        projectsWithNoSrcFolder: ['icons'],
      });
      expect(result).toHaveProperty('icons');
    });

    it('ignores IGNORE_CHANGED_FILES_REGEX entries for projectsWithNoSrcFolder', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['icons', 'packages/icons']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/icons/CHANGELOG.md'],
        projectsWithNoSrcFolder: ['icons'],
      });
      expect(result).not.toHaveProperty('icons');
    });

    it('ignores yml files for projectsWithNoSrcFolder', async () => {
      getPublishableProjects.mockResolvedValue(makeProjects(['icons', 'packages/icons']));
      const result = await getAffectedPackages({
        changedFiles: ['packages/icons/release.yml'],
        projectsWithNoSrcFolder: ['icons'],
      });
      expect(result).not.toHaveProperty('icons');
    });
  });
});
