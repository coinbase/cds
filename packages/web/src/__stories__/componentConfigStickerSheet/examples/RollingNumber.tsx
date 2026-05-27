import { memo, useCallback, useState } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { RollingNumber } from '@coinbase/cds-web/numbers/RollingNumber';

type TrendValue = 'positive' | 'negative';

const currencyFormat = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

const stickerSheetTrends: Record<TrendValue, number> = {
  positive: 42.18,
  negative: -33.52,
} as const;

const rollingNumberPrefixStyles = {
  prefix: {
    paddingRight: 'var(--space-1)',
  },
} as const;

export const RollingNumberExample = memo(() => {
  const [trend, setTrend] = useState<TrendValue>('positive');

  const onToggleTrend = useCallback(() => {
    setTrend((current) => (current === 'positive' ? 'negative' : 'positive'));
  }, []);

  const difference = stickerSheetTrends[trend];
  const trendColor = difference >= 0 ? 'fgPositive' : 'fgNegative';

  return (
    <HStack alignItems="center" gap={1}>
      <RollingNumber
        accessibilityLabelPrefix={difference > 0 ? 'up ' : difference < 0 ? 'down ' : ''}
        color={trendColor}
        font="body"
        format={currencyFormat}
        prefix={
          difference >= 0 ? (
            <Icon color={trendColor} name="diagonalUpArrow" size="xs" />
          ) : (
            <Icon color={trendColor} name="diagonalDownArrow" size="xs" />
          )
        }
        styles={rollingNumberPrefixStyles}
        value={Math.abs(difference)}
      />
      <IconButton
        transparent
        accessibilityLabel="Update number"
        name="refresh"
        onClick={onToggleTrend}
      />
    </HStack>
  );
});
