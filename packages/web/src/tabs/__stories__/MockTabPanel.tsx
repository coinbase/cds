import React, { useMemo } from 'react';

import { VStack } from '../../layout/VStack';

export const MockTabPanel = ({
  id,
  isActive,
  children,
}: React.PropsWithChildren<{ id: string; isActive: boolean }>) => {
  /** This is a naive and simple approach to
   *  illustrate the proper a11y configuration
   *  Ideally you'll be using some nice animations
   * */
  const display = useMemo(() => (isActive ? undefined : ('none' as const)), [isActive]);

  return (
    <VStack
      /**
       * ACCESSIBILITY PROPS
       * These three props are required to create a truly accessible
       * tab system, and must be named in the following format
       * */
      bordered
      accessibilityLabelledBy={`tab--${id}`}
      background="bgPrimaryWash"
      borderRadius={200}
      display={display}
      gap={1}
      id={`tabpanel--${id}`}
      padding={2}
      role="tabpanel" // Make sure you're properly showing/hiding this tabpanel
    >
      {children}
    </VStack>
  );
};
