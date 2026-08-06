import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@coinbase/cds-mobile/buttons/Button';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';

import { ComponentConfigComparison } from './customerComponentConfig/ComponentConfigComparison';
import { customerComponentConfig } from './customerComponentConfig/customerComponentConfig';

/**
 * Playground screen for iterating on a customer's CDS component config.
 * Wrap examples in {@link ComponentConfigComparison} to toggle stock CDS vs configured.
 */
export const CustomerComponentConfigScreen = memo(() => {
  return (
    <ComponentConfigProvider value={customerComponentConfig}>
      <ScrollView>
        <VStack background="bg" flexGrow={1} gap={4} paddingBottom={8} paddingTop={2} paddingX={2}>
          {/* Placeholder: both modes match until customerComponentConfig defines Button. */}
          <ComponentConfigComparison componentName="Button">
            {() => <Button>Continue</Button>}
          </ComponentConfigComparison>
        </VStack>
      </ScrollView>
    </ComponentConfigProvider>
  );
});
