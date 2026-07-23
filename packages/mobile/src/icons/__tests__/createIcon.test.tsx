import { createRef } from 'react';
import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { createIcon, DEFAULT_ICON_FONT_FAMILY, type GlyphMap } from '../createIcon';

const INACTIVE_GLYPH = '\u2606'; // ☆
const ACTIVE_GLYPH = '\u2605'; // ★

type DemoIconName = 'star';

const demoGlyphMap: GlyphMap<DemoIconName> = {
  'star-12-active': ACTIVE_GLYPH,
  'star-12-inactive': INACTIVE_GLYPH,
  'star-16-active': ACTIVE_GLYPH,
  'star-16-inactive': INACTIVE_GLYPH,
  'star-24-active': ACTIVE_GLYPH,
  'star-24-inactive': INACTIVE_GLYPH,
};

const renderIcon = (ui: React.ReactElement) =>
  render(<DefaultThemeProvider>{ui}</DefaultThemeProvider>);

describe('createIcon', () => {
  it('renders the inactive glyph from the provided glyph map by default', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon name="star" />);

    expect(screen.getByText(INACTIVE_GLYPH)).toBeTruthy();
  });

  it('renders the active glyph when active is set', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon active name="star" />);

    expect(screen.getByText(ACTIVE_GLYPH)).toBeTruthy();
  });

  it('applies the provided font family to the glyph', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap, fontFamily: 'DemoFont' });

    renderIcon(<Icon name="star" />);

    expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({ fontFamily: 'DemoFont' });
  });

  it('defaults to the CDS icon font family', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon name="star" />);

    expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({
      fontFamily: DEFAULT_ICON_FONT_FAMILY,
    });
  });

  it('renders the fallback when no glyph matches the name', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon fallback={<View testID="fallback" />} name={'missing' as DemoIconName} />);

    expect(screen.queryByText(INACTIVE_GLYPH)).toBeNull();
    expect(screen.getByTestId('fallback')).toBeTruthy();

    consoleError.mockRestore();
  });

  it('forwards a ref to the glyph element', () => {
    const ref = createRef<Text>();
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(<Icon ref={ref} name="star" />);

    expect(ref.current).not.toBeNull();
  });

  it('resolves the glyph via a custom getGlyph resolver', () => {
    const getGlyph = jest.fn(() => ACTIVE_GLYPH);
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap, getGlyph });

    renderIcon(<Icon active name="star" size="l" />);

    expect(screen.getByText(ACTIVE_GLYPH)).toBeTruthy();
    expect(getGlyph).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'star', size: 'l', active: true }),
    );
  });
});
