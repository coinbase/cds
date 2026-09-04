import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../Box';
import { Fallback } from '../Fallback';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

const FallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <VStack gap={1}>
          <Fallback height={45} width={150} />
          <Fallback height={45} width={65} />
        </VStack>
      </Example>

      <Example title="Shapes">
        <HStack gap={1}>
          <Fallback height={50} shape="square" width={50} />
          <Fallback height={50} shape="squircle" width={50} />
          <Fallback height={50} shape="circle" width={50} />
        </HStack>
      </Example>

      <Example title="Random Rectangle Width">
        <VStack gap={1}>
          <Fallback height={20} width={150} />
          <Fallback height={20} width={150} />
          <Fallback height={20} width={150} />
          <Fallback height={20} width={150} />
          <Fallback height={20} width={150} />
        </VStack>
      </Example>

      <Example title="Disabled Random Width">
        <VStack gap={1}>
          <Fallback disableRandomRectWidth height={20} width={150} />
          <Fallback disableRandomRectWidth height={20} width={150} />
          <Fallback disableRandomRectWidth height={20} width={150} />
        </VStack>
      </Example>

      <Example title="Width Variants (Deterministic)">
        <VStack gap={1}>
          <Fallback height={20} rectWidthVariant={0} width={150} />
          <Fallback height={20} rectWidthVariant={1} width={150} />
          <Fallback height={20} rectWidthVariant={2} width={150} />
          <Fallback height={20} rectWidthVariant={3} width={150} />
          <Fallback height={20} rectWidthVariant={4} width={150} />
        </VStack>
      </Example>

      <Example title="Custom Accessibility Label">
        <Fallback accessibilityLabel="Loading user profile" height={45} width={150} />
      </Example>

      <Example title="Grouped Fallbacks (Accessible Container)">
        <Box accessible accessibilityLabel="Loading table data" accessibilityState={{ busy: true }}>
          <VStack gap={1}>
            <Fallback
              accessibilityElementsHidden
              accessible={false}
              height={20}
              importantForAccessibility="no-hide-descendants"
              width={150}
            />
            <Fallback
              accessibilityElementsHidden
              accessible={false}
              height={20}
              importantForAccessibility="no-hide-descendants"
              width={150}
            />
            <Fallback
              accessibilityElementsHidden
              accessible={false}
              height={20}
              importantForAccessibility="no-hide-descendants"
              width={150}
            />
          </VStack>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default FallbackScreen;
