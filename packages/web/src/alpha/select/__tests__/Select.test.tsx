import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
import { Select, type SelectOption, type SelectProps } from '../Select';

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
  Portal: ({ children, containerId }: { children: React.ReactNode; containerId?: string }) => (
    <div data-testid="portal-container">{children}</div>
  ),
}));

describe('Select', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('passes accessibility when closed', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <Select {...defaultProps} />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });

    // Due to the Clear All button in the multi-select dropdown,
    // there's an a11y violation.
    // TODO: Implement new markup for the Clear All button.
    // it('passes accessibility when open', async () => {
    //   expect(
    //     await renderA11y(
    //       <DefaultThemeProvider>
    //         <Select {...defaultProps} defaultOpen />
    //       </DefaultThemeProvider>,
    //     ),
    //   ).toHaveNoViolations();
    // });

    it('sets correct accessibility roles for dropdown and options', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(mockOptions.length);
    });

    it('supports custom accessibility roles', () => {
      render(
        <DefaultThemeProvider>
          <Select
            {...defaultProps}
            defaultOpen
            accessibilityRoles={{
              dropdown: 'menu',
              option: 'menuitem',
            }}
          />
        </DefaultThemeProvider>,
      );

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(mockOptions.length);
    });
  });

  describe('Single Select Functionality', () => {
    it('renders single select by default', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
      expect(screen.getByText('Test Select')).toBeInTheDocument();
    });

    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('closes dropdown when option is selected', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeInTheDocument();
    });

    it('shows placeholder when no value is selected', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('handles disabled options correctly', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Option 3');
      await user.click(disabledOption);

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

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('shows selected values as chips', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button', { name: 'Remove option1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove option2' })).toBeInTheDocument();
    });

    it('handles option selection in multi mode', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('shows select all option when enabled', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Select all/)).toBeInTheDocument();
    });

    it('hides select all option when disabled', () => {
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen hideSelectAll />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByText(/Select all/)).not.toBeInTheDocument();
    });

    it('handles select all functionality', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...multiSelectProps} defaultOpen onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      await user.click(selectAllOption);

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

      expect(screen.getByText('+1 more')).toBeInTheDocument();
    });
  });

  describe('Props and Customization', () => {
    it('renders with helper text', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} helperText="This is helper text" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders with start node', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} startNode={<div data-testid="start-node">Start</div>} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeInTheDocument();
    });

    it('shows empty options message when no options', () => {
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen emptyOptionsLabel="No options found" options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('supports custom SelectOptionComponent', () => {
      const CustomOption = ({ label }: { label?: React.ReactNode }) => (
        <div data-testid="custom-option">{label}</div>
      );

      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen SelectOptionComponent={CustomOption} />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('custom-option')).toHaveLength(mockOptions.length);
    });

    it('supports custom empty options component', () => {
      const CustomEmpty = () => <div data-testid="custom-empty">No data available</div>;

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

      expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select onChange={jest.fn()} options={mockOptions} value={null} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('works as controlled component', async () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <DefaultThemeProvider>
          <Select
            onChange={onChange}
            open={false}
            options={mockOptions}
            setOpen={jest.fn()}
            value="option1"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeInTheDocument();

      rerender(
        <DefaultThemeProvider>
          <Select
            onChange={onChange}
            open={false}
            options={mockOptions}
            setOpen={jest.fn()}
            value="option2"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option2')).toBeInTheDocument();
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

  describe('Keyboard Navigation', () => {
    it('opens dropdown on Enter key', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('opens dropdown on Space key', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <Select {...defaultProps} defaultOpen />
        </DefaultThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
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
});
