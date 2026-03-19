import React, { Children, cloneElement, memo } from 'react';
import type {
  ElementChildren,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
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

const listCss = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const itemCss = css`
  list-style: none;
`;

const fillCss = css`
  flex: 1;
`;

export const ButtonGroup = memo(function ButtonGroup(_props: ButtonGroupProps) {
  const mergedProps = useComponentConfig('ButtonGroup', _props);
  const { accessibilityLabel, block, children, testID, direction } = mergedProps;
  const isVertical = direction === 'vertical';

  return (
    <Box
      alignItems="stretch"
      aria-label={accessibilityLabel}
      as="ul"
      className={listCss}
      data-testid={testID}
      flexDirection={isVertical ? 'column' : 'row'}
      flexWrap="nowrap"
      gap={1}
    >
      {Children.map(children, (child) =>
        child ? (
          <li className={cx(itemCss, block && fillCss)}>
            {cloneElement(child, {
              block: block || isVertical,
            })}
          </li>
        ) : null,
      )}
    </Box>
  );
});
