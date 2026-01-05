import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup, type RemoteImageGroupProps } from '../RemoteImageGroup';

const src = 'https://images.coinbase.com/avatar?s=56';
const TEST_ID = 'remote-image-test-id';
const remoteImageIndices = [0, 1, 2, 3];

const MockRemoteImageGroup = ({ ...props }: RemoteImageGroupProps) => (
  <DefaultThemeProvider>
    <RemoteImageGroup shape="circle" testID={TEST_ID} {...props}>
      {remoteImageIndices.map((index) => (
        <RemoteImage key={`remote-image-child-${index}`} source={src} />
      ))}
    </RemoteImageGroup>
  </DefaultThemeProvider>
);

describe('RemoteImageGroup', () => {
  it('renders RemoteImageGroup and passes a11y', () => {
    render(<MockRemoteImageGroup />);

    const imageWrapper = screen.getByTestId(TEST_ID);

    expect(imageWrapper).toBeTruthy();
    expect(imageWrapper).toBeAccessible();
  });

  it('Position is correctly applied for size m. The first is not positioned and the following will have increasing left positioning', () => {
    render(<MockRemoteImageGroup />);

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    expect(remoteImage1).not.toHaveStyle({
      marginStart: -8,
    });

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      expect(imageChildren).toHaveStyle({
        marginStart: -8,
      });
    });
  });

  it('Position is correctly applied for size xxl. The first is not positioned and the following will have increasing left positioning', () => {
    render(<MockRemoteImageGroup size="xxl" />);

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    expect(remoteImage1).not.toHaveStyle({
      marginStart: -16,
    });

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      expect(imageChildren).toHaveStyle({
        marginStart: -16,
      });
    });
  });

  it('default size = m', () => {
    render(<MockRemoteImageGroup />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: 24,
        height: 24,
      });
    });
  });

  it('default shape = circle', async () => {
    render(<MockRemoteImageGroup />);

    await screen.findByTestId(TEST_ID);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        borderRadius: defaultTheme.borderRadius[1000],
      });
    });
  });

  it('default max = 4', () => {
    render(<MockRemoteImageGroup />);

    // There are 4 remote images, if the default was max = 4,
    // there shall be no need for excess text
    expect(screen.queryByTestId(`${TEST_ID}-excess-text`)).toBeNull();
  });

  it('size={30} prop works as expected', () => {
    render(<MockRemoteImageGroup size={30} />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: 30,
        height: 30,
      });
    });
  });

  it('size={l} prop works as expected', () => {
    render(<MockRemoteImageGroup size="l" />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: 32,
        height: 32,
      });
    });
  });

  it('excess text shows up correctly', () => {
    render(<MockRemoteImageGroup max={2} size={50} />);
    expect(screen.getByText('+2')).toBeTruthy();
  });

  it('fontSize is proportional to dimension of RemoteImage for avatarSizes={m}', () => {
    render(<MockRemoteImageGroup max={2} />);

    const excessText = screen.getByTestId(`${TEST_ID}-excess-text`);

    expect(excessText).toHaveStyle({
      fontSize: 24 * 0.4,
    });
  });

  it('fontSize is proportional to dimension of RemoteImage for number sizes', () => {
    const LOCAL_SIZE = 27;
    render(<MockRemoteImageGroup max={2} size={LOCAL_SIZE} />);

    const excessText = screen.getByTestId(`${TEST_ID}-excess-text`);

    expect(excessText).toHaveStyle({
      fontSize: LOCAL_SIZE * 0.4,
    });
  });
});
