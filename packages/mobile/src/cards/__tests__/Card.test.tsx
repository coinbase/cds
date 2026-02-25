import { render } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Card } from '../Card';

describe('Card.test', () => {
  it('keeps a stable root wrapper regardless of onPress', () => {
    const { rerender, toJSON } = render(
      <DefaultThemeProvider>
        <Card>Body</Card>
      </DefaultThemeProvider>,
    );

    const staticTree = toJSON();
    expect(staticTree).toBeTruthy();
    expect(Array.isArray(staticTree)).toBe(false);
    expect(staticTree).toHaveProperty('type', 'View');

    rerender(
      <DefaultThemeProvider>
        <Card onPress={jest.fn()}>Body</Card>
      </DefaultThemeProvider>,
    );

    const pressableTree = toJSON();
    expect(pressableTree).toBeTruthy();
    expect(Array.isArray(pressableTree)).toBe(false);
    expect(pressableTree).toHaveProperty('type', 'View');
  });
});
