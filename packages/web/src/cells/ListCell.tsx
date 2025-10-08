import React, { forwardRef, memo, useMemo } from 'react';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Text, type TextProps } from '../typography/Text';

import { Cell, type CellBaseProps, type CellSpacing } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { CellDetail, type CellDetailProps } from './CellDetail';

const overflowCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export const listCellDefaultElement = 'div';

export type ListCellDefaultElement = typeof listCellDefaultElement;

export const hugInnerSpacing = {
  paddingX: 2 as const,
  paddingY: 0.5 as const,
  marginX: 0 as const,
} satisfies CellSpacing;
// no padding outside of the pressable area
export const hugOuterSpacing = {
  paddingX: 0 as const,
  paddingY: 0 as const,
  marginX: 0 as const,
} satisfies CellSpacing;

type CellStyles = NonNullable<CellBaseProps['styles']>;
type CellClassNames = NonNullable<CellBaseProps['classNames']>;

export type ListCellBaseProps = Polymorphic.ExtendableProps<
  Omit<CellBaseProps, 'children'>,
  CellDetailProps & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /**
     * End-aligned content (e.g., CTA, form element, metric). Replacement for the deprecated action prop, and takes precedence over it.
     * If the content is an action (like button, link, etc), we recommend avoiding use alongside `onClick`.
     * If used alongside `onClick`, the end action is triggered first and then the `onClick` handler.
     */
    end?: React.ReactNode;
    /**
     * @deprecated Use `end` instead. `action` will be removed in a future major release.
     */
    action?: React.ReactNode;
    /**
     * @deprecated Use `layoutDensity="compact"` instead. `compact` will be removed in a future major release.
     */
    compact?: boolean;
    /**
     * Layout spacing configuration.
     * Deprecated values: 'spacious' and 'compact'. Prefer 'hug'.
     * This prop will be removed in the next major release, new list cell will only have 'hug' spacing.
     *
     * When 'spacious' is set, the cell will have the following behavior:
     * 1. min-height is 80px
     * 2. Effective padding is '16px 24px' with 8px padding around the pressable area
     * 3. border radius is 8px for pressable area
     * 4. Title always cap at 1 line when there is no description, cap at 2 lines when there is description
     * 5. Description and subdetail have font 'body'
     *
     * When 'compact' is set, the cell will have the following behavior:
     * 1. min-height is 40px
     * 2. Effective padding is '16px 24px' with 8px padding around the pressable area
     * 3. border radius is 8px for pressable area
     * 4. Title always cap at 1 line when there is no description, cap at 2 lines when there is description
     * 5. Description and subdetail have font 'body'
     *
     * When 'hug' is set, the cell will have the following behavior:
     * 1. No min-height, height is determined by the content
     * 2. Padding is '4px 16px', no extra padding around the pressable area
     * 3. 0 border radius for pressable area
     * 4. Title always cap at 2 lines
     * 5. Description and subdetail have font 'label2'
     *
     * @default 'spacious'
     */
    layoutSpacing?: 'spacious' | 'compact' | 'hug';
    /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. */
    description?: React.ReactNode;
    /**
     * When there is no description the title will take up two lines by default.
     * When this is set to true multiline title behavior is overwritten, and regardless of description text state
     * the title will take up a single line truncating with ellipses.
     */
    disableMultilineTitle?: boolean;
    /**
     * Disable the default accessory that is displayed when the cell is selected.
     * If `accessory` is provided, that will continue to be displayed, otherwise no accessory will be displayed when the cell is selected.
     */
    disableSelectionAccessory?: boolean;
    /** Assitive message to display below the cell content */
    helperText?: React.ReactNode;
    /** For internal use only. */
    intermediary?: React.ReactNode;
    /* Media (icon, asset, image, etc) to display at the start of the cell. */
    media?: React.ReactElement;
    /** Allow the description to span multiple lines. This *will* break fixed height requirements, so should not be used in a `FlatList`. */
    multiline?: boolean;
    /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. */
    title?: React.ReactNode;
    /** Class names for the components */
    classNames?: Pick<
      CellClassNames,
      'root' | 'media' | 'intermediary' | 'end' | 'accessory' | 'contentContainer' | 'pressable'
    > & {
      mainContent?: CellClassNames['topContent'];
      helperText?: CellClassNames['bottomContent'];
      title?: string;
      description?: string;
    };
    /** Styles for the components */
    styles?: Pick<
      CellStyles,
      'root' | 'media' | 'intermediary' | 'end' | 'accessory' | 'contentContainer' | 'pressable'
    > & {
      mainContent?: CellStyles['topContent'];
      helperText?: CellStyles['bottomContent'];
      title?: React.CSSProperties;
      description?: React.CSSProperties;
    };
  }
