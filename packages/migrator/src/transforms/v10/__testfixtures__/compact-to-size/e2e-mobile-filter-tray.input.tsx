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
      <TabbedChips compact tabs={tabs} />
      <SelectChip compact options={options} />
      <InputChip compact onPress={handleApply}>
        Verified
      </InputChip>
      <MediaChip compact={false}>Everything</MediaChip>
      <SlideButton compact label="Slide to apply" />
      <Button compact onPress={handleApply}>
        Apply
      </Button>
    </VStack>
  );
}
