import { Children, memo } from 'react';
import type { ViewProps } from 'react-native';
import {
  AccordionProvider,
  type AccordionProviderProps,
} from '@coinbase/cds-common/accordion/AccordionProvider';
import type { SharedProps } from '@coinbase/cds-common/types';
import { join } from '@coinbase/cds-common/utils/join';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider, VStack } from '../layout';

export type AccordionBaseProps = SharedProps & AccordionProviderProps;

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

export const Accordion = memo((_props: AccordionProps) => {
  const mergedProps = useComponentConfig('Accordion', _props);
  const { activeKey, children, defaultActiveKey, onChange, setActiveKey, testID, style } =
    mergedProps;
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
});
