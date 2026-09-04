import React from 'react';

import { VStack } from '../../layout/VStack';
import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { useMediaQuery } from '../useMediaQuery';

const Example = () => {
  const query1 = '(min-width: 960px)';
  const result1 = useMediaQuery(query1);
  const query2 = '(prefers-color-scheme: dark)';
  const result2 = useMediaQuery(query2);

  return (
    <VStack
      background="bgAlternate"
      borderColor="bgLine"
      borderRadius={200}
      fontSize="body"
      gap={2}
      padding={3}
    >
      <VStack as="pre" color="fg">
        {query1}
        <br />
        {JSON.stringify(result1, null, 2)}
      </VStack>
      <VStack as="pre" color="fg">
        {query2}
        <br />
        {JSON.stringify(result2, null, 2)}
      </VStack>
    </VStack>
  );
};

export const DefaultToDevice = () => {
  return (
    <MediaQueryProvider>
      <VStack gap={2}>
        <Example />
      </VStack>
    </MediaQueryProvider>
  );
};
DefaultToDevice.parameters = { percy: { enableJavaScript: true } };

export default {
  title: 'Hooks/useMediaQuery',
  component: Example,
};
