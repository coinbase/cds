import React, { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TabbedChips, type TabbedChipsBaseProps } from '../TabbedChips';

const testID = 'tabbedChip';

const Demo = () => {
  const [value, setValue] = useState<TabbedChipsBaseProps['value']>(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabbedChips onChange={setValue} tabs={sampleTabs} testID={testID} value={value} />
    </DefaultThemeProvider>
  );
};

describe('TabbedChips', () => {
  it('passes a11y', async () => {
    render(<Demo />);
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders a custom tab label with injected testID', () => {
    render(<Demo />);
    expect(screen.getByTestId(sampleTabs[5].id)).toBeDefined();
  });
});
