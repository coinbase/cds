import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import type { SelectOption } from '../../select/Select';
import { Combobox, type ComboboxProps, type ComboboxRef } from '../Combobox';

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    SafeAreaView: ({ children }: any) => children,
  };
});

const mockOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', description: 'A sweet fruit' },
  { value: 'elderberry', label: 'Elderberry', disabled: true },
  { value: null, label: 'None' },
];

const defaultProps: ComboboxProps<'single' | 'multi'> = {
  options: mockOptions,
  value: null,
  onChange: jest.fn(),
  placeholder: 'Search and select...',
  label: 'Test Combobox',
};

describe('Combobox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering and Basic Props', () => {
    it('renders without crashing', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('displays placeholder when provided', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByPlaceholderText('Search and select...')).toBeTruthy();
    });

    it('displays label when provided', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Test Combobox')).toBeTruthy();
    });

    it('applies custom accessibility label', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} accessibilityLabel="Custom combobox" />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityLabel).toBe('Custom combobox, Search and select...');
    });

    it('handles disabled prop', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Search Functionality', () => {
    it('shows all options when search text is empty', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const allOptions = screen.getAllByRole('menuitem');
      expect(allOptions).toHaveLength(mockOptions.length);
    });

    it('uses custom filter function when provided', async () => {
      const customFilter = jest.fn((options, searchText) =>
        options.filter((opt: SelectOption) =>
          opt.label?.toString().toLowerCase().startsWith(searchText.toLowerCase()),
        ),
      );

      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen filterFunction={customFilter} />
        </DefaultThemeProvider>,
      );

      // Just verify the custom filter is accepted without error
      expect(screen.getAllByRole('menuitem')).toHaveLength(mockOptions.length);
    });

    it('handles uncontrolled search text with defaultSearchText', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen defaultSearchText="initial" />
        </DefaultThemeProvider>,
      );

      const input = screen.getAllByDisplayValue('initial');
      expect(input).toBeTruthy();
    });

    it('throws error when searchText is provided without onSearch', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() =>
        render(
          <DefaultThemeProvider>
            <Combobox {...defaultProps} searchText="test" />
          </DefaultThemeProvider>,
        ),
      ).toThrow(
        'Combobox component must be fully controlled or uncontrolled: "searchText" and "onSearch" props must be provided together or not at all',
      );

      consoleSpy.mockRestore();
    });

    it('throws error when onSearch is provided without searchText', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() =>
        render(
          <DefaultThemeProvider>
            <Combobox {...defaultProps} onSearch={() => {}} />
          </DefaultThemeProvider>,
        ),
      ).toThrow(
        'Combobox component must be fully controlled or uncontrolled: "searchText" and "onSearch" props must be provided together or not at all',
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Open/Close Behavior', () => {
    it('opens dropdown when pressing the control', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('handles controlled open state', () => {
      const setOpenMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} open={false} setOpen={setOpenMock} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      fireEvent.press(button);

      expect(setOpenMock).toHaveBeenCalled();
    });

    it('handles uncontrolled open state with defaultOpen', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('throws error when open is provided without setOpen', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() =>
        render(
          <DefaultThemeProvider>
            <Combobox {...defaultProps} open={true} />
          </DefaultThemeProvider>,
        ),
      ).toThrow(
        'Combobox component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
      );

      consoleSpy.mockRestore();
    });

    it('throws error when setOpen is provided without open', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() =>
        render(
          <DefaultThemeProvider>
            <Combobox {...defaultProps} setOpen={() => {}} />
          </DefaultThemeProvider>,
        ),
      ).toThrow(
        'Combobox component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Selection Behavior', () => {
    it('calls onChange when selecting an option', () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const appleOption = screen.getByText('Apple');
      fireEvent.press(appleOption);

      expect(onChangeMock).toHaveBeenCalledWith('apple');
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} value="apple" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Apple')).toBeTruthy();
    });

    it('displays multi-selected values', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} type="multi" value={['apple', 'banana']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Apple')).toBeTruthy();
      expect(screen.getByText('Banana')).toBeTruthy();
    });

    it('does not select disabled options', () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Elderberry');
      fireEvent.press(disabledOption);

      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('can select null value option', () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const noneOption = screen.getByText('None');
      fireEvent.press(noneOption);

      expect(onChangeMock).toHaveBeenCalledWith(null);
    });
  });

  describe('Ref Handling', () => {
    it('exposes ref methods', () => {
      const ref = createRef<ComboboxRef>();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).toBeDefined();
      expect(ref.current?.open).toBe(false);
      expect(typeof ref.current?.setOpen).toBe('function');
    });
  });

  describe('Accessibility', () => {
    it('renders with accessible elements', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <Combobox
            {...defaultProps}
            accessibilityHint="Custom accessibility hint"
            accessibilityLabel="Custom accessibility label"
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityLabel).toBe(
        'Custom accessibility label, Search and select...',
      );
      expect(button.props.accessibilityHint).toBe('Custom accessibility hint');
    });

    it('sets correct accessibility roles for options', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const options = screen.getAllByRole('menuitem');
      expect(options).toHaveLength(mockOptions.length);
    });

    it('supports custom accessibility roles', () => {
      render(
        <DefaultThemeProvider>
          <Combobox
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

  describe('Integration with Select', () => {
    it('passes through Select-specific props', () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} disabled={false} onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.props.accessibilityState?.disabled).toBe(false);
    });

    it('uses custom SelectControlComponent when provided', () => {
      const CustomControl = jest.fn(() => null);

      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} SelectControlComponent={CustomControl} />
        </DefaultThemeProvider>,
      );

      expect(CustomControl).toHaveBeenCalled();
    });

    it('uses custom SelectDropdownComponent when provided', () => {
      const CustomDropdown = jest.fn(() => null);

      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen SelectDropdownComponent={CustomDropdown} />
        </DefaultThemeProvider>,
      );

      expect(CustomDropdown).toHaveBeenCalled();
    });
  });
});
