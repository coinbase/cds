import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { type TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { Box } from '../layout/Box';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

import { tabsTransitionConfig } from './Tabs';

const MotionText = motion(Text);

const insetFocusRingCss = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

const buttonCss = css`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: var(--borderRadius-1000);
`;

const buttonDisabledCss = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

export type SegmentedTabProps<T extends string = string> = PressableBaseProps &
  TabValue<T> & {
    /**
     * Text color when the SegmentedTab is active.
     * @default negativeForeground
     */
    activeColor?: ThemeVars.Color;
    /**
     * Text color when the SegmentedTab is inactive.
     * @default foreground
     */
    color?: ThemeVars.Color;
    /** Callback that is fired when the SegmentedTab is clicked. */
    onClick?: (id: T, event: React.MouseEvent) => void;
  };

const disabledCss = css`
  opacity: 0.5;
`;

type SegmentedTabComponent = <T extends string = string>(
  props: SegmentedTabProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => React.ReactElement;

const SegmentedTabComponent = memo(
  forwardRef(
    <T extends string>(
      {
        id,
        label,
        disabled: disabledProp,
        onClick,
        color = 'fg',
        activeColor = 'fgInverse',
        className,
        testID,
        font = 'headline',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
        textTransform,
        ...props
      }: SegmentedTabProps<T>,
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { activeTab, updateActiveTab, disabled: allTabsDisabled } = useTabsContext<T>();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: React.MouseEvent) => {
          updateActiveTab(id);
          onClick?.(id, event);
        },
        [id, updateActiveTab, onClick],
      );

      const motionProps = useMemo(
        () => ({
          animate: { color: `var(--color-${isActive ? activeColor : color})` },
          transition: tabsTransitionConfig,
          initial: false,
        }),
        [activeColor, color, isActive],
      );

      return (
        <Pressable
          ref={ref}
          aria-selected={isActive}
          className={cx(
            insetFocusRingCss,
            buttonCss,
            isDisabled && buttonDisabledCss,
            disabledProp && !allTabsDisabled && disabledCss,
            className,
          )}
          data-testid={testID}
          disabled={isDisabled}
          font={font}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          id={id}
          lineHeight={lineHeight}
          onClick={handlePress}
          role="tab"
          textAlign={textAlign}
          textTransform={textTransform}
          type="button"
          {...props}
        >
          <Box as="span" justifyContent="center" paddingX={2} paddingY={1}>
            {typeof label === 'string' ? (
              <MotionText
                font={font}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                textAlign={textAlign}
                textTransform={textTransform}
                {...motionProps}
              >
                {label}
              </MotionText>
            ) : (
              label
            )}
          </Box>
        </Pressable>
      );
    },
  ),
);

SegmentedTabComponent.displayName = 'SegmentedTab';

export const SegmentedTab = SegmentedTabComponent as SegmentedTabComponent;
