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

  it('renders inactive colors by default', () => {
    render(<ChipWithNodes />);

    const chip = screen.getByTestId(testID);
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fg)' });
    expect(chip.parentElement?.className).not.toMatch(/\bdark\b/);
  });

  it('renders opposite-scheme bgSecondary and fg when invertColorScheme is true', () => {
    render(<ChipWithNodes invertColorScheme />);

    const chip = screen.getByTestId(testID);
    const invertedWrapper = chip.parentElement;
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fg)' });
    expect(invertedWrapper).toHaveClass('dark');
    expect(invertedWrapper).toHaveStyle({
      '--color-bgSecondary': defaultTheme.darkColor.bgSecondary,
      '--color-fg': defaultTheme.darkColor.fg,
    });
  });

  it('renders opposite-scheme bgSecondary and fg when inverted is true', () => {
    render(<ChipWithNodes inverted />);

    const chip = screen.getByTestId(testID);
    const invertedWrapper = chip.parentElement;
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fg)' });
    expect(invertedWrapper).toHaveClass('dark');
    expect(invertedWrapper).toHaveStyle({
      '--color-bgSecondary': defaultTheme.darkColor.bgSecondary,
      '--color-fg': defaultTheme.darkColor.fg,
      // Current legacy behavior uses the invalid CSS value "content" (not "contents").
      display: 'content',
    });
  });

  it('does not invert when invertColorScheme is false even if inverted is true', () => {
    render(<ChipWithNodes inverted invertColorScheme={false} />);

    const chip = screen.getByTestId(testID);
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fg)' });
    expect(chip.parentElement?.className).not.toMatch(/\bdark\b/);
  });

  it('renders opposite-scheme bgSecondary and fg when active is true', () => {
    render(<ChipWithNodes active />);

    const chip = screen.getByTestId(testID);
    const activeWrapper = chip.parentElement;
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fg)' });
    expect(activeWrapper).toHaveClass('dark');
    expect(activeWrapper).toHaveStyle({
      '--color-bgSecondary': defaultTheme.darkColor.bgSecondary,
      '--color-fg': defaultTheme.darkColor.fg,
    });
  });

  it('applies activeBackground and activeColor without inverting when active', () => {
    render(
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <Chip active activeBackground="bgPositive" activeColor="fgPositive" testID={testID}>
          USD
        </Chip>
      </ThemeProvider>,
    );

    const chip = screen.getByTestId(testID);
    expect(chip).toHaveStyle({ backgroundColor: 'var(--color-bgPositive)' });
    expect(screen.getByText('USD')).toHaveStyle({ color: 'var(--color-fgPositive)' });
    expect(chip.parentElement?.className).not.toMatch(/\bdark\b/);
  });

  it('prefers style overrides when active', () => {
    render(
      <ChipWithNodes active style={{ backgroundColor: 'rgb(1, 2, 3)' }} styles={{ root: {} }} />,
    );

    expect(screen.getByTestId(testID)).toHaveStyle({ backgroundColor: 'rgb(1, 2, 3)' });
  });
});
