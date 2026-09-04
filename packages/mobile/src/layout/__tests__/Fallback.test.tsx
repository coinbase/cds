import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Fallback } from '../Fallback';

const testID = 'test-fallback';
const props = {
  width: 100,
  height: 50,
  testID,
};

describe('Fallback', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <Fallback {...props} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  describe('shapes', () => {
    it('renders rectangle shape by default', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId(testID)).toBeTruthy();
    });

    it('renders square shape', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} shape="square" testID="square-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('square-fallback')).toBeTruthy();
    });

    it('renders squircle shape', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} shape="squircle" testID="squircle-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('squircle-fallback')).toBeTruthy();
    });

    it('renders circle shape', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} shape="circle" testID="circle-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('circle-fallback')).toBeTruthy();
    });
  });

  describe('width variants', () => {
    it('renders with disableRandomRectWidth', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} disableRandomRectWidth testID="no-random-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('no-random-fallback')).toBeTruthy();
    });

    it('renders with rectWidthVariant', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} rectWidthVariant={0} testID="variant-0-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('variant-0-fallback')).toBeTruthy();
    });

    it('renders different rectWidthVariant values deterministically', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <Fallback {...props} rectWidthVariant={0} testID="variant-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <Fallback {...props} rectWidthVariant={1} testID="variant-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <Fallback {...props} rectWidthVariant={2} testID="variant-fallback" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('renders visually hidden text with default accessibilityLabel', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByText('Loading')).toBeTruthy();
    });

    it('renders visually hidden text with custom accessibilityLabel', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} accessibilityLabel="Loading profile" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByText('Loading profile')).toBeTruthy();
    });

    it('does not render visually hidden text when accessibilityLabel is empty', () => {
      render(
        <DefaultThemeProvider>
          <Fallback {...props} accessibilityLabel="" />
        </DefaultThemeProvider>,
      );
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });
});
