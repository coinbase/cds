import { describe, expect, it } from '@jest/globals';

import { classifyToolchains, validateProjectToolchainTags } from './toolchains.mjs';

const projects = [
  { root: 'packages/web', tags: ['toolchain:node'] },
  { root: 'packages/mobile', tags: ['toolchain:node'] },
  { root: 'packages/cds-android', tags: ['toolchain:gradle'] },
  { root: 'apps/android-app', tags: ['toolchain:gradle'] },
  { root: 'packages/cds-ios', tags: ['toolchain:xcode'] },
];

describe('classifyToolchains', () => {
  it('routes web changes only to Node tasks', () => {
    expect(classifyToolchains(['packages/web/src/Button.tsx'], projects)).toEqual({
      node: true,
      gradle: false,
      xcode: false,
    });
  });

  it('routes Android changes only to Gradle tasks', () => {
    expect(classifyToolchains(['packages/cds-android/src/main/Button.kt'], projects)).toEqual({
      node: false,
      gradle: true,
      xcode: false,
    });
  });

  it('routes iOS changes only to Xcode tasks', () => {
    expect(classifyToolchains(['packages/cds-ios/Sources/Button.swift'], projects)).toEqual({
      node: false,
      gradle: false,
      xcode: true,
    });
  });

  it('routes mixed changes to each affected toolchain', () => {
    expect(
      classifyToolchains(
        ['packages/mobile/src/Button.tsx', 'apps/android-app/src/main/MainActivity.kt'],
        projects,
      ),
    ).toEqual({
      node: true,
      gradle: true,
      xcode: false,
    });
  });

  it('routes shared Nx configuration changes to every toolchain', () => {
    expect(classifyToolchains(['nx.json'], projects)).toEqual({
      node: true,
      gradle: true,
      xcode: true,
    });
  });

  it('routes new projects from their toolchain tag without another path rule', () => {
    const projectsWithNewNativeLibrary = [
      ...projects,
      { root: 'packages/new-native-library', tags: ['toolchain:gradle'] },
    ];

    expect(
      classifyToolchains(
        ['packages/new-native-library/src/main/NewComponent.kt'],
        projectsWithNewNativeLibrary,
      ),
    ).toEqual({
      node: false,
      gradle: true,
      xcode: false,
    });
  });
});

describe('validateProjectToolchainTags', () => {
  it('accepts one recognized toolchain tag per project', () => {
    expect(
      validateProjectToolchainTags([
        { name: 'web', tags: ['toolchain:node'] },
        { name: 'cds-android', tags: ['platform:android', 'toolchain:gradle'] },
        { name: 'cds-ios', tags: ['platform:ios', 'toolchain:xcode'] },
      ]),
    ).toEqual([]);
  });

  it('rejects missing and duplicate toolchain tags', () => {
    expect(
      validateProjectToolchainTags([
        { name: 'missing', tags: [] },
        { name: 'duplicate', tags: ['toolchain:node', 'toolchain:gradle'] },
      ]),
    ).toEqual([
      'missing must have exactly one toolchain tag; found none',
      'duplicate must have exactly one toolchain tag; found toolchain:node, toolchain:gradle',
    ]);
  });

  it('enforces native platform and toolchain pairings', () => {
    expect(
      validateProjectToolchainTags([
        { name: 'android', tags: ['platform:android', 'toolchain:node'] },
        { name: 'ios', tags: ['platform:ios', 'toolchain:gradle'] },
      ]),
    ).toEqual([
      'android uses platform:android and must use toolchain:gradle',
      'ios uses platform:ios and must use toolchain:xcode',
    ]);
  });

  it('requires native targets to override Node defaults with the same name', () => {
    expect(
      validateProjectToolchainTags([
        {
          name: 'android',
          tags: ['platform:android', 'toolchain:gradle'],
          targets: {
            build: {
              cache: true,
              dependsOn: [],
              inputs: ['default'],
              options: { command: './gradlew build' },
            },
          },
        },
      ]),
    ).toEqual(['android:build must override Node target defaults for outputs, options.cwd']);
  });
});
