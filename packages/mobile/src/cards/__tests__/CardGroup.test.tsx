import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { AnnouncementCard } from '../AnnouncementCard';
import { CardGroup } from '../CardGroup';

describe('CardGroup.test', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <CardGroup testID="mock-card-group">
          <AnnouncementCard description="Item1 description" title="Item1 title" />
          <AnnouncementCard description="Item2 description" title="Item2 title" />
        </CardGroup>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-card-group')).toBeAccessible();
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <CardGroup>
          <AnnouncementCard description="Item1 description" title="Item1 title" />
          <AnnouncementCard description="Item2 description" title="Item2 title" />
        </CardGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
  });

  it('renders horizontal group', () => {
    render(
      <DefaultThemeProvider>
        <CardGroup direction="horizontal">
          <AnnouncementCard description="Item1 description" title="Item1 title" />
          <AnnouncementCard description="Item2 description" title="Item2 title" />
        </CardGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
  });
});
