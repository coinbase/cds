import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, within } from '@testing-library/react';

import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-status-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<DotSymbol source={src} />)).toHaveNoViolations();
  });

  it('renders a DotSymbol', () => {
    render(<DotSymbol source={src} testID={DOTSYMBOL_TESTID} />);

    expect(screen.getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('can wrap & render children', () => {
    render(
      <DotSymbol source={src} testID={DOTSYMBOL_TESTID}>
        <div>Test</div>
      </DotSymbol>,
    );

    const dot = screen.getByTestId(DOTSYMBOL_TESTID);

    expect(within(dot).getByText('Test')).toBeTruthy();
  });

  it('Placed in the correct position relative to its children', () => {
    render(
      <DotSymbol pin="bottom-start" source={src}>
        <div />
      </DotSymbol>,
    );

    expect(screen.getByTestId('dotsymbol-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
    });
  });
});
