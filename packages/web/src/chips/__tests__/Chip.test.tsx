import type { Shape } from '@coinbase/cds-common';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Icon } from '../../icons/Icon';
import { RemoteImage } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Chip } from '../Chip';
import type { ChipProps } from '../ChipProps';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  width: 16,
};

const testID = 'chip-test';

const customContentStyle = { maxWidth: 300 };

const ChipWithNodes = (props: Omit<ChipProps, 'children'>) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    <Chip
      end={<Icon color="fg" name="caretDown" size="s" testID="start-test" />}
      start={<RemoteImage {...assetIconProps} testID="end-test" />}
      testID={testID}
      {...props}
    >
      <Text font="headline">USD</Text>
    </Chip>
  </ThemeProvider>
);

describe('Chip', () => {
  it('passes accessibility when start/end nodes are ReactElements', async () => {
    expect(await renderA11y(<ChipWithNodes />)).toHaveNoViolations();
  });

  it('passes accessibility when accessibilityLabel is provided', async () => {
    const onClick = jest.fn();
    expect(
      await renderA11y(<ChipWithNodes accessibilityLabel="a11y label" onClick={onClick} />),
    ).toHaveNoViolations();
  });

  it('renders correctly with value, start, and end props', () => {
    render(<ChipWithNodes />);

    expect(screen.getByTestId('start-test')).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId('end-test')).toBeVisible();
    expect(screen.getByTestId(testID)).toBeVisible();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ChipWithNodes onClick={onClick} />);

    fireEvent.click(screen.getByText('USD'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when passing custom styles to contentStyle prop', () => {
    render(<ChipWithNodes contentStyle={customContentStyle} />);

    expect(screen.getByTestId(testID).firstElementChild).toHaveStyle(
      `max-width: ${customContentStyle.maxWidth}px`,
    );
  });

  it('applies custom classNames to root and content', () => {
    const classNames = {
      root: 'custom-root-class',
      content: 'custom-content-class',
    };

    render(<ChipWithNodes classNames={classNames} />);

    const chip = screen.getByTestId(testID);
    expect(chip).toHaveClass('custom-root-class');
    expect(chip.firstElementChild).toHaveClass('custom-content-class');
  });

  it('applies custom styles to root and content', () => {
    const styles = {
      root: { border: '2px solid red' },
      content: { padding: '10px' },
    };

    render(<ChipWithNodes styles={styles} />);

    const chip = screen.getByTestId(testID);
    expect(chip).toHaveStyle('border: 2px solid red');
    expect(chip.firstElementChild).toHaveStyle('padding: 10px');
  });
});
