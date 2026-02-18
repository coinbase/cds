import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Box } from '../../layout';
import { DefaultThemeProvider } from '../../utils/test';
import { Button } from '../Button';

const testA11yLabel = 'test-a11y-label';

describe('Button', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Button>Child</Button>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
  it('passes accessibility when loading', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Button loading>Child</Button>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders a button with an accessibility label if provided', () => {
    render(
      <DefaultThemeProvider>
        <Button accessibilityLabel={testA11yLabel}>Child</Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', testA11yLabel);
  });

  it('renders a button with a custom accessibility label if provided and loading is true', () => {
    render(
      <DefaultThemeProvider>
        <Button loading accessibilityLabel={testA11yLabel}>
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', testA11yLabel);
  });

  it('renders a button with a loading spinner and children are visually hidden when loading is true', () => {
    render(
      <DefaultThemeProvider>
        <Button loading>Child</Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');
    const buttonChild = screen.getByText('Child');

    expect(button).toHaveAttribute('aria-label', 'Loading');
    expect(buttonChild.className).toContain('hiddenCss');
  });

  it('renders a button with a type', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link with a href', () => {
    render(
      <DefaultThemeProvider>
        <Button as="a" href="/">
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    render(
      <DefaultThemeProvider>
        <Button disabled>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('can change type', () => {
    render(
      <DefaultThemeProvider>
        <Button type="submit">Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Button onClick={spy}>Child</Button>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onClick` to button element', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Button onClick={spy}>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).not.toHaveAttribute('onClick');
  });

  it('renders a button with a ReactNode as endIcon', () => {
    const CustomIcon = () => <Box testID="custom-react-node">Custom Icon</Box>;
    render(
      <DefaultThemeProvider>
        <Button end={<CustomIcon />}>Child</Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(screen.getByTestId('custom-react-node')).toBeInTheDocument();
  });

  it('sets data attributes for style variants', () => {
    render(
      <DefaultThemeProvider>
        <Button block compact transparent flush="start" variant="primary">
          Child
        </Button>
      </DefaultThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-block', 'true');
    expect(button).toHaveAttribute('data-compact', 'true');
    expect(button).toHaveAttribute('data-flush', 'start');
    expect(button).toHaveAttribute('data-transparent', 'true');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('omits optional data attributes for default button', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('data-block');
    expect(button).not.toHaveAttribute('data-compact');
    expect(button).not.toHaveAttribute('data-flush');
    expect(button).not.toHaveAttribute('data-transparent');
    expect(button).toHaveAttribute('data-variant');
  });
});
