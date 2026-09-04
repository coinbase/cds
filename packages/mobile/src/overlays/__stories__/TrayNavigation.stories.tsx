import React, { useCallback, useRef, useState } from 'react';
import { navigationOptions } from '@coinbase/cds-common/internal/data/navigation';
import type { IllustrationPictogramNames } from '@coinbase/cds-common/types';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack } from '../../layout';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

const NavigationTray = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);
  const handleAppSwitcherPress = useCallback(() => {
    setIsTrayVisible(true);
  }, []);

  return (
    <>
      <Button onPress={handleAppSwitcherPress}>Open</Button>
      <HStack gap={2} justifyContent="flex-end" minHeight={200}>
        <IconButton name="hamburger" onPress={handleAppSwitcherPress} />
        <IconButton active name="profile" onPress={NoopFn} />
      </HStack>
      {isTrayVisible && (
        <Tray ref={trayRef} onCloseComplete={setIsTrayVisibleToFalse}>
          <Menu onChange={setValue} value={value}>
            {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
              <SelectOption
                key={optionValue}
                description={description}
                media={
                  <Pictogram dimension="48x48" name={mediaName as IllustrationPictogramNames} />
                }
                onPress={handleOptionPress}
                title={name}
                value={optionValue}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

export const TrayNavigationScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Navigation with Tray">
        <NavigationTray />
      </Example>
    </ExampleScreen>
  );
};

export default TrayNavigationScreen;
