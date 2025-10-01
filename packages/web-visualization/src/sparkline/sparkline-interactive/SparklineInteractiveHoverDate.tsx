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

export const SparklineInteractiveHoverDate = memo(() => {
  const { setHoverDateDOMNode } = useSparklineInteractiveScrubContext();
  const dateString = new Date().toLocaleString();

  const setupDateRef = useCallback(
    (ref: HTMLSpanElement) => {
      setHoverDateDOMNode(ref ?? null);
    },
    [setHoverDateDOMNode],
  );

  return (
    <TextLabel2 tabularNumbers as="div">
      <span ref={setupDateRef} className={cx(resetFadeCss, textCss)}>
        {/* prevent the container vertical jump by stubbing out a date with no opacity */}
        {dateString}
      </span>
    </TextLabel2>
  );
});
