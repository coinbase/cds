import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type { SelectEmptyDropdownContentComponent } from './Select';

export const DefaultSelectEmptyDropdownContents: SelectEmptyDropdownContentComponent = ({
  label,
  styles,
}) => {
  return (
    <Box paddingX={3} paddingY={2} style={styles?.emptyContentsContainer}>
      <Text font="body" style={styles?.emptyContentsText}>
        {label}
      </Text>
    </Box>
  );
};
