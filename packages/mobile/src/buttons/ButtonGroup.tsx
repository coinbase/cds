import React, { Children, cloneElement, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type {
  ElementChildren,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type GroupDirection } from '../layout';

import type { ButtonBaseProps } from './Button';

export type ButtonGroupBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Expand buttons to fill available space within the group. */
    block?: boolean;
    /** Buttons to render as a group. */
    children: ElementChildren<ButtonBaseProps>;
    /**
     * @default horizontal
     * Stack buttons vertically or horizontally.
     */
    direction?: GroupDirection;
  };

export type ButtonGroupProps = ButtonGroupBaseProps;

export const ButtonGroup = memo((_props: ButtonGroupProps) => {
  const mergedProps = useComponentConfig('ButtonGroup', _props);
  const { accessibilityLabel, block, children, testID, direction } = mergedProps;
  const isVertical = direction === 'vertical';

  return (
    <Box
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      alignItems="stretch"
      flexDirection={isVertical ? 'column' : 'row'}
      flexWrap="nowrap"
      gap={1}
      testID={testID}
    >
      {Children.map(children, (child) =>
        child ? (
          <View style={block ? styles.button : undefined}>{cloneElement(child, { block })}</View>
        ) : null,
      )}
    </Box>
  );
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});
