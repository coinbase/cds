import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { SharedProps } from '@cbhq/cds-common/types';
import { css } from '@linaria/core';

import { useIsBrowser } from '../hooks/useIsBrowser';
import { Box } from '../layout/Box';
import { getBrowserGlobals } from '../utils/browser';

import type { AvatarBaseProps } from './Avatar';

export const cdsHexagonTestId = 'cds-hexagon';
export const hexagonClipPathContainerId = 'cds-hexagon-clipPath-container';
export const hexagonAvatarClipId = 'cds-hexagon-avatar-clipper';

/**
 * We need to mount this to the DOM one time
 * This is currently done in the PortalProvider
 */
export const HexagonAvatarClipPath = () => {
  // to get scale values use equation 1/x, where x is height or width
  const xScale = 1 / 66;
  const yScale = 1 / 62;

  return (
    <svg height="0" viewBox="0 0 66 62" width="0">
      <defs>
        <clipPath
          clipPathUnits="objectBoundingBox"
          id={hexagonAvatarClipId}
          transform={`scale(${xScale} ${yScale})`}
        >
          <path d="M63.4372 22.8624C66.2475 27.781 66.2475 33.819 63.4372 38.7376L54.981 53.5376C52.1324 58.5231 46.8307 61.6 41.0887 61.6H24.4562C18.7142 61.6 13.4125 58.5231 10.564 53.5376L2.10774 38.7376C-0.702577 33.819 -0.702582 27.781 2.10774 22.8624L10.564 8.06243C13.4125 3.07687 18.7142 0 24.4562 0H41.0887C46.8307 0 52.1324 3.07686 54.981 8.06242L63.4372 22.8624Z" />
        </clipPath>
      </defs>
    </svg>
  );
};
HexagonAvatarClipPath.displayName = 'HexagonAvatarClipPath';

/**
 * Because the hexagon is not symmetrical, we have to get all mathy to scale the border appropriately
 * Note: These values were manually set with my eyeballs
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
};

export const HexagonBorder = memo(
  ({
    strokeColor,
    offset,
    size = 'l',
    testID = cdsHexagonTestId,
    className,
  }: HexagonBorderProps) => {
    const svgTransformStyles = hexagonSvgTransformStyles[offset ? 'offset' : 'standard'][size];

    return (
      <Box
        aria-hidden
        className={className}
        data-testid={testID}
        height="100%"
        position="absolute"
        width="100%"
      >
        <svg data-testid={`${testID}-svg`} style={svgTransformStyles} viewBox="-2.25 0 70 62">
          <path
            className={pathElementCss}
            d="M63.4372 22.8624C66.2475 27.781 66.2475 33.819 63.4372 38.7376L54.981 53.5376C52.1324 58.5231 46.8307 61.6 41.0887 61.6H24.4562C18.7142 61.6 13.4125 58.5231 10.564 53.5376L2.10774 38.7376C-0.702577 33.819 -0.702582 27.781 2.10774 22.8624L10.564 8.06243C13.4125 3.07687 18.7142 0 24.4562 0H41.0887C46.8307 0 52.1324 3.07686 54.981 8.06242L63.4372 22.8624Z"
            data-testid={`${testID}-path`}
            stroke={strokeColor}
            strokeWidth={1.5}
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
