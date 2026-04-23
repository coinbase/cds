# Composed layouts with CDS

These patterns focus on the building blocks you use over and over: `Box`, `HStack`, `VStack`, `ListCell`, `TabbedChips`, `Select`, and `Modal`.

## Main layout example

This example combines containers, tabs, a select, and list rows into a single screen-shaped layout.

```tsx
import { useState } from 'react';
import { Select } from '@coinbase/cds-web/alpha/select'; // or '@coinbase/cds-mobile/alpha/select'
import { IconButton } from '@coinbase/cds-web/buttons'; // or '@coinbase/cds-mobile/buttons'
import { ListCell } from '@coinbase/cds-web/cells'; // or '@coinbase/cds-mobile/cells'
import { TabbedChips } from '@coinbase/cds-web/chips'; // or '@coinbase/cds-mobile/chips'
import { Icon } from '@coinbase/cds-web/icons'; // or '@coinbase/cds-mobile/icons'
import { Box, HStack, VStack } from '@coinbase/cds-web/layout'; // or '@coinbase/cds-mobile/layout'
import { Avatar } from '@coinbase/cds-web/media'; // or '@coinbase/cds-mobile/media'
import { Text } from '@coinbase/cds-web/typography'; // or '@coinbase/cds-mobile/typography'

function PortfolioLayoutExample() {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tradable', label: 'Tradable' },
    { id: 'watchlist', label: 'Watchlist' },
  ];

  const options = [
    { value: 'balance', label: 'Sort by balance' },
    { value: 'name', label: 'Sort by name' },
    { value: 'change', label: 'Sort by 24h change' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [sortValue, setSortValue] = useState('balance');

  return (
    <VStack gap={2}>
      <Box bordered borderRadius="400" background="bgAlternate" paddingX={3} paddingY={2}>
        <Text font="headline">Assets</Text>
      </Box>

      <TabbedChips onChange={setActiveTab} tabs={tabs} value={activeTab} />

      <Box bordered borderRadius="400" background="bgAlternate" padding={2}>
        <Select
          label="Sort assets"
          value={sortValue}
          onChange={setSortValue}
          options={options}
          placeholder="Select an option"
        />
      </Box>

      <VStack gap={1}>
        <ListCell
          accessoryNode={
            <IconButton accessibilityLabel="Help" name="info" onClick={() => alert('Accessory')} />
          }
          description="Primary balance"
          detailNode={
            <HStack alignItems="center" gap={1} justifyContent="flex-end">
              <Icon name="info" />
              <Text font="body">$12,345.00</Text>
            </HStack>
          }
          media={<Avatar alt="Bitcoin" name="Bitcoin" colorScheme="orange" />}
          spacingVariant="condensed"
          subdetailNode={
            <HStack alignItems="center" gap={0.5} justifyContent="flex-end">
              <Icon name="info" />
              <Text color="fgPositive" font="label2">
                +5.43%
              </Text>
            </HStack>
          }
          title="Bitcoin"
        />

        <ListCell
          description="Secondary position"
          detailNode={
            <HStack alignItems="center" gap={1} justifyContent="flex-end">
              <Text font="body">$3,240.00</Text>
            </HStack>
          }
          media={<Avatar alt="Ethereum" name="Ethereum" colorScheme="blue" />}
          spacingVariant="condensed"
          subdetailNode={
            <HStack alignItems="center" gap={0.5} justifyContent="flex-end">
              <Text color="fgNegative" font="label2">
                -1.21%
              </Text>
            </HStack>
          }
          title="Ethereum"
        />
      </VStack>
    </VStack>
  );
}
```

## Modal example

Keep the modal content simple. Build the inner layout first, then place it inside the overlay.

```tsx
import { useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons'; // or '@coinbase/cds-mobile/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@coinbase/cds-web/overlays'; // or '@coinbase/cds-mobile/overlays'

function BasicModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader closeAccessibilityLabel="Close" title="Basic Modal" />
        <ModalBody>Modal content goes here.</ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setVisible(false)}>Save</Button>}
          secondaryAction={
            <Button onClick={() => setVisible(false)} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
    </>
  );
}
```
