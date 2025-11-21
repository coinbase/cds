import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
import type { SelectOption } from '../../select/types';
import type { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

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

const mockOptions: SelectOption<string>[] = [
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
    it('passes accessibility when closed', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <SelectChip {...defaultProps} controlAccessibilityLabel="Select an option" />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });

    it('has correct accessibility attributes', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} controlAccessibilityLabel="Custom accessibility label" />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom accessibility label');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('sets correct accessibility roles for options', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Single Select Mode', () => {
    it('renders SelectChip correctly', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value="option1" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('shows placeholder when no value selected', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('calls onChange when option is selected', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option = screen.getByText('Option 2');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('option2');
    });

    it('displays option description when available', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value="option4" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 4')).toBeInTheDocument();
    });

    it('renders with startNode', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} startNode={<div data-testid="start-node">Start</div>} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeInTheDocument();
    });

    it('renders with endNode', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} endNode={<div data-testid="end-node">End</div>} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('end-node')).toBeInTheDocument();
    });

    it('renders with compact prop and applies compact styling', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} compact />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      const content = button.firstElementChild;

      expect(button).toBeInTheDocument();
      // Compact chips should have smaller padding
      // MediaChip with compact uses padding: var(--space-1-5) var(--space-0-75)
      expect(content).toHaveStyle('padding: var(--space-1-5) var(--space-0-75)');
    });

    it('renders disabled state', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
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

      expect(screen.getByText('Select options')).toBeInTheDocument();
    });

    it('displays multiple selected values', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} value={['option1', 'option2']} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
    });

    it('shows truncated selection with more count', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip
            {...multiSelectProps}
            maxSelectedOptionsToShow={1}
            value={['option1', 'option2', 'option4']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/Option 1.*\+2 more/)).toBeInTheDocument();
    });

    it('calls onChange with array when option is selected', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} onChange={onChange} />
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

    it('handles multiple selections', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...multiSelectProps} onChange={onChange} value={['option1']} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option2 = screen.getByText('Option 2');
      await user.click(option2);

      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Option Groups', () => {
    const groupOptions: SelectChipProps<'single', string>['options'] = [
      {
        label: 'Group 1',
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
      { value: '3', label: 'Option 3 (no group)' },
    ];

    it('renders with option groups', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} options={groupOptions} placeholder="Select an option" />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Group 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Option 3 (no group)')).toBeInTheDocument();
      });
    });

    it('handles selection from grouped options', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} onChange={onChange} options={groupOptions} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Edge Cases', () => {
    it('handles null value option', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Empty option')).toBeInTheDocument();
      });
    });

    it('handles disabled options', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} onChange={onChange} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const disabledOption = screen.getByText('Option 3');
      await user.click(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles empty options array', () => {
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} options={[]} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const setOpen = jest.fn();
      const { rerender } = render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} open={false} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      rerender(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} open={true} setOpen={setOpen} />
        </DefaultThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <SelectChip {...defaultProps} defaultOpen={false} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });
  });
});
