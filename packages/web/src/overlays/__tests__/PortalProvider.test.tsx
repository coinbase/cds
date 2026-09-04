import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { render, screen } from '@testing-library/react';

import { PortalHost, PortalProvider } from '../PortalProvider';

describe('PortalProvider', () => {
  it('renders portal host', () => {
    render(<PortalHost />);

    expect(screen.getByTestId('portal-modal-container')).toHaveStyle({
      zIndex: zIndex.modal,
    });
    expect(screen.getByTestId('portal-toast-container')).toHaveStyle({
      zIndex: zIndex.toast,
    });
    expect(screen.getByTestId('portal-alert-container')).toHaveStyle({
      zIndex: zIndex.alert,
    });
    expect(screen.getByTestId('portal-tooltip-container')).toHaveStyle({
      zIndex: zIndex.tooltip,
    });
  });

  it('renders children', () => {
    render(
      <PortalProvider>
        <p>test</p>
      </PortalProvider>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });
});
