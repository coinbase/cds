import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { DotSymbol } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tray } from '../../overlays/tray/Tray';
import { InputIcon } from '../InputIcon';
import { Select, type SelectProps } from '../Select';
import { SelectOption } from '../SelectOption';
import { TextInput } from '../TextInput';

type AssetKey = keyof typeof assets;
const assetKeys = Object.keys(assets) as AssetKey[];
const exampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
const exampleLongOptions = [
  'This is a very long text. This is a very long text. This is a very long text. ',
  'This is a long text. This is a very long text. This is a very long text. ',
  'This is a text. This is a very long text. This is a very long text. ',
];

const DefaultSelect = ({ trayTitle, hasDescription, hideHandleBar, ...props }: any) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [selectedValue, setValue] = useState<string | undefined>();

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  return (
    <Select onChange={setValue} onPress={openTray} value={selectedValue} {...props}>
      {isTrayVisible && (
        <Tray
          hideHandleBar={hideHandleBar}
          onCloseComplete={closeTray}
          testID="select-input-tray"
          title={trayTitle}
        >
          {({ handleClose }) =>
            exampleOptions.map((option) => (
              <SelectOption
                key={option}
                description={hasDescription ? 'Description' : undefined}
                onPress={handleClose}
                title={option}
                value={option}
              />
            ))
          }
        </Tray>
      )}
    </Select>
  );
};

const LongTextSelect = ({ trayTitle, hasDescription, hideHandleBar, ...props }: any) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [selectedValue, setValue] = useState<string | undefined>(exampleLongOptions[0]);

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  return (
    <Select onChange={setValue} onPress={openTray} value={selectedValue} {...props}>
      {isTrayVisible && (
        <Tray
          hideHandleBar={hideHandleBar}
          onCloseComplete={closeTray}
          testID="select-input-tray"
          title={trayTitle}
        >
          {({ handleClose }) =>
            exampleLongOptions.map((option) => (
              <SelectOption
                key={option}
                description={hasDescription ? 'Description' : undefined}
                onPress={handleClose}
                title={option}
                value={option}
              />
            ))
          }
        </Tray>
      )}
    </Select>
  );
};

const AssetSelect = (props: SelectProps) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [asset, setAsset] = useState<string | undefined>('btc');

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  const assetConfig = assets[(asset as AssetKey) ?? 'btc'];
  const ethLogo = assets.eth.imageUrl;

  return (
    <Select
      label="Select Asset"
      onChange={setAsset}
      onPress={openTray}
      startNode={
        <Box paddingX={2}>
          <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
            <RemoteImage shape="circle" size="l" source={assetConfig.imageUrl} />
          </DotSymbol>
        </Box>
      }
      value={asset}
      valueLabel={assetConfig.name}
      {...props}
    >
      {isTrayVisible && (
        <Tray onCloseComplete={closeTray}>
          {({ handleClose }) =>
            Object.values(assets).map(({ name, imageUrl }, idx) => (
              <SelectOption
                key={name}
                description="BTC"
                media={
                  <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
                    <RemoteImage shape="circle" size="l" source={imageUrl} />
                  </DotSymbol>
                }
                onPress={handleClose}
                testID={`option-${name}`}
                title={name}
                value={assetKeys[idx]}
              />
            ))
          }
        </Tray>
      )}
    </Select>
  );
};

const ScrollableSelect = ({ trayTitle, hasDescription, ...props }: any) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [selectedValue, setValue] = useState<string | undefined>(exampleOptions[2]);

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  return (
    <Select onChange={setValue} onPress={openTray} value={selectedValue} {...props}>
      {isTrayVisible && (
        <Tray disableCapturePanGestureToDismiss onCloseComplete={closeTray} title={trayTitle}>
          {({ handleClose }) => (
            <ScrollView>
              {exampleOptions.map((option) => (
                <SelectOption
                  key={option}
                  description={hasDescription ? 'Description' : undefined}
                  onPress={handleClose}
                  title={option}
                  value={option}
                />
              ))}
            </ScrollView>
          )}
        </Tray>
      )}
    </Select>
  );
};

const SelectFilter = () => {
  const [year, setYear] = useState<string | undefined>();
  const [asset, setAsset] = useState<string | undefined>();

  const [yearTrayVisible, setYearTrayVisible] = useState(false);
  const [assetTrayVisible, setAssetTrayVisible] = useState(false);

  const toggleYearTray = useCallback(() => setYearTrayVisible((prev) => !prev), []);
  const closeYearTray = useCallback(() => setYearTrayVisible(false), []);

  const toggleAssetTray = useCallback(() => setAssetTrayVisible((prev) => !prev), []);
  const closeAssetTray = useCallback(() => setAssetTrayVisible(false), []);

  const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];

  return (
    <HStack gap={1} width="100%">
      <Select
        onChange={setYear}
        onPress={toggleYearTray}
        placeholder="All years"
        value={year}
        width="48%"
      >
        {yearTrayVisible && (
          <Tray onCloseComplete={closeYearTray}>
            {({ handleClose }) =>
              years.map((option) => (
                <SelectOption key={option} onPress={handleClose} title={option} value={option} />
              ))
            }
          </Tray>
        )}
      </Select>
      <Select
        onChange={setAsset}
        onPress={toggleAssetTray}
        placeholder="All assets"
        value={asset}
        width="48%"
      >
        {assetTrayVisible && (
          <Tray onCloseComplete={closeAssetTray}>
            {({ handleClose }) =>
              Object.values(assets).map(({ name: option }) => (
                <SelectOption key={option} onPress={handleClose} title={option} value={option} />
              ))
            }
          </Tray>
        )}
      </Select>
    </HStack>
  );
};

