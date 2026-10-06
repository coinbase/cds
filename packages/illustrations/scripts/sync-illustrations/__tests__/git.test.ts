import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { type Release, runOnReleaseBranches } from '../git';
import { assertNativeCheckout, nativeModules } from '../nativeRepo';

/** A stand-in for `ReleaseBranch` that records calls into a shared log. */
const release = (
  label: string,
  calls: string[],
  { startFails = false, changed = true } = {},
): Release => ({
  label,
  commitMessage: `commit ${label}`,
  branch: {
    start: () => {
      calls.push(`${label}.start`);
      if (startFails) throw new Error(`${label} is dirty`);
    },
    publish: (message: string) => {
      calls.push(`${label}.publish(${message})`);
      return changed;
    },
    abandon: () => {
      calls.push(`${label}.abandon`);
    },
  },
});

const quiet = () => undefined;

describe('runOnReleaseBranches', () => {
  it('starts every branch before the run and publishes each afterwards', async () => {
    const calls: string[] = [];
    await runOnReleaseBranches(
      [release('native', calls), release('cds', calls)],
      async () => {
        calls.push('sync');
        return true;
      },
      quiet,
    );
    expect(calls).toEqual([
      'native.start',
      'cds.start',
      'sync',
      'native.publish(commit native)',
      'cds.publish(commit cds)',
    ]);
  });

  it('abandons only the repositories the run did not change', async () => {
    const calls: string[] = [];
    await runOnReleaseBranches(
      [release('native', calls), release('cds', calls, { changed: false })],
      async () => true,
      quiet,
    );
    expect(calls).toContain('cds.abandon');
    expect(calls).not.toContain('native.abandon');
  });

  it('abandons every branch when the run produced nothing', async () => {
    const calls: string[] = [];
    await runOnReleaseBranches(
      [release('native', calls), release('cds', calls)],
      async () => false,
      quiet,
    );
    expect(calls).toEqual(['native.start', 'cds.start', 'native.abandon', 'cds.abandon']);
  });

  it('abandons every started branch and rethrows when the run fails', async () => {
    const calls: string[] = [];
    await expect(
      runOnReleaseBranches(
        [release('native', calls), release('cds', calls)],
        async () => {
          throw new Error('rejected SVG');
        },
        quiet,
      ),
    ).rejects.toThrow('rejected SVG');
    expect(calls).toEqual(['native.start', 'cds.start', 'native.abandon', 'cds.abandon']);
  });

  it('never runs the sync when a branch cannot start, and leaves the others as they were', async () => {
    const calls: string[] = [];
    await expect(
      runOnReleaseBranches(
        [release('native', calls, { startFails: true }), release('cds', calls)],
        async () => {
          calls.push('sync');
          return true;
        },
        quiet,
      ),
    ).rejects.toThrow('native is dirty');
    expect(calls).toEqual(['native.start']);
  });
});

describe('assertNativeCheckout', () => {
  let repo: string;
  beforeEach(() => {
    repo = fs.mkdtempSync(path.join(os.tmpdir(), 'native-checkout-'));
  });
  afterEach(() => {
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('accepts a git checkout with both native CDS modules', () => {
    fs.mkdirSync(path.join(repo, '.git'));
    Object.values(nativeModules).forEach((module) =>
      fs.mkdirSync(path.join(repo, module), { recursive: true }),
    );
    expect(() => assertNativeCheckout(repo)).not.toThrow();
  });

  it('names everything that is missing', () => {
    fs.mkdirSync(path.join(repo, nativeModules.ios), { recursive: true });
    expect(() => assertNativeCheckout(repo)).toThrow(
      `SYNC_ILLUSTRATIONS_NATIVE_REPO=${repo} is not a native CDS checkout: it is not a git checkout, it has no modules/android/cds`,
    );
  });
});
