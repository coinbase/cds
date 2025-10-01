import React, { cloneElement, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@coinbase/cds-common/tokens/cell';
import type { IconName, SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import { Icon } from '../icons/Icon';
import type { PictogramProps } from '../illustrations/Pictogram';
import { Box } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

export type CellMediaType = 'asset' | 'avatar' | 'image' | 'icon' | 'pictogram';

export type CellMediaIconProps = {
  type: Extract<CellMediaType, 'icon'>;
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  color?: ThemeVars.Color;
};

export type CellMediaPictogramProps = {
  type: Extract<CellMediaType, 'pictogram'>;
  illustration: React.ReactElement<PictogramProps>;
};

type CellMediaOtherProps = {
  type: Exclude<CellMediaType, 'icon' | 'pictogram'>;
  /**
   * @deprecated This prop will be removed in v6.0.0
   * If required, use `accessibilityLabel` and `accessibilityHint` instead to set accessible labels.
   * Refer to https://cds.coinbase.com/components/cell-media/ for updated accessibility guidance.
   */
  title?: string;
  source: string | number;
};

type CellMediaVariantProps = CellMediaIconProps | CellMediaPictogramProps | CellMediaOtherProps;

export type CellMediaBaseProps = SharedProps &
  CellMediaVariantProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export type CellMediaProps = CellMediaBaseProps;

/**
 * @deprecated This component will be removed in a future release. Pass media directly via the `media` prop.
 * For example: `<Avatar src={...} />`, `<Icon name={...} />`, `<RemoteImage source={...} />`, or a Pictogram.
 */
export const CellMedia = memo(function CellMedia(props: CellMediaProps) {
  let size = mediaSize;
  let content = null;

  if (props.type === 'icon') {
    content = (
      <Icon
        accessibilityLabel={props.accessibilityLabel}
        active={props.active}
        color={props.color ?? 'fg'}
        name={props.name}
        size="s"
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar' || props.type === 'image') {
    const isImage = props.type === 'image';

    if (isImage) {
      size = imageSize;
    }

    content = (
      <Box
        alt={props.accessibilityLabel}
        as={RemoteImage}
        height={size}
        shape={isImage ? 'squircle' : 'circle'}
        source={String(props.source)}
        width={size}
      />
    );
  }

  if (props.type === 'pictogram') {
    size = imageSize;
    content = cloneElement(props.illustration, {
      dimension: '48x48',
      scaleMultiplier: pictogramScaleMultiplier,
      alt: props.accessibilityLabel ?? props.illustration.props.alt,
    });
  }

  if (!content) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      height={size}
      justifyContent="center"
      testID={props.testID}
      width={size}
    >
      {content}
    </Box>
  );
});
