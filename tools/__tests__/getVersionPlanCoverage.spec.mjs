import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

import { getProjectsMissingVersionPlans } from '../ci/getVersionPlanCoverage';
import { getAffectedPackages } from '../ci/getAffectedPackages';
import { getCurrentCIBranch } from '../ci/getCurrentCIBranch';

jest.mock('node:fs');
jest.mock('node:child_process', () => ({ spawnSync: jest.fn() }));
jest.mock('../ci/getAffectedPackages', () => ({ getAffectedPackages: jest.fn() }));
jest.mock('../ci/getCurrentCIBranch', () => ({ getCurrentCIBranch: jest.fn() }));
jest.mock('../ci/getBase', () => ({ getBase: () => 'origin/master' }));
jest.mock('../ci/logging', () => ({ logSuccess: jest.fn() }));

const NX_JSON = {
  release: {
    groups: {
      cds: {
        projects: ['web', 'mobile', 'common', 'mcp-server'],
        projectsRelationship: 'fixed',
      },
      standalone: {
        projects: ['icons', 'utils'],
        projectsRelationship: 'independent',
      },
    },
  },
};

const MERGE_BASE = 'abc123';

/** Version each package reports on disk and at the merge base, keyed by project root. */
let versionsOnDisk;
let versionsAtBase;
/** Pending version plan file contents, keyed by file name. */
let plans;

function setAffected(...projects) {
  getAffectedPackages.mockResolvedValue(
    Object.fromEntries(projects.map((name) => [name, { data: { root: `packages/${name}` } }])),
  );
}

beforeEach(() => {
  versionsOnDisk = {};
  versionsAtBase = {};
  plans = {};

  getCurrentCIBranch.mockReturnValue('feature-branch');
  getAffectedPackages.mockResolvedValue({});

  fs.existsSync.mockReturnValue(true);
  fs.readdirSync.mockImplementation(() => Object.keys(plans));
  fs.readFileSync.mockImplementation((filePath) => {
    const target = String(filePath);
    if (target === 'nx.json') return JSON.stringify(NX_JSON);
    if (target.endsWith('package.json')) {
      return JSON.stringify({ version: versionsOnDisk[target] ?? '1.0.0' });
    }
    return plans[target.replace('.nx/version-plans/', '')] ?? '';
  });

  spawnSync.mockImplementation((_cmd, args) => {
    if (args[0] === 'merge-base') return { status: 0, stdout: MERGE_BASE };
    const target = args[1].replace(`${MERGE_BASE}:`, '');
    if (!(target in versionsAtBase)) return { status: 1, stdout: '' };
    return { status: 0, stdout: JSON.stringify({ version: versionsAtBase[target] }) };
  });
});

afterEach(() => jest.clearAllMocks());

describe('getProjectsMissingVersionPlans', () => {
  const logInfo = () => {};

  it('returns nothing on the master branch', async () => {
    getCurrentCIBranch.mockReturnValue('master');
    setAffected('web');

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('reports an affected package with neither a plan nor a version bump', async () => {
    setAffected('icons');
    versionsOnDisk['packages/icons/package.json'] = '5.22.0';
    versionsAtBase['packages/icons/package.json'] = '5.22.0';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual(['icons']);
  });

  it('accepts a plan that names the affected project', async () => {
    setAffected('icons');
    plans['add-icons.md'] = '---\nicons: patch\n---\n\nAdded icons.\n';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('accepts a plan naming a sibling of the same fixed group', async () => {
    setAffected('web');
    plans['tweak.md'] = '---\ncommon: minor\n---\n\nShared change.\n';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('accepts a plan that names the fixed group itself', async () => {
    setAffected('web', 'mobile');
    plans['tweak.md'] = '---\ncds: minor\n---\n\nShared change.\n';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('does not let an independent package cover a sibling in its group', async () => {
    setAffected('utils');
    versionsOnDisk['packages/utils/package.json'] = '2.3.5';
    versionsAtBase['packages/utils/package.json'] = '2.3.5';
    plans['icons.md'] = '---\nicons: patch\n---\n\nAdded icons.\n';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual(['utils']);
  });

  it('accepts a package already versioned in the branch, so a release can happen in the PR', async () => {
    setAffected('icons');
    versionsOnDisk['packages/icons/package.json'] = '5.22.1';
    versionsAtBase['packages/icons/package.json'] = '5.22.0';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('accepts a package that does not exist at the merge base', async () => {
    setAffected('brand-new');
    versionsOnDisk['packages/brand-new/package.json'] = '0.1.0';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual([]);
  });

  it('ignores plan files that are missing frontmatter', async () => {
    setAffected('icons');
    versionsOnDisk['packages/icons/package.json'] = '5.22.0';
    versionsAtBase['packages/icons/package.json'] = '5.22.0';
    plans['notes.md'] = 'Just some prose about icons, with no frontmatter.\n';

    expect(await getProjectsMissingVersionPlans(logInfo)).toEqual(['icons']);
  });
});
