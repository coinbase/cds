import React, { Children, memo } from 'react';
import {
  AccordionProvider,
  type AccordionProviderProps,
} from '@coinbase/cds-common/accordion/AccordionProvider';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { join } from '@coinbase/cds-common/utils/join';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import type { StylesAndClassNames } from '../types';

/**
 * Static class names for Accordion component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const accordionClassNames = {
  /** Root element */
  root: 'cds-Accordion',
} as const;

export type AccordionBaseProps = SharedProps &
  AccordionProviderProps & {
    /** Border radius of the accordion root container */
    borderRadius?: ThemeVars.BorderRadius;
    /**
     * Show a divider between each accordion item.
     * @default true
     */
    showItemSeparators?: boolean;
  };

export type AccordionProps = AccordionBaseProps &
  StylesAndClassNames<typeof accordionClassNames> & {
    className?: string;
    style?: React.CSSProperties;
  };

export const Accordion = memo((_props: AccordionProps) => {
  const mergedProps = useComponentConfig('Accordion', _props);
  const {
    activeKey,
    children,
    defaultActiveKey,
    onChange,
    setActiveKey,
    testID,
    style,
    styles,
    className,
    classNames,
    borderRadius,
    showItemSeparators = true,
  } = mergedProps;

  return (
    <AccordionProvider
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      setActiveKey={setActiveKey}
    >
      <VStack
        borderRadius={borderRadius}
        className={cx(accordionClassNames.root, className, classNames?.root)}
        overflow={borderRadius !== undefined ? 'hidden' : undefined}
        style={{ ...style, ...styles?.root }}
        testID={testID}
        width="100%"
      >
        {showItemSeparators ? join(Children.toArray(children), <Divider />) : children}
      </VStack>
    </AccordionProvider>
  );
});
