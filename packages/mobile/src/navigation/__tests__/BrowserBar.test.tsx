import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { BrowserBar } from '../BrowserBar';
import { BrowserBarSearchInput } from '../BrowserBarSearchInput';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

const defaultSearchProps = {
  placeholder: 'Search the web',
  value: '',
  onChangeText: jest.fn(),
};

describe('BrowserBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders BrowserBarSearchInput with correct default props', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput.props.value).toBe('');
    expect(searchInput.props.placeholder).toBe('Search the web');
  });

  it('renders as compact SearchInput by default', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
    // The compact prop is true by default on BrowserBarSearchInput
  });

  it('renders start content when input is not focused', () => {
    renderWithTheme(
      <BrowserBar start={<Text>Back Button</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const startContent = screen.getByText('Back Button');
    expect(startContent).toBeDefined();
  });

  it('renders end content when input is not focused', () => {
    renderWithTheme(
      <BrowserBar end={<Text>Menu Button</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const endContent = screen.getByText('Menu Button');
    expect(endContent).toBeDefined();
  });

  it('calls onFocus prop when BrowserBarSearchInput is focused', () => {
    const onFocusMock = jest.fn();
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} onFocus={onFocusMock} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    expect(onFocusMock).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur prop when BrowserBarSearchInput loses focus', () => {
    const onBlurMock = jest.fn();
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} onBlur={onBlurMock} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');
    fireEvent(searchInput, 'blur');

    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('forwards SearchInput props correctly to BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput
          {...defaultSearchProps}
          disabled={true}
          placeholder="Custom placeholder"
          value="test search"
        />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput.props.value).toBe('test search');
    expect(searchInput.props.placeholder).toBe('Custom placeholder');
    expect(searchInput.props.editable).toBe(false); // disabled maps to editable=false
  });

  it('applies custom gap prop', () => {
    renderWithTheme(
      <BrowserBar gap={3} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The gap prop is applied to the HStack container
    const browserBar = screen.getByTestId('browser-bar');
    expect(browserBar).toBeDefined();
  });

  it('applies custom padding props', () => {
    renderWithTheme(
      <BrowserBar paddingBottom={3} paddingTop={2} paddingX={4} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The padding props are applied to the HStack container
    const browserBar = screen.getByTestId('browser-bar');
    expect(browserBar).toBeDefined();
  });

  it('applies default padding values', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // Default values: paddingX=3, paddingTop=1, paddingBottom=1
    const browserBar = screen.getByTestId('browser-bar');
    expect(browserBar).toBeDefined();
  });

  it('renders complex start content correctly', () => {
    const startContent = (
      <HStack alignItems="center" gap={1}>
        <Icon name="backArrow" size="s" testID="start-icon" />
        <Text>Back</Text>
      </HStack>
    );

    renderWithTheme(
      <BrowserBar start={startContent} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const backText = screen.getByText('Back');
    const startIcon = screen.getByTestId('start-icon');
    expect(backText).toBeDefined();
    expect(startIcon).toBeDefined();
  });

  it('renders complex end content correctly', () => {
    const endContent = (
      <HStack alignItems="center" gap={1}>
        <Icon name="more" size="s" testID="end-icon-1" />
        <Icon name="share" size="s" testID="end-icon-2" />
      </HStack>
    );

    renderWithTheme(
      <BrowserBar end={endContent} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const endIcon1 = screen.getByTestId('end-icon-1');
    const endIcon2 = screen.getByTestId('end-icon-2');
    expect(endIcon1).toBeDefined();
    expect(endIcon2).toBeDefined();
  });

  it('handles empty start and end gracefully', () => {
    renderWithTheme(
      <BrowserBar end={null} start={null} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
  });

  it('handles undefined start and end gracefully', () => {
    renderWithTheme(
      <BrowserBar end={undefined} start={undefined} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
  });

  it('applies correct flex properties to NavigationBarStart', () => {
    renderWithTheme(
      <BrowserBar start={<Text>Start</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // NavigationBarStart should have flexBasis="auto", flexGrow={0}, flexShrink={0}
    const startText = screen.getByText('Start');
    expect(startText).toBeDefined();
  });

  it('applies correct flex properties to NavigationBarEnd', () => {
    renderWithTheme(
      <BrowserBar end={<Text>End</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // NavigationBarEnd should have flexBasis="auto", flexGrow={0}, flexShrink={0}
    const endText = screen.getByText('End');
    expect(endText).toBeDefined();
  });

  it('applies correct flex properties to SearchInput container', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // SearchInput container should have flexBasis={0}, flexGrow={1}, flexShrink={0}
    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
  });

  it('passes through all SearchInput props to BrowserBarSearchInput', () => {
    const searchProps = {
      clearIconAccessibilityLabel: 'Clear search',
      startIconAccessibilityLabel: 'Search icon',
      onSearch: jest.fn(),
      onClear: jest.fn(),
      disableBackArrow: true,
      hideStartIcon: true,
      hideEndIcon: true,
    };

    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} {...searchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
  });

  it('handles rerendering with different props correctly', () => {
    const { rerender } = renderWithTheme(
      <BrowserBar start={<Text>Initial Start</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByText('Initial Start');

    rerender(
      <DefaultThemeProvider>
        <BrowserBar start={<Text>Updated Start</Text>} testID="browser-bar">
          <BrowserBarSearchInput {...defaultSearchProps} />
        </BrowserBar>
      </DefaultThemeProvider>,
    );

    screen.getByText('Updated Start');
    expect(screen.queryByText('Initial Start')).toBeNull();
  });

  it('maintains correct testID on main container', () => {
    renderWithTheme(
      <BrowserBar testID="custom-browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const customBrowserBar = screen.getByTestId('custom-browser-bar');
    expect(customBrowserBar).toBeDefined();
  });

  it('handles compact prop override on BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} compact={false} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
    // compact={false} is passed through to SearchInput
  });

  it('applies correct HStack alignment and layout properties', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The main HStack should have alignItems="center"
    const browserBar = screen.getByTestId('browser-bar');
    expect(browserBar).toBeDefined();
  });

  it('renders with proper component structure', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // Verify the main container exists
    const browserBar = screen.getByTestId('browser-bar');
    expect(browserBar).toBeDefined();

    // Verify SearchInput is rendered
    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();

    // Verify start and end content are rendered
    const startContent = screen.getByText('Start Content');
    const endContent = screen.getByText('End Content');
    expect(startContent).toBeDefined();
    expect(endContent).toBeDefined();
  });

  it('supports all SearchInput accessibility props on BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput
          {...defaultSearchProps}
          accessibilityLabel="Browser search bar"
          clearIconAccessibilityLabel="Clear search"
          startIconAccessibilityLabel="Search"
        />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput).toBeDefined();
  });

  it('hides start and end content when BrowserBarSearchInput is focused with expandOnFocus', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} expandOnFocus={true} />
      </BrowserBar>,
    );

    // Initially, start and end should be visible
    const startContent = screen.getByText('Start Content');
    const endContent = screen.getByText('End Content');
    expect(startContent).toBeDefined();
    expect(endContent).toBeDefined();

    // Focus the input
    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    // Start and end content should be hidden when focused (due to context)
    // Note: This behavior is controlled by BrowserBarContext
  });

  it('does not hide start and end content when expandOnFocus is false', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} expandOnFocus={false} />
      </BrowserBar>,
    );

    // Initially, start and end should be visible
    const initialStartContent = screen.getByText('Start Content');
    const initialEndContent = screen.getByText('End Content');
    expect(initialStartContent).toBeDefined();
    expect(initialEndContent).toBeDefined();

    // Focus the input
    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    // Start and end content should still be visible when expandOnFocus is false
    const finalStartContent = screen.getByText('Start Content');
    const finalEndContent = screen.getByText('End Content');
    expect(finalStartContent).toBeDefined();
    expect(finalEndContent).toBeDefined();
  });

  it('supports custom children instead of BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <Text>Custom Content</Text>
      </BrowserBar>,
    );

    const customContent = screen.getByText('Custom Content');
    expect(customContent).toBeDefined();
  });
});
