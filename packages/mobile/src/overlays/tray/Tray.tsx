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
import type { LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ElevationLevels } from '@coinbase/cds-common';
import { MAX_OVER_DRAG } from '@coinbase/cds-common/animation/drawer';
import { verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView } from '@coinbase/cds-common/tokens/drawer';

import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import {
  Drawer,
  type DrawerBaseProps,
  type DrawerProps,
  type DrawerRefBaseProps,
} from '../drawer/Drawer';

export type TrayRenderChildren = React.FC<{ handleClose: () => void }>;

export type TrayBaseProps = Omit<DrawerBaseProps, 'pin' | 'children'> & {
  /** Component to render as the Tray content */
  children?: React.ReactNode | TrayRenderChildren;
  /** Component to render as the Tray header */
  header?: React.ReactNode | TrayRenderChildren;
  /**
   * Elevation level for the header area (includes title and header content).
   * Use this to add a drop shadow below the header when content is scrolled.
   */
  headerElevation?: ElevationLevels;
  /** Component to render as the Tray footer */
  footer?: React.ReactNode | TrayRenderChildren;
  /**
   * Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
   * If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
   * multiselect was toggled into or out of view
   */
  onVisibilityChange?: (context: 'visible' | 'hidden') => void;
  /** Text or ReactNode for optional Tray title */
  title?: React.ReactNode;
};

export type TrayProps = TrayBaseProps &
  Omit<DrawerProps, 'pin' | 'children'> & {
    pin?: DrawerProps['pin'];
    styles?: DrawerProps['styles'] & {
      /** Styles for the content area */
      content?: StyleProp<ViewStyle>;
      /** Styles for the header section */
      header?: StyleProp<ViewStyle>;
      /** Styles for the title text */
      title?: StyleProp<TextStyle>;
    };
  };

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
      title,
      header,
      headerElevation,
      footer,
      onVisibilityChange,
      handleBarVariant = 'outside',
      verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
      styles,
      ...props
    },
    ref,
  ) {
    const [titleHeight, setTitleHeight] = useState(0);
    const isInsideHandleBar = handleBarVariant === 'inside';

    const { contentStyle, headerStyle, titleStyle, drawerStyles } = useMemo(() => {
      const {
        content: contentStyle,
        header: headerStyle,
        title: titleStyle,
        ...drawerStyles
      } = styles ?? {};
      return { contentStyle, headerStyle, titleStyle, drawerStyles };
    }, [styles]);

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
        const headerContent = typeof header === 'function' ? header({ handleClose }) : header;
        const footerContent = typeof footer === 'function' ? footer({ handleClose }) : footer;

        return (
          <VStack
            flexGrow={1}
            flexShrink={1}
            minHeight={0}
            paddingTop={title ? 0 : 2}
            style={contentStyle}
          >
            {(title || headerContent) && (
              <Box elevation={headerElevation} style={headerStyle}>
                {title && (
                  <Box
                    justifyContent="center"
                    onLayout={onTitleLayout}
                    paddingBottom={isInsideHandleBar ? 0.75 : 2}
                    paddingTop={isInsideHandleBar ? 0 : 3}
                    paddingX={3}
                  >
                    {typeof title === 'string' ? (
                      <Text font="title3" style={titleStyle}>
                        {title}
                      </Text>
                    ) : (
                      title
                    )}
                  </Box>
                )}
                {headerContent}
              </Box>
            )}
            <Box flexGrow={1} flexShrink={1} minHeight={0} width="100%">
              {content}
            </Box>
            {footerContent}
          </VStack>
        );
      },
      [
        title,
        contentStyle,
        onTitleLayout,
        isInsideHandleBar,
        headerElevation,
        headerStyle,
        titleStyle,
        header,
        children,
        footer,
      ],
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
          ref={ref}
          handleBarVariant={handleBarVariant}
          styles={drawerStyles}
          verticalDrawerPercentageOfView={trayContextValue.verticalDrawerPercentageOfView}
          {...props}
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
