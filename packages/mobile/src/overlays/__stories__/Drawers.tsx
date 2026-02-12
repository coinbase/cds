import React, { useCallback, useState } from 'react';
import type { IconName } from '@coinbase/cds-common/types';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media/Avatar';
import { Text } from '../../typography/Text';
import type { DrawerBaseProps } from '../drawer/Drawer';
import { Drawer } from '../drawer/Drawer';

export const DefaultDrawer = ({
  pin = 'left',
  reduceMotion,
}: Pick<DrawerBaseProps, 'pin' | 'reduceMotion'>) => {
  const [isVisible, setIsVisible] = useState(true);
  const setIsVisibleOff = useCallback(() => setIsVisible(false), [setIsVisible]);
  const setIsVisibleOn = useCallback(() => setIsVisible(true), [setIsVisible]);
  return (
    <>
      <Button onPress={setIsVisibleOn}>Open</Button>
      {isVisible && (
        <Drawer onCloseComplete={setIsVisibleOff} pin={pin} reduceMotion={reduceMotion}>
          {({ handleClose }) => (
            <VStack padding={2}>
              <LoremIpsum />
              <Button onPress={handleClose} variant="secondary">
                Close Drawer
              </Button>
            </VStack>
          )}
        </Drawer>
      )}
    </>
  );
};

type NavOptionProps = {
  label: string;
  icon: IconName;
};

export const navOptions: NavOptionProps[] = [
  {
    label: 'Learn and earn',
    icon: 'blockchain',
  },
  {
    label: 'Borrow cash',
    icon: 'currencies',
  },
  {
    label: 'Earn up to 5% APY',
    icon: 'pay',
  },
  {
    label: 'Invite friends',
    icon: 'following',
  },
  {
    label: 'Send a gift',
    icon: 'giftCard',
  },
  {
    label: 'Get support',
    icon: 'protection',
  },
];

type SideDrawerContentProps = {
  handleClose: () => void;
};

export const SideDrawerContent = ({ handleClose }: SideDrawerContentProps) => {
  return (
    <VStack height="100%" justifyContent="space-between" padding={2} paddingBottom={4}>
      <VStack alignItems="center">
        <Avatar accessibilityLabel="CDS" size="xxl" />
        <VStack padding={2}>
          <Text font="title3">Test User</Text>
        </VStack>
        <Button block compact onPress={handleClose} variant="secondary">
          Profile & Settings
        </Button>
        <VStack paddingY={2}>
          {navOptions.map(({ label, icon }) => (
            <ListCell
              key={label}
              compact
              media={<Icon color="fg" name={icon} size="s" />}
              onPress={handleClose}
              title={label}
            />
          ))}
        </VStack>
      </VStack>
      <Button block compact onPress={handleClose} variant="secondary">
        Sign out
      </Button>
    </VStack>
  );
};

export const SideDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, setIsVisible] = useState(true);
  const setIsVisibleOff = useCallback(() => setIsVisible(false), [setIsVisible]);
  const setIsVisibleOn = useCallback(() => setIsVisible(true), [setIsVisible]);
  return (
    <>
      <Button onPress={setIsVisibleOn}>Open</Button>
      {isVisible && (
        <Drawer onCloseComplete={setIsVisibleOff} pin={pin}>
          {({ handleClose }) => <SideDrawerContent handleClose={handleClose} />}
        </Drawer>
      )}
    </>
  );
};
