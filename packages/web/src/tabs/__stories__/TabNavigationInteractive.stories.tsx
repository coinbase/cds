import React, { useState } from 'react';
import { expect } from '@storybook/jest';
import type { ComponentStoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { pauseStory } from '../../utils/storybook';
import { TabNavigation } from '../TabNavigation';

const WAIT = 200;

const tabs = [
  {
    id: 'first-test',
    label: 'First label',
    testID: 'first',
  },
  {
    id: 'second-test',
    label: 'second label',
    testID: 'second',
  },
  {
    id: 'third-test',
    label: 'third label',
  },
  {
    id: 'fourth-test',
    label: 'fourth label',
  },
  {
    id: 'fifth-test',
    label: 'fifth label',
  },
  {
    id: 'sixth-test',
    label: 'sixth label',
  },
  {
    id: 'seventh-test',
    label: 'seventh label',
    testID: 'seventh',
  },
  {
    id: 'eighth-test',
    label: 'eighth label',
  },
  {
    id: 'ninth-test',
    label: 'ninth label',
  },
  {
    id: 'tenth-test',
    label: 'tenth label',
    testID: 'tenth',
  },
  {
    id: 'eleventh-test',
    label: 'eleventh label',
    testID: 'eleventh',
  },
];

const MockTabNavigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <VStack gap={2}>
      <TabNavigation onChange={setActiveTab} tabs={tabs} value={activeTab} />
      <VStack
        bordered
        accessibilityLabelledBy={`tab--${activeTab}`}
        background="bgPrimaryWash"
        borderRadius={200}
        id={`tabpanel--${activeTab}`}
        padding={2}
        role="tabpanel"
      >
        <Text as="h2" display="block" font="title1">
          This is tab {activeTab}
        </Text>
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Interactive/TabNavigation',
  component: MockTabNavigation,
};

export const Story: ComponentStoryObj<typeof MockTabNavigation> = {
  args: {},
  parameters: {
    percy: { waitForTimeout: tabs.length * WAIT, enableJavaScript: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstTab = canvas.getByText(tabs[0].label).closest('button');
    const lastTab = canvas.getByText(tabs[tabs.length - 1].label).closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstTab).toHaveFocus();

    for (const { label } of tabs) {
      const tabButton = canvas.getByText(label).closest('button') ?? canvas.getByText(label);
      if (tabButton !== lastTab) {
        // Tab again and expect the paddle to be in focus
        fireEvent.keyDown(tabButton, { key: 'ArrowRight' });
      }

      await pauseStory(WAIT);
    }
  },
};
