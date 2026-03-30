import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { FloatingAssetCard } from '../../../../cards/FloatingAssetCard';
import { HStack } from '../../../../layout/HStack';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const FloatingAssetCardExample = memo(() => {
  const media = (
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={styles.image}
    />
  );

  return (
    <HStack gap={1}>
      <FloatingAssetCard
        description="Description"
        media={media}
        onPress={() => undefined}
        subtitle="Subtitle"
        title="Title"
      />
      <FloatingAssetCard
        description="Description"
        media={media}
        onPress={() => undefined}
        size="l"
        subtitle="Subtitle"
        title="Title"
      />
    </HStack>
  );
});
