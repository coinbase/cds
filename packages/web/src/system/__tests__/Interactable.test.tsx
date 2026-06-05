import { render, screen } from '@testing-library/react';

import { media } from '../../styles/media';
import { defaultTheme } from '../../themes/defaultTheme';
import { Interactable } from '../Interactable';
import { MediaQueryContext } from '../MediaQueryProvider';
import { ThemeProvider } from '../ThemeProvider';

const responsiveBorderColor = {
  base: 'bgLine',
  phone: 'bgNegative',
  tablet: 'bgPositive',
  desktop: 'bgPrimary',
} as const;

const renderWithWidth = (width?: number) => {
  const mediaContextValue = width
    ? {
        subscribe: () => () => undefined,
        getServerSnapshot: () => false,
        getSnapshot: (query: string) => {
          if (query === media.phone) return width <= 767;
          if (query === media.tablet) return width >= 768 && width <= 1279;
          if (query === media.desktop) return width >= 1280;
          return false;
        },
      }
    : null;

  const content = (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <Interactable borderColor={responsiveBorderColor} testID="interactable" />
    </ThemeProvider>
  );

  return render(
    mediaContextValue ? (
      <MediaQueryContext.Provider value={mediaContextValue}>{content}</MediaQueryContext.Provider>
    ) : (
      content
    ),
  );
};

describe('Interactable', () => {
  it.each([
    ['phone', 500, 'bgNegative'],
    ['tablet', 900, 'bgPositive'],
    ['desktop', 1400, 'bgPrimary'],
  ])('resolves %s borderColor from responsive prop', (_, width, expectedToken) => {
    renderWithWidth(width);
    const element = screen.getByTestId('interactable');
    expect(element.style.getPropertyValue('--inter-borderColor')).toBe(
      `var(--color-${expectedToken})`,
    );
  });

  it('falls back to base value without MediaQueryProvider', () => {
    renderWithWidth();

    const element = screen.getByTestId('interactable');
    expect(element.style.getPropertyValue('--inter-borderColor')).toBe(
      `var(--color-${responsiveBorderColor.base})`,
    );
  });
});
