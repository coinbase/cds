import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, within } from '@testing-library/react';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/test';
import type { DotStatusColorBaseProps } from '../DotStatusColor';
import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-test';
const DOTSTATUSCOLOR_INNER_CONTAINER_TESTID = 'dotstatuscolor-inner-container';

const MockDotStatusColorWithTheme = (props: DotStatusColorBaseProps) => {
  return (
    <DefaultThemeProvider>
      <DotStatusColor {...props} />
    </DefaultThemeProvider>
  );
};

describe('DotStatusColor', () => {
  it('passes a11y', async () => {
    expect(
      await renderA11y(<MockDotStatusColorWithTheme variant="negative" />),
    ).toHaveNoViolations();
  });

  it('renders a DotStatusColor', () => {
    render(<MockDotStatusColorWithTheme testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('renders children within DotStatusColor', () => {
    render(
      <MockDotStatusColorWithTheme testID={DOTSTATUSCOLOR_TESTID} variant="negative">
        <div>Test</div>
      </MockDotStatusColorWithTheme>,
    );

    const dot = screen.getByTestId(DOTSTATUSCOLOR_TESTID);
    expect(within(dot).getByText('Test')).toBeTruthy();
  });

  it('can change variant to negative', () => {
    render(<MockDotStatusColorWithTheme testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.fgNegative,
    });
  });

  it('can change variant to positive', () => {
    render(<MockDotStatusColorWithTheme testID={DOTSTATUSCOLOR_TESTID} variant="positive" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.fgPositive,
    });
  });

  it('can change size to small', () => {
    const iconSize = defaultTheme.iconSize.s;

    render(
      <MockDotStatusColorWithTheme size="s" testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(screen.getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      width: `var(--iconSize-${iconSize})`,
      height: `var(--iconSize-${iconSize})`,
    });
  });

  it('Placed in the correct position relative to its children', () => {
    render(
      <MockDotStatusColorWithTheme pin="bottom-start" variant="negative">
        <div />
      </MockDotStatusColorWithTheme>,
    );

    expect(screen.getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
    });
  });
});
