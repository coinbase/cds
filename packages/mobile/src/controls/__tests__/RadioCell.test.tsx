import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { RadioCell } from '../RadioCell';

const onChange = jest.fn();

describe('RadioCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with proper accessibility attributes', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description="Select this option for optimal performance"
          onChange={onChange}
          testID="radio-cell"
          title="Performance Mode"
          value="performance"
        />
      </DefaultThemeProvider>,
    );

    // Check that the component has proper accessibility role
    expect(screen.queryAllByRole('radio')).toHaveLength(1);
    expect(screen.getByTestId('radio-cell')).toBeTruthy();
  });

  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description="Select this option for optimal performance"
          onChange={onChange}
          title="Performance Mode"
          value="performance"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Performance Mode')).toBeTruthy();
    expect(screen.getByText('Select this option for optimal performance')).toBeTruthy();
  });

  it('renders ReactNode title and description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description={<Text font="body">Custom description</Text>}
          onChange={onChange}
          title={<Text font="headline">Custom title</Text>}
          value="custom"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Custom title')).toBeTruthy();
    expect(screen.getByText('Custom description')).toBeTruthy();
  });

  it('shows selected state correctly', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell checked onChange={onChange} title="Selected option" value="selected" />
      </DefaultThemeProvider>,
    );

    // The RadioCell should have selected accessibility state
    expect(screen.queryAllByA11yState({ selected: true })).toHaveLength(1); // Only the cell
  });

  it('shows unselected state correctly', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked={false}
          onChange={onChange}
          title="Unselected option"
          value="unselected"
        />
      </DefaultThemeProvider>,
    );

    // The RadioCell should have unselected accessibility state
    expect(screen.queryAllByA11yState({ selected: false })).toHaveLength(1); // Only the cell
  });

  it('triggers onChange when pressed', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          testID="radio-cell"
          title="Clickable option"
          value="clickable"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('radio-cell');
    fireEvent.press(container);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('clickable', true);
  });

  it('does not trigger onChange when disabled', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          disabled
          onChange={onChange}
          testID="disabled-radio-cell"
          title="Disabled option"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('disabled-radio-cell');
    fireEvent.press(container);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          disabled
          onChange={onChange}
          testID="disabled-radio"
          title="Disabled radio"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    // The RadioCell should have disabled accessibility state (both main cell and internal control have disabled state)
    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(2);
  });

  it('attaches testID', () => {
    const testID = 'radio-cell-test';
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} testID={testID} title="Test radio" value="test" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} title="Accessibility test" value="accessibility" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByRole('radio')).toHaveLength(1);
  });

  it('generates accessibility label from title and description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description="Test description"
          onChange={onChange}
          title="Test title"
          value="auto-label"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Test title, Test description')).toBeTruthy();
  });

  it('uses custom accessibilityLabel when provided', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          accessibilityLabel="Custom accessibility label"
          description="Test description"
          onChange={onChange}
          title="Test title"
          value="custom-label"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Custom accessibility label')).toBeTruthy();
  });

  it('generates appropriate accessibility hint for selected state', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell checked onChange={onChange} title="Selected radio" value="selected-hint" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Tap to unselect this option')).toBeTruthy();
  });

  it('generates appropriate accessibility hint for unselected state', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked={false}
          onChange={onChange}
          title="Unselected radio"
          value="unselected-hint"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Tap to select this option')).toBeTruthy();
  });

  it('uses custom accessibilityHint when provided', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          accessibilityHint="Custom hint"
          onChange={onChange}
          title="Custom hint radio"
          value="custom-hint"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Custom hint')).toBeTruthy();
  });

  it('handles custom gap values', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          columnGap={4}
          onChange={onChange}
          rowGap={2}
          testID="gap-radio-cell"
          title="Gap test"
          value="gap"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom gaps
    expect(screen.getByTestId('gap-radio-cell')).toBeTruthy();
  });

  it('handles custom padding and border values', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          borderRadius={300}
          borderWidth={200}
          onChange={onChange}
          padding={3}
          testID="border-radio-cell"
          title="Border test"
          value="border"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom border values
    expect(screen.getByTestId('border-radio-cell')).toBeTruthy();
  });

  it('handles custom width', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          testID="width-radio-cell"
          title="Width test"
          value="width"
          width="50%"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom width
    expect(screen.getByTestId('width-radio-cell')).toBeTruthy();
  });

  it('handles custom background and border colors', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          background="bgInverse"
          borderColor="fgMuted"
          onChange={onChange}
          testID="colored-radio-cell"
          title="Color test"
          value="color"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom colors
    expect(screen.getByTestId('colored-radio-cell')).toBeTruthy();
  });

  it('renders with proper accessibility when selected', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked
          description="This radio is selected"
          onChange={onChange}
          testID="selected-accessible-radio"
          title="Selected accessible radio"
          value="selected-accessible"
        />
      </DefaultThemeProvider>,
    );

    // Should have proper accessibility role and state
    expect(screen.queryAllByRole('radio')).toHaveLength(1);
    expect(screen.getByTestId('selected-accessible-radio')).toHaveAccessibilityState({
      selected: true,
    });
  });

  it('renders with proper accessibility when disabled', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          disabled
          description="This radio is disabled"
          onChange={onChange}
          testID="disabled-accessible-radio"
          title="Disabled accessible radio"
          value="disabled-accessible"
        />
      </DefaultThemeProvider>,
    );

    // Should have proper accessibility role and state
    expect(screen.queryAllByRole('radio')).toHaveLength(1);
    expect(screen.getByTestId('disabled-accessible-radio')).toHaveAccessibilityState({
      disabled: true,
    });
  });

  it('works without description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} title="Title only" value="title-only" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title only')).toBeTruthy();
    expect(screen.getByLabelText('Title only')).toBeTruthy();
  });

  it('handles style prop as function', () => {
    const styleFunction = jest.fn().mockReturnValue({ opacity: 0.8 });

    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          style={styleFunction}
          testID="styled-radio-cell"
          title="Styled radio"
          value="styled"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with style function
    expect(screen.getByTestId('styled-radio-cell')).toBeTruthy();
  });

  it('handles style prop as object', () => {
    const styleObject = { opacity: 0.8 };

    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          style={styleObject}
          testID="styled-radio-cell-object"
          title="Styled radio object"
          value="styled-object"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with style object
    expect(screen.getByTestId('styled-radio-cell-object')).toBeTruthy();
  });

  it('handles props correctly', () => {
    const onRadioChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onRadioChange}
          testID="radio-with-props"
          title="Radio with props"
          value="radio-props"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('radio-with-props');
    fireEvent.press(container);

    // The onChange handler should be called with the value
    expect(onRadioChange).toHaveBeenCalledWith('radio-props', true);
  });
});
