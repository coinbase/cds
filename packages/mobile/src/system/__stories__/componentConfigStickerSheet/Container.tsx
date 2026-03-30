import { memo } from 'react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';

type ContainerProps = React.ComponentProps<typeof VStack> & {
  title?: string;
};

export const Container = memo(
  ({ paddingX = 2, gap = 2, title, children, ...props }: ContainerProps) => {
    return (
      <VStack gap={gap} maxWidth="100%" paddingX={paddingX} {...props}>
        {title && (
          <Text font="title3" width="100%">
            {title}
          </Text>
        )}
        {children}
      </VStack>
    );
  },
);
