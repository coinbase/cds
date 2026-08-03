import { Select } from '@coinbase/cds-web/alpha/select';
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { Chip } from '@coinbase/cds-web/chips';
import { SearchInput, TextInput } from '@coinbase/cds-web/controls';
import { DateInput } from '@coinbase/cds-web/dates';
import { HStack, VStack } from '@coinbase/cds-web/layout';

/** Representative pattern: a dense transfer form mixing buttons, inputs and a select. */
export function TransferForm({ assets, isDense }: { assets: unknown[]; isDense: boolean }) {
  const handleSubmit = () => {};
  const handleClear = () => {};

  return (
    <VStack gap={2}>
      <HStack gap={1} alignItems="center">
        <SearchInput compact placeholder="Search assets" />
        <IconButton compact name="close" onClick={handleClear} />
      </HStack>
      <TextInput compact label="Amount" placeholder="0.00" />
      <Select compact label="Asset" options={assets} />
      <Select compact type="multi" label="Tags" options={assets} />
      <DateInput compact label="Send on" />
      <Chip compact>Recurring</Chip>
      <Button compact={isDense} onClick={handleSubmit}>
        Review transfer
      </Button>
      <Button compact size="m" variant="secondary">
        Cancel
      </Button>
    </VStack>
  );
}
