import React, { memo, useCallback } from 'react';
import { css } from '@linaria/core';

import { cx } from '../../../cx';
import { Text } from '../../../typography/Text';

import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const resetFadeCss = css`
  opacity: 0;
`;

const textCss = css`
  display: inline-flex;
  align-items: center;
`;

export const SparklineInteractiveHoverPrice = memo(() => {
  const { setHoverPriceDOMNode } = useSparklineInteractiveScrubContext();

  const setupPriceRef = useCallback(
    (ref: HTMLSpanElement) => {
      setHoverPriceDOMNode(ref ?? null);
    },
    [setHoverPriceDOMNode],
  );

  return (
    <Text tabularNumbers as="div" font="label2">
      <span ref={setupPriceRef} className={cx(resetFadeCss, textCss)}>
        {/* prevent the container vertical jump by stubbing out a price with no opacity */}
      </span>
    </Text>
  );
});
