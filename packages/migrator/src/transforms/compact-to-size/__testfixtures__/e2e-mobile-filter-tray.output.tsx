import { SelectChip } from '@coinbase/cds-mobile/alpha/select-chip';
import { TabbedChips } from '@coinbase/cds-mobile/alpha/tabbed-chips';
import { Button, SlideButton } from '@coinbase/cds-mobile/buttons';
import { InputChip, MediaChip } from '@coinbase/cds-mobile/chips';
import { VStack } from '@coinbase/cds-mobile/layout';

/** Representative pattern: a mobile filter tray built from the chip family plus buttons. */
export function FilterTray({ tabs, options }: { tabs: unknown[]; options: unknown[] }) {
  const handleApply = () => {};

  return (
    <VStack gap={2}>
      <TabbedChips size="xs" tabs={tabs} />
      <SelectChip size="xs" options={options} />
      <InputChip size="xs" onPress={handleApply}>
        Verified
      </InputChip>
      <MediaChip>Everything</MediaChip>
      <SlideButton size="s" label="Slide to apply" />
      <Button size="s" onPress={handleApply}>
        Apply
      </Button>
    </VStack>
  );
}
