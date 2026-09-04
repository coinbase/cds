import { imageSize, mediaSize } from '@coinbase/cds-common/tokens/cell';
import { render, screen } from '@testing-library/react';

import { MediaFallback } from '../MediaFallback';

describe('MediaFallback.test', () => {
  it('renders media fallback', () => {
    render(<MediaFallback testID="test-media-fallback" type="asset" />);

    const element = screen.getByTestId('test-media-fallback');
    const style = element.getAttribute('style');
    expect(style).toContain(`--width: ${mediaSize}px`);
  });

  it('renders image fallback', () => {
    render(<MediaFallback testID="test-media-fallback" type="image" />);

    const element = screen.getByTestId('test-media-fallback');
    const style = element.getAttribute('style');
    expect(style).toContain(`--width: ${imageSize}px`);
  });
});
