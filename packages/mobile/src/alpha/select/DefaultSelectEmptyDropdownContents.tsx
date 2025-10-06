import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type { SelectEmptyDropdownContentComponent } from './Select';

export const DefaultSelectEmptyDropdownContents: SelectEmptyDropdownContentComponent = ({
  label,
}) => {
  return (
    <Box paddingX={3} paddingY={2}>
      <Text font="body">{label}</Text>
    </Box>
  );
};
