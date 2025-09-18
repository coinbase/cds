import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CheckboxCell } from '../CheckboxCell';

const onChange = jest.fn();

describe('CheckboxCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with proper accessibility attributes', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="Choose this option for better results"
          onChange={onChange}
          testID="checkbox-cell"
          title="Enable feature"
          value="feature"
        />
      </DefaultThemeProvider>,
    );

    // Check that the component has proper accessibility role
    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByTestId('checkbox-cell')).toBeTruthy();
  });

  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="Choose this option for better results"
          onChange={onChange}
          title="Enable feature"
          value="feature"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Enable feature')).toBeTruthy();
    expect(screen.getByText('Choose this option for better results')).toBeTruthy();
  });

  it('renders ReactNode title and description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
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

  it('shows checked state correctly', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell checked onChange={onChange} title="Checked option" value="checked" />
      </DefaultThemeProvider>,
    );

    // CheckboxCell has proper accessibility state (only the main cell should have checked state)
    expect(screen.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('shows unchecked state correctly', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={false}
          onChange={onChange}
          title="Unchecked option"
          value="unchecked"
        />
      </DefaultThemeProvider>,
    );

    // CheckboxCell has proper accessibility state (only the main cell should have checked state)
    expect(screen.queryAllByA11yState({ checked: false })).toHaveLength(1);
  });

  it('triggers onChange when pressed with correct parameters', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={false}
          onChange={onChange}
          testID="checkbox-cell"
          title="Clickable option"
          value="clickable"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('checkbox-cell');
    fireEvent.press(container);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('clickable', true);
  });

  it('triggers onChange with correct parameters when unchecking', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={true}
          onChange={onChange}
          testID="checkbox-cell"
          title="Checked option"
          value="checked"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('checkbox-cell');
    fireEvent.press(container);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('checked', false);
  });

  it('does not trigger onChange when disabled', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          disabled
          onChange={onChange}
          testID="disabled-checkbox-cell"
          title="Disabled option"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('disabled-checkbox-cell');
    fireEvent.press(container);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          disabled
          onChange={onChange}
          testID="disabled-checkbox"
          title="Disabled checkbox"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    // CheckboxCell has proper accessibility state (both main cell and internal control have disabled state)
    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(2);
  });

  it('attaches testID', () => {
    const testID = 'checkbox-cell-test';
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} testID={testID} title="Test checkbox" value="test" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(testID)).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} title="Accessibility test" value="accessibility" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
  });

  it('generates accessibility label from title and description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
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
        <CheckboxCell
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

  it('generates appropriate accessibility hint for checked state', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell checked onChange={onChange} title="Checked checkbox" value="checked-hint" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Tap to uncheck this option')).toBeTruthy();
  });

  it('generates appropriate accessibility hint for unchecked state', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={false}
          onChange={onChange}
          title="Unchecked checkbox"
          value="unchecked-hint"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Tap to check this option')).toBeTruthy();
  });

  it('uses custom accessibilityHint when provided', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          accessibilityHint="Custom hint"
          onChange={onChange}
          title="Custom hint checkbox"
          value="custom-hint"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByA11yHint('Custom hint')).toBeTruthy();
  });

  it('handles custom gap values', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          columnGap={4}
          onChange={onChange}
          rowGap={2}
          testID="gap-checkbox-cell"
          title="Gap test"
          value="gap"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom gaps
    expect(screen.getByTestId('gap-checkbox-cell')).toBeTruthy();
  });

  it('works without onChange callback', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell testID="no-callback-checkbox" title="No callback" value="no-callback" />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('no-callback-checkbox');
    fireEvent.press(container);

    // Should not throw error when onChange is not provided
    expect(screen.getByTestId('no-callback-checkbox')).toBeTruthy();
  });

  it('renders with proper accessibility when checked', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked
          description="This checkbox is checked"
          onChange={onChange}
          testID="checked-accessible-checkbox"
          title="Checked accessible checkbox"
          value="checked-accessible"
        />
      </DefaultThemeProvider>,
    );

    // Should have proper accessibility role and state
    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByTestId('checked-accessible-checkbox')).toHaveAccessibilityState({
      checked: true,
    });
  });

  it('renders with proper accessibility when disabled', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          disabled
          description="This checkbox is disabled"
          onChange={onChange}
          testID="disabled-accessible-checkbox"
          title="Disabled accessible checkbox"
          value="disabled-accessible"
        />
      </DefaultThemeProvider>,
    );

    // Should have proper accessibility role and state
    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByTestId('disabled-accessible-checkbox')).toHaveAccessibilityState({
      disabled: true,
    });
  });

  it('works without description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} title="Title only" value="title-only" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title only')).toBeTruthy();
    expect(screen.getByLabelText('Title only')).toBeTruthy();
  });

  it('handles toggle behavior correctly', () => {
    let checked = false;
    const handleChange = jest.fn((value: string | undefined, newChecked?: boolean) => {
      checked = newChecked ?? false;
    });

    const { rerender } = render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={checked}
          onChange={handleChange}
          testID="toggle-checkbox"
          title="Toggle test"
          value="toggle"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('toggle-checkbox');

    // First press - should check
    fireEvent.press(container);
    expect(handleChange).toHaveBeenCalledWith('toggle', true);

    // Rerender with new checked state
    rerender(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={true}
          onChange={handleChange}
          testID="toggle-checkbox"
          title="Toggle test"
          value="toggle"
        />
      </DefaultThemeProvider>,
    );

    // Second press - should uncheck
    fireEvent.press(container);
    expect(handleChange).toHaveBeenCalledWith('toggle', false);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
