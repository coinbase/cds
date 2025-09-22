import React, { useMemo } from 'react';
import { useCounter } from '@cbhq/cds-common/visualizations/useCounter';
import { css } from '@linaria/core';

const containerCss = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const hiddenCss = css`
  visibility: hidden;
`;

const visibleCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  /* allows text to take full space so it can be aligned correctly (start or end) */
  & > * {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
`;

export type CounterBaseProps = {
  startNum: number;
  endNum: number;
  durationInMillis: number;
  renderNum?: (num: number) => string | React.ReactNode;
};

export type CounterProps = CounterBaseProps;

/**
 * @deprecated This component will be removed from CDS in a future version. It has been moved to cds-web-sparkline.
 */
export const Counter = ({ startNum, endNum, renderNum, durationInMillis }: CounterBaseProps) => {
  const count = useCounter({ startNum, endNum, durationInMillis });

  const renderFunction = useMemo(() => {
    return (num: number) => {
      return renderNum ? renderNum(num) : num;
    };
  }, [renderNum]);

  return (
    <div className={containerCss}>
      <span className={hiddenCss}>{renderFunction(endNum)}</span>
      <span className={visibleCss}>{renderFunction(count)}</span>
    </div>
  );
};
