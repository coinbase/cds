import React from 'react';
import type { IconSize } from '@cbhq/cds-common/types';
import { names } from '@cbhq/cds-icons/names';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

type IconSheetProps = {
  renderIcon?: (name: string, size: IconSize) => React.ReactNode;
};

export function IconSheet({ renderIcon }: IconSheetProps) {
  return (
    <VStack>
      <HStack flexWrap="wrap" gap={2}>
        {names.map((item) => (
          <VStack key={item}>
            <HStack gap={2} paddingBottom={2}>
              {(['xs', 's', 'm', 'l'] as const).map((size) =>
                renderIcon ? (
                  renderIcon(item, size)
                ) : (
                  <Icon key={size} color="fg" name={item} size={size} />
                ),
              )}
            </HStack>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
