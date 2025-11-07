import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { DefaultSelectDropdown } from '../DefaultSelectDropdown';
import type { SelectDropdownProps, SelectOption } from '../Select';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', description: 'Description for option 4' },
  { value: null, label: 'Empty option' },
];

const defaultProps: SelectDropdownProps<'single' | 'multi'> = {
  options: mockOptions,
  value: null,
  onChange: jest.fn(),
  open: true,
  setOpen: jest.fn(),
  controlRef: { current: null },
  disabled: false,
  compact: false,
  label: 'Test Dropdown',
};

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    SafeAreaView: ({ children }: any) => children,
  };
});

jest.mock('../../../overlays/tray/Tray', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Tray: React.forwardRef(
      ({ children, title, onDismiss, onCloseComplete, ...props }: any, ref: any) => {
        return (
          <View ref={ref} testID="tray-container" {...props}>
            {title && <View testID="tray-title">{title}</View>}
            <View testID="tray-content">{children}</View>
          </View>
        );
      },
    ),
  };
});

describe('DefaultSelectDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Visibility', () => {
    it('renders tray when open', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('tray-container')).toBeTruthy();
      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 2')).toBeTruthy();
    });

    it('does not render when closed', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} open={false} />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId('tray-container')).toBeNull();
    });

    it('shows tray title when label is provided', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} label="Custom Title" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('tray-title')).toBeTruthy();
    });
  });

  describe('Single Select Functionality', () => {
    it('handles option selection', () => {
      const onChange = jest.fn();
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} onChange={onChange} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('handles disabled options correctly', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Option 3');
      fireEvent.press(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('displays selected option correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      const selectedOption = screen.getByText('Option 1');
      expect(selectedOption).toBeTruthy();
    });
  });

  describe('Multi Select Functionality', () => {
    const multiSelectProps: SelectDropdownProps<'single' | 'multi'> = {
      ...defaultProps,
      type: 'multi',
      value: [],
      onChange: jest.fn(),
    };

    it('renders select all option by default', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Select all/)).toBeTruthy();
    });

    it('hides select all when hideSelectAll is true', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} hideSelectAll />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByText(/Select all/)).toBeNull();
    });

    it('handles select all functionality', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      fireEvent.press(selectAllOption);

      expect(onChange).toHaveBeenCalledWith(['option1', 'option2', 'option3', 'option4']);
    });

    it('handles clear all functionality', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...multiSelectProps}
            onChange={onChange}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      const clearAllButton = screen.getByText('Clear all');
      fireEvent(clearAllButton, 'press', { stopPropagation: jest.fn() });

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('shows correct select all state when all options selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} value={['option1', 'option2', 'option4']} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      expect(selectAllOption).toBeTruthy();
    });

    it('handles multi-select option selection', () => {
      const onChange = jest.fn();
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} onChange={onChange} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
      expect(setOpen).not.toHaveBeenCalledWith(false); // Should stay open in multi-select
    });

    it('displays multiple selected options correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      const option1 = screen.getByText('Option 1');
      const option2 = screen.getByText('Option 2');
      const option3 = screen.getByText('Option 3');

      expect(option1).toBeTruthy();
      expect(option2).toBeTruthy();
      expect(option3).toBeTruthy();
    });
  });

  describe('Empty State', () => {
    it('shows empty options message when custom label is set', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            emptyOptionsLabel="No options found"
            options={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options found')).toBeTruthy();
    });

    it('uses default empty options message when no custom label is set', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options available')).toBeTruthy();
    });

    it('renders custom empty options component', () => {
      const CustomEmpty = () => <View testID="custom-empty" />;
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            SelectEmptyDropdownContentsComponent={CustomEmpty}
            options={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-empty')).toBeTruthy();
    });
  });

  describe('Custom Components', () => {
    it('renders custom SelectOptionComponent', () => {
      const CustomOption = ({ label }: any) => (
        <View testID="custom-option">
          <View testID={`custom-option-${label}`} />
        </View>
      );

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} SelectOptionComponent={CustomOption} />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('custom-option')).toHaveLength(mockOptions.length);
    });

    it('renders custom SelectAllOptionComponent', () => {
      const CustomSelectAllOption = ({ label }: any) => <View testID="custom-select-all" />;

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            SelectAllOptionComponent={CustomSelectAllOption}
            type="multi"
            value={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-select-all')).toBeTruthy();
    });

    it('renders default SelectAllOption when no custom component provided', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} type="multi" value={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Select all/)).toBeTruthy();
      expect(screen.getByText('Clear all')).toBeTruthy();
    });
  });

  describe('Checkbox and Radio States', () => {
    it('renders checkboxes for multi-select options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} type="multi" value={['option1']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });

    it('renders radio buttons for single-select options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
    });
  });

  describe('Props Forwarding', () => {
    it('forwards media, accessory, and end props to options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            accessory={<View testID="accessory-content" />}
            end={<View testID="end-content" />}
            media={<View testID="media-content" />}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('media-content')).toHaveLength(mockOptions.length);
      expect(screen.getAllByTestId('accessory-content')).toHaveLength(mockOptions.length);
      expect(screen.getAllByTestId('end-content')).toHaveLength(mockOptions.length);
    });

    it('option-specific props override global props', () => {
      const optionsWithMedia = [
        {
          ...mockOptions[0],
          media: <View testID="option-specific-media" />,
        },
        ...mockOptions.slice(1),
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            media={<View testID="global-media" />}
            options={optionsWithMedia}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('option-specific-media')).toBeTruthy();
      expect(screen.getAllByTestId('global-media')).toHaveLength(mockOptions.length - 1);
    });
  });

  describe('Labels and Text', () => {
    it('uses custom labels', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            clearAllLabel="Custom Clear All"
            emptyOptionsLabel="Custom Empty Message"
            selectAllLabel="Custom Select All"
            type="multi"
            value={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Custom Select All/)).toBeTruthy();
      expect(screen.getByText('Custom Clear All')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<any>();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).not.toBeNull();
    });
  });

  describe('Tray Configuration', () => {
    it('configures tray with correct props', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const tray = screen.getByTestId('tray-container');
      expect(tray).toBeTruthy();
    });
  });
});
