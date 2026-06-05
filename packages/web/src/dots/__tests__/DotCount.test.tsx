import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Icon } from '../../icons/Icon';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { DotCount, type DotCountProps } from '../DotCount';

const DOTCOUNT_TESTID = 'dot-count-test';

const MockDotCountWithTheme = (props: DotCountProps) => {
  return (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <DotCount {...props} />
    </ThemeProvider>
  );
};

describe('DotCount', () => {
  it('passes a11y', async () => {
    expect(
      await renderA11y(<MockDotCountWithTheme count={1} variant="negative" />),
    ).toHaveNoViolations();
  });

  it('renders a DotCount', () => {
    render(<MockDotCountWithTheme count={1} testID={DOTCOUNT_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders correct count when count equals 1', () => {
    render(<MockDotCountWithTheme count={1} testID={DOTCOUNT_TESTID} variant="negative" />);

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    render(<MockDotCountWithTheme count={0} variant="negative" />);

    expect(screen.queryByText('0')).toBeNull();
  });

  it('renders count 99+ when count > 99', () => {
    render(<MockDotCountWithTheme count={120} variant="negative" />);

    expect(screen.getByText('99+')).toBeTruthy();
  });

  it('Placed in the correct position relative to its children', () => {
    render(
      <MockDotCountWithTheme count={1} pin="top-end" variant="negative">
        <Icon name="airdrop" size="m" />
      </MockDotCountWithTheme>,
    );

    expect(screen.getByTestId('dotcount-container')).toHaveStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translateX(50%) translateY(-50%) scale(0.9) translateZ(0)',
    });
  });
});
