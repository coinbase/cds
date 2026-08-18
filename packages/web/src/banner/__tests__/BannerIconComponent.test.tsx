import { render, screen } from '@testing-library/react';

import { fakeGlyphs, FakeIcon } from '../../icons/__fixtures__/fakeIconSet';
import { DefaultThemeProvider } from '../../utils/test';
import { Banner } from '../Banner';

/**
 * Banner is the POC's second component because it stresses the pattern in ways
 * IconButton cannot: `startIcon` is *required*, it is not polymorphic (so there
 * was no existing generic call signature to extend), and it renders a second icon
 * — the dismiss `close` glyph — that `IconComponent` deliberately cannot reach.
 *
 * As in the IconButton fixture, the declarations below are the real assertions
 * and are enforced by `nx run web:typecheck`.
 */

const TEST_ID = 'test-banner';

// 1. Default usage is untouched: `startIcon` is still the built-in `IconName`.
const builtInUsage = <Banner startIcon="info" testID={TEST_ID} variant="warning" />;

// 2. With an `IconComponent`, `startIcon` is checked against that set's names.
const customSetUsage = (
  <Banner IconComponent={FakeIcon} startIcon="fakeCompass" testID={TEST_ID} variant="warning" />
);

// 3. A built-in name is rejected once a custom set is supplied.
const builtInNameUnderCustomSet = (
  // @ts-expect-error 'info' is not a name in the fake icon set
  <Banner IconComponent={FakeIcon} startIcon="info" testID={TEST_ID} variant="warning" />
);

// 4. And a custom name is rejected when no set is supplied.
const customNameUnderDefaultSet = (
  // @ts-expect-error 'fakeCompass' is not a built-in CDS icon name
  <Banner startIcon="fakeCompass" testID={TEST_ID} variant="warning" />
);

describe('Banner IconComponent', () => {
  it('renders a built-in glyph when IconComponent is omitted', () => {
    render(<DefaultThemeProvider>{builtInUsage}</DefaultThemeProvider>);

    expect(screen.getByTestId(`${TEST_ID}-icon-glyph`)).toHaveAttribute('data-icon-name', 'info');
  });

  it('renders the custom set glyph when IconComponent is passed', () => {
    render(<DefaultThemeProvider>{customSetUsage}</DefaultThemeProvider>);

    const glyph = screen.getByTestId(`${TEST_ID}-icon-glyph`);

    expect(glyph).toHaveAttribute('data-icon-name', 'fakeCompass');
    expect(glyph).toHaveTextContent(fakeGlyphs.fakeCompass);
  });

  it('keeps the start icon accessibility label on a custom IconComponent', () => {
    render(
      <DefaultThemeProvider>
        <Banner
          IconComponent={FakeIcon}
          startIcon="fakeCompass"
          startIconAccessibilityLabel="fake compass"
          testID={TEST_ID}
          variant="warning"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(`${TEST_ID}-icon-glyph`)).toHaveAttribute(
      'aria-label',
      'fake compass',
    );
  });

  it('still renders the dismiss icon from the built-in set', () => {
    // The limitation made concrete: `IconComponent` reaches consumer-supplied
    // names only. Banner picks `close` itself, so a consumer replacing the icon
    // set cannot restyle or replace it and ends up mixing two icon fonts.
    render(
      <DefaultThemeProvider>
        <Banner
          showDismiss
          IconComponent={FakeIcon}
          startIcon="fakeCompass"
          testID={TEST_ID}
          variant="warning"
        />
      </DefaultThemeProvider>,
    );

    const glyphs = screen.getAllByTestId(/glyph/);
    const iconNames = glyphs.map((glyph) => glyph.getAttribute('data-icon-name'));

    expect(iconNames).toContain('fakeCompass');
    expect(iconNames).toContain('close');
  });

  it('rejects mismatched names at compile time only, with no runtime guard', () => {
    expect(builtInNameUnderCustomSet).toBeDefined();
    expect(customNameUnderDefaultSet).toBeDefined();
  });
});
