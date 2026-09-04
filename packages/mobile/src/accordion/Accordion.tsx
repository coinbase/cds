import { Children, memo } from 'react';
import type { ViewProps } from 'react-native';
import {
  AccordionProvider,
  type AccordionProviderProps,
} from '@coinbase/cds-common/accordion/AccordionProvider';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { join } from '@coinbase/cds-common/utils/join';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';

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

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

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
        overflow={borderRadius !== undefined ? 'hidden' : undefined}
        style={style}
        testID={testID}
        width="100%"
      >
        {showItemSeparators ? join(Children.toArray(children), <Divider />) : children}
      </VStack>
    </AccordionProvider>
  );
});
