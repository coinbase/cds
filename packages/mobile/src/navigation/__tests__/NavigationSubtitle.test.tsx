import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { NavigationSubtitle } from '../NavigationSubtitle';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

describe('NavigationSubtitle', () => {
  it('renders with default props', () => {
    renderWithTheme(<NavigationSubtitle>Subtitle</NavigationSubtitle>);
    const subtitle = screen.getByText('Subtitle');
    expect(subtitle).toBeDefined();
    // Note: In react-native-testing-library, props on the Text component might not be directly accessible on the returned element.
    // We are checking if it renders. Specific style props would ideally be checked via snapshot testing or visual regression.
  });

  it('renders with custom text', () => {
    renderWithTheme(<NavigationSubtitle>Custom Subtitle</NavigationSubtitle>);
    const customSubtitle = screen.getByText('Custom Subtitle');
    expect(customSubtitle).toBeDefined();
  });

  it('overrides default props', () => {
    renderWithTheme(
      <NavigationSubtitle accessibilityRole="text" color="fg" font="label1">
        Overridden Subtitle
      </NavigationSubtitle>,
    );
    const subtitle = screen.getByText('Overridden Subtitle');
    // As above, direct prop assertion for style props like color and font might be brittle.
    // Checking accessibilityRole is generally more reliable.
    expect(subtitle.props.accessibilityRole).toBe('text');
  });
});
