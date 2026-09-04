import { render, screen } from '@testing-library/react';

import { BrowserOnly } from '../BrowserOnly';

describe('BrowserOnly', () => {
  it('renders children in browser', () => {
    render(
      <BrowserOnly>
        <div data-testid="children" />
      </BrowserOnly>,
    );

    expect(screen.getByTestId('children')).toBeTruthy();
  });
});
