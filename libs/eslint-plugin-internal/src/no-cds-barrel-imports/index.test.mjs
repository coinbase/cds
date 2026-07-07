import path from 'node:path';

import { RuleTester } from '@typescript-eslint/rule-tester';

import getForbiddenImportsModule from './getForbiddenImports.cjs';
import rule from './index.mjs';

const { getForbiddenImportsForFile, _clearCacheForTesting } = getForbiddenImportsModule;

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const REPO_ROOT = path.resolve(__dirname, '../../../..');
const WEB_FILE = path.join(REPO_ROOT, 'packages/web/src/_eslint_rule_test.tsx');
const MOBILE_FILE = path.join(REPO_ROOT, 'packages/mobile/src/_eslint_rule_test.tsx');
const COMMON_FILE = path.join(REPO_ROOT, 'packages/common/src/_eslint_rule_test.tsx');

// Files inside real component folders so relative barrel resolution works.
const WEB_ACCORDION_FILE = path.join(REPO_ROOT, 'packages/web/src/accordion/_test.tsx');
const MOBILE_OVERLAYS_FILE = path.join(REPO_ROOT, 'packages/mobile/src/overlays/_test.tsx');

const BARREL_TARGET_PATTERN = /(?:^|\/)index\.(?:[mc]?[jt]sx?|d\.[mc]?ts)$/;

function resolveExportTarget(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    return value.default ?? value.import ?? value.require ?? value.types;
  }
  return undefined;
}

function getBarrelSubpathsFor(packageName) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pkgJson = require(`${packageName}/package.json`);
  const subpaths = new Set();
  let hasRoot = false;
  for (const [key, value] of Object.entries(pkgJson.exports || {})) {
    if (key.includes('*')) continue;
    const target = resolveExportTarget(value);
    if (typeof target !== 'string' || !BARREL_TARGET_PATTERN.test(target)) continue;
    if (key === '.') hasRoot = true;
    else if (key.startsWith('./')) subpaths.add(key.slice(2));
  }
  if (subpaths.size === 0) return new Set();
  if (hasRoot) subpaths.add('');
  return subpaths;
}

function makeBarrelInvalidCases(filename, packageName) {
  // Side-effect imports have no named bindings to redirect, so they are never
  // auto-fixable. That keeps these structural "every barrel entry is flagged"
  // assertions independent of each package's resolvable export graph.
  return Array.from(getBarrelSubpathsFor(packageName)).map((subpath) => ({
    filename,
    code: `import '${subpath === '' ? packageName : `${packageName}/${subpath}`}';`,
    output: null,
    errors: [
      {
        messageId: subpath === '' ? 'noCdsRootBarrelImport' : 'noCdsSubpathBarrelImport',
        data: subpath === '' ? { packageName } : { packageName, subpath },
      },
    ],
  }));
}

const webBarrelInvalidCases = [
  ...makeBarrelInvalidCases(WEB_FILE, '@coinbase/cds-common'),
  ...makeBarrelInvalidCases(WEB_FILE, '@coinbase/cds-lottie-files'),
];

const mobileBarrelInvalidCases = [
  ...makeBarrelInvalidCases(MOBILE_FILE, '@coinbase/cds-common'),
  ...makeBarrelInvalidCases(MOBILE_FILE, '@coinbase/cds-lottie-files'),
];

