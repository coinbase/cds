import type { Shape } from '@coinbase/cds-common';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Chip } from '../Chip';
import type { ChipProps } from '../ChipProps';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  accessibilityLabel: 'ethereum',
  width: 16,
};

const chipTestID = 'chip-test';

const customContentStyle = { maxWidth: 300 };

const TestChip = (props: Omit<ChipProps, 'children'>) => (
  <DefaultThemeProvider>
    <Chip
      end={<Icon color="fg" name="caretDown" size="s" testID="end-test" />}
      start={<RemoteImage {...assetIconProps} testID="start-test" />}
      testID={chipTestID}
      {...props}
    >
      <Text font="headline">USD</Text>
    </Chip>
  </DefaultThemeProvider>
);

describe('Chip', () => {
  it('passes accessibility when start/end nodes are ReactNodes', () => {
    render(<TestChip />);
    expect(screen.getByText('USD')).toBeAccessible();
  });

  it('renders correctly with value, start, and end props', () => {
    render(<TestChip />);

    expect(screen.getByTestId('start-test')).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId('end-test')).toBeVisible();
    expect(screen.getByTestId(chipTestID)).toBeVisible();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<TestChip onPress={onPress} />);

    fireEvent.press(screen.getByTestId(chipTestID));

    expect(onPress).toHaveBeenCalled();
  });

  it('renders correctly when passing custom styles to contentStyle prop', () => {
    render(<TestChip contentStyle={customContentStyle} />);

    expect(screen.getByTestId(chipTestID).children[0]).toHaveStyle(customContentStyle);
  });

  it('applies custom styles to root and content', () => {
    const styles = {
      root: { borderWidth: 2 },
      content: { paddingVertical: 10 },
    };

    render(<TestChip styles={styles} />);

    const chip = screen.getByTestId(chipTestID);
    expect(chip).toHaveStyle({ borderWidth: 2 });
    expect(chip.children[0]).toHaveStyle({ paddingVertical: 10 });
  });
});
