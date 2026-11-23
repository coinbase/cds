import { describe, expect, it } from '@jest/globals';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  plansToSetAside,
  projectsOfPlan,
  releaseGroupProjects,
  restore,
  setAside,
} from './setAsideVersionPlans.mjs';

const nxJson = {
  release: {
    groups: {
      cds: { projects: ['web', 'mobile', 'common'] },
      standalone: { projects: ['icons', 'illustrations', 'migrator'] },
    },
  },
};

const plan = (...projects) =>
  `---\n${projects.map((name) => `${name}: minor`).join('\n')}\n---\n\nA change.\n`;

describe('projectsOfPlan', () => {
  it('reads the packages named in the front matter', () => {
    expect(projectsOfPlan(plan('common', 'web'))).toEqual(['common', 'web']);
  });

  it('reads no package from a file without front matter', () => {
    expect(projectsOfPlan('just text\n---\nweb: minor\n---\n')).toEqual([]);
    expect(projectsOfPlan('---\nweb: minor\n')).toEqual([]);
  });
});

describe('releaseGroupProjects', () => {
  it('gives every package of the group of a package, and none for an unknown one', () => {
    expect(releaseGroupProjects(nxJson, 'icons')).toEqual(['icons', 'illustrations', 'migrator']);
    expect(releaseGroupProjects(nxJson, 'web')).toEqual(['web', 'mobile', 'common']);
    expect(releaseGroupProjects(nxJson, 'nothing')).toEqual([]);
    expect(releaseGroupProjects({}, 'icons')).toEqual([]);
  });
});

describe('plansToSetAside', () => {
  const groupProjects = ['icons', 'illustrations', 'migrator'];

  it('sets aside a plan that names a package outside the group, whether or not it names one inside', () => {
    expect(
      plansToSetAside({
        plans: [
          { file: 'chips.md', content: plan('common', 'web') },
          { file: 'mixed.md', content: plan('icons', 'web') },
          { file: 'sync.md', content: plan('icons', 'illustrations') },
          { file: 'icons.md', content: plan('icons') },
        ],
        groupProjects,
      }),
    ).toEqual(['chips.md', 'mixed.md']);
  });

  it('leaves a plan with no packages alone', () => {
    expect(plansToSetAside({ plans: [{ file: 'a.md', content: 'text' }], groupProjects })).toEqual(
      [],
    );
  });
});

describe('setAside and restore', () => {
  const createRoot = () => {
    const root = mkdtempSync(path.join(tmpdir(), 'version-plans-'));
    writeFileSync(path.join(root, 'nx.json'), JSON.stringify(nxJson));
    const plans = path.join(root, '.nx/version-plans');
    mkdirSync(plans, { recursive: true });
    writeFileSync(path.join(plans, 'README.md'), '# Version plans\n');
    writeFileSync(path.join(plans, 'chips.md'), plan('common', 'web'));
    writeFileSync(path.join(plans, 'focus-trap.md'), plan('web'));
    writeFileSync(path.join(plans, 'sync.md'), plan('icons', 'illustrations'));
    return { root, plans, aside: path.join(root, 'aside') };
  };

  it('moves the plans of other groups out of the folder, and back unchanged', () => {
    const { root, plans, aside } = createRoot();

    const moved = setAside({ root, project: 'icons', asideDirectory: aside });

    expect(moved.sort()).toEqual(['chips.md', 'focus-trap.md']);
    expect(readdirSync(plans).sort()).toEqual(['README.md', 'sync.md']);
    expect(readdirSync(aside).sort()).toEqual(['chips.md', 'focus-trap.md']);

    const back = restore({ root, asideDirectory: aside });

    expect(back.sort()).toEqual(['chips.md', 'focus-trap.md']);
    expect(readdirSync(plans).sort()).toEqual([
      'README.md',
      'chips.md',
      'focus-trap.md',
      'sync.md',
    ]);
    expect(readFileSync(path.join(plans, 'chips.md'), 'utf-8')).toBe(plan('common', 'web'));
  });

  it('sets nothing aside when every plan is inside the group, and restores nothing', () => {
    const { root, plans, aside } = createRoot();
    expect(setAside({ root, project: 'web', asideDirectory: aside })).toEqual(['sync.md']);
    restore({ root, asideDirectory: aside });
    expect(readdirSync(plans)).toContain('sync.md');

    expect(restore({ root, asideDirectory: path.join(root, 'never-made') })).toEqual([]);
  });
});
