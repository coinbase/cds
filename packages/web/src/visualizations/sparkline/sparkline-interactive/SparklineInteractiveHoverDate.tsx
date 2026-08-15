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
    <Text tabularNumbers as="div" font="label2">
      <span ref={setupDateRef} className={cx(resetFadeCss, textCss)}>
        {/* prevent the container vertical jump by stubbing out a date with no opacity */}
        {dateString}
      </span>
    </Text>
  );
});
