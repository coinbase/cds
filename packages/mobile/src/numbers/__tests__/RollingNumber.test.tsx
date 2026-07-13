import React from 'react';
import { StyleSheet, type TextStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { RollingNumber } from '../RollingNumber/RollingNumber';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DefaultThemeProvider>{children}</DefaultThemeProvider>
);

// Collects the resolved color of every visible digit/symbol Text node.
const getRenderedColors = () =>
  screen
    .queryAllByText(/\d/)
    .map((node) => StyleSheet.flatten(node.props.style as TextStyle)?.color)
    .filter((color): color is string => typeof color === 'string');

describe('RollingNumber (mobile) custom text color', () => {
  it('renders without error for a CDS design token color prop', () => {
    expect(() =>
      render(<RollingNumber color="fgPositive" value={42} />, { wrapper }),
    ).not.toThrow();
  });

  it('applies a hex color from styles.text to the digits', () => {
    render(<RollingNumber styles={{ text: { color: '#6366f1' } }} value={42} />, { wrapper });

    const colors = getRenderedColors();
    expect(colors.length).toBeGreaterThan(0);
    expect(colors).toContain('#6366f1');
  });

  it('applies an rgba color from styles.text to the digits', () => {
    render(<RollingNumber styles={{ text: { color: 'rgba(255, 0, 0, 0.5)' } }} value={42} />, {
      wrapper,
    });

    expect(getRenderedColors()).toContain('rgba(255, 0, 0, 0.5)');
  });
});
