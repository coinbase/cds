import { memo } from 'react';
import { type BoxDefaultElement, type BoxProps } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';

type ContainerProps = Omit<BoxProps<BoxDefaultElement>, 'title'> & {
  title?: string;
};

export const Container = memo(
  ({
    background = 'bg',
    alignSelf = 'stretch',
    alignItems = 'center',
    flexDirection = 'row',
    justifyContent = 'center',
    flexWrap = 'wrap',
    flexGrow = 0,
    flexShrink = 0,
    width = '100%',
    borderRadius = 200,
    position = 'relative',
    padding = 2,
    gap = 2,
    children,
    title,
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
          <Text font="label1" textAlign="start" width="100%">
            {title}
          </Text>
        )}
        {children}
      </VStack>
    );
  },
);