describe("'no-cds-barrel-imports' rule", () => {
  ruleTester.run('no-cds-barrel-imports', rule, {
    valid: [
      // Deep leaf imports that bypass any declared barrel entry
      { filename: WEB_FILE, code: "import { Button } from '@coinbase/cds-web/buttons/Button';" },
      { filename: WEB_FILE, code: "import { Text } from '@coinbase/cds-mobile/typography/Text';" },
      { filename: WEB_FILE, code: "import { useTheme } from '@coinbase/cds-common/hooks';" },
      {
        filename: WEB_FILE,
        code: "import { ThemeProvider } from '@coinbase/cds-common/theme/ThemeProvider';",
      },
      {
        filename: MOBILE_FILE,
        code: "import { Carousel } from '@coinbase/cds-mobile/media/Carousel/Carousel';",
      },
      { filename: WEB_FILE, code: "export { Button } from '@coinbase/cds-web/buttons/Button';" },
      { filename: WEB_FILE, code: "export * from '@coinbase/cds-web/buttons/Button';" },
      { filename: WEB_FILE, code: "import('@coinbase/cds-web/buttons/Button');" },
      { filename: WEB_FILE, code: "const x = require('@coinbase/cds-web/buttons/Button');" },
      // Type-only deep imports
      {
        filename: WEB_FILE,
        code: "import type { ButtonProps } from '@coinbase/cds-web/buttons/Button';",
      },
      // Unrelated packages should never be flagged
      { filename: WEB_FILE, code: "import { something } from 'some-other-package';" },
      // CDS packages without subpath barrels remain valid (icons/illustrations/utils)
      { filename: WEB_FILE, code: "import { unrelated } from '@coinbase/cds-icons';" },
      { filename: WEB_FILE, code: "import unrelated from '@coinbase/cds-illustrations';" },
      { filename: WEB_FILE, code: "import { something } from '@coinbase/cds-utils';" },
      // Visualization packages aren't deps of platform packages
      { filename: WEB_FILE, code: "import { Foo } from '@coinbase/cds-web-visualization';" },
      { filename: WEB_FILE, code: "import { Bar } from '@coinbase/cds-mobile-visualization';" },
      // Rule should not fire for files whose nearest package.json has no CDS deps with subpath barrels
      { filename: COMMON_FILE, code: "import { Button } from '@coinbase/cds-common';" },
      { filename: COMMON_FILE, code: "import { x } from '@coinbase/cds-lottie-files';" },
      { filename: COMMON_FILE, code: "import { y } from '@coinbase/cds-icons';" },
      // cds-web and cds-mobile aren't deps of any of these workspace packages, so their
      // barrel imports are not flagged from within these workspaces.
      { filename: WEB_FILE, code: "import { Button } from '@coinbase/cds-web';" },
      { filename: WEB_FILE, code: "import { Button } from '@coinbase/cds-web/buttons';" },
      { filename: MOBILE_FILE, code: "import { Text } from '@coinbase/cds-mobile';" },
      { filename: MOBILE_FILE, code: "import { Text } from '@coinbase/cds-mobile/typography';" },
      // Relative imports that resolve to a leaf file (not a barrel) are valid.
      {
        filename: WEB_ACCORDION_FILE,
        code: "import { Accordion } from './Accordion';",
      },
      {
        filename: WEB_ACCORDION_FILE,
        code: "import { something } from './utils';",
      },
      {
        filename: MOBILE_OVERLAYS_FILE,
        code: "import { useToastAnimation } from './useToastAnimation';",
      },
      // Barrel files themselves are exempt — they roll up sub-barrels by design.
      {
        filename: path.join(REPO_ROOT, 'packages/web/src/numbers/index.ts'),
        code: "export * from './RollingNumber';",
      },
      {
        filename: path.join(REPO_ROOT, 'packages/web/src/visualizations/index.ts'),
        code: "export * from './chart';",
      },
      {
        filename: path.join(REPO_ROOT, 'packages/web/src/accordion/index.ts'),
        code: "import { useTheme } from '@coinbase/cds-common';",
      },
    ],
    invalid: [
      // Every barrel entry of every CDS dep that has subpath barrels is flagged
      ...webBarrelInvalidCases,
      ...mobileBarrelInvalidCases,
      // Subpath barrels with explicit messageId + data assertions. The imported
      // names here aren't real exports of the barrel, so they aren't auto-fixed.
      {
        filename: WEB_FILE,
        code: "import { types } from '@coinbase/cds-common/types';",
        output: null,
        errors: [
          {
            messageId: 'noCdsSubpathBarrelImport',
            data: { packageName: '@coinbase/cds-common', subpath: 'types' },
          },
        ],
      },
      {
        filename: MOBILE_FILE,
        code: "import { types } from '@coinbase/cds-common/types';",
        output: null,
        errors: [
          {
            messageId: 'noCdsSubpathBarrelImport',
            data: { packageName: '@coinbase/cds-common', subpath: 'types' },
          },
        ],
      },
      // Root barrel of cds-common from web/mobile (which both depend on cds-common)
      {
        filename: WEB_FILE,
        code: "import { useTheme } from '@coinbase/cds-common';",
        output: null,
        errors: [
          { messageId: 'noCdsRootBarrelImport', data: { packageName: '@coinbase/cds-common' } },
        ],
      },
      {
        filename: MOBILE_FILE,
        code: "import { useTheme } from '@coinbase/cds-common';",
        output: null,
        errors: [
          { messageId: 'noCdsRootBarrelImport', data: { packageName: '@coinbase/cds-common' } },
        ],
      },
      // All import/export syntactic forms targeting a subpath barrel. None of
      // these are auto-fixable (unresolvable names, namespace, side-effect,
      // re-export-all, dynamic import, require).
      {
        filename: WEB_FILE,
        code: "import type { CommonTypes } from '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "import CommonTypes from '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "import * as CommonTypes from '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "import '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "export { something } from '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "export * from '@coinbase/cds-common/types';",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "const mod = await import('@coinbase/cds-common/types');",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },
      {
        filename: WEB_FILE,
        code: "const mod = require('@coinbase/cds-common/types');",
        output: null,
        errors: [{ messageId: 'noCdsSubpathBarrelImport' }],
      },

      // --- Relative barrel imports (the primary use-case within CDS source) ---
      // Importing from a sibling folder's index resolves to a barrel.
      // Named imports whose symbols can be traced to leaf modules are auto-fixed.
      {
        filename: MOBILE_OVERLAYS_FILE,
        code: "import { Button } from '../buttons';",
        output: "import { Button } from '../buttons/Button';",
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: '../buttons' } }],
      },
      {
        filename: MOBILE_OVERLAYS_FILE,
        code: "import { Box, HStack } from '../layout';",
        output: "import { Box } from '../layout/Box';\nimport { HStack } from '../layout/HStack';",
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: '../layout' } }],
      },
      {
        filename: WEB_ACCORDION_FILE,
        code: "import { Accordion } from '.';",
        output: "import { Accordion } from './Accordion';",
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: '.' } }],
      },
      // AccordionHeader is not exported from the barrel, so no fix is possible.
      {
        filename: WEB_ACCORDION_FILE,
        code: "export { AccordionHeader } from './index';",
        output: null,
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: './index' } }],
      },
      // Named export that can be traced is auto-fixed.
      {
        filename: WEB_ACCORDION_FILE,
        code: "export { Accordion } from './index';",
        output: "export { Accordion } from './Accordion';",
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: './index' } }],
      },
      // ExportAll from a non-barrel file has no specifiers to trace so it is never auto-fixed.
      {
        filename: WEB_ACCORDION_FILE,
        code: "export * from './index';",
        output: null,
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: './index' } }],
      },
      // Namespace imports are not auto-fixed.
      {
        filename: MOBILE_OVERLAYS_FILE,
        code: "import * as Layout from '../layout';",
        output: null,
        errors: [{ messageId: 'noCdsRelativeBarrelImport', data: { specifier: '../layout' } }],
      },

      // --- Autofix: rewrite barrel imports to deep leaf-module subpaths ---
      // Single named import from the root barrel is redirected to its leaf.
      {
        filename: WEB_FILE,
        code: "import { getWidthInEm } from '@coinbase/cds-common';",
        output: "import { getWidthInEm } from '@coinbase/cds-common/utils/getWidthInEm';",
        errors: [
          { messageId: 'noCdsRootBarrelImport', data: { packageName: '@coinbase/cds-common' } },
        ],
      },
      // Multiple names spread across different leaves are split into one import
      // statement per leaf module.
      {
        filename: WEB_FILE,
        code: "import { getWidthInEm, join, useToggler } from '@coinbase/cds-common';",
        output:
          "import { getWidthInEm } from '@coinbase/cds-common/utils/getWidthInEm';\n" +
          "import { join } from '@coinbase/cds-common/utils/join';\n" +
          "import { useToggler } from '@coinbase/cds-common/hooks/useToggler';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // Multiple names that share a single leaf collapse into one import.
      {
        filename: WEB_FILE,
        code: "import type { ColorScheme, ColorSchemePreference } from '@coinbase/cds-common';",
        output:
          "import type { ColorScheme, ColorSchemePreference } from '@coinbase/cds-common/core/theme';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // Aliases are preserved.
      {
        filename: MOBILE_FILE,
        code: "import { getWidthInEm as widthEm } from '@coinbase/cds-common';",
        output:
          "import { getWidthInEm as widthEm } from '@coinbase/cds-common/utils/getWidthInEm';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // Whole-statement `import type` is preserved on each emitted statement.
      {
        filename: WEB_FILE,
        code: "import type { ColorScheme } from '@coinbase/cds-common';",
        output: "import type { ColorScheme } from '@coinbase/cds-common/core/theme';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // Per-specifier `type` modifiers are preserved when splitting.
      {
        filename: WEB_FILE,
        code: "import { getWidthInEm, type ColorScheme } from '@coinbase/cds-common';",
        output:
          "import { getWidthInEm } from '@coinbase/cds-common/utils/getWidthInEm';\n" +
          "import { type ColorScheme } from '@coinbase/cds-common/core/theme';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // A subpath barrel is fixed to a deeper leaf subpath.
      {
        filename: WEB_FILE,
        code: "import type { AvatarShape } from '@coinbase/cds-common/types';",
        output: "import type { AvatarShape } from '@coinbase/cds-common/types/AvatarBaseProps';",
        errors: [
          {
            messageId: 'noCdsSubpathBarrelImport',
            data: { packageName: '@coinbase/cds-common', subpath: 'types' },
          },
        ],
      },
      // Named re-exports (`export { x } from`) are fixed and split too.
      {
        filename: WEB_FILE,
        code: "export { getWidthInEm, useToggler } from '@coinbase/cds-common';",
        output:
          "export { getWidthInEm } from '@coinbase/cds-common/utils/getWidthInEm';\n" +
          "export { useToggler } from '@coinbase/cds-common/hooks/useToggler';",
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
      // All-or-nothing: if any name can't be traced to a leaf, no fix is applied.
      {
        filename: WEB_FILE,
        code: "import { getWidthInEm, DoesNotExist } from '@coinbase/cds-common';",
        output: null,
        errors: [{ messageId: 'noCdsRootBarrelImport' }],
      },
    ],
  });
});

describe('getForbiddenImportsForFile cache', () => {
  beforeEach(() => {
    _clearCacheForTesting();
  });

  it('returns the same Map instance on repeated calls for the same workspace package.json', () => {
    const first = getForbiddenImportsForFile(WEB_FILE);
    const second = getForbiddenImportsForFile(WEB_FILE);
    expect(first).toBe(second);
  });

  it('returns the same Map instance for different files in the same workspace', () => {
    const a = getForbiddenImportsForFile(WEB_FILE);
    const b = getForbiddenImportsForFile(
      path.join(REPO_ROOT, 'packages/web/src/buttons/Button/Button.tsx'),
    );
    expect(a).toBe(b);
  });

  it('returns distinct Map instances for different workspaces', () => {
    const web = getForbiddenImportsForFile(WEB_FILE);
    const mobile = getForbiddenImportsForFile(MOBILE_FILE);
    expect(web).not.toBe(mobile);
  });

  it('discovers cds-common as a forbidden barrel target for the web workspace', () => {
    const forbidden = getForbiddenImportsForFile(WEB_FILE);
    expect(forbidden.has('@coinbase/cds-common')).toBe(true);
    expect(forbidden.get('@coinbase/cds-common').has('')).toBe(true);
    expect(forbidden.get('@coinbase/cds-common').has('types')).toBe(true);
  });

  it('does not include CDS deps without subpath barrels', () => {
    const forbidden = getForbiddenImportsForFile(WEB_FILE);
    expect(forbidden.has('@coinbase/cds-icons')).toBe(false);
    expect(forbidden.has('@coinbase/cds-illustrations')).toBe(false);
    expect(forbidden.has('@coinbase/cds-utils')).toBe(false);
  });

  it('returns an empty Map when the workspace has no CDS deps with subpath barrels', () => {
    const forbidden = getForbiddenImportsForFile(COMMON_FILE);
    expect(forbidden.size).toBe(0);
  });

  it('returns null when the file has no nearby package.json', () => {
    expect(getForbiddenImportsForFile('/nonexistent-root/__no_pkg__/file.ts')).toBeNull();
  });
});
