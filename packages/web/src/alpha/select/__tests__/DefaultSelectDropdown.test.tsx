import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
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
  controlRef: { current: document.createElement('div') },
  disabled: false,
  compact: false,
  type: 'single',
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../../../overlays/FocusTrap', () => ({
  FocusTrap: ({ children, onEscPress }: any) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div data-testid="focus-trap" onKeyDown={(e) => e.key === 'Escape' && onEscPress?.()}>
      {children}
    </div>
  ),
}));

describe('DefaultSelectDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // There's no .toHaveNoViolations() assertion called because some markup from
  // parent components is needed for full a11y compliance. The parent Select.test.tsx
  // calls this assertion.
  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
      expect(listbox).toHaveAttribute('aria-multiselectable', 'false');
    });

    it('sets multiselectable attribute for multi select', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} type="multi" value={[]} />
        </DefaultThemeProvider>,
      );

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('supports custom accessibility roles', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
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
    it('renders dropdown when open', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} open={false} />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('handles option selection', async () => {
      const onChange = jest.fn();
      const setOpen = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} onChange={onChange} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('option1');
      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('handles disabled options correctly', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const disabledOption = screen.getByText('Option 3');
      await user.click(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('displays selected option correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      const selectedOption = screen.getByText('Option 1');
      const optionElement = selectedOption.closest('[role="option"]');
      expect(optionElement).toHaveAttribute('aria-selected', 'true');
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

      expect(screen.getByText(/Select all/)).toBeInTheDocument();
    });

    it('hides select all when hideSelectAll is true', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} hideSelectAll />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByText(/Select all/)).not.toBeInTheDocument();
    });

    it('handles select all functionality', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      await user.click(selectAllOption);

      expect(onChange).toHaveBeenCalledWith(['option1', 'option2', 'option3', 'option4']);
    });

    it('handles clear all functionality', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
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
      await user.click(clearAllButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('shows correct select all state when all options selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} value={['option1', 'option2', 'option4']} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      const optionElement = selectAllOption.closest('[role="option"]');
      expect(optionElement).toHaveAttribute('aria-selected', 'true');
    });

    it('shows indeterminate state when some options selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} value={['option1']} />
        </DefaultThemeProvider>,
      );

      const selectAllOption = screen.getByText(/Select all/);
      const optionElement = selectAllOption.closest('[role="option"]');
      expect(optionElement).toHaveAttribute('aria-selected', 'true'); // Indeterminate shows as selected
    });

    it('handles multi-select option selection', async () => {
      const onChange = jest.fn();
      const setOpen = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...multiSelectProps} onChange={onChange} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

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

      const option1Element = option1.closest('[role="option"]');
      const option2Element = option2.closest('[role="option"]');
      const option3Element = option3.closest('[role="option"]');

      expect(option1Element).toHaveAttribute('aria-selected', 'true');
      expect(option2Element).toHaveAttribute('aria-selected', 'true');
      expect(option3Element).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Empty State', () => {
    it('shows empty options message when custom label is set and no options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            emptyOptionsLabel="No options found"
            options={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('uses default empty options message when no custom label is set', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('No options available')).toBeInTheDocument();
    });

    it('renders custom empty options component', () => {
      const CustomEmpty = () => <div data-testid="custom-empty">Custom empty state</div>;
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            SelectEmptyDropdownContentsComponent={CustomEmpty}
            options={[]}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    });
  });

  describe('Custom Components', () => {
    it('renders custom SelectOptionComponent', () => {
      const CustomOption = ({ label }: any) => <div data-testid="custom-option">{label}</div>;

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} SelectOptionComponent={CustomOption} />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('custom-option')).toHaveLength(mockOptions.length);
    });

    it('renders custom SelectAllOptionComponent', () => {
      const CustomSelectAllOption = ({ label }: any) => (
        <div data-testid="custom-select-all">{label}</div>
      );

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

      expect(screen.getByTestId('custom-select-all')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Escape key press', async () => {
      const setOpen = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      const focusTrap = screen.getByTestId('focus-trap');
      fireEvent.keyDown(focusTrap, { key: 'Escape' });

      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('traps focus correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('focus-trap')).toBeInTheDocument();
    });
  });

  describe('Sizing and Positioning', () => {
    it('matches control width', () => {
      const controlRef = {
        current: {
          getBoundingClientRect: () => ({ width: 300 }),
        } as any,
      };

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} controlRef={controlRef} />
        </DefaultThemeProvider>,
      );

      const dropdown = screen.getByRole('listbox');
      expect(dropdown).toHaveStyle('width: 300px');
    });
  });

  describe('Styling and Customization', () => {
    it('applies custom styles and class names', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            className="custom-dropdown"
            classNames={{
              root: 'custom-root',
              option: 'custom-option',
            }}
            styles={{
              root: { backgroundColor: 'red' },
              option: { color: 'blue' },
            }}
          />
        </DefaultThemeProvider>,
      );

      const dropdown = screen.getByRole('listbox');
      expect(dropdown).toHaveClass('custom-dropdown');
      expect(dropdown).toHaveStyle('background-color: red');
    });
  });

  describe('Props Forwarding', () => {
    it('forwards media, accessory, and detail props to options', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            accessory={<div data-testid="accessory-content">Accessory</div>}
            detail={<div data-testid="detail-content">Detail</div>}
            media={<div data-testid="media-content">Media</div>}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getAllByTestId('media-content')).toHaveLength(mockOptions.length);
      expect(screen.getAllByTestId('accessory-content')).toHaveLength(mockOptions.length);
      expect(screen.getAllByTestId('detail-content')).toHaveLength(mockOptions.length);
    });

    it('option-specific props override global props', () => {
      const optionsWithMedia = [
        {
          ...mockOptions[0],
          media: <div data-testid="option-specific-media">Option Media</div>,
        },
        ...mockOptions.slice(1),
      ];

      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown
            {...defaultProps}
            media={<div data-testid="global-media">Global Media</div>}
            options={optionsWithMedia}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('option-specific-media')).toBeInTheDocument();
      expect(screen.getAllByTestId('global-media')).toHaveLength(mockOptions.length - 1);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <DefaultThemeProvider>
          <DefaultSelectDropdown {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).not.toBeNull();
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

      expect(screen.getByText(/Custom Select All/)).toBeInTheDocument();
      expect(screen.getByText('Custom Clear All')).toBeInTheDocument();
    });
  });
});
