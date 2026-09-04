import { render, screen, waitFor } from '@testing-library/react';

import { Overlay } from '../Overlay';

describe('Overlay', () => {
  it('renders static overlay', () => {
    render(<Overlay testID="overlay-content" />);

    expect(screen.getByTestId('overlay-content')).toBeVisible();
  });

  it('renders animated overlay', async () => {
    render(<Overlay animated testID="overlay-content" />);

    await waitFor(() => {
      expect(screen.getByTestId('overlay-content-motion')).toHaveStyle({ opacity: 1 });
    });
    await waitFor(() => {
      expect(screen.getByTestId('overlay-content')).toBeVisible();
    });
  });
});
