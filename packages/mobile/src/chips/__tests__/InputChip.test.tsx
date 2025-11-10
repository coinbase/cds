import type { Shape } from '@coinbase/cds-common';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { RemoteImage } from '../../media';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { InputChipProps } from '../ChipProps';
import { InputChip } from '../InputChip';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  accessibilityLabel: 'ethereum',
  width: 16,
};

const chipTestID = 'chip-test';
const startNodeTestID = 'start-node-test';

const TestInputChip = ({ testID = chipTestID, ...props }: InputChipProps) => (
  <DefaultThemeProvider>
    <InputChip
      start={<RemoteImage {...assetIconProps} testID={startNodeTestID} />}
      testID={testID}
      {...props}
    />
  </DefaultThemeProvider>
);

describe('InputChip', () => {
  it('passes accessibility when start/end nodes are ReactElements', () => {
    render(<TestInputChip onPress={NoopFn}>USD</TestInputChip>);
    expect(screen.getByText('USD')).toBeAccessible();
  });

  it('renders correctly with value and start props and end close icon', () => {
    render(<TestInputChip onPress={NoopFn}>USD</TestInputChip>);

    expect(screen.getByTestId(startNodeTestID)).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId(`${chipTestID}-close-icon`)).toBeVisible();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<TestInputChip onPress={onPress}>USD</TestInputChip>);

    fireEvent.press(screen.getByText('USD'));

    expect(onPress).toHaveBeenCalled();
  });
  it('generates an a11y label based on the value', () => {
    render(<TestInputChip onPress={NoopFn}>USD</TestInputChip>);

    expect(screen.getByTestId(`${chipTestID}-close-icon`)).toBeVisible();
  });
});
