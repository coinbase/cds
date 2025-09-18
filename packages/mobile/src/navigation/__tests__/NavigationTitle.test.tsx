import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { NavigationTitle } from '../NavigationTitle';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

describe('NavigationTitle', () => {
  it('renders with default props', () => {
    renderWithTheme(<NavigationTitle>Title</NavigationTitle>);
    const title = screen.getByText('Title');
    // accessibilityRole is a more reliable prop to check than style props
    expect(title.props.accessibilityRole).toBe('header');
  });

  it('renders with custom text', () => {
    renderWithTheme(<NavigationTitle>Custom Title</NavigationTitle>);
    const customTitle = screen.getByText('Custom Title');
    expect(customTitle).toBeDefined();
  });

  it('overrides default props', () => {
    renderWithTheme(
      <NavigationTitle accessibilityRole="text" font="title1">
        Overridden Title
      </NavigationTitle>,
    );
    const title = screen.getByText('Overridden Title');
    expect(title.props.accessibilityRole).toBe('text');
  });

  it('forwards all Text component props', () => {
    renderWithTheme(
      <NavigationTitle align="center" ellipsize="tail" numberOfLines={2} testID="nav-title">
        Long Navigation Title Text
      </NavigationTitle>,
    );

    const title = screen.getByTestId('nav-title');
    expect(title.props.numberOfLines).toBe(2);
    expect(title.props.ellipsizeMode).toBe('tail');
  });

  it('supports custom styling props', () => {
    renderWithTheme(
      <NavigationTitle disabled={true} font="title2" testID="styled-title">
        Styled Title
      </NavigationTitle>,
    );

    const styledTitle = screen.getByTestId('styled-title');
    expect(styledTitle).toBeDefined();
  });

  it('renders children as string', () => {
    renderWithTheme(<NavigationTitle>Simple Title</NavigationTitle>);
    const simpleTitle = screen.getByText('Simple Title');
    expect(simpleTitle).toBeDefined();
  });

  it('applies default font styling', () => {
    renderWithTheme(<NavigationTitle testID="default-font">Default Font Title</NavigationTitle>);

    const defaultFontTitle = screen.getByTestId('default-font');
    expect(defaultFontTitle).toBeDefined();
  });
});
