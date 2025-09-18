import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { FloatingAssetCard } from '../FloatingAssetCard';

const DummyMedia = () => <Text>Media</Text>;

describe('FloatingAssetCard', () => {
  it('renders title, description, subtitle & media', () => {
    render(
      <DefaultThemeProvider>
        <FloatingAssetCard
          description="Description"
          media={<DummyMedia />}
          subtitle="Subtitle"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
    expect(screen.getByText('Media')).toBeTruthy();
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <FloatingAssetCard
          description="Description"
          media={<DummyMedia />}
          subtitle="Subtitle"
          testID="card"
          title="Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('card')).toBeAccessible();
  });
});
