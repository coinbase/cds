import { nux } from '@coinbase/cds-lottie-files/nux';
import { render, screen } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders a LottieView', () => {
    render(
      <DefaultThemeProvider>
        <Lottie source={nux} />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
  });
});
