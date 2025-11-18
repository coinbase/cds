import React, { memo, useMemo } from 'react';
import type { AvatarSize } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { AvatarFallbackColor, AvatarShape, SharedProps } from '@coinbase/cds-common/types';
import { css, type LinariaClassName } from '@linaria/core';

import { cx } from '../cx';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { Text } from '../typography/Text';

import { hexagonAvatarClipId, HexagonBorder } from './Hexagon';
import { RemoteImage } from './RemoteImage';

export const fallbackImageSrc =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAOAA4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t80Zo4o4oAM0ZrsPBvw7m8Sxi7uZDa2GcKwHzyeu30HvXdf8Kp0Dytnlz7v+ennHP8Ah+lAHiuaM12XjL4dTeG4jd2sjXViDhiR88f1x1HvXG8UAGaKOKKADI9Kkt4vtFxFEOC7Bc/U4qPJ9KVXZGDLwwOQaAPpS0tY7G1ht4VCRRKEVcdABipc1meG9eh8RaRBeRMNzACRB1R+4/z2rU/OgCK5t47y3lgmUPFKpR1I6gjBr5uu4fst1NCefLdkz64OK+g/EWuQ+HtJnvJmHyjCIerv2Ar55klaWRnblmJJPqaAG5HpRRk+lFABzVnTtOutWvY7W0iMs8hwqj+Z9BVbB9a9o+GXhlNI0VL2VR9rvFD5PVY/4R+PX8vSgCfwX4EXwsDNJdSTXTrh1RisQ/Dv9T+QrrP89aT8qPyoA5Txr4FHilRNHdSQ3Ua4RHYtEfw7fUfrXjOo6dc6Tey2t3EYp4zgqf5j1FfSP5VxvxN8Mpq+jPfRKPtlmpfI6tH/ABD8Ov5+tAHi/NFGDRQBY060+3aja22f9dKsf5kD+tfSKIsaKigKqjAAHAFFFAC/j+lL+P6UUUAH4/pTXRZEZGG5WGCCOooooA+btRtPsOoXVtn/AFMrR/kSKKKKAP/Z';

const wrapperCss = css`
  /* Styles the possible values of the colorScheme prop. Children elements will use CSS currentColor to inherit this color styles. */
  &[data-colorscheme='blue'] {
    color: rgb(var(--blue60));
  }

  &[data-colorscheme='teal'] {
    color: rgb(var(--teal60));
  }

  &[data-colorscheme='purple'] {
    color: rgb(var(--purple60));
  }

  &[data-colorscheme='pink'] {
    color: rgb(var(--pink60));
  }

  &[data-colorscheme='green'] {
    color: rgb(var(--green60));
  }

  &[data-colorscheme='gray'] {
    color: rgb(var(--gray60));
  }

  &[data-colorscheme='orange'] {
    color: rgb(var(--orange60));
  }

  &[data-colorscheme='yellow'] {
    color: rgb(var(--yellow60));
  }

  &[data-colorscheme='indigo'] {
    color: rgb(var(--indigo60));
  }

  &[data-colorscheme='red'] {
    color: rgb(var(--red60));
  }

  &[data-colorscheme='chartreuse'] {
    color: rgb(var(--chartreuse60));
  }
`;

const avatarCss = css`
  overflow: hidden;

  border: solid 1px var(--avatar-borderColor);

  &[data-bordered='true'] {
    border-width: 2px;
  }

  &[data-selected='true'] {
    /* Box shadow is used to place a ring around the avatar in the color chosen by the colorScheme prop */
    box-shadow: 0 0 0 2px currentColor;
  }

  &[data-shape='hexagon'] {
    border: none;
    /* the shadow for the hex shape is applied using another technique since the normal shadow will be hidden by the clip path */
    box-shadow: none;
    /* this clips the element using the Hexagon svg element */
    clip-path: url(#${hexagonAvatarClipId});
  }
`;

const borderRadiusCss: Record<AvatarShape, LinariaClassName> = {
  circle: css`
    border-radius: 100%;
  `,
  square: css`
    border-radius: 4px;
  `,
  hexagon: css`
    border-radius: 0;
  `,
};

