import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { prices } from '@coinbase/cds-common/internal/data/prices';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Fallback, VStack } from '../../layout';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

export const options: string[] = prices.slice(0, 4);

const lotsOfOptions: string[] = prices.slice(0, 30);

export const DefaultTray = ({ title }: { title?: React.ReactNode }) => {
  const [isTrayVisible, setIsTrayVisible] = useState(true);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          title={title}
        >
          <Menu onChange={setValue} value={value}>
            {options.map((option: string) => (
              <SelectOption
                key={option}
                description="BTC"
                onPress={handleOptionPress}
                title={option}
                value={option}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

const TrayFallbackContent = () => {
  return (
    <VStack gap={2} paddingStart={3}>
      {lotsOfOptions.map((item, i) => (
        <Fallback key={item} height={30} rectWidthVariant={i} width={100} />
      ))}
    </VStack>
  );
};

export const ScrollableTray = ({
  title,
  fallbackEnabled,
  verticalDrawerPercentageOfView,
}: {
  title?: React.ReactNode;
  fallbackEnabled?: boolean;
  verticalDrawerPercentageOfView?: number;
}) => {
  const [isTrayVisible, setIsTrayVisible] = useState(true);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);
  const [isLoading, setIsLoading] = useState(fallbackEnabled);

  useEffect(() => {
    if (isTrayVisible && fallbackEnabled) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), __DEV__ ? 2000 : 20000);
    }
  }, [isTrayVisible, fallbackEnabled]);

  const spacingStyles = useMemo(
    () => ({
      paddingBottom: 200,
    }),
    [],
  );

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: string }) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleOptionPress}
          title={item}
          value={item}
        />
      );
    },
    [handleOptionPress],
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableCapturePanGestureToDismiss
          disableSafeAreaPaddingBottom
          onCloseComplete={setIsTrayVisibleOff}
          title={title}
          verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
        >
          {isLoading ? (
            <TrayFallbackContent />
          ) : (
            <Menu onChange={setValue} value={value}>
              <FlatList
                contentContainerStyle={spacingStyles}
                data={lotsOfOptions}
                renderItem={renderItem}
              />
            </Menu>
          )}
        </Tray>
      )}
    </>
  );
};
