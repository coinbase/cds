import React, { Children, isValidElement, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { ViewStyle } from 'react-native';
import { shapeBorderRadius } from '@coinbase/cds-common/tokens/borderRadius';
import type {
  AvatarSize,
  NegativeSpace,
  Shape,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout/Box';

import type { RemoteImageProps } from './RemoteImage';

export type RemoteImageGroupBaseProps = SharedProps &
  SharedAccessibilityProps &
  Pick<BoxProps, 'borderWidth' | 'borderColor'> & {
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

export const RemoteImageGroup = ({
  children,
  size = 'm',
  max = 4,
  shape = 'circle',
  testID,
  borderWidth,
  borderColor = borderWidth ? 'bg' : undefined,
  ...props
}: RemoteImageGroupProps) => {
  const { avatarSize, fontFamily, color } = useTheme();

  const shapeStyle = shapeStyles[shape];
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

  const typographyStyles = useMemo(() => {
    return {
      fontFamily: fontFamily.legal,
      color: color.fg,
      fontSize: sizeAsNumber * 0.4,
    };
  }, [sizeAsNumber, fontFamily, color]);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
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
        const clonedChild = React.cloneElement<RemoteImageProps>(child as React.ReactElement, {
          testID: `${testID ? `${testID}-` : ''}image-${index}`,
          width: sizeAsNumber,
          height: sizeAsNumber,
          ...(childShape ? undefined : { shape }),
        });

        // zIndex is progressively lower so that each child is stacked below the previous one
        const zIndex = -index;

        const childShapeStyle = borderWidth ? shapeStyles[childShape ?? shape] : undefined;

        return (
          <Box
            key={index}
            borderColor={borderColor}
            borderWidth={borderWidth}
            marginStart={index === 0 ? undefined : overlapSpacing}
            position="relative"
            style={childShapeStyle}
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
          background="bgOverlay"
          height={sizeAsNumber}
          justifyContent="center"
          marginStart={overlapSpacing}
          position="relative"
          style={shapeStyle}
          width={sizeAsNumber}
          zIndex={groupChildren.length * -1}
        >
          <Text
            style={[typographyStyles, styles.centerText]}
            testID={`${testID ? `${testID}-` : ''}excess-text`}
          >
            +{excess}
          </Text>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
});

export const shapeStyles = StyleSheet.create<Record<Shape, ViewStyle>>({
  circle: {
    borderRadius: shapeBorderRadius.circle,
  },
  squircle: {
    borderRadius: shapeBorderRadius.squircle,
  },
  square: {
    borderRadius: shapeBorderRadius.square,
  },
  rectangle: {
    borderRadius: shapeBorderRadius.rectangle,
  },
  hexagon: {
    borderRadius: shapeBorderRadius.hexagon,
  },
});
