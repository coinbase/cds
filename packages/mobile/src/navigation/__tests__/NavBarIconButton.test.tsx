import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { BrowserBar } from '../BrowserBar';
import { type NavBarButtonProps, NavBarIconButton } from '../NavBarIconButton';
import { NavigationTitle } from '../NavigationTitle';
import { TopNavBar } from '../TopNavBar';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

describe('NavBarIconButton', () => {
  const defaultProps: NavBarButtonProps = {
    name: 'share',
    testID: 'nav-bar-icon-button',
  };

  it('renders correctly', () => {
    renderWithTheme(<TopNavBar end={<NavBarIconButton {...defaultProps} />} />);
    const iconButton = screen.getByTestId('nav-bar-icon-button');
    expect(iconButton).toBeDefined();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();
    renderWithTheme(<TopNavBar end={<NavBarIconButton {...defaultProps} onPress={onPress} />} />);
    fireEvent.press(screen.getByTestId('nav-bar-icon-button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when specified', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <TopNavBar end={<NavBarIconButton {...defaultProps} disabled onPress={onPress} />} />,
    );
    fireEvent.press(screen.getByTestId('nav-bar-icon-button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('useNavigationContext', () => {
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('does not warn when inside TopNavBar', () => {
      renderWithTheme(
        <TopNavBar start={<NavBarIconButton {...defaultProps} name="backArrow" />}>
          <NavigationTitle>Page Title</NavigationTitle>
        </TopNavBar>,
      );
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('does not warn when inside BrowserBar', () => {
      renderWithTheme(
        <BrowserBar start={<NavBarIconButton {...defaultProps} name="backArrow" />}>
          {null}
        </BrowserBar>,
      );
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('warns when not i  nside TopNavBar or BrowserBar', () => {
      renderWithTheme(<NavBarIconButton {...defaultProps} />);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'NavBarButton should be used within BrowserBar or TopNavBar components for optimal functionality and consistent styling.',
      );
    });
  });
});
