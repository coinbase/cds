import { renderA11y } from '@coinbase/cds-web-utils/jest/renderA11y';
import { render, screen } from '@testing-library/react';

import { Fallback } from '../Fallback';

const testID = 'test-fallback';
const props = {
  width: 100,
  height: 50,
  testID,
};

describe('Fallback', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Fallback {...props} />)).toHaveNoViolations();
  });

  describe('shapes', () => {
    it('renders rectangle shape by default', () => {
      render(<Fallback {...props} />);
      expect(screen.getByTestId(testID)).toBeTruthy();
    });

    it('renders square shape', () => {
      render(<Fallback {...props} shape="square" testID="square-fallback" />);
      expect(screen.getByTestId('square-fallback')).toBeTruthy();
    });

    it('renders squircle shape', () => {
      render(<Fallback {...props} shape="squircle" testID="squircle-fallback" />);
      expect(screen.getByTestId('squircle-fallback')).toBeTruthy();
    });

    it('renders circle shape', () => {
      render(<Fallback {...props} shape="circle" testID="circle-fallback" />);
      expect(screen.getByTestId('circle-fallback')).toBeTruthy();
    });
  });

  describe('width variants', () => {
    it('renders with disableRandomRectWidth', () => {
      render(<Fallback {...props} disableRandomRectWidth testID="no-random-fallback" />);
      expect(screen.getByTestId('no-random-fallback')).toBeTruthy();
    });

    it('renders with rectWidthVariant', () => {
      render(<Fallback {...props} rectWidthVariant={0} testID="variant-0-fallback" />);
      expect(screen.getByTestId('variant-0-fallback')).toBeTruthy();
    });

    it('renders different rectWidthVariant values deterministically', () => {
      const { rerender } = render(
        <Fallback {...props} rectWidthVariant={0} testID="variant-fallback" />,
      );
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();

      rerender(<Fallback {...props} rectWidthVariant={1} testID="variant-fallback" />);
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();

      rerender(<Fallback {...props} rectWidthVariant={2} testID="variant-fallback" />);
      expect(screen.getByTestId('variant-fallback')).toBeTruthy();
    });

    it('renders with percentage width', () => {
      render(<Fallback {...props} percentage testID="percentage-fallback" />);
      expect(screen.getByTestId('percentage-fallback')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('renders visually hidden text with default accessibilityLabel', () => {
      render(<Fallback {...props} />);
      expect(screen.getByText('Loading')).toBeTruthy();
    });

    it('renders visually hidden text with custom accessibilityLabel', () => {
      render(<Fallback {...props} accessibilityLabel="Loading profile" />);
      expect(screen.getByText('Loading profile')).toBeTruthy();
    });

    it('does not render visually hidden text when accessibilityLabel is empty', () => {
      render(<Fallback {...props} accessibilityLabel="" />);
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });
});
