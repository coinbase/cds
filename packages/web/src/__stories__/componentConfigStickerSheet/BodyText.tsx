import { memo } from 'react';
import { Text, type TextDefaultElement, type TextProps } from '@coinbase/cds-web/typography/Text';

export const BodyText = memo(({ style, ...props }: TextProps<TextDefaultElement>) => (
  <Text
    style={{
      fontFamily: 'var(--defaultFont-sans)',
      fontSize: 14,
      ...style,
    }}
    {...props}
  />
));
