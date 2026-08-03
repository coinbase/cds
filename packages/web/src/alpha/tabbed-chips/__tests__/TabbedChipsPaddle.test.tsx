import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { render } from '@testing-library/react';

import { IconButton } from '../../../buttons/IconButton';
import { DefaultThemeProvider } from '../../../utils/test';
import { TabbedChips, type TabbedChipsProps } from '../TabbedChips';

jest.mock('../../../buttons/IconButton', () => ({
  ...jest.requireActual('../../../buttons/IconButton'),
  IconButton: jest.fn(() => null),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

Element.prototype.scrollTo = jest.fn();

const mockIconButton = IconButton as unknown as jest.Mock;
const tabs = sampleTabs.slice(0, 5);

/**
 * Paddles only render when the tab strip overflows, which jsdom never reports on
 * its own — force the scroll container to look overflowed so the right paddle shows.
 */
const forceOverflow = () => {
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    value: 1000,
  });
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: 200,
  });
};

const getPaddleSize = (props: Partial<TabbedChipsProps>) => {
  render(
    <DefaultThemeProvider>
      <TabbedChips activeTab={tabs[0]} onChange={jest.fn()} tabs={tabs} {...props} />
    </DefaultThemeProvider>,
  );

  const paddleCall = mockIconButton.mock.calls.find(([p]) => p.name === 'caretRight');
  return paddleCall?.[0].size;
};

describe('TabbedChips paddle size', () => {
  beforeAll(forceOverflow);

  beforeEach(() => {
    mockIconButton.mockClear();
  });

  it('sizes the paddle to match the default chip size', () => {
    expect(getPaddleSize({})).toBe('s');
  });

  it('sizes the paddle to match the provided chip size', () => {
    expect(getPaddleSize({ size: 'xs' })).toBe('xs');
  });

  it('sizes the paddle to match the chip size resolved from legacy compact', () => {
    expect(getPaddleSize({ compact: true })).toBe('xs');
  });
});
