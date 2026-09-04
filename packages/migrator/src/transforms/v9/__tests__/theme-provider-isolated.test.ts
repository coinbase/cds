import { runInlineTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../theme-provider-isolated';

describe('theme-provider-isolated', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('adds isolated to ThemeProvider imported from @coinbase/cds-web root barrel', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'root-barrel.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('adds isolated to ThemeProvider imported from @coinbase/cds-web/system sub-path', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'system-sub-path.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web/system';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web/system';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('adds isolated to ThemeProvider imported from a deep sub-path', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'deep-path.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('adds isolated to ThemeProvider from a non-@coinbase scope', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'other-scope.tsx',
        source: `
import { ThemeProvider } from '@example/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      `
import { ThemeProvider } from '@example/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('uses local alias name when ThemeProvider is aliased', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'aliased.tsx',
        source: `
import { ThemeProvider as CdsThemeProvider } from '@coinbase/cds-web';
const App = () => <CdsThemeProvider theme={t} activeColorScheme="light">{children}</CdsThemeProvider>;
`,
      },
      `
import { ThemeProvider as CdsThemeProvider } from '@coinbase/cds-web';
const App = () => <CdsThemeProvider theme={t} activeColorScheme="light" isolated>{children}</CdsThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('adds isolated to self-closing ThemeProvider', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'self-closing.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" />;
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated />;
`,
      tsxTestOptions,
    );
  });

  it('does not add isolated when ThemeProvider already has isolated prop (boolean shorthand)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'already-isolated.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not add isolated when ThemeProvider already has isolated={true}', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'already-isolated-explicit.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated={true}>{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not add isolated when ThemeProvider already has isolated={false}', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'already-isolated-false.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated={false}>{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('is a no-op when ThemeProvider comes from a relative import', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'relative-import.tsx',
        source: `
import { ThemeProvider } from './ThemeProvider';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('is a no-op when ThemeProvider comes from a non-CDS package', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'third-party.tsx',
        source: `
import { ThemeProvider } from 'some-other-lib';
const App = () => <ThemeProvider theme={t}>{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('skips non-matching scope when --packageScope is set', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      {
        path: 'scope-mismatch.tsx',
        source: `
import { ThemeProvider } from '@example/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('applies when --packageScope matches', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      {
        path: 'scope-match.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`,
      tsxTestOptions,
    );
  });

  it('does not modify a ThemeProvider element that is not from a CDS import', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'mixed-imports.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
import { ThemeProvider as OtherTP } from 'other-lib';
const App = () => (
  <>
    <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>
    <OtherTP theme={t}>{children}</OtherTP>
  </>
);
`,
      },
      `
import { ThemeProvider } from '@coinbase/cds-web';
import { ThemeProvider as OtherTP } from 'other-lib';
const App = () => (
  <>
    <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>
    <OtherTP theme={t}>{children}</OtherTP>
  </>
);
`,
      tsxTestOptions,
    );
  });

  it('produces the same result when run twice (idempotent)', () => {
    const AFTER_FIRST_PASS = `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light" isolated>{children}</ThemeProvider>;
`;

    runInlineTest(
      transform,
      {},
      {
        path: 'idempotent-pass1.tsx',
        source: `
import { ThemeProvider } from '@coinbase/cds-web';
const App = () => <ThemeProvider theme={t} activeColorScheme="light">{children}</ThemeProvider>;
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
