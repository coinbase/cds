import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button, IconButton } from '../../buttons';
import { SelectOption } from '../../controls/SelectOption';
import { DotCount } from '../../dots/DotCount';
import { useA11yControlledVisibility } from '../../hooks/useA11yControlledVisibility';
import { Icon } from '../../icons/Icon';
import { HStack } from '../../layout';
import { type PopoverContentPositionConfig } from '../../overlays/popover/PopoverProps';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { Dropdown } from '../Dropdown';
import type { DropdownProps, DropdownRef } from '../DropdownProps';
import { MenuItem } from '../MenuItem';

export default {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
};

const defaultOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
];

type MockDropdownProps = {
  subjectTestID?: string;
  options?: string[];
  containerHeight?: number | string;
  customAriaControlsID?: string;
} & Pick<
  DropdownProps,
  | 'enableMobileModal'
  | 'showOverlay'
  | 'testID'
  | 'onBlur'
  | 'onCloseMenu'
  | 'disablePortal'
  | 'disabled'
  | 'value'
  | 'maxHeight'
  | 'enableMobileModal'
>;

export const Default = ({
  options = defaultOptions,
  containerHeight,
  disabled,
  subjectTestID,
  customAriaControlsID,
  enableMobileModal,
  ...props
}: MockDropdownProps) => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRef>(null);
  const [visible, setVisible] = useState(false);
  const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
    useA11yControlledVisibility(visible, {
      accessibilityLabel: 'Default Dropdown',
      hasPopupType: 'menu',
    });

  // Passing static value to aria-controls for testing dropdown interactive story
  if (customAriaControlsID) {
    triggerAccessibilityProps['aria-controls'] = customAriaControlsID;
    controlledElementAccessibilityProps.id = customAriaControlsID;
  }

  const handleCloseMenu = useCallback(() => {
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);

  const content = (
    <>
      <HStack paddingX={2} paddingY={2} role="separator">
        <Text as="h2" color="fgMuted" display="block" font="caption">
          Section Heading
        </Text>
      </HStack>
      {options.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
    </>
  );

  const handleButtonPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);

  return (
    <HStack gap={3} height={containerHeight} padding={4}>
      <Dropdown
        ref={dropdownRef}
        content={content}
        controlledElementAccessibilityProps={controlledElementAccessibilityProps}
        disabled={disabled}
        enableMobileModal={enableMobileModal}
        onChange={setValue}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={handleOpenMenu}
        value={value}
        {...props}
      >
        <IconButton
          transparent
          accessibilityLabel="More"
          disabled={disabled}
          name="more"
          testID={subjectTestID}
          variant="secondary"
          {...triggerAccessibilityProps}
        />
      </Dropdown>
      <Button onClick={handleButtonPress} {...triggerAccessibilityProps}>
        Open Menu
      </Button>
    </HStack>
  );
};

