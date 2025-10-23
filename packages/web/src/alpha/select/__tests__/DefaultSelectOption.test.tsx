import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../../utils/test';
import { DefaultSelectOption } from '../DefaultSelectOption';
import type { SelectOptionProps } from '../Select';

const defaultProps: SelectOptionProps = {
  value: 'option1',
  label: 'Option 1',
  onClick: jest.fn(),
  selected: false,
  disabled: false,
  compact: false,
};

describe('DefaultSelectOption', () => {
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
          <DefaultSelectOption {...defaultProps} selected accessibilityRole="option" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).toHaveAttribute('aria-selected', 'true');
    });

    it('sets correct accessibility role', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} accessibilityRole="menuitem" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('defaults to option role', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('option')).toBeInTheDocument();
    });
  });

  describe('Basic Rendering', () => {
    it('renders with label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with string label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label="String Label" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Label')).toBeInTheDocument();
    });

    it('renders with ReactNode label', () => {
      const CustomLabel = () => <span data-testid="custom-label">Custom Label</span>;
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label={<CustomLabel />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description="This is a description" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('renders with string description', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description="String Description" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Description')).toBeInTheDocument();
    });

    it('renders with ReactNode description', () => {
      const CustomDescription = () => (
        <span data-testid="custom-description">Custom Description</span>
      );
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description={<CustomDescription />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-description')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders selected state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).toHaveAttribute('aria-selected', 'true');
    });

    it('renders unselected state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected={false} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).toHaveAttribute('aria-selected', 'false');
    });

    it('renders disabled state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).toHaveAttribute('disabled');
    });

    it('renders enabled state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled={false} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).not.toHaveAttribute('disabled');
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onClick={onClick} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      await user.click(option);

      expect(onClick).toHaveBeenCalledWith('option1');
    });

    it('does not call onClick when disabled', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled onClick={onClick} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      await user.click(option);

      expect(onClick).not.toHaveBeenCalled();
    });

    it('handles keyboard interaction', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onClick={onClick} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      option.focus();
      await user.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalledWith('option1');
    });

    it('handles space key interaction', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onClick={onClick} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      option.focus();
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledWith('option1');
    });
  });

  describe('Cell Props', () => {
    it('renders with media', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            media={<div data-testid="media-content">Media</div>}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('media-content')).toBeInTheDocument();
    });

    it('renders with accessory', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            accessory={<div data-testid="accessory-content">Accessory</div>}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('accessory-content')).toBeInTheDocument();
    });

    it('renders with end', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} end={<div data-testid="end-content">End</div>} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('end-content')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom styles', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            className="custom-option"
            style={{ backgroundColor: 'red' }}
          />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(option).toHaveClass('custom-option');
      expect(option).toHaveStyle('background-color: red');
    });
  });

  describe('Focus Behavior', () => {
    it('can receive focus', async () => {
      const user = userEvent.setup();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      await user.tab();
      expect(option).toHaveFocus();
    });

    it('shows focus indicator', async () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      option.focus();

      expect(option).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles null value', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('option')).toBeInTheDocument();
    });

    it('handles empty label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label="" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('option')).toBeInTheDocument();
    });

    it('handles undefined onClick', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onClick={undefined} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('option');
      expect(() => fireEvent.click(option)).not.toThrow();
    });
  });
});
