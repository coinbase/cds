import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { DefaultSelectControl } from '../DefaultSelectControl';
import type { SelectControlProps, SelectOption } from '../Select';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

const defaultProps: SelectControlProps<'single'> = {
  options: mockOptions,
  value: 'option1',
  onChange: jest.fn(),
  open: false,
  setOpen: jest.fn(),
  placeholder: 'Select an option',
  label: 'Test Select Control',
};

const multiSelectProps: SelectControlProps<'multi'> = {
  options: mockOptions,
  type: 'multi',
  value: [],
  onChange: jest.fn(),
  open: false,
  setOpen: jest.fn(),
  placeholder: 'Select an option',
  label: 'Test Select Control',
};

describe('DefaultSelectControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('passes a11y', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByRole('button')).toBeAccessible();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            accessibilityHint="Custom accessibility hint"
            accessibilityLabel="Custom accessibility label"
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityLabel).toBe('Custom accessibility label');
      expect(button.props.accessibilityHint).toBe('Custom accessibility hint');
    });

    it('has correct accessibility role', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityRole).toBe('button');
    });
  });

  describe('Single Select Mode', () => {
    it('renders single select control correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeTruthy(); // Shows the selected value
      expect(screen.getByText('Test Select Control')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeTruthy();
    });

    it('shows placeholder when no value selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('calls setOpen when pressed', () => {
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(setOpen).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders with start node', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            startNode={<View testID="start-node" />}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeTruthy();
    });
  });

  describe('Multi Select Mode', () => {
    it('renders multi select control correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...(multiSelectProps as any)} ref={React.createRef<any>()} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays selected values as chips', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            ref={React.createRef<any>()}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeTruthy();
      expect(screen.getByText('option2')).toBeTruthy();
    });

    it('handles chip removal', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            ref={React.createRef<any>()}
            onChange={onChange}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      const chip = screen.getByText('option1');
      fireEvent.press(chip);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('shows overflow indicator when maxSelectedOptionsToShow is exceeded', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            ref={React.createRef<any>()}
            maxSelectedOptionsToShow={2}
            value={['option1', 'option2', 'option3', 'option4']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('+2 more')).toBeTruthy();
    });
  });

  describe('States and Variants', () => {
    it('renders disabled state correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAccessibilityState({ disabled: true });
    });

    it('renders with helper text', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            helperText="This is helper text"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is helper text')).toBeTruthy();
    });

    it('uses default variant when none provided', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            variant={undefined}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button')).toBeTruthy();
    });
  });

  describe('Value Display Logic', () => {
    it('handles placeholder as ReactNode', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            placeholder={<View testID="react-node-placeholder" />}
            value={null}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('react-node-placeholder')).toBeTruthy();
    });
  });

  describe('Helper Text Variants', () => {
    it('renders ReactNode helper text', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            helperText={<View testID="custom-helper" />}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-helper')).toBeTruthy();
    });
  });

  describe('Label Handling', () => {
    it('renders string label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            label="String Label"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Label')).toBeTruthy();
    });

    it('renders ReactNode label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            label={<View testID="custom-label" />}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-label')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<any>();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).not.toBeNull();
    });
  });

  describe('Touch Interactions', () => {
    it('handles touch events correctly', () => {
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<any>()} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(setOpen).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value array in multi-select', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            ref={React.createRef<any>()}
            value={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('handles undefined/null placeholder', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<any>()}
            placeholder={undefined}
            value={null}
          />
        </DefaultThemeProvider>,
      );

      // Should not crash when placeholder is undefined
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('handles missing options array', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            ref={React.createRef<any>()}
            options={[]}
            value={['option1']}
          />
        </DefaultThemeProvider>,
      );

      // Should handle case where options is empty but value has items
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });
  });
});
