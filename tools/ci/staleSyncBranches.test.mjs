import { describe, expect, it } from '@jest/globals';

import { selectStaleBranches } from './staleSyncBranches.mjs';

const now = new Date('2026-11-19T12:00:00Z');
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

const select = (branches, openPullRequestBranches = [], staleDays) =>
  selectStaleBranches({ branches, openPullRequestBranches, now, staleDays });

describe('selectStaleBranches', () => {
  it('deletes old sync branches that have no open pull request', () => {
    expect(
      select([
        { name: 'icons/2026-10-01', lastCommitAt: daysAgo(49) },
        { name: 'illustrations/2026-10-06', lastCommitAt: daysAgo(44) },
      ]),
    ).toEqual(['icons/2026-10-01', 'illustrations/2026-10-06']);
  });

  it('keeps a branch inside the grace period, including the one a sync just pushed', () => {
    expect(
      select([
        { name: 'icons/2026-11-19', lastCommitAt: daysAgo(0) },
        { name: 'icons/2026-11-06', lastCommitAt: daysAgo(13) },
      ]),
    ).toEqual([]);
  });

  it('keeps a branch whose pull request is still open, however old', () => {
    expect(
      select([{ name: 'icons/2026-09-01', lastCommitAt: daysAgo(79) }], ['icons/2026-09-01']),
    ).toEqual([]);
  });

  it('never touches branches that are not named like a sync branch', () => {
    expect(
      select([
        { name: 'illustrations/05-10-2026', lastCommitAt: daysAgo(190) },
        { name: 'icons/2026-10-01-fix', lastCommitAt: daysAgo(49) },
        { name: 'feat/icons/2026-10-01', lastCommitAt: daysAgo(49) },
        { name: 'master', lastCommitAt: daysAgo(400) },
      ]),
    ).toEqual([]);
  });

  it('skips a branch whose date cannot be read instead of deleting it', () => {
    expect(select([{ name: 'icons/2026-10-01', lastCommitAt: 'not a date' }])).toEqual([]);
  });

  it('uses the number of days it is given', () => {
    const branches = [{ name: 'icons/2026-11-06', lastCommitAt: daysAgo(13) }];
    expect(select(branches, [], 7)).toEqual(['icons/2026-11-06']);
  });
});
