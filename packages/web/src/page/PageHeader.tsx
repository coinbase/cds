import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { pageHeaderHeight } from '@coinbase/cds-common/tokens/page';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Box } from '../layout/Box';
import { Grid, type GridDefaultElement, type GridProps } from '../layout/Grid';
import { media } from '../styles/media';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';
import { Text } from '../typography/Text';

const gridStylesMobileTitleCss = css`
  @media only screen and ${media.phone} {
    grid-column: 1 / 4; /* Span all three columns */
    grid-row: 2;
  }
`;

const gridStylesMobileEndCss = css`
  @media only screen and ${media.phone} {
    grid-row: 1;
    grid-column: 3;
  }
`;

export const pageHeaderStartPaddingStart: ResponsiveProps<StaticStyleProps>['paddingStart'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;

export const pageHeaderEndPaddingX: ResponsiveProps<StaticStyleProps>['paddingX'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;

export type PageHeaderBaseProps = SharedProps &
  PositionStyles & {
    /**
     * Optional. Accepts a ReactNode. Used for placing primary content on the left side of the page header, such as a header title, logo, or icon button.
     */
    start?: React.ReactNode;
    /**
     * Optional. Accepts a ReactNode. Intended for content on the right side of the header, such as action buttons or icons.
     * In modal usage, elements like a close button should be included to facilitate modal dismissal.
     */
    end?: React.ReactNode;
    /**
     * Optional. Accepts a ReactNode. Intended for main title within the Page Header or for secondary content in the center of the header, like a navigation stepper or search bar.
     */
    title?: React.ReactNode;
    /**
     * Set the background color of the box.
     */
    background?: ThemeVars.Color;
  };

export type PageHeaderProps = Polymorphic.ExtendableProps<
  GridProps<GridDefaultElement>,
  PageHeaderBaseProps & {
    /** Custom styles for individual elements of the PageHeader component */
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
      /** Start element */
      start?: React.CSSProperties;
      /** End element */
      end?: React.CSSProperties;
      /** Title element */
      title?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the PageHeader component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Start element */
      start?: string;
      /** End element */
      end?: string;
      /** Title element */
      title?: string;
    };
  }
>;

export const PageHeader = memo(
  forwardRef(function PageHeader(
    {
      start,
      end,
      title,
      overflow = 'auto',
      role = 'banner',
      templateColumns = 'auto 1fr auto',
      styles,
      style,
      classNames,
      className,
      ...props
    }: PageHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    const titleResponsivePaddingLeft: ResponsiveProps<StaticStyleProps>['paddingStart'] = useMemo(
      () => ({
        phone: start && !end ? 0 : 3,
        tablet: start ? 0 : 4,
        desktop: start ? 0 : 4,
      }),
      [start, end],
    );

    return (
      /**
       * We use CSS grid to move the `title` element to a second row when necessary. Large screen sizes will
       * always use a single row. For smaller screen sizes, a single row is used when only two of `start`,
       * `title`, and `end` props are provided - and a second row is used when all three are provided.
       *
       *  [Single row variations] - For larger screen sizes, and smaller screen sizes when only two of `start`,
       *                            `title`, and `end` props are provided - everything stays on one row:
       *
       *  1. When `start` is present and `end` is absent, `title` is placed next to `start`.
       *    +-------+-------------------------+
       *    | Start | Title                   |
       *    +-------+-------------------------+
       *
       *  2. When `end` is present and `start` is absent, title is placed next to `end`.
       *    +----------------+----------------+
       *    | Title          |            End |
       *    +----------------+----------------+
       *
       *  3. When neither `start` nor `end` is present.
       *    +---------------------------------+
       *    | Title                           |
       *    +---------------------------------+
       *
       *   4. Large screen sizes when `start`, `title`, and `end` are present.
       *    +-------+-------------------+-----+
       *    | Start | Title             | End |
       *    +-------+-------------------+-----+
       *
       *  [Double row variation] - For smaller screen sizes - if `start`, `end`, and `title` are present, `title`
       *                           moves to the second row:
       *    +----------------+-----------------+
       *    | Start          |             End |
       *    +----------------+-----------------+
       *    | Title                            |
       *    +----------------------------------+
       *
       *
       *
       * */
      <Grid
        ref={ref}
        className={cx(className, classNames?.root)}
        overflow={overflow}
        role={role}
        style={{ ...style, ...styles?.root }}
        templateColumns={templateColumns}
        {...props}
      >
        {!!start && (
          <Box
            alignItems="center"
            className={classNames?.start}
            height={pageHeaderHeight}
            paddingEnd={3}
            paddingStart={pageHeaderStartPaddingStart}
            style={styles?.start}
          >
            {start}
          </Box>
        )}
        {!!title && (
          <Box
            alignItems="center"
            className={cx(start && end ? gridStylesMobileTitleCss : undefined, classNames?.title)}
            justifyContent="flex-start"
            paddingStart={titleResponsivePaddingLeft}
            style={styles?.title}
            testID="responsive-title-container"
          >
            {typeof title === 'string' ? (
              <Text as="h1" display="block" font="title1">
                {title}
              </Text>
            ) : (
              title
            )}
          </Box>
        )}
        {!!end && (
          <Box
            alignItems="center"
            className={cx(gridStylesMobileEndCss, classNames?.end)}
            height={pageHeaderHeight}
            justifyContent="flex-end"
            paddingX={pageHeaderEndPaddingX}
            style={styles?.end}
            testID="responsive-end-container"
          >
            {end}
          </Box>
        )}
      </Grid>
    );
  }),
);
