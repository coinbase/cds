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

export const condensedInnerSpacing = {
  paddingX: 3,
  paddingY: 1,
  marginX: 0,
} as const satisfies CellSpacing;
// no padding outside of the pressable area
export const condensedOuterSpacing = {
  paddingX: 0,
  paddingY: 0,
  marginX: 0,
} as const satisfies CellSpacing;

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
     * @deprecated Use `spacingVariant="compact"` instead. `compact` will be removed in a future major release.
     */
    compact?: boolean;
    /**
     * Spacing variant configuration.
     * Deprecated value: 'compact'. Prefer 'condensed'.
     *
     * When `spacingVariant="normal"`:
     * 1. `min-height` is `80px`
     * 2. `padding` is `'var(--space-2) var(--space-3)'`
     * 3. `border-radius` is `'var(--borderRadius-200)'`
     * 4. when there is a description, title's `numberOfLines={1}` otherwise title's `numberOfLines={2}`
     * 5. description and subdetail have font `body`
     *
     * When `spacingVariant="compact"`:
     * 1. same as `spacingVariant="normal"`, except `min-height` is `40px`
     *
     * When `spacingVariant="condensed"`:
     * 1. `min-height` is undefined
     * 2. `padding` is `'var(--space-1) var(--space-2)'`
     * 3. `border-radius` is `--borderRadius-0`
     * 4. title's `numberOfLines={2}`
     * 5. description and subdetail have font `label2`
     *
     * @default 'normal'
     */
    spacingVariant?: 'normal' | 'compact' | 'condensed';
    /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. This prop is only intended to accept a string or Text component; other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `descriptionNode`. */
    description?: React.ReactNode;
    /** React node to render description. Takes precedence over `description`. */
    descriptionNode?: React.ReactNode;
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
    /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. This prop is only intended to accept a string or Text component; other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `titleNode`. */
    title?: React.ReactNode;
    /** React node to render title. Takes precedence over `title`. */
    titleNode?: React.ReactNode;
    /** Class names for the components */
    classNames?: {
      root?: string;
      media?: string;
      intermediary?: string;
      end?: string;
      accessory?: string;
      contentContainer?: string;
      pressable?: string;
      mainContent?: string;
      helperText?: string;
      title?: string;
      description?: string;
    };
    /** Styles for the components */
    styles?: {
      root?: React.CSSProperties;
      media?: React.CSSProperties;
      intermediary?: React.CSSProperties;
      end?: React.CSSProperties;
      accessory?: React.CSSProperties;
      contentContainer?: React.CSSProperties;
      pressable?: React.CSSProperties;
      mainContent?: React.CSSProperties;
      helperText?: React.CSSProperties;
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
        accessoryNode,
        end: endProp,
        action,
        compact,
        title,
        titleNode,
        description,
        descriptionNode,
        detailNode,
        detail,
        disabled,
        disableMultilineTitle = false,
        disableSelectionAccessory,
        helperText,
        media,
        multiline,
        selected,
        subdetailNode,
        subdetail,
        variant,
        intermediary,
        priority,
        innerSpacing,
        outerSpacing,
        spacingVariant = compact ? 'compact' : 'normal',
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
        spacingVariant === 'compact'
          ? compactListHeight
          : spacingVariant === 'normal'
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
        if (detail || subdetail || detailNode || subdetailNode) {
          return (
            <CellDetail
              detail={detail}
              detailNode={detailNode}
              subdetail={subdetail}
              subdetailFont={spacingVariant === 'condensed' ? 'label2' : 'body'}
              subdetailNode={subdetailNode}
              variant={variant}
            />
          );
        }
        return undefined;
      }, [endProp, action, detail, detailNode, subdetail, subdetailNode, variant, spacingVariant]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory type={accessoryType} />}
          accessoryNode={accessoryNode}
          as={Component}
          borderRadius={props.borderRadius ?? (spacingVariant === 'condensed' ? 0 : undefined)}
          bottomContent={helperText}
          className={cx(className, classNames?.root)}
          disabled={disabled}
          end={end}
          innerSpacing={
            innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
          }
          intermediary={intermediary}
          media={media}
          minHeight={minHeight}
          outerSpacing={
            outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
          }
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
            {titleNode ? (
              titleNode
            ) : title ? (
              <Text
                as="div"
                display="block"
                font="headline"
                numberOfLines={
                  disableMultilineTitle
                    ? 1
                    : // wrap at 2 lines in condensed spacingVariant regardless of description
                      spacingVariant === 'condensed'
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
            ) : null}

            {descriptionNode ? (
              descriptionNode
            ) : description ? (
              <Text
                as="div"
                className={cx(multiline ? overflowCss : undefined, classNames?.description)}
                color="fgMuted"
                display="block"
                font={spacingVariant === 'condensed' ? 'label2' : 'body'}
                overflow={multiline ? undefined : 'truncate'}
                style={styles?.description}
              >
                {description}
              </Text>
            ) : null}
          </VStack>
        </Cell>
      );
    },
  ),
);
