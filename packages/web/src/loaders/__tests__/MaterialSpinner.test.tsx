import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { MaterialSpinner } from '../MaterialSpinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MaterialSpinner color="bgPrimary" size={60} />)).toHaveNoViolations();
  });

  it('size and color are correctly set', () => {
    render(<MaterialSpinner color="bgPrimary" size={60} testID="material-spinner-svg" />);

    expect(screen.getByTestId('material-spinner-svg')).toHaveAttribute('height', '60px');
    expect(screen.getByTestId('material-spinner-svg')).toHaveStyle({
      stroke: `var(--color-bgPrimary)`,
    });
  });

  it('should render with a svg element', () => {
    render(<MaterialSpinner color="bgPrimary" size={60} testID="material-spinner-svg" />);
    expect(screen.getByTestId('material-spinner-svg')).toBeTruthy();
  });
});
