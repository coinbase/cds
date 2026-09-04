import { useState } from 'react';
import { sampleTabs as tabs } from '@coinbase/cds-common/internal/data/tabs';
import { render, screen } from '@testing-library/react-native';

import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { type CustomTabProps, TabNavigation, type TabProps } from '../TabNavigation';

const sampleTabs = tabs.slice(0, 4);

const MockTabNavigation = ({
  testID,
  tabs = sampleTabs,
}: {
  testID: string;
  tabs?: TabProps[];
}) => {
  const [activeTab, setActiveTab] = useState(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabNavigation onChange={setActiveTab} tabs={tabs} testID={testID} value={activeTab} />
    </DefaultThemeProvider>
  );
};

const customTestID = 'custom-test-id';

const renderCustomTab = ({ label, id, ...props }: CustomTabProps) => (
  <HStack testID={`${customTestID}-${id}`} {...props}>
    <Text font="headline">{label}</Text>
  </HStack>
);

const MockTabNavigationWithCustomTabs = ({ testID }: { testID: string }) => {
  const [activeTab, setActiveTab] = useState(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabNavigation
        Component={renderCustomTab}
        onChange={setActiveTab}
        tabs={sampleTabs}
        testID={testID}
        value={activeTab}
      />
    </DefaultThemeProvider>
  );
};

const TEST_ID = 'mainTabNav';

describe('TabNavigation', () => {
  it('passes a11y', () => {
    render(<MockTabNavigation testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('Properly inherits testID from TabNavigation', () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
  });

  it("Properly applies custom testID's", () => {
    render(<MockTabNavigationWithCustomTabs testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(`${customTestID}-${sampleTabs[0].id}`)).toBeVisible();
  });

  it('should allow tabs to be disabled', () => {
    render(
      <MockTabNavigation
        tabs={sampleTabs.map((tab) => ({ ...tab, disabled: true }))}
        testID={TEST_ID}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeDisabled();
  });
});
