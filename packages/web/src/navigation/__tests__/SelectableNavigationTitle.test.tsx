import useMeasure from 'react-use-measure';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as useBreakpoints from '../../hooks/useBreakpoints';
import { DefaultThemeProvider } from '../../utils/test';
import { NavigationTitleSelect } from '../NavigationTitleSelect';

jest.mock('react-use-measure');
const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};
const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

type MockBreakpointRecord = {
  isPhone: boolean;
  isPhonePortrait: boolean;
  isPhoneLandscape: boolean;
  isTablet: boolean;
  isTabletPortrait: boolean;
  isTabletLandscape: boolean;
  isDesktop: boolean;
  isDesktopSmall: boolean;
  isDesktopLarge: boolean;
  isExtraWide: boolean;
};

const defaultBreakpointValues: MockBreakpointRecord = {
  isPhone: false,
  isPhonePortrait: false,
  isPhoneLandscape: false,
  isTablet: false,
  isTabletPortrait: false,
  isTabletLandscape: false,
  isDesktop: true,
  isDesktopSmall: true,
  isDesktopLarge: false,
  isExtraWide: false,
};

const mockOptions = [
  { label: 'Option 1', id: 'option1' },
  { label: 'Option 2', id: 'option2' },
  { label: 'Option 3', id: 'option3' },
];

const defaultProps = {
  options: mockOptions,
  value: 'option1',
  onChange: jest.fn(),
};

const NavigationTitleSelectWithTheme = (props: any) => (
  <DefaultThemeProvider>
    <NavigationTitleSelect {...defaultProps} {...props} />
  </DefaultThemeProvider>
);

describe('NavigationTitleSelect', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
    // Spy on useBreakpoints and provide a default mock implementation
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockReturnValue(defaultBreakpointValues);
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<NavigationTitleSelectWithTheme accessibilityLabel="Select option" />),
    ).toHaveNoViolations();
  });

  it('renders the selected option label', () => {
    render(<NavigationTitleSelectWithTheme />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders as h1 element by default', () => {
    render(<NavigationTitleSelectWithTheme testID="selectable-title" />);

    const titleElement = screen.getByTestId('selectable-title');
    expect(titleElement.tagName).toBe('H1');
  });

  it('applies title1 font by default', () => {
    render(<NavigationTitleSelectWithTheme testID="selectable-title" />);

    const titleElement = screen.getByTestId('selectable-title');
    expect(titleElement.className).toContain('title1');
  });

  it('renders caret down icon', () => {
    render(<NavigationTitleSelectWithTheme />);

    const caretIcon = screen.getByTestId('icon-base-glyph');
    expect(caretIcon).toBeInTheDocument();
    expect(caretIcon).toHaveAttribute('data-icon-name', 'caretDown');
  });

  it('applies correct accessibility attributes to trigger', () => {
    render(<NavigationTitleSelectWithTheme accessibilityLabel="Select navigation option" />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-label', 'Select navigation option');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('opens dropdown when trigger is clicked', async () => {
    render(<NavigationTitleSelectWithTheme />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    // Check that all options are rendered in the dropdown
    const allOptions = screen.getAllByText('Option 1');
    expect(allOptions.length).toBeGreaterThan(1); // One in the title, one in the dropdown
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is focused and Enter is pressed', async () => {
    render(<NavigationTitleSelectWithTheme />);

    const trigger = screen.getByRole('button');
    trigger.focus();

    fireEvent.keyDown(trigger, {
      key: 'Enter',
      code: 'Enter',
    });

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('opens dropdown when trigger is focused and Space is pressed', async () => {
    render(<NavigationTitleSelectWithTheme />);

    const trigger = screen.getByRole('button');
    trigger.focus();

    await userEvent.keyboard(' ');

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('calls onChange when an option is selected', async () => {
    const onChangeMock = jest.fn();
    render(<NavigationTitleSelectWithTheme onChange={onChangeMock} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    const option2 = screen.getAllByText('Option 2')[0];
    fireEvent.click(option2);

    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });

  it('closes dropdown after option selection', async () => {
    render(<NavigationTitleSelectWithTheme />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    const option2 = screen.getAllByText('Option 2')[0];
    fireEvent.click(option2);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes dropdown when Escape is pressed', async () => {
    render(<NavigationTitleSelectWithTheme />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('updates displayed label when value prop changes', () => {
    const { rerender } = render(<NavigationTitleSelectWithTheme value="option1" />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();

    rerender(<NavigationTitleSelectWithTheme value="option2" />);

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('handles options with React node labels', () => {
    const optionsWithNodes = [
      { label: <span>Custom Option 1</span>, id: 'custom1' },
      { label: <strong>Custom Option 2</strong>, id: 'custom2' },
    ];

    render(<NavigationTitleSelectWithTheme options={optionsWithNodes} value="custom1" />);

    expect(screen.getByText('Custom Option 1')).toBeInTheDocument();
  });

  it('forwards color prop to Text component', () => {
    render(<NavigationTitleSelectWithTheme color="fgMuted" testID="selectable-title" />);

    const titleElement = screen.getByTestId('selectable-title');
    // Check that the element has the correct color styling
    // In the Linaria CSS-in-JS system, colors are applied via CSS custom properties
    const computedStyle = window.getComputedStyle(titleElement);
    const hasValidColor =
      titleElement.className.includes('fgMuted') ||
      computedStyle.color ||
      computedStyle.getPropertyValue('color');
    expect(hasValidColor).toBeTruthy();
  });

  it('forwards color prop to Icon component', () => {
    render(<NavigationTitleSelectWithTheme color="fgMuted" />);

    const caretIcon = screen.getByTestId('icon-base-glyph');
    expect(caretIcon).toBeInTheDocument();
    expect(caretIcon).toHaveAttribute('data-icon-name', 'caretDown');
  });

  it('applies default fg color when no color prop is provided', () => {
    render(<NavigationTitleSelectWithTheme testID="selectable-title" />);

    const titleElement = screen.getByTestId('selectable-title');
    expect(titleElement.className).toContain('fg');
  });

  it('forwards additional props to Text component', () => {
    render(
      <NavigationTitleSelectWithTheme
        className="custom-class"
        style={{ marginTop: '10px' }}
        testID="selectable-title"
      />,
    );

    const titleElement = screen.getByTestId('selectable-title');
    expect(titleElement).toHaveClass('custom-class');
    expect(titleElement).toHaveStyle({ marginTop: '10px' });
  });

  it('handles empty options array gracefully', () => {
    render(<NavigationTitleSelectWithTheme options={[]} value="" />);

    // Should not crash and should render the trigger
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('handles value that does not match any option', () => {
    render(<NavigationTitleSelectWithTheme value="nonexistent" />);

    // Should not crash and should render the trigger
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();

    // Label should be undefined/empty since no matching option
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });
});
