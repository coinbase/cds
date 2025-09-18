import { getSource } from '../RemoteImage';

describe('stringToImageURISource', () => {
  it('passing png/jpg string to getSource returns a valid ImageURISource object', () => {
    const source = 'https://source.unsplash.com/120x120?beach-0';
    const imageURISource = getSource(source);

    expect(imageURISource).toEqual({
      uri: source,
      cache: undefined,
    });
  });

  it('passing svg string to getSource returns a valid ImageURISource object', () => {
    const source =
      'https://static-assets.coinbase.com/design-system/illustrations/light/giftBoxCrypto-0.svg';
    const imageURISource = getSource(source);

    expect(imageURISource).toEqual({
      uri: source,
      headers: { format: 'svg' },
      cache: undefined,
    });
  });

  it('getSource cachePolicy parameter works as expected for pngs/jpgs', () => {
    const source = 'https://source.unsplash.com/120x120?beach-0';
    const imageURISource = getSource(source, 'default');

    expect(imageURISource).toEqual({
      uri: source,
      cache: 'default',
    });
  });

  it('getSource cachePolicy parameter works as expected for svgs', () => {
    const source =
      'https://static-assets.coinbase.com/design-system/illustrations/light/giftBoxCrypto-0.svg';
    const imageURISource = getSource(source, 'default');

    expect(imageURISource).toEqual({
      uri: source,
      headers: { format: 'svg' },
      cache: 'default',
    });
  });
});
