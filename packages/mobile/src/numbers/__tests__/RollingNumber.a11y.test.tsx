import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { RollingNumber } from '../RollingNumber/RollingNumber';

const getSrOnlyText = (live: 'polite' | 'assertive') => {
  const candidates = screen.queryAllByText(/.+/);
  return candidates.find((c) => c.props.accessibilityLiveRegion === live) ?? null;
};

const normalize = (s: unknown) => String(s).replace(/\s+/g, ' ').trim();

describe('RollingNumber (mobile) custom text color via styles.text', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DefaultThemeProvider>{children}</DefaultThemeProvider>
  );

  it('accepts a CDS design token color via color prop without error', () => {
    expect(() =>
      render(<RollingNumber color="fgPositive" value={42} />, { wrapper }),
    ).not.toThrow();
  });

  it('accepts a hex color string via styles.text without error', () => {
    expect(() =>
      render(<RollingNumber styles={{ text: { color: '#6366f1' } }} value={42} />, { wrapper }),
    ).not.toThrow();
  });

  it('accepts an rgba color string via styles.text without error', () => {
    expect(() =>
      render(<RollingNumber styles={{ text: { color: 'rgba(255, 0, 0, 0.5)' } }} value={42} />, {
        wrapper,
      }),
    ).not.toThrow();
  });

  it('accepts styles.text color alongside colorPulseOnUpdate without error', () => {
    expect(() =>
      render(
        <RollingNumber colorPulseOnUpdate styles={{ text: { color: '#6366f1' } }} value={42} />,
        { wrapper },
      ),
    ).not.toThrow();
  });
});

describe('RollingNumber (mobile) accessibility', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DefaultThemeProvider>{children}</DefaultThemeProvider>
  );

  it('renders hidden live region with composed prefix + formatted + suffix by default', () => {
    render(
      <RollingNumber
        format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
        prefix="$"
        suffix=" BTC"
        value={1000}
      />,
      { wrapper },
    );

    const srOnly = getSrOnlyText('polite');
    expect(srOnly).toBeTruthy();
    const content = normalize(srOnly?.props.children);
    expect(content).toContain('$1,000 BTC');
  });

  it('uses provided accessibilityLabel instead of formatted value', () => {
    const label = 'Price updated';
    render(<RollingNumber accessibilityLabel={label} value={42} />, { wrapper });

    const srOnly = getSrOnlyText('polite');
    expect(srOnly).toBeTruthy();
    const content = normalize(srOnly?.props.children);
    expect(content).toContain(label);
  });

  it('respects accessibilityLiveRegion prop', () => {
    render(<RollingNumber accessibilityLiveRegion="assertive" value={5} />, { wrapper });

    const srOnly = getSrOnlyText('assertive');
    expect(srOnly).toBeTruthy();
  });

  it('applies accessibilityLabelPrefix and accessibilityLabelSuffix around the label', () => {
    render(
      <RollingNumber
        accessibilityLabel="Updated"
        accessibilityLabelPrefix="Start-"
        accessibilityLabelSuffix="-End"
        value={999}
      />,
      { wrapper },
    );

    const srOnly = getSrOnlyText('polite');
    expect(srOnly).toBeTruthy();
    const content = normalize(srOnly?.props.children);
    expect(content).toMatch(/Start-.*Updated.*-End/);
  });

  it('uses formattedValue in live region (with number prefix/suffix)', () => {
    render(<RollingNumber formattedValue="1.23K" prefix="$" suffix=" USD" value={0} />, {
      wrapper,
    });

    const srOnly = getSrOnlyText('polite');
    expect(srOnly).toBeTruthy();
    const content = normalize(srOnly?.props.children);
    expect(content).toContain('$1.23K USD');
  });

  it('wraps formattedValue with accessibilityLabelPrefix and accessibilityLabelSuffix', () => {
    render(
      <RollingNumber
        accessibilityLabelPrefix="Before: "
        accessibilityLabelSuffix=" :After"
        formattedValue="9.99M"
        prefix="~"
        suffix=" EUR"
        value={0}
      />,
      { wrapper },
    );

    const srOnly = getSrOnlyText('polite');
    expect(srOnly).toBeTruthy();
    const content = normalize(srOnly?.props.children);
    expect(content).toContain('Before: ~9.99M EUR :After');
  });
});
