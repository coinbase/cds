import { assets } from '@coinbase/cds-common/internal/data/assets';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Icon } from '../../icons/Icon';
import { RemoteImage } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import type { MediaChipProps } from '../MediaChip';
import { MediaChip } from '../MediaChip';

const testID = 'media-chip-test';

const Wrapper = (props: MediaChipProps) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    <MediaChip testID={testID} {...props} />
  </ThemeProvider>
);

describe('MediaChip', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Wrapper
          end={<Icon color="fg" name="caretDown" size="xs" />}
          start={<RemoteImage height={24} shape="circle" source={assets.eth.imageUrl} width={24} />}
        >
          USD
        </Wrapper>,
      ),
    ).toHaveNoViolations();
  });

  it('renders with label only', () => {
    render(<Wrapper>Label only</Wrapper>);
    expect(screen.getByTestId(testID)).toBeVisible();
    expect(screen.getByText('Label only')).toBeVisible();
  });

  it('renders with media only', () => {
    render(
      <Wrapper
        start={<RemoteImage height={24} shape="circle" source={assets.eth.imageUrl} width={24} />}
      />,
    );
    expect(screen.getByTestId(testID)).toBeVisible();
  });

  it('renders with media and icon', () => {
    render(
      <Wrapper
        end={<Icon color="fg" name="caretDown" size="xs" testID="end-icon" />}
        start={<RemoteImage height={24} shape="circle" source={assets.eth.imageUrl} width={24} />}
      />,
    );
    expect(screen.getByTestId(testID)).toBeVisible();
    expect(screen.getByTestId('end-icon')).toBeVisible();
  });

  it('renders with all three (media, label, icon)', () => {
    render(
      <Wrapper
        end={<Icon color="fg" name="caretDown" size="xs" testID="end-icon" />}
        start={<RemoteImage height={24} shape="circle" source={assets.eth.imageUrl} width={24} />}
      >
        All three
      </Wrapper>,
    );
    expect(screen.getByTestId(testID)).toBeVisible();
    expect(screen.getByText('All three')).toBeVisible();
    expect(screen.getByTestId('end-icon')).toBeVisible();
  });

  it('applies compact spacing', () => {
    render(<Wrapper compact>Compact</Wrapper>);
    const chip = screen.getByTestId(testID);
    expect(chip).toBeVisible();
    // Compact chips should have smaller padding
    expect(chip.firstElementChild).toHaveStyle('padding: var(--space-1-5) var(--space-0-75)');
  });

  it('allows custom spacing overrides', () => {
    render(
      <Wrapper paddingX={5} paddingY={3}>
        Custom spacing
      </Wrapper>,
    );
    const chip = screen.getByTestId(testID);
    expect(chip.firstElementChild).toHaveStyle('padding: var(--space-3) var(--space-5)');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Wrapper onClick={onClick}>Clickable</Wrapper>);

    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <MediaChip ref={ref} testID={testID}>
          With ref
        </MediaChip>
      </ThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});
