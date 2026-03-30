import { memo } from 'react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';

type ContainerProps = React.ComponentProps<typeof VStack> & {
  title?: string;
};

export const Container = memo(
  ({
    background = 'bg',
    alignItems = 'center',
    alignSelf = 'stretch',
    borderRadius = 200,
    flexDirection = 'row',
    flexGrow = 0,
    flexShrink = 0,
    flexWrap = 'wrap',
    gap = 2,
    justifyContent = 'center',
    padding = 2,
    position = 'relative',
    title,
    width = '100%',
    children,
    ...props
  }: ContainerProps) => {
    return (
      <VStack
        alignItems={alignItems}
        alignSelf={alignSelf}
        background={background}
        borderRadius={borderRadius}
        flexDirection={flexDirection}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        flexWrap={flexWrap}
        gap={gap}
        justifyContent={justifyContent}
        padding={padding}
        position={position}
        width={width}
        {...props}
      >
        {title && (
          <Text font="label1" width="100%">
            {title}
          </Text>
        )}
        {children}
      </VStack>
    );
  },
);