const contentWrapperCss = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type AvatarBaseProps = SharedProps & {
  /** Absolute url to the image that should be shown in the Avatar. If no src is provided then a generic fallback image is used. */
  src?: string;
  /** Shape of Avatar.
   * Note: If the shape is a hexagon, do not use name.
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
  /** Adds treatment that indicates that the Avatar is currently selected */
  selected?: boolean;
  /** This is the name associated with the entity in the Avatar. This is used in the image alt tag for accessibility. */
  alt?: string;
  /**
   * @danger Creates a custom Avatar size. The size prop should be used in most circumstances.
   * @deprecated Use the style prop instead to set the width/height properties
   * This is an escape hatch when using the Avatar in a fixed size container where you cannot control the dimensions.
   */
  dangerouslySetSize?: number;
};

export type AvatarProps = AvatarBaseProps & BoxProps<BoxDefaultElement>;

export const Avatar = memo(
  ({
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    colorScheme = 'blue',
    name,
    selected,
    alt,
    testID,
    dangerouslySetSize,
    className,
    style,
    ...props
  }: AvatarProps) => {
    const avatarSize = `var(--avatarSize-${size})`;
    const userProvidedSize = style?.width ?? style?.height ?? dangerouslySetSize;
    const computedSize = userProvidedSize ?? avatarSize;

    const avatarText = useMemo(() => {
      const placeholderLetter = name?.charAt(0);

      // to maintain backwards compatibility with the dangerouslySetSize prop (now deprecated)
      // we want to make sure the placeholder letter responds nicely with the set size
      // we do this by picking an arbitrary constant to scale the text by
      // we intentionally are not doing the same treatment for sizes set with the inline style prop
      if (dangerouslySetSize) {
        return (
          <Text
            as="p"
            color="fgInverse"
            display="block"
            font="title2"
            style={{ transform: `scale(${dangerouslySetSize * 0.02})` }}
            textAlign="center"
            transform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }

      const largeStandardSizes: AvatarSize[] = ['xxxl', 'xxl'];
      const showLargerFont = largeStandardSizes.includes(size);
      return (
        <Text
          as="p"
          color="fgInverse"
          display="block"
          font={showLargerFont ? 'title2' : 'body'}
          textAlign="center"
          transform="uppercase"
        >
          {placeholderLetter}
        </Text>
      );
    }, [name, size, dangerouslySetSize]);

    const shouldShowBorder = Boolean((src || !name) && borderColor);

    const dimensionProps = useMemo(
      () => ({ width: computedSize, height: computedSize }),
      [computedSize],
    );

    const avatarInlineStyles = useMemo<React.CSSProperties>(
      () => ({
        width: computedSize,
        height: computedSize,
        '--avatar-borderColor': shouldShowBorder
          ? `var(--color-${borderColor})`
          : 'var(--color-transparent)',
        ...style,
      }),
      [computedSize, style, shouldShowBorder, borderColor],
    );

    return (
      // set position required to place the HexagonBorder elements properly
      <Box
        className={wrapperCss}
        data-colorscheme={colorScheme}
        position="relative"
        testID={`${testID}-wrapper`}
        {...props}
      >
        <Box
          className={cx(avatarCss, borderRadiusCss[shape], className)}
          data-bordered={shouldShowBorder}
          data-selected={selected}
          data-shape={shape}
          flexGrow={0}
          flexShrink={0}
          position="relative"
          style={avatarInlineStyles}
          testID={testID}
        >
          <Box className={contentWrapperCss}>
            {/* render the Remote image when neither a src URL or name is passed in */}
            {!!src || !name ? (
              <RemoteImage
                {...dimensionProps}
                alt={alt}
                shape={shape}
                source={src || fallbackImageSrc}
              />
            ) : (
              <Box
                {...dimensionProps}
                alignItems="center"
                background="currentColor"
                className={borderRadiusCss[shape]}
                justifyContent="center"
                position="relative"
                testID={`${testID}-fallback`}
              >
                {avatarText}
              </Box>
            )}
          </Box>
        </Box>
        {/* The selected emphasis is applied with an offset HexagonBorder element since the actual box shadow would be hidden by the clip path */}
        {shape === 'hexagon' && selected && (
          <HexagonBorder offset size={size} strokeColor="currentColor" />
        )}
        {shape === 'hexagon' && shouldShowBorder && (
          <HexagonBorder size={size} strokeColor={`var(--color-${borderColor})`} />
        )}
      </Box>
    );
  },
);
