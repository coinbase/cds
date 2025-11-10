import type { Shape } from '@coinbase/cds-common';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { RemoteImage } from '../../media';
import { DefaultThemeProvider } from '../../utils/test';
import type { InputChipProps } from '../ChipProps';
import { InputChip } from '../InputChip';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
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
  it('passes accessibility when start/end nodes are ReactElements', async () => {
    expect(
      await renderA11y(<TestInputChip onClick={() => {}}>USD</TestInputChip>),
    ).toHaveNoViolations();
  });

  it('renders correctly with value and start props and end close icon', () => {
    render(<TestInputChip onClick={() => {}}>USD</TestInputChip>);

    expect(screen.getByTestId(startNodeTestID)).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId(`${chipTestID}-close-icon`)).toBeVisible();
  });

  it('calls onClick when pressed', () => {
    const onClick = jest.fn();
    render(<TestInputChip onClick={onClick}>USD</TestInputChip>);

    fireEvent.click(screen.getByText('USD'));

    expect(onClick).toHaveBeenCalled();
  });
  it('generates an a11y label based on the value', () => {
    render(<TestInputChip onClick={() => {}}>USD</TestInputChip>);

    expect(screen.getByLabelText('Remove USD')).toBeTruthy();
  });
});
