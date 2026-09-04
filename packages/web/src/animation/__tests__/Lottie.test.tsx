import { nux } from '@coinbase/cds-lottie-files/nux';
import { render, screen } from '@testing-library/react';

import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders Lottie', () => {
    render(<Lottie source={nux} testID="lottie-test" />);
    expect(screen.getByTestId('lottie-test')).toBeTruthy();
  });
  it('renders a div', () => {
    const { container } = render(<Lottie source={nux} />);
    // It's generally discouraged to use the container or DOM traversing, however this is explicitly testing that a div is created.
    // General recommendation is to query by Role instead, but we do not have an aria role for Lottie divs.
    // - Emily Seibert, 10/24/2022
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });
});