const SelectForm = () => {
  const accountTypeOptions = ['Savings Account', 'Checking Account'];

  const [accountType, setAccountType] = useState<string | undefined>(accountTypeOptions[0]);
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => setVisible((prev) => !prev), []);
  const closeVisible = useCallback(() => setVisible(false), []);

  return (
    <VStack background="bg" gap={2} minHeight={400}>
      <TextInput editable={__DEV__} label="Account number" />
      <TextInput editable={__DEV__} label="Re-enter account number" />
      <Select
        accessibilityHint="Enter account number"
        accessibilityLabel="Account number"
        onChange={setAccountType}
        onPress={toggleVisible}
        value={accountType}
      >
        {visible && (
          <Tray onCloseComplete={closeVisible}>
            {({ handleClose }) =>
              accountTypeOptions.map((option) => (
                <SelectOption key={option} onPress={handleClose} title={option} value={option} />
              ))
            }
          </Tray>
        )}
      </Select>
    </VStack>
  );
};

const LabelVariants = () => {
  return (
    <VStack gap={2}>
      <DefaultSelect label="Outside Label No Placeholder" />
      <DefaultSelect label="Outside Label" placeholder="Select from list" />
      <DefaultSelect label="Inside Label No Placeholder" labelVariant="inside" />
      <DefaultSelect label="Inside Label" labelVariant="inside" placeholder="Select from list" />
      <DefaultSelect
        label="Inside Label with Start Node"
        labelVariant="inside"
        placeholder="Search and select"
        startNode={<InputIcon name="search" />}
      />
      <DefaultSelect
        label="Inside Label with Secondary Variant"
        labelVariant="inside"
        variant="secondary"
      />
    </VStack>
  );
};

const SelectScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default with Tray">
        <DefaultSelect placeholder="Select an option... " />
      </Example>
      <Example title="Long Text Select with Tray">
        <LongTextSelect placeholder="Select an option... " />
      </Example>
      <Example title="Asset Select with Tray">
        <AssetSelect />
      </Example>
      <Example title="Scrollable Tray">
        <ScrollableSelect hasDescription placeholder="Select an option... " />
      </Example>
      <Example title="Label and Helper Text">
        <DefaultSelect
          helperText="You may choose only one option"
          label="What do you want? "
          placeholder="Select an option... "
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelect compact compactSelectOption hasDescription label="Amt. to deposit" />
      </Example>
      <Example title="Start Node">
        <DefaultSelect
          accessibilityHint="Select cash amount"
          accessibilityLabel="USD Cash"
          startNode={<InputIcon name="cashUSD" />}
        />
      </Example>
      <Example title="Start Node with Compact Label">
        <DefaultSelect
          compact
          label="How much would you like to deposit? "
          startNode={<InputIcon name="cashUSD" />}
        />
      </Example>
      <Example title="Disabled">
        <DefaultSelect
          disabled
          helperText="I am helpful"
          label="I am a label"
          placeholder="This is a really long placeholder that will overflow and be truncated"
        />
      </Example>
      <Example title="Negative without HandleBar">
        <DefaultSelect
          hideHandleBar
          helperText="Wow this is really broken. Good luck! "
          label="I am a label"
          placeholder="Someone needs to fix this"
          variant="negative"
        />
      </Example>
      <Example title="Positive">
        <DefaultSelect
          label="What do you want?"
          placeholder="Some positive feedback"
          variant="positive"
        />
      </Example>
      <Example title="Foreground Muted">
        <DefaultSelect
          helperText="Helpful muted text"
          label="Muted helpful"
          placeholder="Select a muted option"
          variant="foregroundMuted"
        />
      </Example>
      <Example title="Secondary">
        <DefaultSelect
          helperText="Helpful secondary text"
          label="Secondary helpful"
          placeholder="Select a secondary option"
          variant="secondary"
        />
      </Example>
      <Example title="Select Filters">
        <SelectFilter />
      </Example>
      <Example title="Select in a Form">
        <SelectForm />
      </Example>
      <Example title="Label Variants">
        <LabelVariants />
      </Example>
    </ExampleScreen>
  );
};

export default SelectScreen;
