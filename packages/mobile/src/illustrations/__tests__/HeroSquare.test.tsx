import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { HeroSquare } from '../HeroSquare';

const PICTOGRAM_TEST_ID = 'add-hero-square-test';

describe('HeroSquare', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare name="docError" testID={PICTOGRAM_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeAccessible();
  });

  it('renders a HeroSquare', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare name="docError" testID={PICTOGRAM_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
  });

  it('renders a HeroSquare with accessibilityHint and accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare
          accessibilityHint="Accessibility Hint"
          accessibilityLabel="Accessibility Label"
          name="docError"
          testID={PICTOGRAM_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp(
      'accessibilityLabel',
      'Accessibility Label',
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp(
      'accessibilityHint',
      'Accessibility Hint',
    );
    // This should automatically be set to always be image
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be true if accessibility label is passed
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', true);
  });

  it('renders a HeroSquare with accessibilityHint and no accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare
          accessibilityHint="Accessibility Hint"
          name="docError"
          testID={PICTOGRAM_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();

    const HeroSquareComponent = screen.getByTestId(PICTOGRAM_TEST_ID);

    expect(HeroSquareComponent).toHaveProp('accessibilityLabel', undefined);
    expect(HeroSquareComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set to always be image
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be false since there's no accessible prop or accessibilityLabel prop
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', false);
  });
});

describe('illustration theming', () => {
  const testID = 'themed-hero-square';

  it('uses the standard light/dark SVG by default (no applyTheme)', () => {
    render(
      <DefaultThemeProvider activeColorScheme="light">
        <HeroSquare name="accessToAdvancedCharts" testID={testID} />
      </DefaultThemeProvider>,
    );
    const xml = screen.getByTestId(testID).props.xml as string;
    expect(typeof xml).toBe('string');
    expect(xml.length).toBeGreaterThan(0);
    // Without applyTheme the CSS var tokens are NOT substituted
    expect(xml).not.toContain('#ff0000');
  });

  it('renders the themeable SVG when applyTheme is set', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare applyTheme name="accessToAdvancedCharts" testID={testID} />
      </DefaultThemeProvider>,
    );
    const el = screen.getByTestId(testID);
    expect(el).toBeTruthy();
    const xml = el.props.xml as string;
    expect(typeof xml).toBe('string');
    expect(xml.length).toBeGreaterThan(0);
  });

  it('applies illustrationColor palette via hex substitution when applyTheme is set', () => {
    const customTheme = {
      ...defaultTheme,
      lightIllustrationColor: {
        ...defaultTheme.lightIllustrationColor,
        primary: 'rgb(255, 0, 0)',
      },
    };
    render(
      <DefaultThemeProvider theme={customTheme}>
        <HeroSquare applyTheme name="accessToAdvancedCharts" testID={testID} />
      </DefaultThemeProvider>,
    );
    const xml = screen.getByTestId(testID).props.xml as string;
    expect(xml).toContain('#ff0000');
    expect(xml).not.toContain('var(--illustration-primary)');
  });

  it('uses light/dark SVG when applyTheme is set but no themeable variant exists', () => {
    // docError has no themeable variant — should fall back to the light/dark SVG
    render(
      <DefaultThemeProvider activeColorScheme="light">
        <HeroSquare applyTheme name="docError" testID={testID} />
      </DefaultThemeProvider>,
    );
    const xml = screen.getByTestId(testID).props.xml as string;
    expect(typeof xml).toBe('string');
    expect(xml.length).toBeGreaterThan(0);
  });

  it('uses dark SVG when applyTheme is set but no themeable variant exists and scheme is dark', () => {
    render(
      <DefaultThemeProvider activeColorScheme="dark">
        <HeroSquare applyTheme name="docError" testID={testID} />
      </DefaultThemeProvider>,
    );
    const xml = screen.getByTestId(testID).props.xml as string;
    expect(typeof xml).toBe('string');
    expect(xml.length).toBeGreaterThan(0);
  });

  it('returns null (no fallback provided) for an unknown illustration name', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare name={'thisDoesNotExist' as any} testID={testID} />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(testID)).toBeNull();
  });

  it('returns fallback when applyTheme is set but theme has no illustration color palette', () => {
    // When applyTheme=true but no palette is defined, the themed path cannot resolve
    // var(--illustration-*) tokens — return fallback rather than an unthemed SVG.
    const { lightIllustrationColor, darkIllustrationColor, ...themeWithoutPalettes } = defaultTheme;
    render(
      <DefaultThemeProvider theme={themeWithoutPalettes as typeof defaultTheme}>
        <HeroSquare applyTheme fallback={null} name="accessToAdvancedCharts" testID={testID} />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(testID)).toBeNull();
  });
});
