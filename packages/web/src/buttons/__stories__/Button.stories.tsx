import React from 'react';

import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout';
import { Button, type ButtonBaseProps } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

export default {
  component: Button,
  title: 'Components/Buttons/Button',
};

const buttonStories: Omit<ButtonBaseProps, 'children'>[] = [
  { variant: 'foregroundMuted' },
  { variant: 'secondary' },
  { variant: 'tertiary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { variant: 'secondary', transparent: true },
  { variant: 'positive', transparent: true },
  { variant: 'negative', transparent: true },
  { block: true },
  { compact: true },
  { compact: true, block: true },
  { transparent: true },
  { disabled: true },
  { loading: true },
  { loading: true, compact: true },
  { startIcon: 'backArrow' },
  { endIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', compact: true, endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', compact: true, endIcon: 'forwardArrow' },
  { flush: 'start', endIcon: 'forwardArrow' },
  { flush: 'end', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', compact: true },
  { startIcon: 'backArrow', compact: true },
  { endIcon: 'forwardArrow', compact: true },
  { padding: 5 },
  { paddingX: 5, padding: 4 },
  { paddingY: 4 },
  { paddingStart: 6, paddingEnd: 6 },
  { paddingTop: 6, paddingBottom: 6 },
  { marginStart: -2 },
];

const onClickConsole = () => console.log('clicked');

export const CreateButtonStories = () => (
  <VStack alignItems="flex-start" gap={2} padding={0.5}>
    {buttonStories.map((props, idx) => {
      const key = `button-${idx}`;
      return (
        <Button key={key} onClick={onClickConsole} {...props}>
          Button
        </Button>
      );
    })}
  </VStack>
);

export const CustomEndIconButton = () => (
  <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button end={<Icon color="fg" name="caretRight" size="s" />}>Test</Button>
      <Button end={<Icon active color="fg" name="add" size="s" />} variant="secondary">
        Test
      </Button>
      <Button
        endIconActive
        end={<Icon active color="fg" name="add" size="s" />}
        endIcon="airdrop"
        variant="secondary"
      >
        Test
      </Button>
    </ButtonGroup>
  </VStack>
);

export const FlushProps = () => (
  <VStack background="bgSecondary" gap={4} paddingX={2}>
    <Button onClick={() => {}} variant="positive">
      No Flush
    </Button>
    <Button block flush="start" onClick={() => {}}>
      Flush to Start
    </Button>
    <Button block flush="end" onClick={() => {}} variant="negative">
      Flush to End
    </Button>
  </VStack>
);
