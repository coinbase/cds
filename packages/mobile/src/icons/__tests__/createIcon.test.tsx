import { createRef } from 'react';
import * as ReactNative from 'react-native';
import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import {
  createIcon,
  DEFAULT_ICON_FONT_FAMILY,
  type GlyphMap,
  IconGlyphSourceProvider,
} from '../createIcon';

const INACTIVE_GLYPH = '\u2606'; // ☆
const ACTIVE_GLYPH = '\u2605'; // ★
const OTHER_GLYPH = '\u25B2'; // ▲
const NESTED_GLYPH = '\u25A0'; // ■

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

const mockFontScale = (fontScale: number) => {
  jest.spyOn(ReactNative, 'useWindowDimensions').mockReturnValue({
    fontScale,
    height: 812,
    scale: 2,
    width: 375,
  });
};

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

  it('resolves a name from a glyph source added through the provider', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider
        source={{ glyphMap: { 'triangle-24-inactive': OTHER_GLYPH }, fontFamily: 'ExtraFont' }}
      >
        <Icon name={'triangle' as DemoIconName} />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByText(OTHER_GLYPH)).toHaveStyle({ fontFamily: 'ExtraFont' });
  });

  it('lets a provider source override a name owned by the bound set', () => {
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider source={{ glyphMap: { 'star-24-inactive': OTHER_GLYPH } }}>
        <Icon name="star" />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByText(OTHER_GLYPH)).toBeTruthy();
    expect(screen.queryByText(INACTIVE_GLYPH)).toBeNull();
  });

  it('replaces the outer source when providers are nested', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

    renderIcon(
      <IconGlyphSourceProvider source={{ glyphMap: { 'triangle-24-inactive': OTHER_GLYPH } }}>
        <IconGlyphSourceProvider source={{ glyphMap: { 'square-24-inactive': NESTED_GLYPH } }}>
          <Icon name={'square' as DemoIconName} />
          <Icon fallback={<View testID="fallback" />} name={'triangle' as DemoIconName} />
        </IconGlyphSourceProvider>
      </IconGlyphSourceProvider>,
    );

    // `triangle` falls through to the bound set and misses, hence the fallback.
    expect(screen.getByText(NESTED_GLYPH)).toBeTruthy();
    expect(screen.queryByText(OTHER_GLYPH)).toBeNull();
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

    expect(screen.getByText(INACTIVE_GLYPH)).toBeTruthy();
  });

  describe('allowFontScaling', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('scales icon size with the device font scale by default', () => {
      mockFontScale(2);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

      renderIcon(<Icon name="star" size="m" />);

      expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({
        fontSize: 48,
        height: 48,
        width: 48,
        lineHeight: 48,
      });
    });

    it('scales icon size when allowFontScaling is explicitly enabled', () => {
      mockFontScale(2);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

      renderIcon(<Icon allowFontScaling name="star" size="m" />);

      expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({
        fontSize: 48,
        height: 48,
        width: 48,
        lineHeight: 48,
      });
    });

    it('uses the base icon size when allowFontScaling is disabled', () => {
      mockFontScale(2);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

      renderIcon(<Icon allowFontScaling={false} name="star" size="m" />);

      expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({
        fontSize: 24,
        height: 24,
        width: 24,
        lineHeight: 24,
      });
    });

    it('passes scaled pixelSize to getGlyph when allowFontScaling is enabled', () => {
      mockFontScale(2);
      const getGlyph = jest.fn(() => INACTIVE_GLYPH);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap, getGlyph });

      renderIcon(<Icon name="star" size="m" />);

      expect(getGlyph).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'star', size: 'm', pixelSize: 48 }),
      );
    });

    it('passes base pixelSize to getGlyph when allowFontScaling is disabled', () => {
      mockFontScale(2);
      const getGlyph = jest.fn(() => INACTIVE_GLYPH);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap, getGlyph });

      renderIcon(<Icon allowFontScaling={false} name="star" size="m" />);

      expect(getGlyph).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'star', size: 'm', pixelSize: 24 }),
      );
    });

    it('does not forward allowFontScaling to the glyph Text element', () => {
      mockFontScale(2);
      const Icon = createIcon<DemoIconName>({ glyphMap: demoGlyphMap });

      renderIcon(<Icon allowFontScaling name="star" />);

      expect(screen.getByText(INACTIVE_GLYPH)).toHaveProp('allowFontScaling', false);
    });
  });
});
