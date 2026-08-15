import React, { forwardRef, memo, useRef } from 'react';
import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

/** Representative pattern: `forwardRef` + `useMergeRefs` to combine external and internal refs. */
type DivProps = React.ComponentPropsWithoutRef<'div'>;

export const Linkish = memo(
  forwardRef<HTMLDivElement, DivProps>((props, ref) => {
    const { children, ...rest } = props;
    const linkRef = useRef<HTMLDivElement>(null);
    const mergedRef = mergeRefs(ref, linkRef);
    return (
      <div ref={mergedRef} {...rest}>
        {children}
      </div>
    );
  }),
);
