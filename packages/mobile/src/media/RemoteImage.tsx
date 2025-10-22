import React, { memo, useMemo } from 'react';
import { Image } from 'react-native';
import type {
  AccessibilityProps,
  DimensionValue,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import { ClipPath, Defs, Image as SvgImage, Path, Svg, SvgXml } from 'react-native-svg';
import { SvgCssUri } from 'react-native-svg/css';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { AspectRatio, AvatarSize, FixedValue, Shape } from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';

type SourceProp = string | ImageProps['source'];

type XmlReturnType = { content: string };

type BaseRemoteImageProps = Omit<ImageProps, 'style' | 'width' | 'height' | 'source'> & {
  /** Scale image based on this aspect-ratio */
  aspectRatio?: AspectRatio;
  /** Height of RemoteImage. Height takes precedence over size */
  height?: FixedValue;
  /**
   * Shape of RemoteImage
   * @default square
   * */
  shape?: Shape;
  /** Width of RemoteImage. Width takes precedence over size */
  width?: FixedValue;
  /**
   * Size for a given RemoteImage. If width or height is not defined,
   * it will set size = m as default
   *
   * @default m
   * */
  size?: AvatarSize;
  /** Adds a custom border color */
  borderColor?: ThemeVars.Color;
  /**
   * @deprecated This prop will be removed in a future version. Use darkModeEnhancementsApplied instead.
   * Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.
   */
  shouldApplyDarkModeEnhacements?: boolean;
  /**
   * Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.
   */
  darkModeEnhancementsApplied?: boolean;
  source?: SourceProp;
  fallbackAccessibilityLabel?: AccessibilityProps['accessibilityLabel'];
  fallbackAccessibilityHint?: AccessibilityProps['accessibilityHint'];
  style?: StyleProp<ImageStyle>;
};

type RemoteImagePropsWithSource = {
  source?: SourceProp;
} & BaseRemoteImageProps;

type RemoteImagePropsWithWidth = {
  width: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWithHeight = {
  height: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWidthAndHeight = {
  width: FixedValue;
  height: FixedValue;
  resizeMode: ImageResizeMode;
} & BaseRemoteImageProps;

export type RemoteImageBaseProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight
  | RemoteImagePropsWithSource;

export type RemoteImageProps = RemoteImageBaseProps;

function getSource(
  source: string | number | ImageURISource,
  cachePolicy?: ImageURISource['cache'],
): ImageSourcePropType {
  if (typeof source === 'string') {
    if (source.endsWith('.svg')) {
      return { uri: source, headers: { format: 'svg' }, cache: cachePolicy };
    }
    return { uri: source, cache: cachePolicy };
  }

  return source;
}

function isSvg(source: SourceProp): boolean {
  return typeof source === 'object' && 'headers' in source && source.headers?.format === 'svg';
}

function isImageURISource(source?: SourceProp): source is ImageURISource {
  return typeof source === 'object' && 'uri' in source;
}

type HexagonClipPathProps = {
  image: React.ReactElement;
} & AccessibilityProps;

const HexagonClipPath = ({ image, ...props }: HexagonClipPathProps) => {
  return (
    <Svg {...props} viewBox="0 0 16 16">
      <Defs>
        <ClipPath id="hex-hw-shapeclip-clipconfig">
          <Path d="M15.4855 6.0242C16.1715 7.24852 16.1715 8.75148 15.4855 9.97581L13.4213 13.6598C12.7259 14.9008 11.4317 15.6667 10.0301 15.6667H5.96994C4.56828 15.6667 3.2741 14.9008 2.57874 13.6598L0.514515 9.97581C-0.171504 8.75148 -0.171505 7.24852 0.514514 6.0242L2.57874 2.34022C3.2741 1.09922 4.56828 0.333336 5.96994 0.333336H10.0301C11.4317 0.333336 12.7259 1.09922 13.4213 2.34022L15.4855 6.0242Z" />
        </ClipPath>
      </Defs>
      {image}
    </Svg>
  );
};

const shapeBorderRadius: Record<NonNullable<BaseRemoteImageProps['shape']>, number> = {
  circle: 1e5,
  squircle: 8,
  square: 4,
  rectangle: 0,
  hexagon: 0,
};

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
  shouldApplyDarkModeEnhacements,
  darkModeEnhancementsApplied,
  source,
  size = 'm',
  style,
  borderColor,
  borderRadius,
  onError,
  onLoad,
  fallbackAccessibilityLabel,
  fallbackAccessibilityHint,
  ...props
}: RemoteImageProps) {
  const shapeRadius = shapeBorderRadius[shape];
  const { activeColorScheme, avatarSize } = useTheme();

  // If height and width are not provided, we default to avatarSize
  const computedHeight = useMemo(
    () => (width || height ? height : avatarSize[size]),
    [width, height, avatarSize, size],
  );
  const computedWidth = useMemo(
    () => (width || height ? width : avatarSize[size]),
    [width, height, avatarSize, size],
  );

  const useFallback = source === undefined;
  const transformedSource = useMemo(
    () => (typeof source === 'string' ? getSource(source) : source),
    [source],
  );

  const theme = useTheme();

  const applyDarkModeEnhancement =
    activeColorScheme === 'dark' && (shouldApplyDarkModeEnhacements || darkModeEnhancementsApplied);

  const darkModeStyles = useMemo(() => {
    if (applyDarkModeEnhancement) {
      return {
        backgroundColor: theme.color.bgInverse,
        borderWidth: 1,
        borderColor: theme.color.bgLineHeavy,
      };
    }
    return undefined;
  }, [applyDarkModeEnhancement, theme.color]);

  const borderStyles = useMemo(() => {
    // shouldApplyDarkModeEnhancement border decoration takes precedence
    if (!applyDarkModeEnhancement && borderColor) {
      return {
        borderColor: theme.color[borderColor],
        borderWidth: 2,
      };
    }

    return undefined;
  }, [applyDarkModeEnhancement, borderColor, theme.color]);

  const styles = useMemo(
    () =>
      [
        {
          aspectRatio: aspectRatio ? aspectRatio[0] / aspectRatio[1] : undefined,
          borderRadius: borderRadius ?? shapeRadius,
        } as const,
        darkModeStyles,
        borderStyles,
        style,
      ].filter(Boolean),
    [aspectRatio, shapeRadius, borderRadius, borderStyles, style, darkModeStyles],
  );

  const stylesWithDimensions = useMemo(
    () => [
      { width: computedWidth as DimensionValue, height: computedHeight as DimensionValue },
      ...styles,
    ],
    [computedHeight, computedWidth, styles],
  );

  const isAccessible = props.accessible ?? !!props.accessibilityLabel;

  if (isSvg(transformedSource as SourceProp)) {
    return (
      <SvgCssUri
        accessibilityRole="image"
        accessible={!!props.accessibilityLabel}
        style={styles}
        uri={isImageURISource(transformedSource) ? (transformedSource?.uri ?? null) : null}
        {...props}
        height={computedHeight}
        width={computedWidth}
      />
    );
  }

  if (useFallback) {
    const darkFallback = require('./RemoteImageFallbackXmls/dark') as XmlReturnType;

    const lightFallback = require('./RemoteImageFallbackXmls/light') as XmlReturnType;

    return (
      <SvgXml
        accessibilityHint={fallbackAccessibilityHint}
        accessibilityLabel={fallbackAccessibilityLabel}
        accessibilityRole={props.accessibilityRole ?? 'image'}
        accessible={!!fallbackAccessibilityLabel}
        height={computedHeight}
        style={styles}
        width={computedWidth}
        xml={activeColorScheme === 'dark' ? darkFallback.content : lightFallback.content}
      />
    );
  }

  if (shape === 'hexagon') {
    return (
      <HexagonClipPath
        accessibilityHint={props.accessibilityHint}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole={props.accessibilityRole ?? 'image'}
        accessible={isAccessible}
        image={
          <SvgImage
            clipPath="url(#hex-hw-shapeclip-clipconfig)"
            height={16}
            href={source as ImageProps['source']}
            width={16}
            x={0}
            y={0}
          />
        }
      />
    );
  }

  return (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityElementsHidden={!props.accessibilityLabel}
      accessibilityRole="image"
      importantForAccessibility={props.accessibilityLabel ? 'auto' : 'no'}
      onError={onError}
      onLoad={onLoad}
      source={transformedSource as ImageSourcePropType}
      {...props}
      style={stylesWithDimensions}
    />
  );
});

export { getSource, HexagonClipPath };
