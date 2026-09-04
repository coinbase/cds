import { loadPeerDependencyVersions, syncDependencyVersions } from '../generateComponentPeerDeps';

describe('syncDependencyVersions', () => {
  const peerDepVersions = new Map([
    ['react-native-reanimated', '^3.14.0'],
    ['react-native-gesture-handler', '^2.16.2'],
    ['framer-motion', '^10.18.0'],
    ['react-dom', '^18.3.1'],
  ]);

  it('updates stale versions to match current peerDependencies', () => {
    const deps = [{ name: 'framer-motion', version: '^9.0.0' }];
    const { synced, warnings } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced).toEqual([{ name: 'framer-motion', version: '^10.18.0' }]);
    expect(warnings).toEqual([]);
  });

  it('leaves up-to-date versions unchanged', () => {
    const deps = [{ name: 'framer-motion', version: '^10.18.0' }];
    const { synced } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced).toEqual(deps);
  });

  it('syncs multiple dependencies at once', () => {
    const deps = [
      { name: 'framer-motion', version: '^9.0.0' },
      { name: 'react-dom', version: '^17.0.0' },
    ];
    const { synced } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced).toEqual([
      { name: 'framer-motion', version: '^10.18.0' },
      { name: 'react-dom', version: '^18.3.1' },
    ]);
  });

  it('warns and preserves deps not found in peerDependencies', () => {
    const deps = [{ name: 'unknown-package', version: '^1.0.0' }];
    const { synced, warnings } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced).toEqual([{ name: 'unknown-package', version: '^1.0.0' }]);
    expect(warnings).toEqual([
      'unknown-package is not listed in any package.json peerDependencies',
    ]);
  });

  it('returns empty array for empty dependencies', () => {
    const { synced, warnings } = syncDependencyVersions([], peerDepVersions);
    expect(synced).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it('handles mix of known and unknown deps', () => {
    const deps = [
      { name: 'framer-motion', version: '^9.0.0' },
      { name: 'not-a-real-dep', version: '^1.0.0' },
      { name: 'react-dom', version: '^18.3.1' },
    ];
    const { synced, warnings } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced).toEqual([
      { name: 'framer-motion', version: '^10.18.0' },
      { name: 'not-a-real-dep', version: '^1.0.0' },
      { name: 'react-dom', version: '^18.3.1' },
    ]);
    expect(warnings).toHaveLength(1);
  });

  it('preserves extra fields on dependency objects', () => {
    const deps = [{ name: 'framer-motion', version: '^9.0.0', url: 'https://example.com' }];
    const { synced } = syncDependencyVersions(deps, peerDepVersions);
    expect(synced[0]).toEqual({
      name: 'framer-motion',
      version: '^10.18.0',
      url: 'https://example.com',
    });
  });
});

describe('loadPeerDependencyVersions', () => {
  it('loads versions from real package.json files', () => {
    const versions = loadPeerDependencyVersions();
    expect(versions.size).toBeGreaterThan(0);
    expect(versions.get('react')).toBeDefined();
  });

  it('includes mobile-specific peer deps', () => {
    const versions = loadPeerDependencyVersions();
    expect(versions.get('react-native')).toBeDefined();
  });

  it('includes web-specific peer deps', () => {
    const versions = loadPeerDependencyVersions();
    expect(versions.get('framer-motion')).toBeDefined();
  });
});
