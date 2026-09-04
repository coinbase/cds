import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { NavigationTitle } from '../NavigationTitle';

describe('NavigationTitle', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <NavigationTitle>Test Title</NavigationTitle>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders children text correctly', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle>Test Navigation Title</NavigationTitle>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test Navigation Title')).toBeInTheDocument();
  });

  it('renders as h1 element by default', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle>Test Title</NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  it('applies title1 font by default', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle testID="nav-title">Test Title</NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByTestId('nav-title');
    expect(titleElement.className).toContain('title1');
  });

  it('forwards additional props to Text component', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle color="fgPrimary" testID="nav-title">
          Test Title
        </NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByTestId('nav-title');
    expect(titleElement.className).toContain('fgPrimary');
  });

  it('can override the default element type', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle as="h2" testID="nav-title">
          Test Title
        </NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByTestId('nav-title');
    expect(titleElement.tagName).toBe('H2');
  });

  it('applies custom className when provided', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle className="custom-class" testID="nav-title">
          Test Title
        </NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByTestId('nav-title');
    expect(titleElement).toHaveClass('custom-class');
  });

  it('applies custom styles when provided', () => {
    render(
      <DefaultThemeProvider>
        <NavigationTitle style={{ marginTop: '10px' }} testID="nav-title">
          Test Title
        </NavigationTitle>
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByTestId('nav-title');
    expect(titleElement).toHaveStyle({ marginTop: '10px' });
  });
});
