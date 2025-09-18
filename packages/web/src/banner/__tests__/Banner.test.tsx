import { css } from '@linaria/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { BannerProps } from '../Banner';
import { Banner } from '../Banner';

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  variant = 'warning',
  testID,
  ...props
}: Partial<BannerProps>) => (
  <DefaultThemeProvider>
    <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
      Banner content
    </Banner>
  </DefaultThemeProvider>
);

const TEST_ID = 'test-banner';

describe('Banner Actions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dismiss-btn`);

    fireEvent.click(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', async () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);
    const collapsibleTestID = `${TEST_ID}-collapsible`;

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dismiss-btn`);

    // Before dismiss is pressed, banner should be visible
    expect(screen.getByTestId(collapsibleTestID)).toHaveStyle('visibility: visible');

    fireEvent.click(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    await waitFor(() => {
      expect(screen.getByTestId(collapsibleTestID)).toHaveStyle('visibility: hidden');
    });
  });
});

describe('Banner', () => {
  it('can set className', () => {
    const customCss = css`
      padding: 5px;
    `;

    render(
      <DefaultThemeProvider>
        <Banner
          className={customCss}
          startIcon="cashUSD"
          testID={TEST_ID}
          title=""
          variant="warning"
        >
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      padding: 5,
    });
  });

  it('can set style', () => {
    const customCss = {
      position: 'sticky',
    } as const;

    render(
      <DefaultThemeProvider>
        <Banner startIcon="cashUSD" style={customCss} testID={TEST_ID} title="" variant="warning">
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle(customCss);
  });

  it('renders warning banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner startIcon="cashUSD" testID={TEST_ID} title="warning banner" variant="warning">
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );
    const element = screen.getByTestId(TEST_ID);
    expect(element.className).toContain('bgWarningWash');
  });

  it('renders error banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner startIcon="cashUSD" testID={TEST_ID} title="error banner" variant="error">
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );
    const element = screen.getByTestId(TEST_ID);
    expect(element.className).toContain('bgNegativeWash');
  });

  it('renders informational banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner
          startIcon="cashUSD"
          testID={TEST_ID}
          title="informational banner"
          variant="informational"
        >
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).toContain('bgSecondary');
  });

  it('renders promotional banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner
          startIcon="cashUSD"
          testID={TEST_ID}
          title="promotional banner"
          variant="promotional"
        >
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).toContain('bgPrimaryWash');
  });

  it('renders contextual banner by default', () => {
    render(
      <DefaultThemeProvider>
        <Banner startIcon="cashUSD" testID={TEST_ID} title="contextual banner" variant="warning">
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).toContain('400');
  });

  it('renders inline banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner
          startIcon="cashUSD"
          styleVariant="inline"
          testID={TEST_ID}
          title="inline banner"
          variant="warning"
        >
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).not.toContain('400');
  });

  it('renders global banner correctly', () => {
    render(
      <DefaultThemeProvider>
        <Banner
          startIcon="cashUSD"
          styleVariant="global"
          testID={TEST_ID}
          title="global banner"
          variant="warning"
        >
          Banner Content
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).not.toContain('400');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ borderLeftWidth: 4 });
  });
});
