import React, { Children } from 'react';
import {
  AccordionProvider,
  type AccordionProviderProps,
} from '@cbhq/cds-common/accordion/AccordionProvider';
import type { SharedProps } from '@cbhq/cds-common/types';
import { join } from '@cbhq/cds-common/utils/join';

import { useTheme } from '../hooks/useTheme';
import { Divider, VStack } from '../layout';

export type AccordionBaseProps = SharedProps & AccordionProviderProps;

export type AccordionProps = AccordionBaseProps & { style?: React.CSSProperties };

export const Accordion = ({
  activeKey,
  children,
  defaultActiveKey,
  onChange,
  setActiveKey,
  testID,
  style,
}: AccordionProps) => {
  const { activeColorScheme } = useTheme();
  const dividerColor = activeColorScheme === 'light' ? 'bgLine' : 'bgLineHeavy';

  return (
    <AccordionProvider
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      setActiveKey={setActiveKey}
    >
      <VStack style={style} testID={testID} width="100%">
        {join(Children.toArray(children), <Divider color={dividerColor} />)}
      </VStack>
    </AccordionProvider>
  );
};
