import fs from 'fs';
import path from 'path';

const { applyTransform } = require('jscodeshift/src/testUtils');

const transform = require('../button-variant-values');

const PARSER_OPTIONS = { parser: 'tsx' };

function applyButtonVariantTransform(source: string) {
  return applyTransform(transform, {}, { source }, PARSER_OPTIONS);
}

function readFixture(name: string) {
  return fs.readFileSync(
    path.join(__dirname, '..', '__testfixtures__', 'button-variant-values', `${name}.tsx`),
    'utf8',
  );
}

describe('button-variant-values', () => {
  describe('string literal rewrites', () => {
    it('rewrites variant="tertiary" to variant="inverse" on Button from @coinbase/cds-web', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
const App = () => <Button variant="tertiary">Click</Button>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('variant="inverse"');
      expect(output).not.toContain('variant="tertiary"');
    });

    it('rewrites variant="foregroundMuted" to variant="secondary" on Button from @coinbase/cds-web', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
const App = () => <Button variant="foregroundMuted">Click</Button>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('variant="secondary"');
      expect(output).not.toContain('variant="foregroundMuted"');
    });

    it('rewrites variant="tertiary" to variant="inverse" on IconButton from @coinbase/cds-mobile', () => {
      const input = `
import { IconButton } from '@coinbase/cds-mobile';
const App = () => <IconButton variant="tertiary" icon="plus" />;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('variant="inverse"');
      expect(output).not.toContain('variant="tertiary"');
    });

    it('rewrites variant="foregroundMuted" to variant="secondary" on IconButton from @coinbase/cds-mobile', () => {
      const input = `
import { IconButton } from '@coinbase/cds-mobile';
const App = () => <IconButton variant="foregroundMuted" icon="plus" />;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('variant="secondary"');
      expect(output).not.toContain('variant="foregroundMuted"');
    });
  });

  describe('dynamic expressions', () => {
    it('adds a TODO comment for dynamic variant expressions', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
const App = ({ v }) => <Button variant={v}>Click</Button>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('TODO(cds-migration)');
      expect(output).toContain('variant values changed in v9');
    });

    it('does not add duplicate TODO if already present', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
const App = ({ v }) =>
  // TODO(cds-migration): Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
  <Button variant={v}>Click</Button>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toBe('');
    });
  });

  describe('skipped cases', () => {
    it('returns empty string for files with no CDS imports', () => {
      const input = `
import { Button } from './MyButton';
const App = () => <Button variant="tertiary">Click</Button>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toBe('');
    });

    it('does not modify non-CDS Button components', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
import { Button as ThirdPartyButton } from 'third-party-lib';
const App = () => (
  <>
    <Button variant="tertiary">CDS</Button>
    <ThirdPartyButton variant="tertiary">Other</ThirdPartyButton>
  </>
);
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('<Button variant="inverse"');
      expect(output).toContain('<ThirdPartyButton variant="tertiary"');
    });

    it('does not modify already-correct variant values', () => {
      const input = `
import { Button } from '@coinbase/cds-web';
const App = () => (
  <>
    <Button variant="primary">A</Button>
    <Button variant="inverse">B</Button>
    <Button variant="secondary">C</Button>
  </>
);
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toBe('');
    });
  });

  describe('aliased imports', () => {
    it('transforms aliased CDS Button imports', () => {
      const input = `
import { Button as CdsButton } from '@coinbase/cds-web';
const App = () => <CdsButton variant="tertiary">Click</CdsButton>;
`;
      const output = applyButtonVariantTransform(input);
      expect(output).toContain('variant="inverse"');
      expect(output).not.toContain('variant="tertiary"');
    });
  });

  describe('idempotency', () => {
    it('produces the same result when run twice', () => {
      const input = `
import { Button, IconButton } from '@coinbase/cds-web';
const App = () => (
  <>
    <Button variant="tertiary">A</Button>
    <IconButton variant="foregroundMuted" icon="plus" />
  </>
);
`;
      const firstPass = applyButtonVariantTransform(input);
      const secondPass = applyButtonVariantTransform(firstPass);
      expect(secondPass).toBe('');
    });
  });

  describe('e2e fixtures', () => {
    it('transforms mixed variants correctly', () => {
      const input = readFixture('mixed-variants.input');
      const expected = readFixture('mixed-variants.output');
      const output = applyButtonVariantTransform(input);
      expect(output.trim()).toEqual(expected.trim());
    });

    it('adds TODO for dynamic expressions', () => {
      const input = readFixture('dynamic-expression.input');
      const expected = readFixture('dynamic-expression.output');
      const output = applyButtonVariantTransform(input);
      expect(output.trim()).toEqual(expected.trim());
    });

    it('skips files with no CDS imports', () => {
      const input = readFixture('no-cds-imports.input');
      const output = applyButtonVariantTransform(input);
      expect(output).toBe('');
    });

    it('transforms aliased imports correctly', () => {
      const input = readFixture('aliased-imports.input');
      const expected = readFixture('aliased-imports.output');
      const output = applyButtonVariantTransform(input);
      expect(output.trim()).toEqual(expected.trim());
    });
  });
});
