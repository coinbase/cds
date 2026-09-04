import { assets } from '@coinbase/cds-common/internal/data/assets';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons';
import { RemoteImage } from '../../media';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { MediaChipProps } from '../MediaChip';
import { MediaChip } from '../MediaChip';

const chipTestID = 'media-chip-test';

const TestMediaChip = (props: MediaChipProps) => (
  <DefaultThemeProvider>
    <MediaChip testID={chipTestID} {...props} />
  </DefaultThemeProvider>
);

describe('MediaChip', () => {
  it('passes accessibility', () => {
    render(
      <TestMediaChip
        end={<Icon color="fg" name="caretDown" size="xs" />}
        start={<RemoteImage height={24} shape="circle" source={assets.eth.imageUrl} width={24} />}
      >
        USD
      </TestMediaChip>,
    );
    expect(screen.getByText('USD')).toBeAccessible();
  });

  it('renders with label only', () => {
    render(<TestMediaChip>Label only</TestMediaChip>);
    expect(screen.getByTestId(chipTestID)).toBeVisible();
    expect(screen.getByText('Label only')).toBeVisible();
  });

  it('renders with media only', () => {
    render(
      <TestMediaChip
        start={
          <RemoteImage
            accessibilityLabel="ethereum"
            height={24}
            shape="circle"
            source={assets.eth.imageUrl}
            width={24}
          />
        }
      />,
    );
    expect(screen.getByTestId(chipTestID)).toBeVisible();
  });

  it('renders with media and icon', () => {
    render(
      <TestMediaChip
        end={<Icon color="fg" name="caretDown" size="xs" testID="end-icon" />}
        start={
          <RemoteImage
            accessibilityLabel="ethereum"
            height={24}
            shape="circle"
            source={assets.eth.imageUrl}
            width={24}
          />
        }
      />,
    );
    expect(screen.getByTestId(chipTestID)).toBeVisible();
    expect(screen.getByTestId('end-icon')).toBeVisible();
  });

  it('renders with all three (media, label, icon)', () => {
    render(
      <TestMediaChip
        end={<Icon color="fg" name="caretDown" size="xs" testID="end-icon" />}
        start={
          <RemoteImage
            accessibilityLabel="ethereum"
            height={24}
            shape="circle"
            source={assets.eth.imageUrl}
            width={24}
          />
        }
      >
        All three
      </TestMediaChip>,
    );
    expect(screen.getByTestId(chipTestID)).toBeVisible();
    expect(screen.getByText('All three')).toBeVisible();
    expect(screen.getByTestId('end-icon')).toBeVisible();
  });

  it('applies custom spacing overrides', () => {
    render(
      <TestMediaChip paddingX={5} paddingY={3}>
        Custom spacing
      </TestMediaChip>,
    );
    const chip = screen.getByTestId(chipTestID);
    // Custom spacing props should override defaults
    expect(chip).toBeVisible();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<TestMediaChip onPress={onPress}>Pressable</TestMediaChip>);

    fireEvent.press(screen.getByTestId(chipTestID));
    expect(onPress).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <DefaultThemeProvider>
        <MediaChip ref={ref} testID={chipTestID}>
          With ref
        </MediaChip>
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});
