import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type { SelectEmptyDropdownContentComponent } from './Select';

export const DefaultSelectEmptyDropdownContents: SelectEmptyDropdownContentComponent = ({
  label,
  styles,
  classNames,
}) => {
  return (
    <Box
      className={classNames?.emptyContentsContainer}
      padding={2}
      style={styles?.emptyContentsContainer}
    >
      <Text className={classNames?.emptyContentsText} font="body" style={styles?.emptyContentsText}>
        {label}
      </Text>
    </Box>
  );
};
