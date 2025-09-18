import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { IconProps } from '../Icon';
import { Icon } from '../Icon';

const testID = 'test-icon';
const IconExample = (props: Omit<IconProps, 'name' | 'size'>) => (
  <DefaultThemeProvider>
    <Icon name="copy" size="m" {...props} />
  </DefaultThemeProvider>
);

describe('Icon', () => {
  it('passes accessibility', async () => {
    render(<IconExample testID={testID} />);

    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('sets accessibility attributes and labels', () => {
    render(<IconExample accessibilityHint="An icon hint" accessibilityLabel="An icon label" />);

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('An icon label')).toBeTruthy();
    expect(screen.getByHintText('An icon hint')).toBeTruthy();
  });
});
