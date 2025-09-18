import React, { useEffect, useState } from 'react';

import { Spacer, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Spinner } from '../Spinner';

export default {
  component: Spinner,
  title: 'Components/Loaders/Spinner',
};

export const SpinnerDefault = () => {
  return (
    <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner Default Color
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" size={10} />
    </VStack>
  );
};

export const SpinnerPrimary = () => {
  return (
    <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner Primary Color
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" color="bgPrimary" size={10} />
    </VStack>
  );
};

export const SpinnerWithAccessibility = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner With Accessibility Label Update
      </Text>
      <Text as="p" display="block" font="body">
        Accessibility label will be updated from &quot;Loading&quot; to &quot;Complete&quot; after
        10 seconds.
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel={loading ? 'Loading' : 'Complete'} color="bgPrimary" size={10} />
    </VStack>
  );
};
