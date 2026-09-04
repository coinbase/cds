import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { RollingNumber } from '../RollingNumber/RollingNumber';

describe('RollingNumber accessibility (screen reader only content)', () => {
  it('renders hidden aria-live region with composed prefix + formatted + suffix by default', () => {
    render(
      <DefaultThemeProvider>
        <RollingNumber
          format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
          prefix="$"
          suffix=" BTC"
          value={1000}
        />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'polite' &&
        /\$1,000 BTC/.test(element.textContent ?? '')
      );
    });
    expect(srOnly).toBeInTheDocument();

    // Top-level role should be status when ariaLive is not assertive
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses provided accessibilityLabel instead of formatted value', () => {
    const label = 'Price updated';
    render(
      <DefaultThemeProvider>
        <RollingNumber accessibilityLabel={label} value={42} />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'polite' &&
        (element.textContent ?? '').includes(label)
      );
    });
    expect(srOnly).toBeInTheDocument();
  });

  it('respects ariaLive prop on the hidden region and root role', () => {
    render(
      <DefaultThemeProvider>
        <RollingNumber ariaLive="assertive" value={5} />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'assertive'
      );
    });
    expect(srOnly).toBeInTheDocument();
    // Root role should be alert when ariaLive is assertive
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies accessibilityLabelPrefix and accessibilityLabelSuffix around the label', () => {
    render(
      <DefaultThemeProvider>
        <RollingNumber
          accessibilityLabel="Updated"
          accessibilityLabelPrefix="Start-"
          accessibilityLabelSuffix="-End"
          value={999}
        />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      const txt = element.textContent ?? '';
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'polite' &&
        /Start-/.test(txt) &&
        /Updated/.test(txt) &&
        /-End/.test(txt)
      );
    });
    expect(srOnly).toBeInTheDocument();
  });

  it('uses formattedValue in aria-live content (with number prefix/suffix)', () => {
    render(
      <DefaultThemeProvider>
        <RollingNumber formattedValue="1.23K" prefix="$" suffix=" USD" value={0} />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'polite' &&
        /\$1.23K USD/.test(element.textContent ?? '')
      );
    });
    expect(srOnly).toBeInTheDocument();
  });

  it('wraps formattedValue with accessibilityLabelPrefix and accessibilityLabelSuffix when provided', () => {
    render(
      <DefaultThemeProvider>
        <RollingNumber
          accessibilityLabelPrefix="Before: "
          accessibilityLabelSuffix=" :After"
          formattedValue="9.99M"
          prefix="~"
          suffix=" EUR"
          value={0}
        />
      </DefaultThemeProvider>,
    );

    const srOnly = screen.getByText((_, element) => {
      if (!element) return false;
      return (
        element.tagName.toLowerCase() === 'span' &&
        element.getAttribute('aria-live') === 'polite' &&
        /Before:\s*~9.99M EUR\s*:After/.test(element.textContent ?? '')
      );
    });
    expect(srOnly).toBeInTheDocument();
  });
});
