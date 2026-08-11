import React, { memo, useCallback } from 'react';
import { Switch } from '@coinbase/cds-mobile/controls/Switch';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';

const emptyConfig: ComponentConfig = {};

export type ComponentConfigComparisonProps = {
  componentName: string;
  /** Whether the customer-configured mode is currently shown. Controlled by the parent so a "toggle all" control can drive every comparison at once. */
  checked: boolean;
  /** Called with the next checked value when the mode toggle changes. */
  onChange: (checked: boolean) => void;
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
  ({ componentName, checked, onChange, children }: ComponentConfigComparisonProps) => {
    const handleToggle = useCallback(
      (_: string | undefined, nextChecked?: boolean) => {
        onChange(Boolean(nextChecked));
      },
      [onChange],
    );

    return (
      <VStack gap={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="accentBoldBlue" font="caption">
            {componentName}
          </Text>
          {/* Keep the mode toggle on stock CDS so customer Switch config can't restyle it. */}
          <ComponentConfigProvider value={emptyConfig}>
            <Switch
              accessibilityLabel={
                checked ? 'Showing configured component' : 'Showing default component'
              }
              checked={checked}
              color={checked ? 'fgPrimary' : undefined}
              onChange={handleToggle}
            >
              Configured
            </Switch>
          </ComponentConfigProvider>
        </HStack>
        {checked ? (
          children()
        ) : (
          <ComponentConfigProvider value={emptyConfig}>{children()}</ComponentConfigProvider>
        )}
      </VStack>
    );
  },
);
