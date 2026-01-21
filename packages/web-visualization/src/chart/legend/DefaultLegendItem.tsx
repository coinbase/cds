import { memo } from 'react';
import { cx } from '@coinbase/cds-web';
import { HStack, type HStackDefaultElement, type HStackProps } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { css } from '@linaria/core';

import { DefaultLegendShape } from './DefaultLegendShape';
import type { LegendItemProps } from './Legend';

const legendItemCss = css`
  align-items: center;
`;

export type DefaultLegendItemProps = LegendItemProps &
  Omit<HStackProps<HStackDefaultElement>, 'children' | 'color'>;

export const DefaultLegendItem = memo(
  ({
    seriesId,
    label,
    color,
    shape,
    ShapeComponent = DefaultLegendShape,
    gap = 1,
    className,
    classNames,
    style,
    styles,
    testID,
    ...props
  }: DefaultLegendItemProps) => {
    return (
      <HStack
        className={cx(legendItemCss, className, classNames?.root)}
        data-testid={testID}
        gap={gap}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        <ShapeComponent
          className={classNames?.shape}
          color={color}
          shape={shape}
          style={styles?.shape}
        />
        {typeof label === 'string' ? (
          <Text className={classNames?.label} font="label1" style={styles?.label}>
            {label}
          </Text>
        ) : (
          label
        )}
      </HStack>
    );
  },
);
