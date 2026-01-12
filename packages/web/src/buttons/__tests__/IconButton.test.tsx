import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/test';
import { IconButton } from '../IconButton';

const name = 'arrowsHorizontal';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <IconButton accessibilityLabel="test-label" name={name} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders a button by default', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link when passed `to` prop', () => {
    render(
      <DefaultThemeProvider>
        <IconButton as="a" href="/" name={name} />
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
        <IconButton name={name} onClick={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  describe('disabled', () => {
    it('disables user interaction when disabled', () => {
      const spy = jest.fn();
      render(
        <DefaultThemeProvider>
          <IconButton disabled name={name} onClick={spy} />
        </DefaultThemeProvider>,
      );

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <IconButton disabled accessibilityLabel="test-label" name={name} />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });
  });

  describe('loading', () => {
    it('disables user interaction when loading', () => {
      const spy = jest.fn();
      render(
        <DefaultThemeProvider>
          <IconButton loading accessibilityLabel="click me" name={name} onClick={spy} />
        </DefaultThemeProvider>,
      );

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
      expect(screen.getByLabelText('click me, loading')).toBeInTheDocument();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <IconButton loading name={name} />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });

    it('handles loading state without accessibility label', () => {
      render(
        <DefaultThemeProvider>
          <IconButton loading name={name} testID="icon-button" />
        </DefaultThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', ', loading');
    });
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };
    render(
      <DefaultThemeProvider>
        <IconButton ref={ref} name={name} />
      </DefaultThemeProvider>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('passes down testID', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeDefined();
  });

  it('renders Spinner when loading and not Icon', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-button-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId(`icon-${name}`)).not.toBeInTheDocument(); // Assuming Icon component adds a testID like this or similar identifiable attribute
  });

  it('renders Spinner with correct size when loading and compact', () => {
    render(
      <DefaultThemeProvider>
        <IconButton compact loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );
    const spinner = screen.getByTestId('icon-button-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle(`width: ${defaultTheme.iconSize.s}px`);
    expect(spinner).toHaveStyle(`height: ${defaultTheme.iconSize.s}px`);
  });

  it('renders Spinner with correct size when loading and not compact', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading compact={false} name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );
    const spinner = screen.getByTestId('icon-button-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle(`width: ${defaultTheme.iconSize.m}px`);
    expect(spinner).toHaveStyle(`height: ${defaultTheme.iconSize.m}px`);
  });

  it('sets data attributes for style variants', () => {
    render(
      <DefaultThemeProvider>
        <IconButton compact transparent flush="end" name={name} variant="secondary" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-compact', 'true');
    expect(button).toHaveAttribute('data-flush', 'end');
    expect(button).toHaveAttribute('data-transparent', 'true');
    expect(button).toHaveAttribute('data-variant', 'secondary');
  });
  it('omits optional data attributes for default icon button', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('data-flush');
    expect(button).not.toHaveAttribute('data-transparent');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-compact', 'true');
  });
});
