import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Link } from '../Link';

const handlePress = () => {};
const testID = 'link-label';

describe('Link', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Link font="body" href="/">
            Child
          </Link>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('able to set accessibilityLabel', async () => {
    const accessibilityLabel = 'link-accessibility-label';
    render(
      <DefaultThemeProvider>
        <Link accessibilityLabel={accessibilityLabel} font="body" href="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', accessibilityLabel);
  });

  it('should render with anchor element', async () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" href="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('link')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render with button element if no href', async () => {
    render(
      <DefaultThemeProvider>
        <Link as="button" font="body" onClick={handlePress}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('can set openInNewWindow to true', async () => {
    render(
      <DefaultThemeProvider>
        <Link openInNewWindow font="body" href="/" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('target', '_blank');
  });

  it('can set openInNewWindow to false', async () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" href="/" openInNewWindow={false} testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).not.toHaveAttribute('target');
  });

  it('doesnt set target or rel if a button', async () => {
    render(
      <DefaultThemeProvider>
        <Link openInNewWindow as="button" font="body" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).not.toHaveAttribute('target');
    expect(screen.getByTestId(testID)).not.toHaveAttribute('rel');
    expect(screen.getByTestId(testID)).not.toHaveAttribute('href');
  });

  it('defaults to noopener noreferrer when openInNewWindow', async () => {
    render(
      <DefaultThemeProvider>
        <Link openInNewWindow font="body" href="https://www.coinbase.com/" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('set rel to noopener', async () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" href="https://www.coinbase.com/" rel="noopener" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noopener');
  });

  it('set rel to noreferrer', async () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" href="https://www.coinbase.com/" rel="noreferrer" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noreferrer');
  });

  it('to is set correctly', async () => {
    const url = 'https://www.google.com/';
    render(
      <DefaultThemeProvider>
        <Link font="body" href={url} testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('href', url);
  });

  it('inherits text styles', () => {
    render(
      <DefaultThemeProvider>
        <Link font="inherit" href="/" testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Child').className).toContain('inherit');
  });

  it('inherits by default', () => {
    const url = 'https://www.coinbase.com/';
    render(
      <DefaultThemeProvider>
        <Link href={url} testID={testID}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Child').className).toContain('inherit');
  });
});
