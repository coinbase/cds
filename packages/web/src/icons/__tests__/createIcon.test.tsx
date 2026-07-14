import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { createIcon, type GlyphMap } from '../createIcon';

const GLYPH = '\u2605'; // ★

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
});
