import { useCallback, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons/Button';
import type { ListCellProps } from '../../cells';
import { ListCell } from '../../cells';
import { CellMedia } from '../../cells/CellMedia';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SectionHeader } from '../../section-header/SectionHeader';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import type { TrayBaseProps } from '../tray/Tray';
import { Tray } from '../tray/Tray';

type Option = {
  title: string;
  detail: string;
  media: string;
  selected: boolean;
};

const defaultOptions: Option[] = [
  {
    title: 'Ethereum',
    detail: '$0.00',
    media: assets.eth.imageUrl,
    selected: false,
  },
  {
    title: 'Title',
    detail: '$0.00',
    media: assets.polygon.imageUrl,
    selected: true,
  },
];

const exampleOptions: ListCellProps[] = Array.from({ length: 10 }).map((_, idx) => ({
  title: `Title ${idx + 1}`,
  description: 'Description',
  detail: 'Detail',
  subdetail: 'SubDetail',
  selected: false,
}));

export const Default = (props: Partial<TrayBaseProps>) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const [items, setItems] = useState<Option[]>(defaultOptions);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = useCallback((index: number) => {
    setItems((prev) => {
      const newItems = prev.map((item, i) => {
        if (i === index) {
          return { ...item, selected: !item.selected };
        }
        return { ...item, selected: false };
      });
      return newItems;
    });
    trayRef.current?.handleClose();
  }, []);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  const description = (
    <Text font="body">
      <Text color="fgMuted" font="body">
        Select the network you want your swapped asset to be stored on.{' '}
      </Text>
      <Link font="body" to="https://www.coinbase.com/">
        Learn more
      </Link>
    </Text>
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={setIsTrayVisibleToFalse}
          onVisibilityChange={handleTrayVisibilityChange}
          title={<SectionHeader description={description} paddingX={3} title="Change network" />}
          {...props}
        >
          {items?.map(({ media, ...item }, index) => (
            <ListCell
              key={item.title}
              media={<CellMedia source={media} type="avatar" />}
              onPress={() => handleOptionPress(index)}
              {...item}
            />
          ))}
        </Tray>
      )}
    </>
  );
};

export const WithStickyFooter = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const trayRef = useRef<DrawerRefBaseProps>(null);
  const [items, setItems] = useState<ListCellProps[]>(exampleOptions);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  const handleOptionPress = useCallback((index: number) => {
    setItems((prev) => {
      const newItems = prev.map((item, i) => {
        if (i === index) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
      return newItems;
    });
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: ListCellProps }) => {
      return <ListCell onPress={() => handleOptionPress(index)} {...item} />;
    },
    [handleOptionPress],
  );

  const handleKeyExtractor = useCallback((item: ListCellProps) => item.title as string, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableCapturePanGestureToDismiss
          footer={({ handleClose }) => (
            <StickyFooter paddingX={3}>
              <Button block onPress={handleClose}>
                Button
              </Button>
            </StickyFooter>
          )}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={setIsTrayVisibleToFalse}
          onVisibilityChange={handleTrayVisibilityChange}
          title={<SectionHeader paddingX={3} title="Section header" />}
        >
          <FlatList data={items} keyExtractor={handleKeyExtractor} renderItem={renderItem} />
        </Tray>
      )}
    </>
  );
};

const NonDismissable = () => {
  return <Default hideHandleBar preventDismissGestures preventHardwareBackBehaviorAndroid />;
};

export const ActionTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Action Tray">
        <Default />
      </Example>
      <Example title="With Sticky Footer">
        <WithStickyFooter />
      </Example>
      <Example title="Non-dismissable">
        <NonDismissable />
      </Example>
    </ExampleScreen>
  );
};

export default ActionTrayScreen;
