import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { IconOptions, TextOptions } from '../SegmentedControl';
import { SegmentedControl } from '../SegmentedControl';

const TEXT_OPTIONS: TextOptions = [
  {
    label: 'Ethereum',
    value: 'eth',
  },
  {
    label: 'Bitcoin',
    value: 'btc',
  },
];

const ICON_OPTIONS: IconOptions = [
  {
    label: 'ethereum',
    value: 'eth',
    accessibilityLabel: 'Ethereum',
  },
  {
    label: 'cashUSD',
    value: 'usd',
    accessibilityLabel: 'CashUSD',
  },
];

describe('SegmentedControl', () => {
  it('passes accessibility with text options', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <SegmentedControl options={TEXT_OPTIONS} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility with icon options', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <SegmentedControl iconSize="s" options={ICON_OPTIONS} type="icon" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders options', () => {
    render(
      <DefaultThemeProvider>
        <SegmentedControl options={TEXT_OPTIONS} />
      </DefaultThemeProvider>,
    );

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders text', () => {
    render(
      <DefaultThemeProvider>
        <SegmentedControl options={TEXT_OPTIONS} />
      </DefaultThemeProvider>,
    );

    expect(screen.getAllByText('Ethereum')[0]).toBeVisible();
    expect(screen.getAllByText('Bitcoin')[0]).toBeVisible();
  });

  it('renders icons', () => {
    render(
      <DefaultThemeProvider>
        <SegmentedControl iconSize="s" options={ICON_OPTIONS} type="icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getAllByTestId('icon-base-glyph')).toHaveLength(8);
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <SegmentedControl onChange={onChange} options={TEXT_OPTIONS} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getAllByText('Bitcoin')[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('btc');
  });
});
