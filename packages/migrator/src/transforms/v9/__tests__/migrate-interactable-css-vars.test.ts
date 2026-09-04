import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../migrate-interactable-css-vars';

const FIXTURE_SUITE = 'migrate-interactable-css-vars';

const E2E_PAIRED_PREFIXES = [`${FIXTURE_SUITE}/e2e-pressable-style-overrides`] as const;

describe('migrate-interactable-css-vars', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renames all 11 CSS vars as standalone string literal keys', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'all-vars.tsx',
        source: `
const styles = {
  '--interactable-border-radius': '8px',
  '--interactable-background': 'transparent',
  '--interactable-border-color': 'red',
  '--interactable-pressed-background': 'blue',
  '--interactable-pressed-border-color': 'green',
  '--interactable-pressed-opacity': '0.9',
  '--interactable-hovered-background': 'yellow',
  '--interactable-hovered-border-color': 'purple',
  '--interactable-hovered-opacity': '0.8',
  '--interactable-disabled-background': 'gray',
  '--interactable-disabled-border-color': 'lightgray',
};
`,
      },
      `
const styles = {
  "--inter-borderRadius": '8px',
  "--inter-bg": 'transparent',
  "--inter-borderColor": 'red',
  "--inter-press-bg": 'blue',
  "--inter-press-borderColor": 'green',
  "--inter-press-opacity": '0.9',
  "--inter-hover-bg": 'yellow',
  "--inter-hover-borderColor": 'purple',
  "--inter-hover-opacity": '0.8',
  "--inter-disable-bg": 'gray',
  "--inter-disable-borderColor": 'lightgray',
};
`,
      tsxTestOptions,
    );
  });

  it('renames CSS var used as a JSX inline style prop key', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'style-prop.tsx',
        source: `
const Panel = () => (
  <div style={{ '--interactable-background': 'transparent' } as React.CSSProperties} />
);
`,
      },
      `
const Panel = () => (
  <div style={{ "--inter-bg": 'transparent' } as React.CSSProperties} />
);
`,
      tsxTestOptions,
    );
  });

  it('renames CSS var used as a computed key with type cast', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'computed-key.tsx',
        source: `
import type { CSSProperties } from 'react';
const overrides: CSSProperties = {
  ['--interactable-hovered-background' as keyof CSSProperties]: 'var(--color-secondaryHovered)',
  ['--interactable-pressed-background' as keyof CSSProperties]: 'var(--color-secondaryPressed)',
};
`,
      },
      `
import type { CSSProperties } from 'react';
const overrides: CSSProperties = {
  ["--inter-hover-bg" as keyof CSSProperties]: 'var(--color-secondaryHovered)',
  ["--inter-press-bg" as keyof CSSProperties]: 'var(--color-secondaryPressed)',
};
`,
      tsxTestOptions,
    );
  });

  it('renames CSS vars inside var() references in string literal values', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'var-ref.tsx',
        source: `
const styles = {
  background: 'var(--interactable-background)',
  border: '1px solid var(--interactable-border-color)',
};
`,
      },
      `
const styles = {
  background: "var(--inter-bg)",
  border: "1px solid var(--inter-borderColor)",
};
`,
      tsxTestOptions,
    );
  });

  it('renames CSS vars inside template literal quasis', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'template-literal.ts',
        source: `
const getButtonStyle = (color: string) => \`
  --interactable-background: \${color};
  --interactable-border-color: var(--color-accentBoldRed) !important;
\`;
`,
      },
      `
const getButtonStyle = (color: string) => \`
  --inter-bg: \${color};
  --inter-borderColor: var(--color-accentBoldRed) !important;
\`;
`,
      tsxTestOptions,
    );
  });

  it('handles multiple old CSS vars in a single string literal', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'multi-var-string.tsx',
        source: `
const style = '--interactable-background: blue; --interactable-pressed-background: darkblue;';
`,
      },
      `
const style = "--inter-bg: blue; --inter-press-bg: darkblue;";
`,
      tsxTestOptions,
    );
  });

  it('is idempotent: second run is a no-op', () => {
    const afterFirstPass = `
const styles = {
  '--inter-bg': 'transparent',
  '--inter-press-bg': 'blue',
  '--inter-hover-bg': 'yellow',
};
`;
    runInlineTest(
      transform,
      {},
      { path: 'idempotent.tsx', source: afterFirstPass },
      '',
      tsxTestOptions,
    );
  });

  it('is a no-op when no old CSS var names are present', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'no-match.tsx',
        source: `
const styles = {
  background: 'var(--color-bgPrimary)',
  borderRadius: '8px',
};
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not rename partial matches that are not a CSS var name', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'no-partial-match.tsx',
        source: `
const label = 'interactable-background';
const desc = 'see interactable for more info';
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, 'migrate-interactable-css-vars', {}, prefix, tsxTestOptions);
  });
});
