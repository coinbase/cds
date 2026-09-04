import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Spinner color="bgPrimary" size={60} />)).toHaveNoViolations();
  });

  it('should render with a div element', () => {
    render(<Spinner color="bgPrimary" size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });

  it('renders with default color', () => {
    render(<Spinner size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });

  it('accepts custom styles', () => {
    render(<Spinner color="bgPrimary" size={60} style={{ color: 'red' }} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toHaveStyle({ color: 'red' });
  });

  it('accepts custom className', () => {
    render(<Spinner className="custom-class" color="bgPrimary" size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toHaveClass('custom-class');
  });

  describe('size variants', () => {
    it('renders with small size', () => {
      render(<Spinner color="bgPrimary" size={24} testID="small-spinner" />);
      expect(screen.getByTestId('small-spinner')).toBeTruthy();
    });

    it('renders with medium size', () => {
      render(<Spinner color="bgPrimary" size={48} testID="medium-spinner" />);
      expect(screen.getByTestId('medium-spinner')).toBeTruthy();
    });

    it('renders with large size', () => {
      render(<Spinner color="bgPrimary" size={80} testID="large-spinner" />);
      expect(screen.getByTestId('large-spinner')).toBeTruthy();
    });

    it('renders with custom numeric size', () => {
      render(<Spinner color="bgPrimary" size={100} testID="custom-spinner" />);
      expect(screen.getByTestId('custom-spinner')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has role="status" by default', () => {
      render(<Spinner color="bgPrimary" size={60} testID="a11y-spinner" />);
      expect(screen.getByRole('status')).toBeTruthy();
    });

    it('renders accessibilityLabel in visually-hidden element', () => {
      render(<Spinner accessibilityLabel="Processing" color="bgPrimary" size={60} />);
      expect(screen.getByText('Processing')).toBeTruthy();
    });

    it('has aria-describedby pointing to status element', () => {
      render(
        <Spinner
          accessibilityLabel="Loading data"
          color="bgPrimary"
          size={60}
          testID="a11y-spinner"
        />,
      );
      const spinner = screen.getByTestId('a11y-spinner');
      expect(spinner).toHaveAttribute('aria-describedby', 'spinnerStatus');
    });
  });
});
