import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { render, screen } from '@testing-library/react-native';

import { fakeGlyphs, FakeIcon } from '../../icons/__fixtures__/fakeIconSet';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Banner } from '../Banner';

/**
 * Banner is the POC's second component because it stresses the pattern in ways
 * IconButton cannot: `startIcon` is *required*, it is not polymorphic (so there
 * was no existing generic call signature to extend), and it renders a second icon
 * — the dismiss `close` glyph — that `IconComponent` deliberately cannot reach.
 *
 * As in the IconButton fixture, the declarations below are the real assertions
 * and are enforced by `nx run mobile:typecheck`.
 */

const TEST_ID = 'test-banner';

/** The built-in `close` glyph at whichever source size the theme resolves to. */
const builtInCloseGlyphs = [12, 16, 24].map(
  (pixelSize) => glyphMap[`close-${pixelSize}-inactive` as keyof typeof glyphMap],
);

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

    expect(screen.getByTestId(`${TEST_ID}-icon`)).toBeTruthy();
  });

  it('renders the custom set glyph when IconComponent is passed', () => {
    render(<DefaultThemeProvider>{customSetUsage}</DefaultThemeProvider>);

    expect(screen.getByText(fakeGlyphs.fakeCompass)).toHaveStyle({ fontFamily: 'FakeIcons' });
  });

  it('still renders the dismiss icon from the built-in set', () => {
    // The limitation made concrete: `IconComponent` reaches consumer-supplied
    // names only. Banner picks `close` itself, so a consumer replacing the icon
    // set cannot replace it and ends up mixing two icon fonts in one component.
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

    expect(screen.getByText(fakeGlyphs.fakeCompass)).toBeTruthy();

    const renderedCloseGlyph = builtInCloseGlyphs.find(
      (glyph) => screen.queryByText(glyph) !== null,
    );

    expect(renderedCloseGlyph).toBeDefined();
    expect(screen.getByText(renderedCloseGlyph as string)).toHaveStyle({
      fontFamily: 'CoinbaseIcons',
    });
  });

  it('rejects mismatched names at compile time only, with no runtime guard', () => {
    expect(builtInNameUnderCustomSet).toBeDefined();
    expect(customNameUnderDefaultSet).toBeDefined();
  });
});
