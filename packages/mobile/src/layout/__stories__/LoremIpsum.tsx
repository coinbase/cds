import React from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Text } from '../../typography/Text';

export type LoremIpsumProps = {
  title?: string;
  color?: ThemeVars.Color;
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      {title && (
        <Text color={color} font="label1" paddingBottom={1}>
          {title}
        </Text>
      )}
      {concise ? null : (
        <Text color={color} font="body" paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};
