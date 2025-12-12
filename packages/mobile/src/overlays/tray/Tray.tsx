import React, {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWindowDimensions } from 'react-native';
import type { ReactNode } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { MAX_OVER_DRAG } from '@coinbase/cds-common/animation/drawer';
import { verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView } from '@coinbase/cds-common/tokens/drawer';

import { Box, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Drawer, type DrawerBaseProps, type DrawerRefBaseProps } from '../drawer/Drawer';

export type TrayRenderChildren = React.FC<{ handleClose: () => void }>;

export type TrayBaseProps = Omit<DrawerBaseProps, 'pin' | 'children'> & {
  children: React.ReactNode | TrayRenderChildren;
  /** ReactNode to render as the Tray header */
  header?: React.ReactNode;
  /** ReactNode to render as the Tray footer */
  footer?: React.ReactNode;
  /**
   * Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
   * If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
   * multiselect was toggled into or out of view
   */
  onVisibilityChange?: (context: 'visible' | 'hidden') => void;
  /** Text or ReactNode for optional Tray title */
  title?: React.ReactNode;
};

export type TrayProps = TrayBaseProps;

export const TrayContext = createContext<{
  verticalDrawerPercentageOfView: number;
  titleHeight: number;
}>({
  verticalDrawerPercentageOfView: defaultVerticalDrawerPercentageOfView,
  titleHeight: 0,
});

export const Tray = memo(
  forwardRef<DrawerRefBaseProps, TrayProps>(function Tray(
    {
      children,
      header,
      footer,
      title,
      onVisibilityChange,
      verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
      ...props
    },
    ref,
  ) {
    const [titleHeight, setTitleHeight] = useState(0);

    const onTitleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (!title) return;
        setTitleHeight(event.nativeEvent.layout.height);
      },
      [title],
    );

    const renderChildren: TrayRenderChildren = useCallback(
      ({ handleClose }) => {
        const content = typeof children === 'function' ? children({ handleClose }) : children;

        return (
          <VStack flexGrow={1} flexShrink={1} minHeight={0} paddingTop={title ? 0 : 2}>
            {title &&
              (typeof title === 'string' ? (
                <HStack
                  alignItems="center"
                  onLayout={onTitleLayout}
                  paddingBottom={2}
                  paddingTop={3}
                  paddingX={3}
                >
                  <Text font="title3">{title}</Text>
                </HStack>
              ) : (
                <Box onLayout={onTitleLayout}>{title}</Box>
              ))}
            {header}
            <Box flexGrow={1} flexShrink={1} minHeight={0} width="100%">
              {content}
            </Box>
            {footer}
          </VStack>
        );
      },
      [children, footer, header, onTitleLayout, title],
    );

    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => {
        onVisibilityChange?.('hidden');
      };
    }, [onVisibilityChange]);

    const trayContextValue = useMemo(
      () => ({ verticalDrawerPercentageOfView, titleHeight }),
      [verticalDrawerPercentageOfView, titleHeight],
    );

    return (
      <TrayContext.Provider value={trayContextValue}>
        <Drawer
          pin="bottom"
          verticalDrawerPercentageOfView={trayContextValue.verticalDrawerPercentageOfView}
          {...props}
          ref={ref}
        >
          {renderChildren}
        </Drawer>
      </TrayContext.Provider>
    );
  }),
);

export const TrayStickyFooter = ({ children }: { children: ReactNode }) => {
  const { verticalDrawerPercentageOfView, titleHeight } = useContext(TrayContext);
  const { height } = useWindowDimensions();
  const verticalDrawerMaxHeight = useMemo(
    () => (height - titleHeight) * verticalDrawerPercentageOfView - MAX_OVER_DRAG,
    [height, titleHeight, verticalDrawerPercentageOfView],
  );
  return <VStack maxHeight={verticalDrawerMaxHeight}>{children}</VStack>;
};
