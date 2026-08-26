import type { IconName } from '@coinbase/cds-common/types/IconName';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { DEFAULT_ICON_FONT_FAMILY, type GlyphMap, IconGlyphSourceProvider } from '../createIcon';
import { TextIcon } from '../TextIcon';

const INACTIVE_GLYPH = '\u2606'; // ☆
const ACTIVE_GLYPH = '\u2605'; // ★
const OTHER_GLYPH = '\u25B2'; // ▲

type DemoIconName = 'star';

const demoGlyphMap: GlyphMap<DemoIconName> = {
  'star-12-active': ACTIVE_GLYPH,
  'star-12-inactive': INACTIVE_GLYPH,
  'star-16-active': ACTIVE_GLYPH,
  'star-16-inactive': INACTIVE_GLYPH,
  'star-24-active': ACTIVE_GLYPH,
  'star-24-inactive': INACTIVE_GLYPH,
};

// TextIcon reads directly from the CDS glyphMap module; mock it so tests are
// independent of the published icon set.
jest.mock('@coinbase/cds-icons/glyphMap', () => ({
  glyphMap: {
    'star-12-active': '\u2605',
    'star-12-inactive': '\u2606',
    'star-16-active': '\u2605',
    'star-16-inactive': '\u2606',
    'star-24-active': '\u2605',
    'star-24-inactive': '\u2606',
  },
}));

const renderTextIcon = (ui: React.ReactElement) =>
  render(<DefaultThemeProvider>{ui}</DefaultThemeProvider>);

describe('TextIcon', () => {
  it('renders the CDS glyph by default', () => {
    renderTextIcon(<TextIcon name={'star' as DemoIconName & string} />);
    expect(screen.getByText(INACTIVE_GLYPH)).toBeTruthy();
  });

  it('uses the default CDS font family', () => {
    renderTextIcon(<TextIcon name={'star' as DemoIconName & string} />);
    expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({ fontFamily: DEFAULT_ICON_FONT_FAMILY });
  });

  it('uses the glyph and font family from the context source when the name matches', () => {
    renderTextIcon(
      <IconGlyphSourceProvider
        source={{ glyphMap: { 'star-24-inactive': OTHER_GLYPH }, fontFamily: 'RetailIcons' }}
      >
        <TextIcon name={'star' as DemoIconName & string} />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByText(OTHER_GLYPH)).toHaveStyle({ fontFamily: 'RetailIcons' });
    expect(screen.queryByText(INACTIVE_GLYPH)).toBeNull();
  });

  it('falls back to the CDS glyphMap when the context source does not cover the name', () => {
    renderTextIcon(
      <IconGlyphSourceProvider
        source={{ glyphMap: { 'triangle-24-inactive': OTHER_GLYPH }, fontFamily: 'RetailIcons' }}
      >
        <TextIcon name={'star' as DemoIconName & string} />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByText(INACTIVE_GLYPH)).toHaveStyle({
      fontFamily: DEFAULT_ICON_FONT_FAMILY,
    });
  });

  it('uses a custom getGlyph resolver from the context source', () => {
    const getGlyph = jest.fn(() => OTHER_GLYPH);
    renderTextIcon(
      <IconGlyphSourceProvider
        source={{ glyphMap: demoGlyphMap, getGlyph, fontFamily: 'CustomFont' }}
      >
        <TextIcon name={'star' as DemoIconName & string} />
      </IconGlyphSourceProvider>,
    );

    expect(screen.getByText(OTHER_GLYPH)).toHaveStyle({ fontFamily: 'CustomFont' });
    expect(getGlyph).toHaveBeenCalledWith(expect.objectContaining({ name: 'star', active: false }));
  });

  it('returns null when no glyph is found in either the context source or CDS glyphMap', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    renderTextIcon(<TextIcon name={'missing' as unknown as IconName} />);
    expect(screen.queryByRole('image')).toBeNull();
    consoleError.mockRestore();
  });
});
