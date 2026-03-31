import React, { memo } from 'react';

import { Banner } from '../../../../banner/Banner';
import { VStack } from '../../../../layout/VStack';

export const BannerExample = memo(() => {
  return (
    <VStack gap={1} width="100%">
      <Banner
        startIconActive
        closeAccessibilityLabel="Close"
        startIcon="info"
        startIconAccessibilityLabel="Information"
        title="Informational banner"
        variant="informational"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner
        startIconActive
        closeAccessibilityLabel="Close"
        startIcon="info"
        startIconAccessibilityLabel="Information"
        title="Promotional banner"
        variant="promotional"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner
        startIconActive
        closeAccessibilityLabel="Close"
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        title="Warning banner"
        variant="warning"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner
        startIconActive
        closeAccessibilityLabel="Close"
        startIcon="error"
        startIconAccessibilityLabel="Error"
        title="Error banner"
        variant="error"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </VStack>
  );
});
