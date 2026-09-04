import React, { memo } from 'react';

import { Accordion } from '../../../../accordion/Accordion';
import { AccordionItem } from '../../../../accordion/AccordionItem';
import { Icon } from '../../../../icons/Icon';
import { VStack } from '../../../../layout/VStack';
import { Text } from '../../../../typography/Text';

export const AccordionExample = memo(() => {
  return (
    <VStack gap={1}>
      <Accordion defaultActiveKey="1" onChange={() => undefined}>
        <AccordionItem
          itemKey="1"
          media={<Icon name="wallet" size="m" />}
          subtitle="Subtitle 1"
          title="Accordion #1"
        >
          <Text font="body">Accordion content one.</Text>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          media={<Icon name="wallet" size="m" />}
          subtitle="Subtitle 2"
          title="Accordion #2"
        >
          <Text font="body">Accordion content two.</Text>
        </AccordionItem>
      </Accordion>
      <Accordion onChange={() => undefined}>
        <AccordionItem
          itemKey="3"
          media={<Icon name="info" size="m" />}
          subtitle="Alternative"
          title="Accordion #3"
        >
          <Text font="body">Second example with icon media.</Text>
        </AccordionItem>
        <AccordionItem itemKey="4" media={<Icon name="info" size="m" />} title="Accordion #4">
          <Text font="body">Title only second row.</Text>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
});
