import { StyleSheet } from 'react-native';
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

    expect(screen.getByTestId(`${chipTestID}-content`)).toHaveStyle(customContentStyle);
  });

  it('applies custom styles to root and content', () => {
    const styles = {
      root: { borderWidth: 2 },
      content: { paddingVertical: 10 },
    };

    render(<TestChip styles={styles} />);

    expect(screen.getByTestId(chipTestID)).toHaveStyle({ borderWidth: 2 });
    expect(screen.getByTestId(`${chipTestID}-content`)).toHaveStyle({ paddingVertical: 10 });
  });

  describe('size', () => {
    const renderLabelChipSpacing = (props: Omit<ChipProps, 'children'>) => {
      const { unmount } = render(
        <DefaultThemeProvider>
          <Chip testID={chipTestID} {...props}>
            Label
          </Chip>
        </DefaultThemeProvider>,
      );
      const content = screen.getByTestId(`${chipTestID}-content`);
      const style = StyleSheet.flatten(content.props.style);
      const spacing = {
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        paddingStart: style.paddingStart,
        paddingEnd: style.paddingEnd,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
      };
      unmount();
      return spacing;
    };

    it('defaults to the s geometry', () => {
      expect(renderLabelChipSpacing({})).toEqual(renderLabelChipSpacing({ size: 's' }));
    });

    it('treats size="xs" and legacy compact identically', () => {
      expect(renderLabelChipSpacing({ size: 'xs' })).toEqual(
        renderLabelChipSpacing({ compact: true }),
      );
    });

    it('produces distinct geometry for xs and s', () => {
      expect(renderLabelChipSpacing({ size: 'xs' })).not.toEqual(
        renderLabelChipSpacing({ size: 's' }),
      );
    });

    it('resolves size over compact when both are provided', () => {
      expect(renderLabelChipSpacing({ size: 's', compact: true })).toEqual(
        renderLabelChipSpacing({ size: 's' }),
      );
    });

    it('lets an explicit paddingY override win over size', () => {
      expect(renderLabelChipSpacing({ size: 'xs', paddingY: 3 }).paddingTop).toEqual(
        renderLabelChipSpacing({ size: 's', paddingY: 3 }).paddingTop,
      );
    });
  });
});
