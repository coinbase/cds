import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Spinner testID="mock-spinner" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-spinner')).toBeAccessible();
  });

  describe('size variants', () => {
    it('renders with small size (default)', () => {
      render(
        <DefaultThemeProvider>
          <Spinner testID="small-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('small-spinner')).toBeTruthy();
    });

    it('renders with large size', () => {
      render(
        <DefaultThemeProvider>
          <Spinner size="large" testID="large-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('large-spinner')).toBeTruthy();
    });
  });

  describe('animating prop', () => {
    it('renders with animating=true', () => {
      render(
        <DefaultThemeProvider>
          <Spinner animating testID="animating-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('animating-spinner')).toBeTruthy();
    });

    it('renders with animating=false', () => {
      render(
        <DefaultThemeProvider>
          <Spinner animating={false} testID="static-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('static-spinner')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('uses default accessibilityLabel', () => {
      render(
        <DefaultThemeProvider>
          <Spinner testID="a11y-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByLabelText('Loading')).toBeTruthy();
    });

    it('accepts custom accessibilityLabel', () => {
      render(
        <DefaultThemeProvider>
          <Spinner accessibilityLabel="Processing" testID="custom-a11y-spinner" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByLabelText('Processing')).toBeTruthy();
    });
  });
});
