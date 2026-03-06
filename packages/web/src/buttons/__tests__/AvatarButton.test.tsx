import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { AvatarButton } from '../AvatarButton';

describe('AvatarButton', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <AvatarButton alt="Sneezy" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders a button', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton alt="Sneezy" />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton alt="Sneezy" as="a" href="/" />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <AvatarButton alt="Sneezy" onClick={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onClick` to button element', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <AvatarButton alt="Sneezy" onClick={spy} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).not.toHaveAttribute('onClick');
  });

  it('accepts deprecated border props without changing rendering', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton bordered alt="Sneezy" borderRadius={900} borderWidth={300} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeDefined();
  });
});
