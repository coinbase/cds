import React, { memo, useCallback } from 'react';
import { cx } from '@coinbase/cds-web';
import { TextLabel2 } from '@coinbase/cds-web/typography/TextLabel2';
import { css } from '@linaria/core';

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
    <TextLabel2 tabularNumbers as="div">
      <span ref={setupPriceRef} className={cx(resetFadeCss, textCss)}>
        {/* prevent the container vertical jump by stubbing out a price with no opacity */}
      </span>
    </TextLabel2>
  );
});
