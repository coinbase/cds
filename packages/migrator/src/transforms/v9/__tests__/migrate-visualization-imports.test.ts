import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../migrate-visualization-imports';

const FIXTURE_SUITE = 'migrate-visualization-imports';

/**
 * E2E paired fixtures — composite real-world patterns (OSS-safe).
 * Covers: root-barrel value + type imports, chart/sparkline sub-path imports,
 * and non-visualization imports left unchanged.
 */
const E2E_PAIRED_PREFIXES = [`${FIXTURE_SUITE}/e2e-chart-hook`] as const;

describe('migrate-visualization-imports', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // ─── Web: root barrel ────────────────────────────────────────────────────────

  it('rewrites @coinbase/cds-web-visualization root barrel import', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'web-root.tsx',
        source: `import { Sparkline } from '@coinbase/cds-web-visualization';`,
      },
      `import { Sparkline } from "@coinbase/cds-web/visualizations";`,
      tsxTestOptions,
    );
  });

  // ─── Web: named sub-paths ────────────────────────────────────────────────────

  it('rewrites @coinbase/cds-web-visualization/chart', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'web-chart.tsx',
        source: `import { CartesianChart, LineChart } from '@coinbase/cds-web-visualization/chart';`,
      },
      `import { CartesianChart, LineChart } from "@coinbase/cds-web/visualizations/chart";`,
      tsxTestOptions,
    );
  });

  it('rewrites @coinbase/cds-web-visualization/sparkline', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'web-sparkline.tsx',
        source: `import { Sparkline, SparklineArea } from '@coinbase/cds-web-visualization/sparkline';`,
      },
      `import { Sparkline, SparklineArea } from "@coinbase/cds-web/visualizations/sparkline";`,
      tsxTestOptions,
    );
  });

  it('rewrites deep sub-path @coinbase/cds-web-visualization/chart/area', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'web-deep.tsx',
        source: `import { AreaChart } from '@coinbase/cds-web-visualization/chart/area';`,
      },
      `import { AreaChart } from "@coinbase/cds-web/visualizations/chart/area";`,
      tsxTestOptions,
    );
  });

  // ─── Mobile: root barrel ─────────────────────────────────────────────────────

  it('rewrites @coinbase/cds-mobile-visualization root barrel import', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mobile-root.tsx',
        source: `import { Sparkline } from '@coinbase/cds-mobile-visualization';`,
      },
      `import { Sparkline } from "@coinbase/cds-mobile/visualizations";`,
      tsxTestOptions,
    );
  });

  // ─── Mobile: named sub-paths ─────────────────────────────────────────────────

  it('rewrites @coinbase/cds-mobile-visualization/chart', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mobile-chart.tsx',
        source: `import { CartesianChart, BarChart } from '@coinbase/cds-mobile-visualization/chart';`,
      },
      `import { CartesianChart, BarChart } from "@coinbase/cds-mobile/visualizations/chart";`,
      tsxTestOptions,
    );
  });

  it('rewrites @coinbase/cds-mobile-visualization/sparkline', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mobile-sparkline.tsx',
        source: `import { SparklineInteractive } from '@coinbase/cds-mobile-visualization/sparkline';`,
      },
      `import { SparklineInteractive } from "@coinbase/cds-mobile/visualizations/sparkline";`,
      tsxTestOptions,
    );
  });

  it('rewrites deep sub-path @coinbase/cds-mobile-visualization/chart/bar', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mobile-deep.tsx',
        source: `import { BarChart } from '@coinbase/cds-mobile-visualization/chart/bar';`,
      },
      `import { BarChart } from "@coinbase/cds-mobile/visualizations/chart/bar";`,
      tsxTestOptions,
    );
  });

  // ─── Re-exports ──────────────────────────────────────────────────────────────

  it('rewrites export * from visualization package', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 're-export-all.ts',
        source: `export * from '@coinbase/cds-web-visualization/chart';`,
      },
      `export * from "@coinbase/cds-web/visualizations/chart";`,
      tsxTestOptions,
    );
  });

  it('rewrites named re-export from visualization package', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 're-export-named.ts',
        source: `export { Sparkline, SparklineArea } from '@coinbase/cds-web-visualization/sparkline';`,
      },
      `export { Sparkline, SparklineArea } from "@coinbase/cds-web/visualizations/sparkline";`,
      tsxTestOptions,
    );
  });

  // ─── Mixed web + mobile in one file ─────────────────────────────────────────

  it('rewrites both web and mobile visualization imports in the same file', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mixed.tsx',
        source: `
import { CartesianChart } from '@coinbase/cds-web-visualization/chart';
import { Sparkline } from '@coinbase/cds-mobile-visualization/sparkline';
`,
      },
      `
import { CartesianChart } from "@coinbase/cds-web/visualizations/chart";
import { Sparkline } from "@coinbase/cds-mobile/visualizations/sparkline";
`,
      tsxTestOptions,
    );
  });

  // ─── Scope filtering ─────────────────────────────────────────────────────────

  it('rewrites matching scope when --packageScope is set', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      {
        path: 'scope-match.tsx',
        source: `import { LineChart } from '@coinbase/cds-web-visualization/chart';`,
      },
      `import { LineChart } from "@coinbase/cds-web/visualizations/chart";`,
      tsxTestOptions,
    );
  });

  it('skips non-matching scope when --packageScope is set', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      {
        path: 'scope-mismatch.tsx',
        source: `import { LineChart } from '@example/cds-web-visualization/chart';`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('rewrites any scope when --packageScope is omitted', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'any-scope.tsx',
        source: `import { AreaChart } from '@example/cds-web-visualization/chart';`,
      },
      `import { AreaChart } from "@example/cds-web/visualizations/chart";`,
      tsxTestOptions,
    );
  });

  // ─── No-op cases ─────────────────────────────────────────────────────────────

  it('is a no-op when import is already migrated to cds-web/visualizations', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'already-migrated.tsx',
        source: `import { CartesianChart } from '@coinbase/cds-web/visualizations/chart';`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('is a no-op for unrelated imports', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'unrelated.tsx',
        source: `import { Button } from '@coinbase/cds-web/buttons';`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('is a no-op for imports from cds-web (root, non-visualization)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'cds-web-root.tsx',
        source: `import { ThemeProvider } from '@coinbase/cds-web';`,
      },
      '',
      tsxTestOptions,
    );
  });

  // ─── E2E paired fixtures ──────────────────────────────────────────────────────

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, 'migrate-visualization-imports', {}, prefix, tsxTestOptions);
  });

  // ─── Idempotency ─────────────────────────────────────────────────────────────

  it('is idempotent — second run on already-migrated output is a no-op', () => {
    const AFTER_FIRST_PASS = `
import { CartesianChart } from "@coinbase/cds-web/visualizations/chart";
import { Sparkline } from "@coinbase/cds-mobile/visualizations/sparkline";
`;

    runInlineTest(
      transform,
      {},
      {
        path: 'idempotent-pass1.tsx',
        source: `
import { CartesianChart } from '@coinbase/cds-web-visualization/chart';
import { Sparkline } from '@coinbase/cds-mobile-visualization/sparkline';
`,
      },
      AFTER_FIRST_PASS,
      tsxTestOptions,
    );

    runInlineTest(
      transform,
      {},
      { path: 'idempotent-pass2.tsx', source: AFTER_FIRST_PASS },
      '',
      tsxTestOptions,
    );
  });
});
