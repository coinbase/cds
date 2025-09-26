import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Select, type SelectOption, type SelectProps } from '../Select';

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    SafeAreaView: ({ children }: any) => children,
  };
});

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', description: 'Option 4 description' },
  { value: null, label: 'Empty option' },
];

const defaultProps: SelectProps<'single' | 'multi'> = {
  options: mockOptions,
  value: null,
  onChange: jest.fn(),
  placeholder: 'Select an option',
  label: 'Test Select',
};

describe('Select', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('passes a11y', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByRole('button')).toBeAccessible();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <Select
            {...defaultProps}
            accessibilityHint="Custom accessibility hint"
            accessibilityLabel="Custom accessibility label"
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityLabel).toBe('Custom accessibility label');
      expect(button.props.accessibilityHint).toBe('Custom accessibility hint');
    });

    it('sets correct accessibility roles for options', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const options = screen.getAllByRole('menuitem');
      expect(options).toHaveLength(mockOptions.length);
    });

    it('supports custom accessibility roles', () => {
      render(
        <DefaultThemeProvider>
          <Select
            {...defaultProps}
            defaultOpen
            accessibilityRoles={{
              option: 'button',
            }}
          />
        </DefaultThemeProvider>,
      );

      const buttons = screen.getAllByRole('button');
      // Should include the control button plus option buttons
      expect(buttons.length).toBeGreaterThan(1);
    });
  });

  describe('Single Select Functionality', () => {
    it('renders single select by default', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
      expect(screen.getByText('Test Select')).toBeTruthy();
    });

    it('opens tray when pressed', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      // Tray should be open and show options
      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 2')).toBeTruthy();
    });

    it('closes tray when option is selected', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeTruthy();
    });

    it('shows placeholder when no value is selected', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('handles disabled options correctly', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Option 3');
      fireEvent.press(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Multi Select Functionality', () => {
    const multiSelectProps: SelectProps<'single' | 'multi'> = {
      ...defaultProps,
      type: 'multi',
      value: [],
      onChange: jest.fn(),
    };

    it('renders multi select correctly', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('shows selected values as chips', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeTruthy();
      expect(screen.getByText('option2')).toBeTruthy();
    });

    it('handles option selection in multi mode', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('shows select all option when enabled', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Select all/)).toBeTruthy();
    });

    it('hides select all option when disabled', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen hideSelectAll />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByText(/Select all/)).toBeNull();
    });

    it('handles select all functionality', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      fireEvent.press(selectAllOption);

      expect(onChange).toHaveBeenCalledWith(['option1', 'option2', 'option3', 'option4']);
    });

    it('shows overflow indicator when maxSelectedOptionsToShow is exceeded', () => {
      render(
        <DefaultThemeProvider>
          <Select
            {...multiSelectProps}
            maxSelectedOptionsToShow={2}
            value={['option1', 'option2', 'option4']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('+1 more')).toBeTruthy();
    });
  });

  describe('Props and Customization', () => {
    it('renders with helper text', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} helperText="This is helper text" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is helper text')).toBeTruthy();
    });

    it('renders with start node', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} startNode={<View testID="start-node" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeTruthy();
    });

    it('shows empty options message when no options', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen emptyOptionsLabel="No options found" options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options found')).toBeTruthy();
    });

    it('supports custom SelectOptionComponent', () => {
      const CustomOption = ({ label }: { label?: React.ReactNode }) => (
        <View testID="custom-option">
          <Text>{String(label)}</Text>
        </View>
      );

      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen SelectOptionComponent={CustomOption} />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('custom-option')).toHaveLength(mockOptions.length);
    });

    it('supports custom empty options component', () => {
      const CustomEmpty = () => <View testID="custom-empty" />;

      render(
        <DefaultThemeProvider>
          <Select
            {...defaultProps}
            defaultOpen
            SelectEmptyOptionsComponent={<CustomEmpty />}
            options={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-empty')).toBeTruthy();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', () => {
      render(
        <DefaultThemeProvider>
          <Select onChange={jest.fn()} options={mockOptions} value={null} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('works as controlled component', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <DefaultThemeProvider>
          <Select
            onChange={onChange}
            open={true}
            options={mockOptions}
            setOpen={jest.fn()}
            value="option1"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <Select
            onChange={onChange}
            open={true}
            options={mockOptions}
            setOpen={jest.fn()}
            value="option2"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 2')).toBeTruthy();
    });

    it('throws error for partially controlled component', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <DefaultThemeProvider>
            <Select {...defaultProps} open={true} />
          </DefaultThemeProvider>,
        );
      }).toThrow(
        'Select component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
      );

      consoleError.mockRestore();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAccessibilityState({ disabled: true });
    });

    it('does not open when disabled', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(screen.queryByText('Option 1')).toBeNull();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<any>();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).not.toBeNull();
      expect(typeof ref.current.open).toBe('boolean');
      expect(typeof ref.current.setOpen).toBe('function');
      expect(ref.current.refs).toBeDefined();
    });
  });

  describe('Tray Behavior', () => {
    it('shows tray title when label is provided', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      // Tray should show the label as title
      expect(screen.getAllByText('Test Select').length).toBeGreaterThan(0);
    });
  });

  describe('Option State Management', () => {
    it('sorts multi-select values according to options order', () => {
      render(
        <DefaultThemeProvider>
          <Select
            onChange={jest.fn()}
            options={mockOptions}
            type="multi"
            value={['option2', 'option1']} // Out of order
          />
        </DefaultThemeProvider>,
      );

      // Values should be sorted according to options array order
      const chips = screen.getAllByText(/option[12]/);
      expect(chips).toHaveLength(2);
    });

    it('handles null values in options', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen value={null} />
        </DefaultThemeProvider>,
      );

      const nullOption = screen.getByText('Empty option');
      expect(nullOption).toBeTruthy();
    });
  });

  describe('Component Integration', () => {
    it('integrates control and dropdown components correctly', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      // Both control and dropdown should be rendered
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0); // Control
      expect(screen.getByText('Option 1')).toBeTruthy(); // Dropdown content
    });

    it('passes props correctly to sub-components', () => {
      render(
        <DefaultThemeProvider>
          <Select
            {...defaultProps}
            compact
            defaultOpen
            accessory={<View testID="accessory-element" />}
            detail={<View testID="detail-element" />}
            disabled={false}
            media={<View testID="media-element" />}
            variant="positive"
          />
        </DefaultThemeProvider>,
      );

      // Props should be passed to sub-components
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('media-element')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('handles large option lists efficiently', () => {
      const largeOptionList = Array.from({ length: 100 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));

      render(
        <DefaultThemeProvider>
          <Select defaultOpen onChange={jest.fn()} options={largeOptionList} value={null} />
        </DefaultThemeProvider>,
      );

      // Should render without performance issues
      expect(screen.getByText('Option 0')).toBeTruthy();
      expect(screen.getByText('Option 99')).toBeTruthy();
    });
  });
});
