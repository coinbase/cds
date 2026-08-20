import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { createIcon, type GlyphMap, IconGlyphSourceProvider } from '../createIcon';

const GLYPH = '\u2605'; // ★
const OTHER_GLYPH = '\u25B2'; // ▲
const NESTED_GLYPH = '\u25A0'; // ■

type DemoIconName = 'star';

const demoGlyphMap: GlyphMap<DemoIconName> = {
  'star-12-active': GLYPH,
  'star-12-inactive': GLYPH,
  'star-16-active': GLYPH,
  'star-16-inactive': GLYPH,
  'star-24-active': GLYPH,
  'star-24-inactive': GLYPH,
};

const renderIcon = (ui: React.ReactElement) =>
  render(<DefaultThemeProvider>{ui}</DefaultThemeProvider>);

describe('createIcon', () => {
  it('renders the glyph from the provided glyph map', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon name="star" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveTextContent(GLYPH);
  });

  it('sets the icon font-family CSS variable when a custom font is bound', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap, fontFamily: 'DemoFont' });

    renderIcon(<Icon name="star" />);

    expect(
      screen.getByTestId('icon-base-glyph').style.getPropertyValue('--cds-icon-font-family'),
    ).toBe('DemoFont');
  });

  it('does not set the font-family variable for the default font', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon name="star" />);

    expect(
      screen.getByTestId('icon-base-glyph').style.getPropertyValue('--cds-icon-font-family'),
    ).toBe('');
  });

  it('renders the fallback when no glyph matches the name', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <Icon name={'missing' as DemoIconName} fallback={<span data-testid="fallback" />} />,
    );

    expect(screen.queryByTestId('icon-base-glyph')).toBeNull();
    expect(screen.getByTestId('fallback')).toBeTruthy();

    consoleError.mockRestore();
  });

  it('resolves a name from a glyph source added through the provider', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider
        source={{
          glyphMap: { 'triangle-24-inactive': OTHER_GLYPH },
          fontFamily: 'ExtraFont',
        }}
      >
        <Icon name={'triangle' as DemoIconName} />
      </IconGlyphSourceProvider>,
    );

    const glyph = screen.getByTestId('icon-base-glyph');
    expect(glyph).toHaveTextContent(OTHER_GLYPH);
    expect(glyph.style.getPropertyValue('--cds-icon-font-family')).toBe('ExtraFont');
  });

  it('lets a provider source override a name owned by the bound set', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider source={{ glyphMap: { 'star-24-inactive': OTHER_GLYPH } }}>
        <Icon name="star" />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByTestId('icon-base-glyph')).toHaveTextContent(OTHER_GLYPH);
  });

  it('replaces the outer source when providers are nested', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider source={{ glyphMap: { 'triangle-24-inactive': OTHER_GLYPH } }}>
        <IconGlyphSourceProvider source={{ glyphMap: { 'square-24-inactive': NESTED_GLYPH } }}>
          <Icon name={'square' as DemoIconName} />
          <Icon name={'triangle' as DemoIconName} fallback={<span data-testid="fallback" />} />
        </IconGlyphSourceProvider>
      </IconGlyphSourceProvider>,
    );

    // `triangle` falls through to the bound set and misses, hence the fallback.
    expect(screen.getByTestId('icon-base-glyph')).toHaveTextContent(NESTED_GLYPH);
    expect(screen.getByTestId('fallback')).toBeTruthy();

    consoleError.mockRestore();
  });

  it('still falls back to the bound set inside a nested provider', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider source={{ glyphMap: { 'triangle-24-inactive': OTHER_GLYPH } }}>
        <IconGlyphSourceProvider source={{ glyphMap: { 'square-24-inactive': NESTED_GLYPH } }}>
          <Icon name="star" />
        </IconGlyphSourceProvider>
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByTestId('icon-base-glyph')).toHaveTextContent(GLYPH);
  });
});
