import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Sidebar } from '../Sidebar';
import { SidebarItem } from '../SidebarItem';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      width: 1280,
      height: 100,
      observe: jest.fn(),
    };
  }),
}));

const CustomComponent = () => <div>Custom Component</div>;

describe('SidebarItem', () => {
  it('should render primary sidebar item when variant is primary in sidebar context', () => {
    render(
      <DefaultThemeProvider>
        <Sidebar>
          <SidebarItem icon="chartPie" testID="sidebar-item-asset" title="Assets" />
          <SidebarItem icon="trading" testID="sidebar-item-trade" title="Trade" />
        </Sidebar>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('sidebar-item-asset')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-trade')).toBeInTheDocument();
    expect(screen.getAllByTestId('sidebar-item-default')[0]).toBeInTheDocument();
    expect(screen.getByText('Assets').className).toContain('headline');
  });

  it('should render collapsed primary sidebar item when collapsed is true in sidebar context', () => {
    render(
      <DefaultThemeProvider>
        <Sidebar collapsed>
          <SidebarItem icon="chartPie" title="Assets" />
          <SidebarItem icon="trading" title="Trade" />
        </Sidebar>
      </DefaultThemeProvider>,
    );
    expect(screen.queryByText('Assets')).not.toBeInTheDocument();
    expect(screen.queryByText('Trade')).not.toBeInTheDocument();
  });

  it('should render condensed sidebar item when variant is condensed in sidebar context', () => {
    render(
      <DefaultThemeProvider>
        <Sidebar variant="condensed">
          <SidebarItem icon="chartPie" title="Assets" />
          <SidebarItem icon="trading" title="Trade" />
        </Sidebar>
      </DefaultThemeProvider>,
    );
    expect(screen.getAllByTestId('sidebar-item-condensed')[0]).toBeInTheDocument();
    expect(screen.getByText('Assets').className).toContain('label1');
  });

  it('should render custom sidebar item when passing custom component to sidebar item', () => {
    render(
      <DefaultThemeProvider>
        <Sidebar>
          <SidebarItem Component={CustomComponent} icon="chartPie" title="Assets" />
          <SidebarItem Component={CustomComponent} icon="trading" title="Trade" />
        </Sidebar>
      </DefaultThemeProvider>,
    );
    expect(screen.getAllByText('Custom Component')[0]).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-item-default')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-item-condensed')).not.toBeInTheDocument();
  });

  it('can override borderRadius', () => {
    render(
      <DefaultThemeProvider>
        <Sidebar>
          <SidebarItem borderRadius={0} icon="chartPie" testID="sidebar-item" title="Assets" />
          <SidebarItem borderRadius={0} icon="trading" testID="sidebar-item" title="Trade" />
        </Sidebar>
      </DefaultThemeProvider>,
    );

    // super brittle way to test that a linaria class was applied for borderRadius style prop value of 0
    expect(screen.getAllByTestId('sidebar-item')[0].className).toContain('_0-');
  });
});
