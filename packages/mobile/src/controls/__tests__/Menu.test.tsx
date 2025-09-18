import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Menu } from '../Menu';

describe('Menu.test', () => {
  it('renders children', () => {
    render(
      <Menu>
        <Text>test</Text>
      </Menu>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });
});
