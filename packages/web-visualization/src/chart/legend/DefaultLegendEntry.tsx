import { memo } from 'react';
import { cx } from '@coinbase/cds-web';
import { HStack, type HStackDefaultElement, type HStackProps } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { css } from '@linaria/core';

import { DefaultLegendShape } from './DefaultLegendShape';
import type { LegendEntryProps } from './Legend';

const legendEntryCss = css`
  align-items: center;
`;

export type DefaultLegendEntryProps = LegendEntryProps &
  Omit<HStackProps<HStackDefaultElement>, 'children' | 'color'>;

export const DefaultLegendEntry = memo(
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
  }: DefaultLegendEntryProps) => {
    return (
      <HStack
        className={cx(legendEntryCss, className, classNames?.root)}
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