>;

export type ListCellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ListCellBaseProps
>;

type ListCellComponent = (<AsComponent extends React.ElementType = ListCellDefaultElement>(
  props: ListCellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ListCell: ListCellComponent = memo(
  forwardRef<React.ReactElement<ListCellBaseProps>, ListCellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        end: endProp,
        action,
        compact,
        title,
        description,
        detail,
        disabled,
        disableMultilineTitle = false,
        disableSelectionAccessory,
        helperText,
        media,
        multiline,
        selected,
        subdetail,
        variant,
        intermediary,
        priority,
        innerSpacing,
        outerSpacing,
        layoutSpacing = compact ? 'compact' : 'spacious',
        className,
        classNames,
        styles,
        style,
        ...props
      }: ListCellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? listCellDefaultElement) satisfies React.ElementType;

      const minHeight =
        layoutSpacing === 'compact'
          ? compactListHeight
          : layoutSpacing === 'spacious'
            ? listHeight
            : undefined;

      const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

      const end = useMemo(() => {
        if (endProp) {
          return <Box justifyContent="flex-end">{endProp}</Box>;
        }
        if (action) {
          return <Box justifyContent="flex-end">{action}</Box>;
        }
        if (detail || subdetail) {
          return (
            <CellDetail
              detail={detail}
              subdetail={subdetail}
              subdetailFont={layoutSpacing === 'hug' ? 'label2' : 'body'}
              variant={variant}
            />
          );
        }
        return undefined;
      }, [endProp, action, detail, subdetail, variant, layoutSpacing]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory type={accessoryType} />}
          as={Component}
          borderRadius={props.borderRadius ?? (layoutSpacing === 'hug' ? 0 : undefined)}
          bottomContent={helperText}
          className={cx(className, classNames?.root)}
          disabled={disabled}
          end={end}
          innerSpacing={innerSpacing ?? (layoutSpacing === 'hug' ? hugInnerSpacing : undefined)}
          intermediary={intermediary}
          media={media}
          minHeight={minHeight}
          outerSpacing={outerSpacing ?? (layoutSpacing === 'hug' ? hugOuterSpacing : undefined)}
          priority={priority}
          selected={selected}
          style={{ ...style, ...styles?.root }}
          styles={{
            media: styles?.media,
            intermediary: styles?.intermediary,
            end: styles?.end,
            accessory: styles?.accessory,
            topContent: styles?.mainContent,
            bottomContent: styles?.helperText,
            contentContainer: styles?.contentContainer,
            pressable: styles?.pressable,
          }}
          {...props}
        >
          <VStack>
            {!!title && (
              <Text
                as="div"
                display="block"
                font="headline"
                numberOfLines={
                  disableMultilineTitle
                    ? 1
                    : // wrap at 2 lines in hug layoutSpacing regardless of description
                      layoutSpacing === 'hug'
                      ? 2
                      : description
                        ? 1
                        : 2
                }
                overflow="wrap"
                style={styles?.title}
              >
                {title}
              </Text>
            )}

            {!!description && (
              <Text
                as="div"
                className={cx(multiline ? overflowCss : undefined, classNames?.description)}
                color="fgMuted"
                display="block"
                font={layoutSpacing === 'hug' ? 'label2' : 'body'}
                overflow={multiline ? undefined : 'truncate'}
                style={styles?.description}
              >
                {description}
              </Text>
            )}
          </VStack>
        </Cell>
      );
    },
  ),
);
