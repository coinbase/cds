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
        <SearchInput size="s" placeholder="Search assets" />
        <IconButton size="s" name="close" onClick={handleClear} />
      </HStack>
      <TextInput size="s" labelVariant="inside" label="Amount" placeholder="0.00" />
      <Select size="s" labelVariant="inside" label="Asset" options={assets} />
      <Select size="s" type="multi" label="Tags" options={assets} />
      <DateInput size="s" labelVariant="inside" label="Send on" />
      <Chip size="xs">Recurring</Chip>
      <Button size={isDense ? "s" : "l"} onClick={handleSubmit}>
        Review transfer
      </Button>
      <Button size="m" variant="secondary">
        Cancel
      </Button>
    </VStack>
  );
}
