import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen, waitFor } from '@testing-library/react';

import { TabIndicator } from '../TabIndicator';

describe('TabIndicator', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TabIndicator width={100} x={0} />)).toHaveNoViolations();
  });

  it('renders x and width', async () => {
    render(<TabIndicator background="bgSecondary" width={1000} x={50} />);
    // wait for animations
    await waitFor(() =>
      expect(
        screen.getByTestId('cds-tab-indicator-inner-bar-container').style.transform,
      ).toBeTruthy(),
    );
    expect(screen.getByTestId('cds-tab-indicator-inner-bar-container')).toHaveStyle(
      'transform: translateX(50px) translateZ(0);',
    );
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle(
      'transform: translateX(1000px) translateZ(0);',
    );
  });

  it('renders background', () => {
    render(<TabIndicator background="bgSecondary" width={100} x={0} />);
    const node = screen.getByTestId('cds-tab-indicator-inner-bar');
    expect(node.getAttribute('class')).toContain('bgSecondary');
  });

  it('renders with testID', () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator testID={TEST_ID} width={100} x={0} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('renders with ref', () => {
    const TEST_ID = 'tabIndicator';
    const ref = { current: undefined } as unknown as React.RefObject<HTMLDivElement | null>;
    render(<TabIndicator ref={ref} testID={TEST_ID} width={100} x={0} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
