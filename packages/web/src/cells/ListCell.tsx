import React, { forwardRef, memo, useMemo } from 'react';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

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

const denseInnerSpacing = {
  paddingX: 2 as const,
  paddingY: 0.5 as const,
  marginX: 0 as const,
} satisfies CellSpacing;
// no padding outside of the pressable area
const denseOuterSpacing = {
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
    /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
    action?: React.ReactNode;
    /**
     * @deprecated Use `layoutDensity="compact"` instead. This prop is kept for backward
     * compatibility and will be removed in a future major release.
     */
    compact?: boolean;
    /**
     * When 'dense' is set, the cell will have the following behavior:
     * 1. No min-height, height is determined by the content
     * 2. smaller padding, no extra padding around the pressable area
     * 3. 0 border radius for pressable shade
     * 4. Title always cap at 2 lines
     * 5. Description and subdetail have smaller font
     */
    layoutDensity?: 'sparse' | 'compact' | 'dense';
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
      'root' | 'media' | 'intermediary' | 'accessory' | 'contentContainer' | 'pressable'
    > & {
      /** Applied to the container of detail or action */
      end?: CellClassNames['detail'];
      mainContent?: CellClassNames['topContent'];
      helperText?: CellClassNames['bottomContent'];
      title?: string;
      description?: string;
    };
    /** Styles for the components */
    styles?: Pick<
      CellStyles,
      'root' | 'media' | 'intermediary' | 'accessory' | 'contentContainer' | 'pressable'
    > & {
      /** Applied to the container of detail or action */
      end?: CellStyles['detail'];
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
        layoutDensity = compact ? 'compact' : 'sparse',
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
        layoutDensity === 'compact'
          ? compactListHeight
          : layoutDensity === 'sparse'
            ? listHeight
            : undefined;

      const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

      const end = useMemo(() => {
        if (action) {
          return <Box justifyContent="flex-end">{action}</Box>;
        }
        if (detail || subdetail) {
          return <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
        }
        return undefined;
      }, [action, detail, subdetail, variant]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory type={accessoryType} />}
          as={Component}
          borderRadius={props.borderRadius ?? (layoutDensity === 'dense' ? 0 : undefined)}
          bottomContent={helperText}
          className={cx(className, classNames?.root)}
          detail={end}
          disabled={disabled}
          innerSpacing={innerSpacing ?? (layoutDensity === 'dense' ? denseInnerSpacing : undefined)}
          intermediary={intermediary}
          media={media}
          minHeight={minHeight}
          outerSpacing={outerSpacing ?? (layoutDensity === 'dense' ? denseOuterSpacing : undefined)}
          priority={priority}
          selected={selected}
          style={{ ...style, ...styles?.root }}
          styles={{
            media: styles?.media,
            intermediary: styles?.intermediary,
            detail: styles?.end,
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
                // TODO: confirm with design if making it always 2 lines as the new approach is intentional
                numberOfLines={description || disableMultilineTitle ? 1 : 2}
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
                font={layoutDensity === 'dense' ? 'label2' : 'body'}
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
