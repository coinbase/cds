import React, { type ReactNode } from 'react';
import { cx } from '@coinbase/cds-web';
import { Box } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import type { Props } from '@theme/CodeBlock/Content/Element';
// <pre> tags in markdown map to CodeBlocks. They may contain JSX children. When
// the children is not a simple string, we just return a styled block without
// actually highlighting.
export default function CodeBlockJSX({ children, className }: Props): ReactNode {
  return (
    <Box as="pre" className={cx('thin-scrollbar', className)} padding={0} tabIndex={0}>
      <Text as="code" minWidth="100%">
        {children}
      </Text>
    </Box>
  );
}
