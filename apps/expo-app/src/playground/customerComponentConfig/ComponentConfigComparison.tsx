import React, { memo, useCallback, useState } from 'react';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { Switch } from '@coinbase/cds-mobile/controls/Switch';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';

const emptyConfig: ComponentConfig = {};

export type ComponentConfigComparisonProps = {
  componentName: string;
  /**
   * Renders the component under test. Invoked for whichever mode is active
   * (default CDS or customer-configured) so each mode gets its own tree.
   */
  children: () => React.ReactNode;
};

/**
 * Toggle orchestration for customer component config work.
 * Place inside a screen-level {@link ComponentConfigProvider} with the customer config;
 * Default mode isolates itself with an empty config scope.
 */
export const ComponentConfigComparison = memo(
  ({ componentName, children }: ComponentConfigComparisonProps) => {
    const [showConfigured, setShowConfigured] = useState(false);

    const handleToggle = useCallback((_: string | undefined, checked?: boolean) => {
      setShowConfigured(Boolean(checked));
    }, []);

    return (
      <VStack gap={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text font="headline">{componentName}</Text>
          {/* Keep the mode toggle on stock CDS so customer Switch config can't restyle it. */}
          <ComponentConfigProvider value={emptyConfig}>
            <Switch checked={showConfigured} onChange={handleToggle}>
              {showConfigured ? 'Configured' : 'Default'}
            </Switch>
          </ComponentConfigProvider>
        </HStack>
        {showConfigured ? (
          children()
        ) : (
          <ComponentConfigProvider value={emptyConfig}>{children()}</ComponentConfigProvider>
        )}
      </VStack>
    );
  },
);
