import React, { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
import type { SelectOption } from '../../select/Select';
import { Combobox, type ComboboxProps, type ComboboxRef } from '../Combobox';

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

// Mock floating-ui to simplify testing
jest.mock('@floating-ui/react-dom', () => ({
  useFloating: () => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
      reference: { current: null },
      floating: { current: null },
    },
    floatingStyles: {},
  }),
  flip: () => ({}),
}));

jest.mock('../../../overlays/Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="portal-container">{children}</div>
  ),
}));

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

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays placeholder in search input when no value is selected', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      // The placeholder is shown in the input, not as text
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Search and select...');
    });

    it('displays label when provided', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Test Combobox')).toBeInTheDocument();
    });

    it('passes accessibility label prop to component', () => {
      // Test that the prop is accepted without error
      render(
        <DefaultThemeProvider>
          <Combobox
            {...defaultProps}
            accessibilityLabel="Combobox menu"
            controlAccessibilityLabel="Custom combobox"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByLabelText('Custom combobox, Search and select...')).toBeTruthy();
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(screen.getByLabelText('Combobox menu')).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('displays search input when opened', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('filters options based on search text', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'app');

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    });

    it('filters options based on description text', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'sweet');

      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('shows all options when search text is empty', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const allOptions = screen.getAllByRole('option');
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

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'b');

      expect(customFilter).toHaveBeenCalledWith(mockOptions, 'b');
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Elderberry')).not.toBeInTheDocument();
    });

    it('handles controlled search text', async () => {
      const onSearchMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onSearch={onSearchMock} searchText="test" />
        </DefaultThemeProvider>,
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test');

      fireEvent.change(input, { target: { value: 'new' } });
      expect(onSearchMock).toHaveBeenCalledWith('new');
    });

    it('handles uncontrolled search text with defaultSearchText', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen defaultSearchText="initial" />
        </DefaultThemeProvider>,
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('initial');
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
    it('opens dropdown when clicking the control', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('opens dropdown when typing alphanumeric characters in the search input', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      const input = screen.getByRole('textbox');

      // Simulate keydown event with alphanumeric character which opens the dropdown
      fireEvent.keyDown(input, { key: 'a' });

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('opens dropdown when pressing Enter in the search input', async () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      const input = screen.getByRole('textbox');
      fireEvent.keyDown(input, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('handles controlled open state', async () => {
      const setOpenMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} open={false} setOpen={setOpenMock} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(setOpenMock).toHaveBeenCalled();
    });

    it('handles uncontrolled open state with defaultOpen', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('listbox')).toBeInTheDocument();
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
    it('calls onChange when selecting an option', async () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const appleOption = screen.getByText('Apple');
      await userEvent.click(appleOption);

      expect(onChangeMock).toHaveBeenCalledWith('apple');
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} value="apple" />
        </DefaultThemeProvider>,
      );

      // Note the label is capitalized but value is not
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('displays multi-selected values', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} type="multi" value={['apple', 'banana']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('does not select disabled options', async () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Elderberry');
      await userEvent.click(disabledOption);

      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('can select null value option', async () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const noneOption = screen.getByText('None');
      await userEvent.click(noneOption);

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

    it('ref open state updates with component state', async () => {
      const ref = createRef<ComboboxRef>();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current?.open).toBe(false);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(() => {
        expect(ref.current?.open).toBe(true);
      });
    });

    it('can control component through ref', async () => {
      const ref = createRef<ComboboxRef>();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      await waitFor(() => {
        ref?.current?.setOpen?.(true);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('renders with accessible elements', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} />
        </DefaultThemeProvider>,
      );

      // Verify basic accessibility - has a button that can be focused
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('has appropriate ARIA attributes', () => {
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(mockOptions.length);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Integration with Select', () => {
    it('passes through Select-specific props', async () => {
      const onChangeMock = jest.fn();
      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} disabled={false} onChange={onChangeMock} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toBeEnabled();
    });

    it('uses custom SelectControlComponent when provided', () => {
      const CustomControl = jest.fn(() => <div>Custom Control</div>);

      render(
        <DefaultThemeProvider>
          <Combobox {...defaultProps} SelectControlComponent={CustomControl} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Custom Control')).toBeInTheDocument();
    });
  });
});
