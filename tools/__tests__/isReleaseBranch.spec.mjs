import {
  getMajorFromReleaseBranch,
  getNpmDistTagFromReleaseBranch,
  isReleaseBranch,
  isMasterOrReleaseBranch,
} from '../ci/isReleaseBranch.mjs';

describe('isReleaseBranch', () => {
  it.each([
    ['release-8.x', true],
    ['release-10.x', true],
    ['release-100.x', true],
  ])('returns true for %s', (branch, expected) => {
    expect(isReleaseBranch(branch)).toBe(expected);
  });

  it.each([
    ['master', false],
    ['release-8', false],
    ['release-8.0', false],
    ['release-.x', false],
    ['erichkuerschner/my-feature', false],
    ['', false],
  ])('returns false for %s', (branch, expected) => {
    expect(isReleaseBranch(branch)).toBe(expected);
  });
});

describe('isMasterOrReleaseBranch', () => {
  it('returns true for master', () => {
    expect(isMasterOrReleaseBranch('master')).toBe(true);
  });

  it('returns true for release branches', () => {
    expect(isMasterOrReleaseBranch('release-8.x')).toBe(true);
    expect(isMasterOrReleaseBranch('release-10.x')).toBe(true);
  });

  it('returns false for feature branches', () => {
    expect(isMasterOrReleaseBranch('erichkuerschner/my-feature')).toBe(false);
    expect(isMasterOrReleaseBranch('')).toBe(false);
  });
});

describe('getMajorFromReleaseBranch', () => {
  it('extracts the major version number', () => {
    expect(getMajorFromReleaseBranch('release-8.x')).toBe(8);
    expect(getMajorFromReleaseBranch('release-10.x')).toBe(10);
  });

  it('throws for non-release branches', () => {
    expect(() => getMajorFromReleaseBranch('master')).toThrow();
    expect(() => getMajorFromReleaseBranch('release-8')).toThrow();
  });
});

describe('getNpmDistTagFromReleaseBranch', () => {
  it('returns an npm-valid dist-tag for release branches', () => {
    expect(getNpmDistTagFromReleaseBranch('release-8.x')).toBe('v8-lts');
    expect(getNpmDistTagFromReleaseBranch('release-10.x')).toBe('v10-lts');
  });

  it('throws for non-release branches', () => {
    expect(() => getNpmDistTagFromReleaseBranch('master')).toThrow();
  });
});
