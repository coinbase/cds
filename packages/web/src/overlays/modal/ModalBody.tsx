import React, { forwardRef, memo } from 'react';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';

export type ModalBodyBaseProps = BoxProps<BoxDefaultElement>;
export type ModalBodyProps = ModalBodyBaseProps;

export const ModalBody = memo(
  forwardRef((_props: ModalBodyProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const mergedProps = useComponentConfig('ModalBody', _props);
    const {
      children,
      flexDirection = 'column',
      flexGrow = 1,
      overflow = 'auto',
      paddingX = 3,
      tabIndex = 0,
      ...props
    } = mergedProps;
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
  }),
);

ModalBody.displayName = 'ModalBody';
