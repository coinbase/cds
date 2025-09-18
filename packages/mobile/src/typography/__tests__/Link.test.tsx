import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Link, type LinkProps } from '../Link';

const TEST_ID = 'link';
const URL = 'www.coinbase.com';
const variants = [
  'display1',
  'display2',
  'display3',
  'title1',
  'title2',
  'title3',
  'title4',
  'headline',
  'body',
  'label1',
  'label2',
  'caption',
  'legal',
  'inherit',
] as LinkProps['font'][];

describe('Link', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" testID={TEST_ID} to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a children text', () => {
    render(
      <DefaultThemeProvider>
        <Link font="body" to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('renders a link', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  variants.forEach((variant) => {
    it(`variant prop: "${variant}" works properly and passess a11y`, async () => {
      render(
        <DefaultThemeProvider>
          <Link font={variant} testID={TEST_ID} to="/">
            Child
          </Link>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(TEST_ID)).toBeAccessible();
    });
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Link onPress={spy} testID={TEST_ID} to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId(TEST_ID));

    expect(spy).toHaveBeenCalled();
  });

  it('to prop works as expected', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const linkInstance = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(linkInstance.props.to).toEqual(URL);
  });

  it('can set forceOpenOutsideApp to true', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link forceOpenOutsideApp testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const link = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(link.props.forceOpenOutsideApp).toBe(true);
  });

  it('can set readerMode to true', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link readerMode testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const link = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(link.props.readerMode).toBe(true);
  });

  it('removes text style when inherited', () => {
    render(
      <DefaultThemeProvider>
        <Link font="inherit" testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).props.style[1][1]).toBe(undefined);
  });

  it('inherits by default', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID).props.style[1][1]).toBe(undefined);
  });
});
