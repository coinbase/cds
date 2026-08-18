import { render, screen } from '@testing-library/react';

import { fakeGlyphs, FakeIcon } from '../../icons/__fixtures__/fakeIconSet';
import { DefaultThemeProvider } from '../../utils/test';
import { IconButton, iconButtonClassNames } from '../IconButton';

/**
 * The `IconComponent` POC's central claim is a compile-time one, so the
 * assertions that matter are the four element declarations below rather than the
 * runtime expectations further down.
 *
 * They are checked by `nx run web:typecheck` — this package's tsconfig includes
 * every file under `src`, so a `@ts-expect-error` that stops being an error
 * fails the build ("unused '@ts-expect-error' directive"). That is what makes the
 * negative cases genuine rather than decorative.
 */

// 1. Default usage is untouched: `name` is still the built-in `IconName`.
const builtInUsage = <IconButton name="close" />;

// 2. With an `IconComponent`, `name` is checked against that set's own names.
const customSetUsage = <IconButton IconComponent={FakeIcon} name="fakeCompass" />;

// 3. A built-in name is rejected once a custom set is supplied, because that set
//    has no glyph for it. This is the guarantee the adopted provider approach
//    cannot make, since it widens names globally.
// @ts-expect-error 'close' is not a name in the fake icon set
const builtInNameUnderCustomSet = <IconButton IconComponent={FakeIcon} name="close" />;

// 4. And a custom name is rejected when no set is supplied.
// @ts-expect-error 'fakeCompass' is not a built-in CDS icon name
const customNameUnderDefaultSet = <IconButton name="fakeCompass" />;

describe('IconButton IconComponent', () => {
  it('renders a built-in glyph when IconComponent is omitted', () => {
    render(<DefaultThemeProvider>{builtInUsage}</DefaultThemeProvider>);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'close');
  });

  it('renders the custom set glyph when IconComponent is passed', () => {
    render(<DefaultThemeProvider>{customSetUsage}</DefaultThemeProvider>);

    const glyph = screen.getByTestId('icon-base-glyph');

    expect(glyph).toHaveAttribute('data-icon-name', 'fakeCompass');
    expect(glyph).toHaveTextContent(fakeGlyphs.fakeCompass);
  });

  it('applies the icon class name to a custom IconComponent', () => {
    render(<DefaultThemeProvider>{customSetUsage}</DefaultThemeProvider>);

    expect(screen.getByTestId('icon-base-glyph')).toHaveClass(iconButtonClassNames.icon);
  });

  it('derives icon size from the button size for a custom IconComponent', () => {
    render(
      <DefaultThemeProvider>
        <IconButton IconComponent={FakeIcon} name="fakeCompass" size="xs" />
        <IconButton IconComponent={FakeIcon} name="fakeSatellite" size="l" />
      </DefaultThemeProvider>,
    );

    const [small, large] = screen.getAllByTestId('icon-base-glyph');

    // xs/s buttons render an `s` icon and m/l buttons an `m` icon, so the two
    // glyphs must not share a size class.
    expect(small.className).not.toEqual(large.className);
  });

  it('renders the progress circle instead of any icon while loading', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading IconComponent={FakeIcon} name="fakeCompass" testID="loading-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('icon-base-glyph')).toBeNull();
    expect(screen.getByTestId('loading-button-progress-circle')).toBeDefined();
  });

  it('rejects mismatched names at compile time only, with no runtime guard', () => {
    // Documents a real limitation: `IconComponent` buys type safety, not a
    // runtime check. Both elements above are type errors yet still construct.
    expect(builtInNameUnderCustomSet).toBeDefined();
    expect(customNameUnderDefaultSet).toBeDefined();
  });
});
