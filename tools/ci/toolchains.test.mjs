import { describe, expect, it } from '@jest/globals';

import {
  classifyToolchains,
  selectRootFormatFiles,
  validateProjectToolchainTags,
} from './toolchains.mjs';

const projects = [
  { root: 'packages/web', tags: ['toolchain:node'] },
  { root: 'packages/mobile', tags: ['toolchain:node'] },
  { root: 'packages/cds-android', tags: ['toolchain:gradle'] },
  { root: 'apps/android-app', tags: ['toolchain:gradle'] },
  { root: 'packages/cds-ios', tags: ['toolchain:xcode'] },
  { root: 'tools', tags: ['toolchain:node'] },
];

describe('classifyToolchains', () => {
  it('routes web changes only to Node tasks', () => {
    expect(classifyToolchains(['packages/web/src/Button.tsx'], projects)).toEqual({
      node: true,
      gradle: false,
      xcode: false,
      docs: false,
    });
  });

  it('routes Android changes only to Gradle tasks', () => {
    expect(classifyToolchains(['packages/cds-android/src/main/Button.kt'], projects)).toEqual({
      node: false,
      gradle: true,
      xcode: false,
      docs: false,
    });
  });

  it('routes iOS changes only to Xcode tasks', () => {
    expect(classifyToolchains(['packages/cds-ios/Sources/Button.swift'], projects)).toEqual({
      node: false,
      gradle: false,
      xcode: true,
      docs: false,
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
      docs: false,
    });
  });

  it('routes shared Nx configuration changes to every language toolchain', () => {
    expect(classifyToolchains(['nx.json'], projects)).toEqual({
      node: true,
      gradle: true,
      xcode: true,
      docs: false,
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
      docs: false,
    });
  });

  it('does not start Node for an Android change that also edits skills and AGENTS.md', () => {
    expect(
      classifyToolchains(
        [
          'AGENTS.md',
          '.claude/skills/cds-rn-to-compose/SKILL.md',
          'packages/cds-android/src/main/java/com/coinbase/cds/components/button/Button.kt',
          'packages/cds-android/docs/button.md',
        ],
        projects,
      ),
    ).toEqual({
      node: false,
      gradle: true,
      xcode: false,
      docs: true,
    });
  });

  it('does not treat unmatched documentation and skill files as Node', () => {
    expect(
      classifyToolchains(
        [
          'AGENTS.md',
          'docs/ci.md',
          '.claude/skills/cds-rn-to-compose/SKILL.md',
          '.claude/skills/cds-rn-to-compose/evals/evals.json',
          'skills/cds-code/SKILL.md',
        ],
        projects,
      ),
    ).toEqual({
      node: false,
      gradle: false,
      xcode: false,
      docs: true,
    });
  });

  it('still classifies root Node config files as Node', () => {
    expect(classifyToolchains(['package.json', 'eslint.config.mjs'], projects)).toEqual({
      node: true,
      gradle: false,
      xcode: false,
      docs: false,
    });
  });

  it('runs docs format for markdown inside native projects without starting Node', () => {
    expect(classifyToolchains(['packages/cds-android/docs/button.md'], projects)).toEqual({
      node: false,
      gradle: true,
      xcode: false,
      docs: true,
    });
  });

  it('does not start Format Docs for markdown inside Node projects', () => {
    expect(classifyToolchains(['packages/web/README.md'], projects)).toEqual({
      node: true,
      gradle: false,
      xcode: false,
      docs: false,
    });
  });

  it('does not start a language toolchain for vendored skill references', () => {
    expect(
      classifyToolchains(
        ['.claude/skills/jetpack-best-practices/references/compose-api-guidelines.md'],
        projects,
      ),
    ).toEqual({
      node: false,
      gradle: false,
      xcode: false,
      docs: false,
    });
  });
});

describe('selectRootFormatFiles', () => {
  it('selects leftover docs, skills, and native-package markdown', () => {
    expect(
      selectRootFormatFiles(
        [
          'AGENTS.md',
          '.claude/skills/cds-rn-to-compose/SKILL.md',
          '.claude/skills/cds-rn-to-compose/evals/evals.json',
          'packages/cds-android/docs/button.md',
          'packages/web/src/Button.tsx',
          'packages/web/README.md',
          '.claude/skills/cds-rn-to-compose/references/learnings.md',
        ],
        projects,
      ),
    ).toEqual([
      'AGENTS.md',
      '.claude/skills/cds-rn-to-compose/SKILL.md',
      '.claude/skills/cds-rn-to-compose/evals/evals.json',
      'packages/cds-android/docs/button.md',
    ]);
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
