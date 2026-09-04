import React from 'react';
import { VStack } from '@coinbase/cds-web/layout';

export function MDXSection({ children }: { children: React.ReactNode }) {
  return (
    <VStack as="section" background="bgAlternate" borderRadius={500}>
      {children}
    </VStack>
  );
}
