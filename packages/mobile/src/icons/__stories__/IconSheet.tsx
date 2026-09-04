import React from 'react';
import type { IconName, IconSize } from '@coinbase/cds-common/types';
import { names } from '@coinbase/cds-icons/names';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Icon } from '../Icon';

type IconSheetProps = {
  renderIcon?: (name: IconName, size: IconSize) => React.ReactNode;
};

type IconData = { name: IconName; sizes: IconSize[] };
const iconVariants: Array<IconData> = names.map((name) => ({ name, sizes: ['xs', 's', 'm', 'l'] }));

const ICONS_PER_EXAMPLE_GROUP = 12;

// limit number of icon sets per mobile app "Example" to help with scroll stability in UI tests
const examples: Array<Array<IconData>> = [];
for (let i = 0; i < iconVariants.length; i += ICONS_PER_EXAMPLE_GROUP) {
  examples.push(iconVariants.slice(i, i + ICONS_PER_EXAMPLE_GROUP));
}

export function IconSheet({ renderIcon }: IconSheetProps) {
  return (
    <ExampleScreen>
      {examples.map((icons, i, arr) => {
        return (
          <Example key={`icons-${i}`} title={`Icons ${i + 1} of ${arr.length}`}>
            <HStack flexWrap="wrap" gap={2}>
              {icons.map(({ name, sizes }) => (
                <HStack gap={2}>
                  {sizes.map((size) => {
                    return renderIcon ? (
                      renderIcon(name, size)
                    ) : (
                      <Icon key={size} color="fg" name={name} size={size} />
                    );
                  })}
                </HStack>
              ))}
            </HStack>
          </Example>
        );
      })}
    </ExampleScreen>
  );
}
