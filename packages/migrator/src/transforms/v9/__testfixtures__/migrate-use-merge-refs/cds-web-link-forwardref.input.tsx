import React, { forwardRef, memo, useRef } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

/** Representative pattern: `forwardRef` + `useMergeRefs` to combine external and internal refs. */
type DivProps = React.ComponentPropsWithoutRef<'div'>;

export const Linkish = memo(
  forwardRef<HTMLDivElement, DivProps>((props, ref) => {
    const { children, ...rest } = props;
    const linkRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs(ref, linkRef);
    return (
      <div ref={mergedRef} {...rest}>
        {children}
      </div>
    );
  }),
);
