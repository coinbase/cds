import { forwardRef, memo } from 'react';

import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';

import type {
  SelectEmptyDropdownContentComponent,
  SelectEmptyDropdownContentProps,
} from './Select';

export const DefaultSelectEmptyDropdownContents: SelectEmptyDropdownContentComponent = memo(
  forwardRef<HTMLDivElement, SelectEmptyDropdownContentProps>(
    ({ label, styles, classNames }, ref) => {
      return (
        <Box
          ref={ref}
          className={classNames?.emptyContentsContainer}
          padding={2}
          style={styles?.emptyContentsContainer}
        >
          <Text
            className={classNames?.emptyContentsText}
            font="body"
            style={styles?.emptyContentsText}
          >
            {label}
          </Text>
        </Box>
      );
    },
  ),
);
