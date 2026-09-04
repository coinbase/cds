import React from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { TabLabel } from '../TabLabel';

const TabLabelScreen = () => {
  return (
    <ExampleScreen>
      <Example overflow="visible" padding={gutter} title="Tab Label (defaults to primary)">
        <HStack gap={4}>
          <TabLabel active>Active label</TabLabel>
          <TabLabel>Inactive label</TabLabel>
        </HStack>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Label (primary)">
        <HStack gap={4}>
          <TabLabel active variant="primary">
            Active label
          </TabLabel>
          <TabLabel variant="primary">Inactive label</TabLabel>
        </HStack>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Label (secondary)">
        <HStack gap={4}>
          <TabLabel active variant="secondary">
            Active label
          </TabLabel>
          <TabLabel variant="secondary">Inactive label</TabLabel>
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabLabelScreen;
