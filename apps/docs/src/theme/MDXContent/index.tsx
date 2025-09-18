import { type ReactNode } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import type { Props } from '@theme/MDXContent';

export default function MDXContent({ children }: Props): ReactNode {
  return (
    <MDXProvider components={MDXComponents}>
      <VStack gap={4}>{children}</VStack>
    </MDXProvider>
  );
}
