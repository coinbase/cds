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
  { variant: 'secondary' },
  { variant: 'tertiary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { variant: 'inverse' },
  { variant: 'secondary', transparent: true },
  { variant: 'positive', transparent: true },
  { variant: 'negative', transparent: true },
  { variant: 'inverse', transparent: true },
  { block: true },
  { size: 'xs' },
  { size: 's' },
  { size: 'm' },
  { size: 'l' },
  { size: 's', block: true },
  { transparent: true },
  { disabled: true },
  { loading: true },
  { loading: true, size: 's' },
  { loading: true, transparent: true },
  { loading: true, transparent: true, size: 's' },
  { loading: true, variant: 'secondary' },
  { loading: true, variant: 'secondary', size: 's' },
  { loading: true, variant: 'positive' },
  { loading: true, variant: 'positive', size: 's' },
  { loading: true, variant: 'negative' },
  { loading: true, variant: 'negative', size: 's' },
  { startIcon: 'backArrow' },
  { endIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', size: 's', endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', size: 's', endIcon: 'forwardArrow' },
  { flush: 'start', endIcon: 'forwardArrow' },
  { flush: 'end', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', size: 's' },
  { startIcon: 'backArrow', size: 's' },
  { endIcon: 'forwardArrow', size: 's' },
  { padding: 5 },
  { paddingX: 5, padding: 4 },
  { paddingY: 4 },
  { paddingStart: 6, paddingEnd: 6 },
  { paddingTop: 6, paddingBottom: 6 },
  { marginStart: -2 },
  { font: 'body' },
  { font: 'title3' },
  { fontSize: 'title3', fontWeight: 'body' },
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

export const DeprecatedCompact = () => (
  <VStack alignItems="flex-start" gap={2}>
    <Button compact>{'Compact (deprecated, use size="s")'}</Button>
    <Button size="s">{'Equivalent size="s"'}</Button>
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
