import React, { Children, isValidElement, useMemo } from 'react';
import { shapeBorderRadius } from '@coinbase/cds-common/tokens/borderRadius';
import type {
  AvatarSize,
  NegativeSpace,
  Shape,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { css, type LinariaClassName } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { Text } from '../typography/Text';

import type { RemoteImageProps } from './RemoteImage';

export type RemoteImageGroupBaseProps = SharedProps &
  SharedAccessibilityProps &
  Pick<BoxProps<BoxDefaultElement>, 'borderWidth' | 'borderColor'> & {
    /**
     * Indicates the number of remote image before it collapses
     * @default 4
     */
    max?: number;
    /**
     * Size of all RemoteImage children in the group.
     * @default m
     */
    size?: AvatarSize | number;
    /**
     * Shape of all RemoteImage children in the group
     * @default circle
     */
    shape?: Shape;
    /** Children content */
    children?: React.ReactNode;
  };

export type RemoteImageGroupProps = RemoteImageGroupBaseProps;

const borderRadiusCss: Record<Shape, LinariaClassName> = {
  circle: css`
    border-radius: 100%;
  `,
  square: css`
    border-radius: ${shapeBorderRadius.square}px;
  `,
  hexagon: css`
    border-radius: ${shapeBorderRadius.hexagon}px;
  `,
  squircle: css`
    border-radius: ${shapeBorderRadius.squircle}px;
  `,
  rectangle: css`
    border-radius: ${shapeBorderRadius.rectangle}px;
  `,
};

const isolateCss = css`
  isolation: isolate;
`;

const excessContainerCss = css`
  box-sizing: content-box;
`;

export const RemoteImageGroup = (_props: RemoteImageGroupProps) => {
  const mergedProps = useComponentConfig('RemoteImageGroup', _props);
  const {
    children,
    size = 'm',
    max = 4,
    shape = 'circle',
    testID,
    borderWidth,
    borderColor = borderWidth ? 'bg' : undefined,
    ...props
  } = mergedProps;
  const { avatarSize } = useTheme();

  const sizeAsNumber = typeof size === 'number' ? size : avatarSize[size];
  const overlapSpacing: NegativeSpace = sizeAsNumber <= 40 ? -1 : -2;

  const excess = Children.count(children) - max;
  const groupChildren = useMemo(() => {
    const arrayChildren = Children.toArray(children);

    if (excess > 0) {
      return arrayChildren.slice(0, -excess);
    }

    return arrayChildren;
  }, [children, excess]);

  return (
    <Box
      alignItems="center"
      className={isolateCss}
      display="inline-flex"
      overflow="visible"
      position="relative"
      testID={testID}
      {...props}
    >
      {groupChildren.map((child, index) => {
        if (!isValidElement(child)) {
          return null;
        }

        const childShape: RemoteImageProps['shape'] = child.props.shape;

        // dynamically apply uniform sizing and shape to all RemoteImage children elements
        const clonedChild = React.cloneElement(child as React.ReactElement<RemoteImageProps>, {
          width: sizeAsNumber,
          height: sizeAsNumber,
          ...(childShape ? undefined : { shape }),
        });

        // zIndex is progressively lower so that each child is stacked below the previous one
        const zIndex = -index;

        const childContainerCss = borderWidth ? borderRadiusCss[childShape ?? shape] : undefined;

        return (
          <Box
            key={index}
            borderColor={borderColor}
            borderWidth={borderWidth}
            className={childContainerCss}
            marginStart={index === 0 ? undefined : overlapSpacing}
            position="relative"
            testID={`${testID ? `${testID}-` : ''}inner-box-${index}`}
            zIndex={zIndex}
          >
            {clonedChild}
          </Box>
        );
      })}
      {excess > 0 && (
        <Box
          alignItems="center"
          background="bgSecondary"
          borderColor={borderColor}
          borderWidth={borderWidth}
          className={cx(excessContainerCss, borderRadiusCss[shape])}
          height={sizeAsNumber}
          justifyContent="center"
          marginStart={overlapSpacing}
          position="relative"
          width={sizeAsNumber}
          zIndex={groupChildren.length * -1}
        >
          <Text
            font="legal"
            style={{
              fontSize: sizeAsNumber * 0.4,
            }}
            testID={`${testID}-excess-text`}
          >
            +{excess}
          </Text>
        </Box>
      )}
    </Box>
  );
};
