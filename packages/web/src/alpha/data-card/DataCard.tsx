import { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';

import { CardRoot, type CardRootBaseProps } from '../../cards/CardRoot';
import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';

import { DataCardLayout, type DataCardLayoutProps } from './DataCardLayout';

export type DataCardBaseProps = Polymorphic.ExtendableProps<
  Omit<CardRootBaseProps, 'children'>,
  DataCardLayoutProps & {
    classNames?: {
      root?: string;
    };
    styles?: {
      root?: React.CSSProperties;
    };
  }
>;

export type DataCardProps<AsComponent extends React.ElementType = 'article'> = Polymorphic.Props<
  AsComponent,
  DataCardBaseProps
>;

type DataCardComponent = (<AsComponent extends React.ElementType = 'article'>(
  props: DataCardProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const dataCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  flexDirection: 'row' as const,
  background: 'bgAlternate' as ThemeVars.Color,
  overflow: 'hidden' as const,
};

export const DataCard: DataCardComponent = memo(
  forwardRef<React.ReactElement<DataCardBaseProps>, DataCardBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        title,
        subtitle,
        titleAccessory,
        thumbnail,
        visualization,
        layout,
        slotProps,
        as,
        children,
        className,
        style,
        classNames: { root: rootClassName, ...layoutClassNames } = {},
        styles: { root: rootStyle, ...layoutStyles } = {},
        ...props
      }: DataCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => (
      <CardRoot
        ref={ref}
        as={as as React.ElementType}
        className={cx(rootClassName, className)}
        style={{ ...rootStyle, ...style }}
        {...dataCardContainerProps}
        {...props}
      >
        <DataCardLayout
          classNames={layoutClassNames}
          layout={layout}
          styles={layoutStyles}
          subtitle={subtitle}
          thumbnail={thumbnail}
          title={title}
          titleAccessory={titleAccessory}
        >
          {children}
        </DataCardLayout>
      </CardRoot>
    ),
  ),
);
