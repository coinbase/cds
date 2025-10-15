import { forwardRef, memo } from 'react';
import { type View } from 'react-native';

import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type { SelectEmptyDropdownContentProps } from './Select';

const DefaultSelectEmptyDropdownContentsComponent = (
  { label, styles }: SelectEmptyDropdownContentProps,
  ref: React.Ref<View>,
) => {
  return (
    <Box ref={ref} paddingX={3} paddingY={2} style={styles?.emptyContentsContainer}>
      <Text font="body" style={styles?.emptyContentsText}>
        {label}
      </Text>
    </Box>
  );
};

export const DefaultSelectEmptyDropdownContents = memo(
  forwardRef(DefaultSelectEmptyDropdownContentsComponent),
);
