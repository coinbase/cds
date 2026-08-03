import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen, within } from '@testing-library/react-native';

import { defaultTheme } from '../../../themes/defaultTheme';
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
          <DefaultSelectControl {...defaultProps} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByRole('button')).toBeAccessible();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            accessibilityHint="Custom accessibility hint"
            accessibilityLabel="Custom accessibility label"
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityLabel).toBe('Custom accessibility label, Option 1');
      expect(button.props.accessibilityHint).toBe('Custom accessibility hint');
    });

    it('has correct accessibility role', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} />
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
          <DefaultSelectControl {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy(); // Shows the selected value
      expect(screen.getByText('Test Select Control')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('shows placeholder when no value selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('renders placeholder with fgMuted when value is null', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      const placeholder = screen.getByText('Select an option');
      expect(StyleSheet.flatten(placeholder.props.style).color).toBe(
        defaultTheme.lightColor.fgMuted,
      );
    });

    it('renders placeholder with fgMuted when value is empty string', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value={''} />
        </DefaultThemeProvider>,
      );

      const placeholder = screen.getByText('Select an option');
      expect(placeholder).toBeTruthy();
      expect(StyleSheet.flatten(placeholder.props.style).color).toBe(
        defaultTheme.lightColor.fgMuted,
      );
    });

    it('renders placeholder with fgMuted when value is not in options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value="unknown" />
        </DefaultThemeProvider>,
      );

      const placeholder = screen.getByText('Select an option');
      expect(StyleSheet.flatten(placeholder.props.style).color).toBe(
        defaultTheme.lightColor.fgMuted,
      );
    });

    it('renders selected option with fg when value matches an option', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      const selectedValue = screen.getByText('Option 1');
      expect(StyleSheet.flatten(selectedValue.props.style).color).toBe(defaultTheme.lightColor.fg);
    });

    it('calls setOpen when pressed', () => {
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(setOpen).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders with start node', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} startNode={<View testID="start-node" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeTruthy();
    });
  });

  describe('Multi Select Mode', () => {
    it('renders multi select control correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...(multiSelectProps as any)} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays selected values as chips', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...(multiSelectProps as any)} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 2')).toBeTruthy();
    });

    it('handles chip removal', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            onChange={onChange}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      const chip = screen.getByText('Option 1');
      fireEvent.press(chip);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('shows overflow indicator when maxSelectedOptionsToShow is exceeded', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
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
          <DefaultSelectControl {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('renders with helper text', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} helperText="This is helper text" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is helper text')).toBeTruthy();
    });

    it('uses default variant when none provided', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} variant={undefined} />
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
          <DefaultSelectControl {...defaultProps} helperText={<View testID="custom-helper" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-helper')).toBeTruthy();
    });
  });

  describe('Label Handling', () => {
    it('renders string label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} label="String Label" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Label')).toBeTruthy();
    });

    it('renders ReactNode label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} label={<View testID="custom-label" />} />
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
          <DefaultSelectControl {...defaultProps} setOpen={setOpen} />
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
          <DefaultSelectControl {...(multiSelectProps as any)} value={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeTruthy();
    });

    it('handles undefined/null placeholder', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} placeholder={undefined} value={null} />
        </DefaultThemeProvider>,
      );

      // Should not crash when placeholder is undefined
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('handles missing options array', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...(multiSelectProps as any)} options={[]} value={['option1']} />
        </DefaultThemeProvider>,
      );

      // Should handle case where options is empty but value has items
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });
  });

  describe('Duplicate Option Values', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalWarn = console.warn;

    beforeEach(() => {
      console.warn = jest.fn();
    });

    afterEach(() => {
      console.warn = originalWarn;
      process.env.NODE_ENV = originalEnv;
    });

    it('warns about duplicate values in flat options and uses first occurrence', () => {
      process.env.NODE_ENV = 'development';
      const duplicateOptions: SelectOption[] = [
        { value: 'duplicate', label: 'First Option' },
        { value: 'option2', label: 'Option 2' },
        { value: 'duplicate', label: 'Second Option' },
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} options={duplicateOptions} value="duplicate" />
        </DefaultThemeProvider>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[Select] Duplicate option value detected: "duplicate"'),
      );
      // First occurrence should be used for display
      expect(screen.getByText('First Option')).toBeTruthy();
      expect(screen.queryByText('Second Option')).toBeNull();
    });

    it('warns about duplicate values within option groups', () => {
      process.env.NODE_ENV = 'development';
      const optionsWithGroup: SelectControlProps<'single'>['options'] = [
        {
          label: 'Group 1',
          options: [
            { value: 'duplicate', label: 'First in Group' },
            { value: 'duplicate', label: 'Second in Group' },
          ],
        },
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} options={optionsWithGroup} value="duplicate" />
        </DefaultThemeProvider>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[Select] Duplicate option value detected: "duplicate"'),
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Found duplicate in group "Group 1"'),
      );
      // First occurrence should be used for display
      expect(screen.getByText('First in Group')).toBeTruthy();
      expect(screen.queryByText('Second in Group')).toBeNull();
    });

    it('warns about duplicate values across groups and flat options', () => {
      process.env.NODE_ENV = 'development';
      const mixedOptions: SelectControlProps<'single'>['options'] = [
        { value: 'duplicate', label: 'Flat Option' },
        {
          label: 'Group 1',
          options: [{ value: 'duplicate', label: 'Group Option' }],
        },
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} options={mixedOptions} value="duplicate" />
        </DefaultThemeProvider>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[Select] Duplicate option value detected: "duplicate"'),
      );
      // First occurrence (flat option) should be used for display
      expect(screen.getByText('Flat Option')).toBeTruthy();
      expect(screen.queryByText('Group Option')).toBeNull();
    });

    it('does not warn in production mode', () => {
      process.env.NODE_ENV = 'production';
      const duplicateOptions: SelectOption[] = [
        { value: 'duplicate', label: 'First Option' },
        { value: 'duplicate', label: 'Second Option' },
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} options={duplicateOptions} value="duplicate" />
        </DefaultThemeProvider>,
      );

      expect(console.warn).not.toHaveBeenCalled();
      // Still uses first occurrence
      expect(screen.getByText('First Option')).toBeTruthy();
    });

    it('handles duplicate values in multi-select mode', () => {
      process.env.NODE_ENV = 'development';
      const duplicateOptions: SelectOption[] = [
        { value: 'duplicate', label: 'First Option' },
        { value: 'duplicate', label: 'Second Option' },
      ];

      const multiSelectPropsWithDuplicates: SelectControlProps<'multi'> = {
        ...multiSelectProps,
        options: duplicateOptions,
        value: ['duplicate'],
      };

      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...multiSelectPropsWithDuplicates} />
        </DefaultThemeProvider>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[Select] Duplicate option value detected: "duplicate"'),
      );
      // First occurrence should be used for display
      expect(screen.getByText('First Option')).toBeTruthy();
      expect(screen.queryByText('Second Option')).toBeNull();
    });
  });

  describe('Size', () => {
    const getInputAreaStyle = () =>
      StyleSheet.flatten(screen.getByTestId('select-control-input-area').props.style);

    it('defaults to size "l" (16px vertical padding)', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} testID="select-control" />
        </DefaultThemeProvider>,
      );

      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[2]);
      expect(style.paddingBottom).toBe(defaultTheme.space[2]);
    });

    it('applies per-size vertical padding for "s", "m" and "l"', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} size="s" testID="select-control" />
        </DefaultThemeProvider>,
      );
      let style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1]);

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} size="m" testID="select-control" />
        </DefaultThemeProvider>,
      );
      style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1.5]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1.5]);

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} size="l" testID="select-control" />
        </DefaultThemeProvider>,
      );
      style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[2]);
      expect(style.paddingBottom).toBe(defaultTheme.space[2]);
    });

    it('does not change horizontal padding across sizes', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} size="s" testID="select-control" />
        </DefaultThemeProvider>,
      );

      const style = getInputAreaStyle();
      expect(style.paddingLeft).toBe(defaultTheme.space[2]);
      expect(style.paddingRight).toBe(defaultTheme.space[2]);
    });

    it('renders the label inline and uses 8px padding for the deprecated compact prop', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} compact testID="select-control" />
        </DefaultThemeProvider>,
      );

      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1]);
      // Compact forces the inline label inside the control.
      const inputArea = screen.getByTestId('select-control-input-area');
      expect(within(inputArea).getByText('Test Select Control')).toBeTruthy();
    });

    it('lets size win over compact (label above, 12px padding)', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} compact size="m" testID="select-control" />
        </DefaultThemeProvider>,
      );

      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1.5]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1.5]);
      // Size wins, so the label is not forced inline.
      const inputArea = screen.getByTestId('select-control-input-area');
      expect(within(inputArea).queryByText('Test Select Control')).toBeNull();
      expect(screen.getByText('Test Select Control')).toBeTruthy();
    });

    it('stacks an inside label vertically at size "l" and tightens padding to keep the field height', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            labelVariant="inside"
            size="l"
            testID="select-control"
          />
        </DefaultThemeProvider>,
      );

      // Stacked label + value fit the same field an outside label produces (6px top/bottom).
      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[0.75]);
      expect(style.paddingBottom).toBe(defaultTheme.space[0.75]);
    });

    it('keeps an inside label horizontal (per-size padding) at sizes "s" and "m"', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            labelVariant="inside"
            size="s"
            testID="select-control"
          />
        </DefaultThemeProvider>,
      );
      let style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1]);

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            labelVariant="inside"
            size="m"
            testID="select-control"
          />
        </DefaultThemeProvider>,
      );
      style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1.5]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1.5]);
    });

    it('tightens vertical padding for a multi-select with selected values', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            testID="select-control"
            value={['option1']}
          />
        </DefaultThemeProvider>,
      );

      // Selected value chips add their own height, so a size "l" multi-select drops from 16px to 12px.
      let style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[1.5]);
      expect(style.paddingBottom).toBe(defaultTheme.space[1.5]);

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            size="s"
            testID="select-control"
            value={['option1']}
          />
        </DefaultThemeProvider>,
      );
      style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[0.5]);
      expect(style.paddingBottom).toBe(defaultTheme.space[0.5]);
    });

    it('tightens padding hardest for a size "l" multi-select with a stacked inside label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...(multiSelectProps as any)}
            labelVariant="inside"
            size="l"
            testID="select-control"
            value={['option1']}
          />
        </DefaultThemeProvider>,
      );

      // Stacked label + xs chips fit the field (2px top/bottom).
      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[0.25]);
      expect(style.paddingBottom).toBe(defaultTheme.space[0.25]);
    });

    it('keeps the full size padding for an empty multi-select', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...(multiSelectProps as any)} testID="select-control" value={[]} />
        </DefaultThemeProvider>,
      );

      const style = getInputAreaStyle();
      expect(style.paddingTop).toBe(defaultTheme.space[2]);
      expect(style.paddingBottom).toBe(defaultTheme.space[2]);
    });
  });
});
