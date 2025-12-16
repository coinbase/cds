import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useIsBrowser } from '../hooks/useIsBrowser';
import { Box } from '../layout/Box';
import { getBrowserGlobals } from '../utils/browser';

import type { AvatarBaseProps } from './Avatar';

export const cdsHexagonTestId = 'cds-hexagon';
export const hexagonClipPathContainerId = 'cds-hexagon-clipPath-container';
export const hexagonAvatarClipId = 'cds-hexagon-avatar-clipper';

const hexagonBorderWidth = 2;

/**
 * We need to mount this to the DOM one time
 * This is currently done in the PortalProvider
 */
export const HexagonAvatarClipPath = () => {
  const viewBoxSize = 16;
  return (
    <svg height="0" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width="0">
      <defs>
        <clipPath
          clipPathUnits="objectBoundingBox"
          id={hexagonAvatarClipId}
          transform={`scale(${1 / viewBoxSize} ${1 / viewBoxSize})`}
        >
          <path d="M15.4855 6.0242C16.1715 7.24852 16.1715 8.75148 15.4855 9.97581L13.4213 13.6598C12.7259 14.9008 11.4317 15.6667 10.0301 15.6667H5.96994C4.56828 15.6667 3.2741 14.9008 2.57874 13.6598L0.514515 9.97581C-0.171504 8.75148 -0.171505 7.24852 0.514514 6.0242L2.57874 2.34022C3.2741 1.09922 4.56828 0.333336 5.96994 0.333336H10.0301C11.4317 0.333336 12.7259 1.09922 13.4213 2.34022L15.4855 6.0242Z" />
        </clipPath>
      </defs>
    </svg>
  );
};
HexagonAvatarClipPath.displayName = 'HexagonAvatarClipPath';

/**
 * @deprecated will be removed in a future version
 */
export const hexagonSvgTransformStyles = {
  standard: {
    s: { transform: `scale(1.1) translateX(-0.3px)` },
    m: { transform: `scale(1.075) translateX(-0.25px)` },
    l: { transform: `scaleY(1.075) translateX(-0.25px)` },
    xl: { transform: `scaleY(1.075) translateX(-0.25px)` },
    xxl: { transform: `scaleX(1.05) scaleY(1.075) translateX(-0.55px)` },
    xxxl: { transform: `scaleX(1.05) scaleY(1.075) translateX(-0.55px)` },
  },
  offset: {
    s: { transform: `scaleX(1.3) scaleY(1.325)` },
    m: { transform: `scaleX(1.25) scaleY(1.275)` },
    l: { transform: `scaleX(1.2) scaleY(1.25)` },
    xl: { transform: `scaleX(1.175) scaleY(1.215)` },
    xxl: { transform: `scaleX(1.15) scaleY(1.2125) translateX(-0.25px)` },
    xxxl: { transform: `scaleX(1.125) scaleY(1.2) translateX(-0.25px)` },
  },
} as const;

const hexagonBorderContainerCss = css`
  position: absolute;
  inset: 0;

  &[data-offset='false'] {
    width: calc(100% - ${hexagonBorderWidth}px);
    height: calc(100% - ${hexagonBorderWidth}px);
    transform: translate(${hexagonBorderWidth / 2}px, ${hexagonBorderWidth / 2}px);
  }

  &[data-offset='true'] {
    inset: -${hexagonBorderWidth}px;
  }
`;

const pathElementCss = css`
  fill: none;
  stroke-linecap: round;
`;

type HexagonBorderProps = SharedProps & {
  /**
   * The color that is applied to the stroke. This color will be overridden by any color set by CSS in the className prop
   */
  strokeColor: string;
  offset?: boolean;
  size?: AvatarBaseProps['size'];
  /**
   * Optional class that is placed on the container element.
   * To affect the stroke of the SVG path(s), you may set the color attribute.
   * Child path elements are programmed to use the currentColor CSS value to inherit this color.
   */
  className?: string;
  computedSize?: string | number;
};

export const HexagonBorder = memo(
  ({ strokeColor, offset, testID = cdsHexagonTestId, className }: HexagonBorderProps) => {
    return (
      <Box
        aria-hidden
        className={cx(hexagonBorderContainerCss, className)}
        data-offset={!!offset}
        data-testid={testID}
      >
        <svg data-testid={`${testID}-svg`} overflow="visible" viewBox="0 0 16 16">
          <path
            className={pathElementCss}
            d="M15.4855 6.0242C16.1715 7.24852 16.1715 8.75148 15.4855 9.97581L13.4213 13.6598C12.7259 14.9008 11.4317 15.6667 10.0301 15.6667H5.96994C4.56828 15.6667 3.2741 14.9008 2.57874 13.6598L0.514515 9.97581C-0.171504 8.75148 -0.171505 7.24852 0.514514 6.0242L2.57874 2.34022C3.2741 1.09922 4.56828 0.333336 5.96994 0.333336H10.0301C11.4317 0.333336 12.7259 1.09922 13.4213 2.34022L15.4855 6.0242Z"
            data-testid={`${testID}-path`}
            stroke={strokeColor}
            strokeWidth={hexagonBorderWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </Box>
    );
  },
);

HexagonBorder.displayName = 'HexagonBorder';

/**
 * To prevent a flash when the DOM rehydrates and ensure we don't
 * mount the clip path multiple times, we use a Portal for the
 * browser, but mount directly to the dom for our first paint
 * */
const safeDocument = getBrowserGlobals()?.document;
export const HexagonClipPathPortal: React.FC = memo(() => {
  const hexagonClipPathContainer = useMemo(
    // prevent duplicate portal root
    () => safeDocument?.createElement('div'),
    [],
  );

  useEffect(() => {
    const target = safeDocument?.body;

    // prevent duplicate host
    if (safeDocument?.getElementById(hexagonClipPathContainerId) || !hexagonClipPathContainer)
      return undefined;

    hexagonClipPathContainer.id = hexagonClipPathContainerId;
    hexagonClipPathContainer.style.height = '0px';
    hexagonClipPathContainer.style.width = '0px';
    hexagonClipPathContainer.ariaHidden = 'true';

    // Append element to dom
    target?.appendChild(hexagonClipPathContainer);

    // Avoid removing child from other provider
    // This happens when multiple PortalProvider are defined
    return () => {
      // Remove element from dom
      hexagonClipPathContainer.remove();
    };
  }, [hexagonClipPathContainer]);

  if (!hexagonClipPathContainer) return null;

  return createPortal(<HexagonAvatarClipPath />, hexagonClipPathContainer);
});
HexagonClipPathPortal.displayName = 'HexagonClipPathPortal';

export const IsoHexagonClipPath = () => {
  const isBrowser = useIsBrowser();
  if (!isBrowser) return <HexagonAvatarClipPath />;

  return <HexagonClipPathPortal />;
};
IsoHexagonClipPath.displayName = 'IsoHexagonClipPath';
