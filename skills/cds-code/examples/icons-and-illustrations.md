# Icons and illustrations

## Icons at different sizes and states

Icons can be rendered in different sizes and in an active (filled) or inactive state

```tsx
import { HStack, VStack } from '@coinbase/cds-web/layout'; // or '@coinbase/cds-mobile/layout'
import { Icon } from '@coinbase/cds-web/icons'; // or '@coinbase/cds-mobile/icons'

<VStack gap={2}>
  <HStack gap={1}>
    <Icon name="account" size="xs" />
    <Icon name="account" size="xs" active />
  </HStack>
  <HStack gap={1}>
    <Icon name="account" size="s" />
    <Icon name="account" size="s" active />
  </HStack>
  <HStack gap={1}>
    <Icon name="account" size="m" />
    <Icon name="account" size="m" active />
  </HStack>
  <HStack gap={1}>
    <Icon name="account" size="l" />
    <Icon name="account" size="l" active />
  </HStack>
</VStack>;
```

## Illustration types

```tsx
import { VStack } from '@coinbase/cds-web/layout'; // or '@coinbase/cds-mobile/layout'
import {
  HeroSquare,
  Pictogram,
  SpotIcon,
  SpotRectangle,
  SpotSquare,
} from '@coinbase/cds-web/illustrations'; // or '@coinbase/cds-mobile/illustrations'

<VStack gap={2}>
  <Pictogram name="shield" dimension="64x64" />
  <SpotIcon name="shield" dimension="32x32" />
  <SpotSquare name="yieldCenterUSDC" />
  <SpotRectangle name="creditCardExcitement" />
  <HeroSquare name="accessToAdvancedCharts" />
</VStack>;
```

## Illustration scaling with `dimension` and `scaleMultiplier`

```tsx
import { VStack } from '@coinbase/cds-web/layout'; // or '@coinbase/cds-mobile/layout'
import { Pictogram, SpotIcon } from '@coinbase/cds-web/illustrations'; // or '@coinbase/cds-mobile/illustrations'

<VStack gap={2}>
  <Pictogram name="shield" scaleMultiplier={1.5} />
  <Pictogram name="shield" dimension="48x48" scaleMultiplier={2.5} />
  <SpotIcon name="shield" scaleMultiplier={1.5} />
  <SpotIcon name="shield" dimension="24x24" scaleMultiplier={1.5} />
</VStack>;
```
