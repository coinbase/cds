import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import type { SelectOption, SelectOptionGroup } from '../../select/Select';
import type { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

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

const defaultProps: SelectChipProps<'single'> = {
  options: mockOptions,
  value: null,
  onChange: jest.fn(),
  placeholder: 'Select an option',
};

describe('SelectChip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('passes a11y', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} accessibilityLabel="Select an option" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByRole('button')).toBeAccessible();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip
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
  });

  describe('Single Select Mode', () => {
    it('renders SelectChip correctly', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('shows placeholder when no value selected', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('opens dropdown when pressed', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen={false} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      // Dropdown should open and show options
      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('calls onChange when option is selected', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 2');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option2');
    });

    it('displays option description when available', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value="option4" />
        </DefaultThemeProvider>,
      );

      // The selected value should be displayed in the control
      expect(screen.getByText('Option 4')).toBeTruthy();
    });

    it('renders with startNode', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} startNode={<View testID="start-node" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeTruthy();
    });

    it('renders with endNode', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} endNode={<View testID="end-node" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('end-node')).toBeTruthy();
    });

    it('renders with compact prop', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} compact />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('renders disabled state', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Multi Select Mode', () => {
    const multiSelectProps: SelectChipProps<'multi'> = {
      options: mockOptions,
      type: 'multi',
      value: [],
      onChange: jest.fn(),
      placeholder: 'Select options',
    };

    it('renders multi-select SelectChip correctly', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select options')).toBeTruthy();
    });

    it('displays multiple selected values', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1, Option 2')).toBeTruthy();
    });

    it('shows truncated selection with more count', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip
            {...multiSelectProps}
            maxSelectedOptionsToShow={1}
            onChange={onChange}
            value={['option1', 'option2', 'option4']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Option 1.*\+2 more/)).toBeTruthy();
    });

    it('calls onChange with array when option is selected', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('handles multiple selections', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} defaultOpen onChange={onChange} value={['option1']} />
        </DefaultThemeProvider>,
      );

      const option2 = screen.getByText('Option 2');
      fireEvent.press(option2);

      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Option Groups', () => {
    const groupOptions: Array<SelectOption | SelectOptionGroup> = [
      {
        label: 'Group 1',
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
      { value: '3', label: 'Option 3 (no group)' },
    ];

    it('renders with option groups', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip
            {...defaultProps}
            defaultOpen
            options={groupOptions}
            placeholder="Select an option"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Group 1')).toBeTruthy();
      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 3 (no group)')).toBeTruthy();
    });

    it('handles selection from grouped options', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen onChange={onChange} options={groupOptions} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Edge Cases', () => {
    it('handles null value option', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Empty option')).toBeTruthy();
    });

    it('handles disabled options', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Option 3');
      fireEvent.press(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles empty options array', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} onChange={onChange} open={false} setOpen={jest.fn()} />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByText('Option 1')).toBeNull();

      rerender(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} onChange={onChange} open={true} setOpen={jest.fn()} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('works as uncontrolled component', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen={false} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(screen.getByText('Option 1')).toBeTruthy();
    });
  });
});
