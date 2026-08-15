import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../index';

/** Only consumer-style E2E goldens (all other cases are inline below). */
const E2E_PAIRED_PREFIXES = ['e2e-web-transfer-form', 'e2e-mobile-filter-tray'] as const;

/** Asserts the exact transformed output; pass `''` when the transform must no-op. */
const expectTransform = (path: string, source: string, expected: string, options = {}) =>
  runInlineTest(transform, options, { path, source }, expected, tsxTestOptions);

describe('compact-to-size', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('buttons', () => {
    it('rewrites shorthand compact to size="s" on Button', () => {
      expectTransform(
        'button.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button compact>Go</Button>;
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button size="s">Go</Button>;
`,
      );
    });

    it('rewrites compact={true} to size="s"', () => {
      expectTransform(
        'button-true.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button compact={true}>Go</Button>;
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button size="s">Go</Button>;
`,
      );
    });

    it('drops compact={false} on Button because "l" is already the default', () => {
      expectTransform(
        'button-false.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button compact={false}>Go</Button>;
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button>Go</Button>;
`,
      );
    });

    it('maps IconButton compact={false} to size="l" because its compact defaults to true', () => {
      expectTransform(
        'icon-button-false.tsx',
        `
import { IconButton } from '@coinbase/cds-web/buttons';
const App = () => <IconButton compact={false} name="plus" />;
`,
        `
import { IconButton } from '@coinbase/cds-web/buttons';
const App = () => <IconButton size="l" name="plus" />;
`,
      );
    });

    it('rewrites SlideButton compact on mobile', () => {
      expectTransform(
        'slide-button.tsx',
        `
import { SlideButton } from '@coinbase/cds-mobile/buttons';
const App = () => <SlideButton compact label="Slide" />;
`,
        `
import { SlideButton } from '@coinbase/cds-mobile/buttons';
const App = () => <SlideButton size="s" label="Slide" />;
`,
      );
    });

    it('rewrites deep-path button imports', () => {
      expectTransform(
        'deep-button.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons/Button';
const App = () => <Button compact>Go</Button>;
`,
        `
import { Button } from '@coinbase/cds-web/buttons/Button';
const App = () => <Button size="s">Go</Button>;
`,
      );
    });
  });

  describe('chips map to xs, not s', () => {
    it('rewrites Chip, InputChip and MediaChip to size="xs"', () => {
      expectTransform(
        'chips.tsx',
        `
import { Chip, InputChip, MediaChip } from '@coinbase/cds-web/chips';
const App = () => (
  <>
    <Chip compact>A</Chip>
    <InputChip compact>B</InputChip>
    <MediaChip compact>C</MediaChip>
  </>
);
`,
        `
import { Chip, InputChip, MediaChip } from '@coinbase/cds-web/chips';
const App = () => (
  <>
    <Chip size="xs">A</Chip>
    <InputChip size="xs">B</InputChip>
    <MediaChip size="xs">C</MediaChip>
  </>
);
`,
      );
    });

    it('rewrites alpha TabbedChips to size="xs"', () => {
      expectTransform(
        'tabbed-chips.tsx',
        `
import { TabbedChips } from '@coinbase/cds-web/alpha/tabbed-chips';
const App = () => <TabbedChips compact tabs={tabs} />;
`,
        `
import { TabbedChips } from '@coinbase/cds-web/alpha/tabbed-chips';
const App = () => <TabbedChips size="xs" tabs={tabs} />;
`,
      );
    });

    it('rewrites alpha SelectChip to size="xs" (chip scale, not the select scale)', () => {
      expectTransform(
        'alpha-select-chip.tsx',
        `
import { SelectChip } from '@coinbase/cds-mobile/alpha/select-chip';
const App = () => <SelectChip compact options={options} />;
`,
        `
import { SelectChip } from '@coinbase/cds-mobile/alpha/select-chip';
const App = () => <SelectChip size="xs" options={options} />;
`,
      );
    });

    it('matches components imported from the bare alpha barrel', () => {
      expectTransform(
        'alpha-barrel.tsx',
        `
import { TabbedChips } from '@coinbase/cds-web/alpha';
const App = () => <TabbedChips compact tabs={tabs} />;
`,
        `
import { TabbedChips } from '@coinbase/cds-web/alpha';
const App = () => <TabbedChips size="xs" tabs={tabs} />;
`,
      );
    });
  });

  describe('label placement is preserved on the input family', () => {
    it('adds labelVariant="inside" when TextInput has a label', () => {
      expectTransform(
        'text-input-label.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput compact label="Amount" />;
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput size="s" labelVariant="inside" label="Amount" />;
`,
      );
    });

    it('does not add labelVariant when TextInput has no label', () => {
      expectTransform(
        'text-input-no-label.tsx',
        `
import { TextInput } from '@coinbase/cds-mobile/controls';
const App = () => <TextInput compact placeholder="Amount" />;
`,
        `
import { TextInput } from '@coinbase/cds-mobile/controls';
const App = () => <TextInput size="s" placeholder="Amount" />;
`,
      );
    });

    it('treats labelNode like label', () => {
      expectTransform(
        'text-input-label-node.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput compact labelNode={<span>Amount</span>} />;
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput size="s" labelVariant="inside" labelNode={<span>Amount</span>} />;
`,
      );
    });

    it('overwrites a conflicting labelVariant because compact used to ignore it', () => {
      expectTransform(
        'text-input-variant-conflict.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => (
  <div>
    <TextInput compact label="Amount" labelVariant="outside" />
  </div>
);
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: \`labelVariant\` was overwritten to "inside" because the deprecated \`compact\` ignored the value passed here. */}
    <TextInput size="s" label="Amount" labelVariant="inside" />
  </div>
);
`,
      );
    });

    it('leaves an existing labelVariant="inside" untouched', () => {
      expectTransform(
        'text-input-variant-inside.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput compact label="Amount" labelVariant="inside" />;
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = () => <TextInput size="s" label="Amount" labelVariant="inside" />;
`,
      );
    });

    it('adds labelVariant to DateInput and DatePicker', () => {
      expectTransform(
        'dates.tsx',
        `
import { DateInput, DatePicker } from '@coinbase/cds-web/dates';
const App = () => (
  <>
    <DateInput compact label="Start" />
    <DatePicker compact label="End" />
  </>
);
`,
        `
import { DateInput, DatePicker } from '@coinbase/cds-web/dates';
const App = () => (
  <>
    <DateInput size="s" labelVariant="inside" label="Start" />
    <DatePicker size="s" labelVariant="inside" label="End" />
  </>
);
`,
      );
    });

    it('never adds labelVariant to SearchInput, which has no label prop', () => {
      expectTransform(
        'search-input.tsx',
        `
import { SearchInput } from '@coinbase/cds-web/controls';
const App = () => <SearchInput compact placeholder="Search" />;
`,
        `
import { SearchInput } from '@coinbase/cds-web/controls';
const App = () => <SearchInput size="s" placeholder="Search" />;
`,
      );
    });

    it('flags a spread that might carry a label', () => {
      expectTransform(
        'text-input-spread.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = (props) => (
  <div>
    <TextInput compact {...props} />
  </div>
);
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = (props) => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: If a \`label\` reaches this element through the spread, add \`labelVariant="inside"\` — \`compact\` used to force the label inline. */}
    <TextInput size="s" {...props} />
  </div>
);
`,
      );
    });
  });

  describe('alpha Select family', () => {
    it('adds labelVariant="inside" on single-select', () => {
      expectTransform(
        'select.tsx',
        `
import { Select } from '@coinbase/cds-web/alpha/select';
const App = () => (
  <div>
    <Select compact label="Asset" options={options} />
  </div>
);
`,
        `
import { Select } from '@coinbase/cds-web/alpha/select';
const App = () => (
  <div>
    <Select size="s" labelVariant="inside" label="Asset" options={options} />
  </div>
);
`,
      );
    });

    it('omits labelVariant for multi-select, which kept its label outside', () => {
      expectTransform(
        'select-multi.tsx',
        `
import { Select } from '@coinbase/cds-web/alpha/select';
const App = () => (
  <div>
    <Select compact type="multi" label="Assets" options={options} />
  </div>
);
`,
        `
import { Select } from '@coinbase/cds-web/alpha/select';
const App = () => (
  <div>
    <Select size="s" type="multi" label="Assets" options={options} />
  </div>
);
`,
      );
    });

    it('flags a dynamic type because the label rule differs per select type', () => {
      expectTransform(
        'select-dynamic-type.tsx',
        `
import { Select } from '@coinbase/cds-mobile/alpha/select';
const App = ({ kind }) => (
  <div>
    <Select compact type={kind} label="Assets" options={options} />
  </div>
);
`,
        `
import { Select } from '@coinbase/cds-mobile/alpha/select';
const App = ({ kind }) => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: \`type\` is dynamic: legacy \`compact\` placed the label inline for single-select but left it outside for multi-select. Set \`labelVariant\` accordingly. */}
    <Select size="s" type={kind} label="Assets" options={options} />
  </div>
);
`,
      );
    });

    it('rewrites Combobox from the alpha combobox path', () => {
      expectTransform(
        'combobox.tsx',
        `
import { Combobox } from '@coinbase/cds-web/alpha/combobox';
const App = () => (
  <div>
    <Combobox compact options={options} />
  </div>
);
`,
        `
import { Combobox } from '@coinbase/cds-web/alpha/combobox';
const App = () => (
  <div>
    <Combobox size="s" options={options} />
  </div>
);
`,
      );
    });
  });

  describe('size already present', () => {
    it('drops the redundant compact when size is a literal', () => {
      expectTransform(
        'size-wins.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button compact size="m">Go</Button>;
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button size="m">Go</Button>;
`,
      );
    });

    it('keeps compact and flags it when size is a dynamic expression', () => {
      expectTransform(
        'size-dynamic.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ size }) => (
  <div>
    <Button compact size={size}>Go</Button>
  </div>
);
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ size }) => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: \`size\` is a dynamic expression here, so the deprecated \`compact\` still applies whenever it resolves to \`undefined\`. Remove \`compact\` once \`size\` is always set. */}
    <Button compact size={size}>Go</Button>
  </div>
);
`,
      );
    });
  });

  describe('dynamic compact becomes a conditional', () => {
    it('uses the component default for the falsy branch', () => {
      expectTransform(
        'dynamic-compact.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
import { Chip } from '@coinbase/cds-web/chips';
const App = ({ isDense }) => (
  <>
    <Button compact={isDense}>Go</Button>
    <Chip compact={isDense}>Tag</Chip>
  </>
);
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
import { Chip } from '@coinbase/cds-web/chips';
const App = ({ isDense }) => (
  <>
    <Button size={isDense ? "s" : "l"}>Go</Button>
    <Chip size={isDense ? "xs" : "s"}>Tag</Chip>
  </>
);
`,
      );
    });

    it('flags conditional label placement on the input family', () => {
      expectTransform(
        'dynamic-compact-input.tsx',
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = ({ isDense }) => (
  <div>
    <TextInput compact={isDense} label="Amount" />
  </div>
);
`,
        `
import { TextInput } from '@coinbase/cds-web/controls';
const App = ({ isDense }) => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: \`compact\` also placed the label inline when truthy; add a matching \`labelVariant\` if that placement mattered. */}
    <TextInput size={isDense ? "s" : "l"} label="Amount" />
  </div>
);
`,
      );
    });
  });

  describe('components whose compact means something else are never touched', () => {
    it.each([
      [
        'AvatarButton maps compact onto the Avatar scale',
        'AvatarButton',
        '@coinbase/cds-web/buttons',
      ],
      ['legacy controls Select has no size prop', 'Select', '@coinbase/cds-web/controls'],
      [
        'NativeInput compact deprecates toward padding props',
        'NativeInput',
        '@coinbase/cds-web/controls',
      ],
      ['NativeTextArea has no size prop', 'NativeTextArea', '@coinbase/cds-web/controls'],
      [
        'InputIcon needs size on the parent TextInput',
        'InputIcon',
        '@coinbase/cds-mobile/controls',
      ],
      [
        'ContentCell compact is the v9 spacingVariant deprecation',
        'ContentCell',
        '@coinbase/cds-web/cells',
      ],
      [
        'ListCell compact is the v9 spacingVariant deprecation',
        'ListCell',
        '@coinbase/cds-web/cells',
      ],
      ['Table compact is undeprecated cell spacing', 'Table', '@coinbase/cds-web/tables'],
      ['CardBody compact is undeprecated padding', 'CardBody', '@coinbase/cds-web/cards'],
      [
        'dropdown compact is not deprecated',
        'DefaultSelectDropdown',
        '@coinbase/cds-web/alpha/select',
      ],
      ['option compact is not deprecated', 'DefaultSelectOption', '@coinbase/cds-web/alpha/select'],
      ['legacy chips TabbedChips has no compact prop', 'TabbedChips', '@coinbase/cds-web/chips'],
    ])('leaves %s alone', (_label, component, source) => {
      expectTransform(
        'danger.tsx',
        `
import { ${component} } from '${source}';
const App = () => <${component} compact />;
`,
        '',
      );
    });
  });

  describe('import resolution', () => {
    it('handles aliased imports', () => {
      expectTransform(
        'alias.tsx',
        `
import { Button as CdsButton } from '@coinbase/cds-web/buttons';
const App = () => <CdsButton compact>Go</CdsButton>;
`,
        `
import { Button as CdsButton } from '@coinbase/cds-web/buttons';
const App = () => <CdsButton size="s">Go</CdsButton>;
`,
      );
    });

    it('rewrites any npm scope by default', () => {
      expectTransform(
        'other-scope.tsx',
        `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button compact>Go</Button>;
`,
        `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button size="s">Go</Button>;
`,
      );
    });

    it('skips non-matching scopes when --package-scope is set', () => {
      expectTransform(
        'scoped.tsx',
        `
import { Button } from '@example/cds-web/buttons';
const App = () => <Button compact>Go</Button>;
`,
        '',
        { packageScope: '@coinbase' },
      );
    });

    it('applies import mappings so wrapper packages are covered', () => {
      expectTransform(
        'wrapper.tsx',
        `
import { Button } from '@acme/shared/cds/buttons';
const App = () => <Button compact>Go</Button>;
`,
        `
import { Button } from '@acme/shared/cds/buttons';
const App = () => <Button size="s">Go</Button>;
`,
        { importMappings: [{ from: '@acme/shared/cds', to: '@coinbase/cds-web' }] },
      );
    });

    it('ignores identically named local components', () => {
      expectTransform(
        'local.tsx',
        `
import { Button } from './components/Button';
const App = () => <Button compact>Go</Button>;
`,
        '',
      );
    });

    it('only rewrites the CDS component when a third-party shares the name', () => {
      expectTransform(
        'third-party.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
import { Button as OtherButton } from 'third-party-lib';
const App = () => (
  <>
    <Button compact>CDS</Button>
    <OtherButton compact>Other</OtherButton>
  </>
);
`,
        `
import { Button } from '@coinbase/cds-web/buttons';
import { Button as OtherButton } from 'third-party-lib';
const App = () => (
  <>
    <Button size="s">CDS</Button>
    <OtherButton compact>Other</OtherButton>
  </>
);
`,
      );
    });

    it('no-ops when the file has no compact usage at all', () => {
      expectTransform(
        'clean.tsx',
        `
import { Button } from '@coinbase/cds-web/buttons';
const App = () => <Button size="s">Go</Button>;
`,
        '',
      );
    });
  });

  it('produces the same result when run twice', () => {
    /** Output after one pass; the second pass must no-op. */
    const FIRST_PASS = `
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { TextInput } from '@coinbase/cds-web/controls';
const App = ({ isDense }) => (
  <>
    <Button size="s">A</Button>
    <IconButton size="l" name="plus" />
    <TextInput size="s" labelVariant="inside" label="Amount" />
    <Button size={isDense ? "s" : "l"}>B</Button>
  </>
);
`;
    expectTransform(
      'idempotent.tsx',
      `
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { TextInput } from '@coinbase/cds-web/controls';
const App = ({ isDense }) => (
  <>
    <Button compact>A</Button>
    <IconButton compact={false} name="plus" />
    <TextInput compact label="Amount" />
    <Button compact={isDense}>B</Button>
  </>
);
`,
      FIRST_PASS,
    );
    expectTransform('idempotent-pass2.tsx', FIRST_PASS, '');
  });

  it('does not add a duplicate TODO when one is already present', () => {
    expectTransform(
      'dup-todo.tsx',
      `
import { Button } from '@coinbase/cds-web/buttons';
const App = ({ size }) => (
  <div>
    {/* TODO [cds-migrator:compact-to-size]: \`size\` is a dynamic expression here, so the deprecated \`compact\` still applies whenever it resolves to \`undefined\`. Remove \`compact\` once \`size\` is always set. */}
    <Button compact size={size}>Go</Button>
  </div>
);
`,
      '',
    );
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, 'index', {}, prefix, tsxTestOptions);
  });
});
