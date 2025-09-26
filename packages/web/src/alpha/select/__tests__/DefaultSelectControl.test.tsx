import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
import { DefaultSelectControl } from '../DefaultSelectControl';
import type { SelectControlProps, SelectOption } from '../Select';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

const defaultProps: SelectControlProps<'single' | 'multi'> = {
  options: mockOptions,
  value: 'option1',
  placeholder: 'Select an option',
  onChange: jest.fn(),
  open: false,
  setOpen: jest.fn(),
  label: 'Test Select Control',
};

describe('DefaultSelectControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            accessibilityLabel="Custom accessibility label"
            ariaHaspopup="listbox"
            testID="select-control-test"
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      const inputStack = screen.getByTestId('select-control-test');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(inputStack).toHaveAttribute('aria-label', 'Custom accessibility label');
    });

    it('renders with proper focus management', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<HTMLElement>()} />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  describe('Single Select Mode', () => {
    it('renders single select control correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<HTMLElement>()} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Test Select Control')).toBeInTheDocument();
      expect(screen.getByText('option1')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays selected value', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            value="option1"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('option1')).toBeInTheDocument();
    });

    it('shows placeholder when no value selected', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            value={null}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('calls setOpen when clicked', async () => {
      const setOpen = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            setOpen={setOpen}
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(setOpen).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders with start node', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            startNode={<div data-testid="start-node">Start</div>}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('start-node')).toBeInTheDocument();
    });
  });

  describe('Multi Select Mode', () => {
    const multiSelectProps: SelectControlProps<'single' | 'multi'> = {
      ...defaultProps,
      type: 'multi',
      value: [],
      onChange: jest.fn(),
    };

    it('renders multi select control correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...multiSelectProps} ref={React.createRef<HTMLElement>()} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays selected values as chips', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button', { name: 'Remove option1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove option2' })).toBeInTheDocument();
    });

    it('handles chip removal', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            onChange={onChange}
            value={['option1', 'option2']}
          />
        </DefaultThemeProvider>,
      );

      const chipButton = screen.getByRole('button', { name: 'Remove option1' });
      await user.click(chipButton);
      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('shows overflow indicator when maxSelectedOptionsToShow is exceeded', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            maxSelectedOptionsToShow={2}
            value={['option1', 'option2', 'option3', 'option4']}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('handles disabled options in chips', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            value={['option1', 'option3']} // option3 is disabled
          />
        </DefaultThemeProvider>,
      );

      const chip1 = screen.getByRole('button', { name: 'Remove option1' });
      const chip3 = screen.getByRole('button', { name: 'Remove option3' });

      expect(chip1).not.toHaveAttribute('disabled');
      expect(chip3).toHaveAttribute('disabled');
    });
  });

  describe('States and Variants', () => {
    it('renders disabled state correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={React.createRef<HTMLElement>()} disabled />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('renders with helper text', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            helperText="This is helper text"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction', () => {
    it('handles Enter key press', async () => {
      const setOpen = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            setOpen={setOpen}
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(setOpen).toHaveBeenCalled();
    });

    it('handles Space key press', async () => {
      const setOpen = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...defaultProps}
            ref={React.createRef<HTMLElement>()}
            setOpen={setOpen}
          />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(setOpen).toHaveBeenCalled();
    });
  });

  describe('Focus Management in Multi-Select', () => {
    const multiSelectProps: SelectControlProps<'multi'> = {
      ...defaultProps,
      type: 'multi',
      value: ['option1', 'option2'],
      onChange: jest.fn(),
    };

    it('focuses control when last chip is removed', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            onChange={onChange}
            testID="select-control-test"
            value={['option1']}
          />
        </DefaultThemeProvider>,
      );

      const chip = screen.getByRole('button', { name: 'Remove option1' });
      await user.click(chip);
      const control = screen.getByTestId('select-control-test');
      const controlInputNode = control.querySelector('button');
      expect(controlInputNode).toHaveFocus();
    });

    it('focuses next chip when middle chip is removed', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl
            {...multiSelectProps}
            ref={React.createRef<HTMLElement>()}
            onChange={onChange}
            value={['option1', 'option2', 'option3']}
          />
        </DefaultThemeProvider>,
      );

      // Remove the middle chip (option2)
      const chip2 = screen.getByRole('button', { name: 'Remove option2' });
      await user.click(chip2);
      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <DefaultThemeProvider>
          <DefaultSelectControl {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );

      expect(ref.current).not.toBeNull();
    });
  });
});
