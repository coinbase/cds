import { SvgXml } from 'react-native-svg';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CardMedia } from '../CardMedia';

describe('CardMedia.test', () => {
  it('renders spot square', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia name="sparkleToken" placement="above" type="spotSquare" />
      </DefaultThemeProvider>,
    );
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia name="2fa" placement="above" type="pictogram" />
      </DefaultThemeProvider>,
    );
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });
});
