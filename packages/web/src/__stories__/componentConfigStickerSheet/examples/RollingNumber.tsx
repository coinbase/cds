import { memo, useCallback, useEffect, useState } from 'react';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { RollingNumber } from '@coinbase/cds-web/numbers/RollingNumber';

export const RollingNumberExample = memo(() => {
  const [{ price, difference }, setPriceState] = useState({
    price: 12345.67,
    difference: 0,
  });
  const onNext = useCallback(
    () =>
      setPriceState((p) => {
        const delta = (Math.random() - 0.5) * 200; // +/- 100
        const next = Math.max(0, p.price + delta);
        const price = Math.round(next * 100) / 100;
        return { price, difference: price - p.price };
      }),
    [],
  );

  useEffect(() => {
    onNext();
    const interval = setInterval(() => {
      onNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [onNext]);

  const trendColor = difference >= 0 ? 'fgPositive' : 'fgNegative';

  return (
    <RollingNumber
      accessibilityLabelPrefix={difference > 0 ? 'up ' : difference < 0 ? 'down ' : ''}
      color={trendColor}
      font="body"
      format={{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      prefix={
        difference >= 0 ? (
          <Icon color={trendColor} name="diagonalUpArrow" size="xs" />
        ) : (
          <Icon color={trendColor} name="diagonalDownArrow" size="xs" />
        )
      }
      styles={{
        prefix: {
          paddingRight: 'var(--space-1)',
        },
      }}
      suffix={`(${((Math.abs(difference) / price) * 100).toFixed(2)}%)`}
      value={Math.abs(difference)}
    />
  );
});
