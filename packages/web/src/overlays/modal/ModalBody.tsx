import React, { forwardRef } from 'react';
import { useModalContext } from '@cbhq/cds-common/overlays/ModalContext';

import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';

export type ModalBodyProps = BoxProps<BoxDefaultElement>;

export const ModalBody = forwardRef(
  (
    {
      children,
      flexDirection = 'column',
      flexGrow = 1,
      overflow = 'auto',
      paddingX = 3,
      tabIndex = 0,
      ...props
    }: ModalBodyProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { hideDividers } = useModalContext();

    return (
      <Box
        ref={ref}
        flexDirection={flexDirection}
        flexGrow={flexGrow}
        overflow={overflow}
        paddingX={paddingX}
        paddingY={hideDividers ? 0 : 3} // remove vertical padding when dividers hidden
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
