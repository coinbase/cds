import React, { memo, useCallback } from 'react';
import { borderWidth, lineDashArray } from '@coinbase/cds-common/tokens/sparkline';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const resetFadeCss = css`
  opacity: 0;
`;

const verticalLineCss = css`
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const lineContainerCss = css`
  width: ${borderWidth}px;
  height: 100%;
`;

const maskCss = css`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const lineProps: React.SVGProps<SVGLineElement> = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  strokeDasharray: lineDashArray.join(','),
  strokeWidth: borderWidth,
};

export type SparklineInteractiveLineVerticalProps = {
  color: string;
};

export const SparklineInteractiveLineVertical = memo(
  ({ color }: SparklineInteractiveLineVerticalProps) => {
    const { setLineDOMNode, setMaskDOMNode } = useSparklineInteractiveScrubContext();
    const { height } = useSparklineInteractiveContext();

    const setupLineRef = useCallback(
      (ref: HTMLDivElement) => {
        setLineDOMNode(ref ?? null);
      },
      [setLineDOMNode],
    );

    const setupMaskRef = useCallback(
      (ref: HTMLDivElement) => {
        setMaskDOMNode(ref ?? null);
      },
      [setMaskDOMNode],
    );

    const maskStyle: React.CSSProperties = {
      backgroundColor: 'var(--color-bg)',
    };

    // hook up the line and mask
    return (
      <div className={verticalLineCss}>
        <div ref={setupMaskRef} className={cx(maskCss, resetFadeCss)} style={maskStyle} />
        <div ref={setupLineRef} className={cx(lineContainerCss, resetFadeCss)}>
          <svg className={lineContainerCss}>
            <line {...lineProps} stroke={color} y2={height} />
          </svg>
        </div>
      </div>
    );
  },
);