const BaseWrapped = ({ enableMobileModal }: { enableMobileModal?: boolean }) => {
  const [value, setValue] = useState('');

  const content = (
    <>
      <HStack padding={2}>
        <Text as="h2" color="fgMuted" display="block" font="caption">
          Section Heading
        </Text>
      </HStack>
      {defaultOptions.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
    </>
  );

  return (
    <HStack padding={4}>
      <Dropdown
        content={content}
        enableMobileModal={enableMobileModal}
        onChange={setValue}
        value={value}
      >
        <DotCount count={4} pin="top-end">
          <IconButton transparent accessibilityLabel="More" name="more" variant="secondary" />
        </DotCount>
      </Dropdown>
    </HStack>
  );
};

export const Wrapped = () => <BaseWrapped />;

export const WrappedMobileModal = () => <BaseWrapped enableMobileModal />;

const subMenuPosition: PopoverContentPositionConfig = {
  gap: 1,
  placement: 'right-start',
};

export const SubMenu = () => {
  const [menuValue, setMenuValue] = useState<string>();
  const [subMenuValue, setSubMenuValue] = useState<string>();
  const menuRef = useRef<DropdownRef>(null);

  const handleMenuValueChange = useCallback((newValue: string) => {
    setMenuValue(newValue);
    setSubMenuValue(undefined);
  }, []);

  const handleSubMenuValueChange = useCallback((newValue: string) => {
    setSubMenuValue(newValue);
    setMenuValue(undefined);
  }, []);

  const subMenuContent = useMemo(
    () => (
      <>
        {defaultOptions.slice(2, 6).map((option) => (
          <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
        ))}
      </>
    ),
    [],
  );

  const content = useMemo(
    () => (
      <>
        <HStack padding={2}>
          <Text as="h2" color="fgMuted" display="block" font="caption">
            Section Heading
          </Text>
        </HStack>
        {defaultOptions.slice(0, 2).map((option) => (
          <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
        ))}
        <Dropdown
          content={subMenuContent}
          contentPosition={subMenuPosition}
          minWidth={200}
          onChange={handleSubMenuValueChange}
          value={subMenuValue}
          width="100%"
        >
          {/* Note: you can't use a SelectOption as the trigger or else SelectProvider will think this is a menu option */}
          <Pressable background="bg" width="100%">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              paddingX={2}
              paddingY={1}
              width="100%"
            >
              <Text as="p" display="block" font="headline">
                More
              </Text>
              <Icon color="fg" name="caretRight" size="s" />
            </HStack>
          </Pressable>
        </Dropdown>
      </>
    ),
    [handleSubMenuValueChange, subMenuContent, subMenuValue],
  );

  return (
    <HStack gap={2} justifyContent="space-between" padding={3}>
      <HStack flexGrow={1}>
        <Dropdown
          ref={menuRef}
          content={content}
          onChange={handleMenuValueChange}
          value={menuValue}
          width={200}
        >
          <IconButton accessibilityLabel="More" name="more" />
        </Dropdown>
      </HStack>
      <HStack
        alignItems="center"
        background="bgAlternate"
        borderRadius={200}
        flexGrow={3}
        justifyContent="center"
        padding={3}
      >
        <Text as="p" display="block" font="body">
          You chose: {subMenuValue ?? menuValue}
        </Text>
      </HStack>
    </HStack>
  );
};

const emojiMap = [
  { label: 'react', glyph: '⚛️' },
  { label: 'love', glyph: '💕' },
  { label: 'mindblow', glyph: '🤯' },
  { label: 'shiny', glyph: '✨' },
  { label: 'surprised', glyph: '🥺' },
  { label: 'brick', glyph: '🧱' },
  { label: 'poop', glyph: '💩' },
  { label: 'poodle', glyph: '🐩' },
  { label: 'rocket', glyph: '🚀' },
  { label: 'phone', glyph: '☎️' },
  { label: 'dog', glyph: '🐕‍🦺' },
  { label: 'nails', glyph: '💅🏻' },
  { label: 'upsidedown', glyph: '🙃' },
  { label: 'coder', glyph: '👩🏼‍💻' },
];

export const ShowOverlay = () => <Default showOverlay />;
export const MobileModal = () => <Default enableMobileModal />;

export const CustomOptions = () => {
  const [value, onChange] = useState<string | undefined>();
  const currentGlyph = useMemo(
    () => emojiMap.find((emoji) => emoji.label === value)?.glyph ?? '😄',
    [value],
  );

  const content = useMemo(
    () => (
      <>
        <HStack paddingX={2} paddingY={2}>
          <Text as="h2" color="fgMuted" display="block" font="caption">
            Section Heading
          </Text>
        </HStack>
        <HStack flexWrap="wrap" gap={1} paddingBottom={2} paddingX={2}>
          {emojiMap.map(({ label, glyph }) => (
            <MenuItem value={label}>
              <Text as="p" display="block" font="title2">
                {glyph}
              </Text>
            </MenuItem>
          ))}
        </HStack>
      </>
    ),
    [],
  );

  return (
    <Dropdown content={content} maxWidth={190} onChange={onChange} value={value}>
      <Pressable background="transparent">
        <Text as="p" display="block" font="title2">
          {currentGlyph}
        </Text>
      </Pressable>
    </Dropdown>
  );
};

export const Disabled = () => (
  <>
    <Default />
    <Default disabled enableMobileModal />
  </>
);

export const LongText = () => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRef>(null);

  useEffect(() => {
    dropdownRef.current?.openMenu();
  }, []);

  const content = (
    <HStack maxWidth="95vw" padding={2} role="separator">
      <Text as="h2" color="fgMuted" display="block" font="caption" overflow="truncate">
        {loremIpsum}
      </Text>
    </HStack>
  );

  return (
    <Dropdown ref={dropdownRef} content={content} onChange={setValue} value={value}>
      <IconButton transparent accessibilityLabel="More" name="more" variant="secondary" />
    </Dropdown>
  );
};

export const WithMobileModal = () => (
  <Default enableMobileModal options={defaultOptions.slice(0, 5)} />
);

export const WithMaxHeightHigherThanContent = () => (
  <Default maxHeight={400} options={defaultOptions.slice(0, 5)} />
);
export const WithPercentMaxHeight = () => (
  <Default maxHeight="50%" options={defaultOptions.slice(0, 5)} />
);
