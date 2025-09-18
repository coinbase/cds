import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { CardMedia } from '../CardMedia';

const TEST_ALT = 'This is a special illustration';
const TEST_ID = 'illustration-test';

describe('CardMedia.test', () => {
  it('renders spotSquare with alt', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia
          alt={TEST_ALT}
          name="accessToAdvancedCharts"
          placement="above"
          testID={TEST_ID}
          type="spotSquare"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
  });

  it('renders pictogram with alt', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia alt={TEST_ALT} name="2fa" placement="above" testID={TEST_ID} type="pictogram" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
  });

  it('renders spot rectangle with alt', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia alt={TEST_ALT} placement="above" src="fake-url" testID={TEST_ID} type="image" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('src', 'fake-url');
  });

  it('reverts to empty string if alt is not set via props', () => {
    render(
      <DefaultThemeProvider>
        <CardMedia name="2fa" placement="above" testID={TEST_ID} type="pictogram" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', '');
  });
});
