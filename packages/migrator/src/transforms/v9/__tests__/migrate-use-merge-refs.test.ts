import { applyTransform } from 'jscodeshift/src/testUtils';

import { readTransformFixture } from '../../../test-utils/readTransformFixture';
import transform from '../migrate-use-merge-refs';

const FIXTURE_SUITE = 'migrate-use-merge-refs';

function readFixtureFile(name: string): string {
  return readTransformFixture(__dirname, FIXTURE_SUITE, name);
}

function applyMigrateTransform(
  source: string,
  jscodeshiftOptions: Record<string, unknown> = {},
): string {
  return applyTransform(transform, jscodeshiftOptions, { source }, { parser: 'tsx' });
}

describe('migrate-use-merge-refs', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ['basic'],
    ['alternate-scope-basic'],
    ['import-alias'],
    ['jest-mock'],
    ['re-export'],
    ['merge-duplicate-imports'],
    ['object-literal-key'],
  ])('transforms %s fixture', (basename) => {
    const input = readFixtureFile(`${basename}.input.tsx`);
    const expected = readFixtureFile(`${basename}.output.tsx`);
    const out = applyMigrateTransform(input);
    expect(out).not.toBe('');
    expect(out).toBe(expected.trim());
  });

  it('does not modify third-party useMergeRefs import', () => {
    const input = readFixtureFile('third-party-import.input.tsx');
    expect(applyMigrateTransform(input)).toBe('');
  });

  it('does not migrate alternate scope when --package-scope is @coinbase', () => {
    const input = readFixtureFile('alternate-scope-basic.input.tsx');
    expect(applyMigrateTransform(input, { packageScope: '@coinbase' })).toBe('');
  });

  it('migrates alternate scope when --package-scope matches', () => {
    const input = readFixtureFile('alternate-scope-basic.input.tsx');
    const expected = readFixtureFile('alternate-scope-basic.output.tsx');
    expect(applyMigrateTransform(input, { packageScope: '@example' })).toBe(expected.trim());
  });

  it('makes no changes when there is nothing to migrate', () => {
    const input = readFixtureFile('nothing-to-migrate.input.tsx');
    expect(applyMigrateTransform(input)).toBe('');
  });

  it('is idempotent: second run on transformed output makes no changes', () => {
    const transformed = readFixtureFile('basic.output.tsx');
    expect(applyMigrateTransform(transformed)).toBe('');
  });
});
