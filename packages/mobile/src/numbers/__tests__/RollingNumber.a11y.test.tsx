import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { RollingNumber } from '../RollingNumber/RollingNumber';

const getSrOnlyText = (live: 'polite' | 'assertive') => {
  const nodes = screen.UNSAFE_queryAllByType(Text);
  return nodes.find((n) => n.props.accessibilityLiveRegion === live) ?? null;
};

const normalize = (s: unknown) => String(s).replace(/\s+/g, ' ').trim();

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
