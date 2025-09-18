import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { PortalHost } from '../PortalProvider';

describe('PortalProvider.test', () => {
  it('renders single portal node', () => {
    const mockNodes = [{ id: 'node1', element: <View key="node1" testID="view1" /> }];
    render(<PortalHost nodes={mockNodes} />);

    expect(screen.getByTestId('view1')).toBeTruthy();
  });

  it('renders multiple portal nodes', () => {
    const mockNodes = [
      {
        id: 'node1',
        element: (
          <View key="node1" testID="view1">
            <Text>Text1</Text>
          </View>
        ),
      },
      {
        id: 'node2',
        element: (
          <View key="node2" testID="view2">
            <Text>Text2</Text>
          </View>
        ),
      },
    ];

    render(<PortalHost nodes={mockNodes} />);

    expect(screen.getAllByText('Text1')).toHaveLength(1);
    expect(screen.getAllByText('Text2')).toBeTruthy();
  });
});
