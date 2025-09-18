import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TopNavBar } from '../TopNavBar';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

describe('NavigationBar', () => {
  it('renders with default props', () => {
    renderWithTheme(<TopNavBar />);
    const navBar = screen.getByLabelText('main navigation');
    expect(navBar).toBeDefined();
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <TopNavBar>
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    const middleContent = screen.getByText('Middle Content');
    expect(middleContent).toBeDefined();
  });

  it('renders start, middle, and end content', () => {
    renderWithTheme(
      <TopNavBar end={<Text>End Content</Text>} start={<Text>Start Content</Text>}>
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    const startContent = screen.getByText('Start Content');
    const middleContent = screen.getByText('Middle Content');
    const endContent = screen.getByText('End Content');
    expect(startContent).toBeDefined();
    expect(middleContent).toBeDefined();
    expect(endContent).toBeDefined();
  });

  it('renders bottom content', () => {
    renderWithTheme(<TopNavBar bottom={<Text>Bottom Content</Text>} />);
    const bottomContent = screen.getByText('Bottom Content');
    expect(bottomContent).toBeDefined();
  });

  it('applies custom accessibilityLabel', () => {
    const customLabel = 'custom navigation label';
    renderWithTheme(
      <TopNavBar
        accessibilityLabel={customLabel}
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
      >
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    const customNavBar = screen.getByLabelText(customLabel);
    expect(customNavBar).toBeDefined();
  });
});
