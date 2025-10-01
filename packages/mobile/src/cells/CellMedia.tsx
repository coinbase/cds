import React, { cloneElement, memo } from 'react';
import type { ImageURISource } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { imageSize, mediaSize, pictogramScaleMultiplier } from '@coinbase/cds-common/tokens/cell';
import type { IconName, SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import { Icon } from '../icons/Icon';
import type { PictogramProps } from '../illustrations';
import { Box } from '../layout/Box';
import { getSource, RemoteImage } from '../media/RemoteImage';

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

export type CellMediaProps = SharedProps &
  CellMediaVariantProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> & {
    /**
     * Determines how the requests handles potentially cached responses. Not applicable to type="icon".
     * @link https://reactnative.dev/docs/0.67/images#cache-control-ios-only
     */
    cache?: ImageURISource['cache'];
  };

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
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel}
        active={props.active}
        color={props.color ?? 'fg'}
        name={props.name}
        size="s"
      />
    );
  }

  if (props.type === 'asset' || props.type === 'avatar') {
    content = (
      <RemoteImage
        darkModeEnhancementsApplied
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        height={size}
        resizeMode="cover"
        shape="circle"
        source={getSource(props.source, props.cache)}
        width={size}
      />
    );
  }

  if (props.type === 'image') {
    size = imageSize;
    content = (
      <RemoteImage
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel ?? props.title}
        height={size}
        resizeMode="contain"
        shape="squircle"
        source={getSource(props.source, props.cache)}
        width={size}
      />
    );
  }

  if (props.type === 'pictogram') {
    size = imageSize;
    content = cloneElement(props.illustration, {
      dimension: '48x48',
      scaleMultiplier: pictogramScaleMultiplier,
      accessibilityLabel: props.accessibilityLabel ?? props.illustration.props.accessibilityLabel,
      accessibilityHint: props.accessibilityHint ?? props.illustration.props.accessibilityHint,
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
