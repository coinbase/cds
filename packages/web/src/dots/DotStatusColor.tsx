import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type {
  DotOverlap,
  DotSize,
  DotVariant,
  PinPlacement,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { getTransform } from './dotStyles';

const baseCss = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const variantColorMap: Record<DotVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foregroundMuted: 'fgMuted',
  warning: 'fgWarning',
};

export type DotStatusColorBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** Position of dot relative to its parent */
    pin?: PinPlacement;
    /** Background color of dot */
    variant: DotVariant;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Size of dot */
    size?: DotSize;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
  };

export type DotStatusColorProps = DotStatusColorBaseProps;

export const DotStatusColor = memo((_props: DotStatusColorProps) => {
  const mergedProps = useComponentConfig('DotStatusColor', _props);
  const {
    variant,
    pin,
    size = 's',
    overlap,
    children,
    testID,
    accessibilityLabel,
    ...props
  } = mergedProps;
  const { color } = useTheme();

  const pinStyles = getTransform(pin, overlap);

  const styles = useMemo(() => {
    const variantColor = variantColorMap[variant];
    return {
      borderRadius: 'var(--borderRadius-1000)',
      width: `var(--iconSize-${size})`,
      height: `var(--iconSize-${size})`,
      backgroundColor: color[variantColor],
      alignItems: 'center',
      justifyContent: 'center',
      ...pinStyles,
    };
  }, [color, pinStyles, size, variant]);

  return (
    <div aria-label={accessibilityLabel} className={baseCss} data-testid={testID} {...props}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
      <div
        data-testid="dotstatuscolor-inner-container"
        onClick={handlePreventPropagation}
        style={styles}
      />
    </div>
  );
});
