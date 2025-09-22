import React, { memo, useRef } from 'react';
import type { ElementChildren, SharedProps } from '@cbhq/cds-common/types';
import { getAccessibleColor } from '@cbhq/cds-common/utils/getAccessibleColor';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { useTheme } from '@cbhq/cds-web/hooks/useTheme';

import { generateSparklineAreaWithId } from './generateSparklineWithId';
import type { SparklineAreaBaseProps } from './SparklineArea';
import { SparklineAreaPattern } from './SparklineAreaPattern';
import { SparklinePath } from './SparklinePath';

export type SparklineBaseProps = SharedProps & {
  /** @danger Use this only if the background color beneath the Sparkline is a non-CDS color. It ensures an accessible contrast by returning either white or black when color is set to 'auto'. Accepts any valid color format (hex, RGB, RGBA). */
  background?: string;
  /** The color of the Sparkline graph's line. Accepts any raw color value (hex, rgba, hsl, etc) or 'auto'. Using 'auto' dynamically selects black or white for optimal accessibility. Does not work with CDS theme color names like 'fgPrimary' or CSS variables.  */
  color: string;
  /** Height of the Sparkline */
  height: number;
  /** Svg path as string. CDS offers a `useSparklinePath` which is useful to generate this string. This is accessible via `import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';`. Alternatively, you can use product tailored tooling to generate the SVG path. This component only requires a valid path string is provided. */
  path?: string;
  /** Width of the Sparkline */
  width: number;
  /** an optional SparklineArea that can be used to fill in the Sparkline */
  children?: ElementChildren<SparklineAreaBaseProps>;
  /** Scales the sparkline to show more or less variance. Use a number less than 1 for less variance and a number greater than 1 for more variance. If you use a number greater than 1 it may clip the boundaries of the sparkline. */
  yAxisScalingFactor?: number;
};

export type SparklineProps = SparklineBaseProps;

export const Sparkline = memo(
  ({
    background,
    color,
    height,
    path,
    width,
    yAxisScalingFactor,
    children,
  }: SparklineBaseProps) => {
    const theme = useTheme();
    const patternId = useRef<string>(generateRandomId());
    const stroke =
      color !== 'auto'
        ? color
        : getAccessibleColor({
            background: background ?? theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

    const defs = children ? (
      <defs>
        <SparklineAreaPattern color={stroke} id={patternId.current} />
      </defs>
    ) : null;

    return (
      <svg height={height} width={width}>
        {defs}
        <g {...translateProps}>
          <SparklinePath path={path} stroke={stroke} />
          {generateSparklineAreaWithId(patternId.current, children)}
        </g>
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
