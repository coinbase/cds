import { Children, memo } from 'react';
import type { ViewProps } from 'react-native';
import {
  AccordionProvider,
  type AccordionProviderProps,
} from '@cbhq/cds-common/accordion/AccordionProvider';
import type { SharedProps } from '@cbhq/cds-common/types';
import { join } from '@cbhq/cds-common/utils/join';

import { Divider, VStack } from '../layout';

export type AccordionBaseProps = SharedProps & AccordionProviderProps;

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

export const Accordion = memo(
  ({
    activeKey,
    children,
    defaultActiveKey,
    onChange,
    setActiveKey,
    testID,
    style,
  }: AccordionProps) => {
    return (
      <AccordionProvider
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        setActiveKey={setActiveKey}
      >
        <VStack style={style} testID={testID} width="100%">
          {join(Children.toArray(children), <Divider />)}
        </VStack>
      </AccordionProvider>
    );
  },
);
