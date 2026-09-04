import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../button-variant-values';

const FIXTURE_SUITE = 'button-variant-values';

/** Only consumer-style E2E goldens (all other cases are inline below). */
const E2E_PAIRED_PREFIXES = [
  `${FIXTURE_SUITE}/e2e-survey-confirmation-panel`,
  `${FIXTURE_SUITE}/e2e-chat-toolbar-actions`,
] as const;

describe('button-variant-values', () => {
  it('rewrites variant="tertiary" to variant="inverse" on Button from @coinbase/cds-web/buttons', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'web-buttons.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button variant="tertiary">Click</Button>;
`,
      },
      `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button variant="inverse">Click</Button>;
`,
      tsxTestOptions,
    );
  });

  it('does not rewrite Button imported from package root @coinbase/cds-web (not a v8 export)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'root-web.tsx',
        source: `
import { Button } from '@coinbase/cds-web';
const App = () => <Button variant="tertiary">Click</Button>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not rewrite IconButton imported from package root @coinbase/cds-mobile (not a v8 export)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'root-mobile.tsx',
        source: `
import { IconButton } from '@coinbase/cds-mobile';
const App = () => <IconButton variant="tertiary" name="plus" />;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('rewrites variant="foregroundMuted" to variant="secondary" on Button from @coinbase/cds-web/buttons', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'fg-muted.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button variant="foregroundMuted">Click</Button>;
`,
      },
      `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button variant="secondary">Click</Button>;
`,
      tsxTestOptions,
    );
  });

  it('rewrites variant="tertiary" to variant="inverse" on Button from a non-@coinbase scope', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'example-scope.tsx',
        source: `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button variant="tertiary">Click</Button>;
`,
      },
      `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button variant="inverse">Click</Button>;
`,
      tsxTestOptions,
    );
  });

  it('skips non-matching scope when --package-scope is set', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      {
        path: 'scope.tsx',
        source: `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button variant="tertiary">Click</Button>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('rewrites variant="tertiary" to variant="inverse" on IconButton from @coinbase/cds-mobile', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'icon-tertiary.tsx',
        source: `
import { IconButton } from '@coinbase/cds-mobile/buttons';
const App = () => <IconButton variant="tertiary" name="plus" />;
`,
      },
      `
import { IconButton } from '@coinbase/cds-mobile/buttons';
const App = () => <IconButton variant="inverse" name="plus" />;
`,
      tsxTestOptions,
    );
  });

  it('rewrites variant="foregroundMuted" to variant="secondary" on IconButton from @coinbase/cds-mobile', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'icon-fg-muted.tsx',
        source: `
import { IconButton } from '@coinbase/cds-mobile/buttons';
const App = () => <IconButton variant="foregroundMuted" name="plus" />;
`,
      },
      `
import { IconButton } from '@coinbase/cds-mobile/buttons';
const App = () => <IconButton variant="secondary" name="plus" />;
`,
      tsxTestOptions,
    );
  });

  it('adds a TODO comment for dynamic variant expressions', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'dynamic.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ v }) => <Button variant={v}>Click</Button>;
`,
      },
      `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ v }) => // TODO [cds-migrator:button-variant-values]: Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
<Button variant={v}>Click</Button>;
`,
      tsxTestOptions,
    );
  });

  it('does not add duplicate TODO if already present', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'dup-todo.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ v }) =>
  // TODO [cds-migrator:button-variant-values]: Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
  <Button variant={v}>Click</Button>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('returns empty string when there are no CDS button imports (local relative path)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'local-button.tsx',
        source: `
import { Button } from './MyButton';
const App = () => <Button variant="tertiary">Click</Button>;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('returns empty string when there are no CDS button imports (non-CDS path)', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'local-components.tsx',
        source: `import React from 'react';
import { Button } from './components/Button';

export function CustomToolbar() {
  return (
    <div>
      <Button variant="tertiary">Cancel</Button>
      <Button variant="foregroundMuted">Dismiss</Button>
    </div>
  );
}
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not modify non-CDS Button components', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'third-party.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
import { Button as ThirdPartyButton } from 'third-party-lib';
const App = () => (
  <>
    <Button variant="tertiary">CDS</Button>
    <ThirdPartyButton variant="tertiary">Other</ThirdPartyButton>
  </>
);
`,
      },
      `
import { Button } from '@coinbase/cds-web/buttons';
import { Button as ThirdPartyButton } from 'third-party-lib';
const App = () => (
  <>
    <Button variant="inverse">CDS</Button>
    <ThirdPartyButton variant="tertiary">Other</ThirdPartyButton>
  </>
);
`,
      tsxTestOptions,
    );
  });

  it('does not modify already-correct variant values', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'already-correct.tsx',
        source: `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => (
  <>
    <Button variant="primary">A</Button>
    <Button variant="inverse">B</Button>
    <Button variant="secondary">C</Button>
  </>
);
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('transforms aliased CDS Button imports', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'alias.tsx',
        source: `
import { Button as CdsButton } from '@coinbase/cds-web/buttons';
const App = () => <CdsButton variant="tertiary">Click</CdsButton>;
`,
      },
      `
import { Button as CdsButton } from '@coinbase/cds-web/buttons';
const App = () => <CdsButton variant="inverse">Click</CdsButton>;
`,
      tsxTestOptions,
    );
  });

  it('produces the same result when run twice', () => {
    /** Output after one pass on the idempotent test input (second pass must no-op). */
    const BUTTON_ICONBUTTON_FIRST_PASS = `
import { Button, IconButton } from '@coinbase/cds-web/buttons';
const App = () => (
  <>
    <Button variant="inverse">A</Button>
    <IconButton variant="secondary" name="plus" />
  </>
);
`;
    runInlineTest(
      transform,
      {},
      {
        path: 'idempotent.tsx',
        source: `
import { Button, IconButton } from '@coinbase/cds-web/buttons';
const App = () => (
  <>
    <Button variant="tertiary">A</Button>
    <IconButton variant="foregroundMuted" name="plus" />
  </>
);
`,
      },
      BUTTON_ICONBUTTON_FIRST_PASS,
      tsxTestOptions,
    );
    runInlineTest(
      transform,
      {},
      { path: 'idempotent-pass2.tsx', source: BUTTON_ICONBUTTON_FIRST_PASS },
      '',
      tsxTestOptions,
    );
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, 'button-variant-values', {}, prefix, tsxTestOptions);
  });
});
