import React from 'react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { defaultContext, SelectProvider } from '../selectContext';
import { SelectOption } from '../SelectOption';

export default {
  title: 'Components/Select/SelectOption',
  component: SelectOption,
};

export const Stories = () => {
  return (
    <SelectProvider value={defaultContext}>
      <VStack gap={3} width={200}>
        <VStack role="menu">
          <Text as="p" display="block" font="label1">
            Title and Description
          </Text>
          <SelectOption description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <Text as="p" display="block" font="label1">
            Disabled
          </Text>
          <SelectOption disabled description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <Text as="p" display="block" font="label1">
            Compact
          </Text>
          <SelectOption compact description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <Text as="p" display="block" font="label1">
            Multiline
          </Text>
          <SelectOption
            multiline
            description="This is a really long description that will be multiple lines long"
            title="Title"
            value="test"
          />
        </VStack>
      </VStack>
    </SelectProvider>
  );
};
