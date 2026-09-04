import React from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Text, type TextBaseProps } from '../../typography/Text';

export type LoremIpsumProps = {
  title?: string;
  color?: TextBaseProps['color'];
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      {title && (
        <Text as="p" color={color} display="block" font="label1" paddingBottom={1}>
          {title}
        </Text>
      )}
      {concise ? null : (
        <Text as="p" color={color} display="block" font="body" paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};
