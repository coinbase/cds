import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { colorSchemeMap } from '@coinbase/cds-common/tokens/avatar';
import type {
  AvatarFallbackColor,
  AvatarShape,
  AvatarSize,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout/Box';
import { Text } from '../typography/Text';

import { RemoteImage } from './RemoteImage';
import { shapeStyles } from './RemoteImageGroup';

const smallAvatarSize = 44;

export const coloredFallbackTestID = 'cds-avatar-colored-fallback';

export const fallbackImageSrc =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAOAA4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t80Zo4o4oAM0ZrsPBvw7m8Sxi7uZDa2GcKwHzyeu30HvXdf8Kp0Dytnlz7v+ennHP8Ah+lAHiuaM12XjL4dTeG4jd2sjXViDhiR88f1x1HvXG8UAGaKOKKADI9Kkt4vtFxFEOC7Bc/U4qPJ9KVXZGDLwwOQaAPpS0tY7G1ht4VCRRKEVcdABipc1meG9eh8RaRBeRMNzACRB1R+4/z2rU/OgCK5t47y3lgmUPFKpR1I6gjBr5uu4fst1NCefLdkz64OK+g/EWuQ+HtJnvJmHyjCIerv2Ar55klaWRnblmJJPqaAG5HpRRk+lFABzVnTtOutWvY7W0iMs8hwqj+Z9BVbB9a9o+GXhlNI0VL2VR9rvFD5PVY/4R+PX8vSgCfwX4EXwsDNJdSTXTrh1RisQ/Dv9T+QrrP89aT8qPyoA5Txr4FHilRNHdSQ3Ua4RHYtEfw7fUfrXjOo6dc6Tey2t3EYp4zgqf5j1FfSP5VxvxN8Mpq+jPfRKPtlmpfI6tH/ABD8Ov5+tAHi/NFGDRQBY060+3aja22f9dKsf5kD+tfSKIsaKigKqjAAHAFFFAC/j+lL+P6UUUAH4/pTXRZEZGG5WGCCOooooA+btRtPsOoXVtn/AFMrR/kSKKKKAP/Z';

export type AvatarBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** This is the name associated with the entity in the Avatar. This is used in the image alt tag for accessibility. */
    alt?: string;
    /** Absolute url to the image that should be shown in the Avatar. If no src is provided then a generic fallback image is used. */
    src?: string;
    /**
     * Shape of Avatar.
     * @note If the shape is a hexagon, do not use name.
     */
    shape?: AvatarShape;
    /** Size for a given avatar. */
    size?: AvatarSize;
    /** Adds a border to the Avatar */
    borderColor?: ThemeVars.Color;
    /**
     * Override the default fallback background and border color
     * @default blue
     */
    colorScheme?: AvatarFallbackColor;
    /** This is the name associated with the Avatar's entity. It will be used to generate a fallback. */
    name?: string;
    /**
     * @danger Creates a custom Avatar size. The size prop should be used in most circumstances.
     * @deprecated Use the style prop instead to set the width/height properties
     * This is an escape hatch when using the Avatar in a fixed size container where you cannot control the dimensions.
     */
    dangerouslySetSize?: number;
  };

export type AvatarProps = AvatarBaseProps & Omit<BoxProps, 'children'>;

export const Avatar = memo(
  ({
    alt,
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    testID,
    dangerouslySetSize,
    colorScheme = 'blue',
    name,
    accessibilityLabel,
    style,
    ...props
  }: AvatarProps) => {
    const imgSrc = src ?? fallbackImageSrc;
    const shapeStyle = shapeStyles[shape];
    const theme = useTheme();
    const avatarSize = theme.avatarSize[size];
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCustomSize = typeof dangerouslySetSize !== 'undefined';
    const isCustomSizeAndSmall = isCustomSize && dangerouslySetSize <= smallAvatarSize;
    const spectrumColor = colorSchemeMap[colorScheme];
    const colorSchemeRgb = `rgb(${theme.spectrum[spectrumColor]})`;

    const fallbackTextColor = useMemo(
      () => getAccessibleColor({ background: colorSchemeRgb }),
      [colorSchemeRgb],
    );

    const computedSize = dangerouslySetSize ?? avatarSize;
    const shouldShowAvatarImage = !!src || !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor && shape !== 'hexagon';

    const containerStyle = useMemo(
      () => [hasBorder && styles.border, shapeStyle, style],
      [hasBorder, shapeStyle, style],
    );

    const avatarText = useMemo(() => {
      if (isLargestSize || (isCustomSize && !isCustomSizeAndSmall)) {
        return (
          <Text
            align="center"
            dangerouslySetColor={fallbackTextColor}
            font="title2"
            textTransform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }
      if (size === 'm' || isCustomSizeAndSmall) {
        return (
          <Text
            align="center"
            dangerouslySetColor={fallbackTextColor}
            font="caption"
            textTransform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }

      return (
        <Text
          align="center"
          dangerouslySetColor={fallbackTextColor}
          font="body"
          textTransform="uppercase"
        >
          {placeholderLetter}
        </Text>
      );
    }, [
      isLargestSize,
      isCustomSize,
      isCustomSizeAndSmall,
      size,
      fallbackTextColor,
      placeholderLetter,
    ]);

    const coloredFallback = useMemo(
      () => (
        <Box
          alignItems="center"
          dangerouslySetBackground={colorSchemeRgb}
          height="100%"
          justifyContent="center"
          style={shapeStyle}
          testID={coloredFallbackTestID}
          width="100%"
        >
          {avatarText}
        </Box>
      ),
      [avatarText, shapeStyle, colorSchemeRgb],
    );

    return (
      <Box
        accessibilityLabel={accessibilityLabel}
        alignItems="center"
        borderColor={borderColor}
        dangerouslySetBackground={imgSrc}
        flexGrow={0}
        flexShrink={0}
        height={computedSize}
        justifyContent="center"
        overflow="hidden"
        position="relative"
        style={containerStyle}
        testID={testID}
        width={computedSize}
        {...props}
      >
        {shouldShowAvatarImage ? (
          <RemoteImage
            alt={alt}
            height={computedSize}
            resizeMode="cover"
            shape={shape}
            source={{ uri: imgSrc }}
            testID={`${testID ?? ''}-image`}
            width={computedSize}
          />
        ) : (
          coloredFallback
        )}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
  },
});
