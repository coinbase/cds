import '@testing-library/jest-dom';

import { renderA11y } from '@cbhq/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { HexagonBorder, hexagonSvgTransformStyles } from '../Hexagon';

const TEST_ID = 'cds-hexagon-test';
describe('HexagonBorder', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<HexagonBorder size="m" strokeColor="blue" />)).toHaveNoViolations();
  });

  it('renders with the correct standard transforms', () => {
    render(<HexagonBorder size="m" strokeColor="blue" testID={TEST_ID} />);

    const svg = screen.getByTestId(`${TEST_ID}-svg`);
    expect(svg?.style.transform).toBe(hexagonSvgTransformStyles.standard.m.transform);
  });

  it('renders with the correct offset transforms', () => {
    render(<HexagonBorder offset size="l" strokeColor="var(--primary)" testID={TEST_ID} />);

    const svg = screen.getByTestId(`${TEST_ID}-svg`);
    expect(svg?.style.transform).toBe(hexagonSvgTransformStyles.offset.l.transform);
  });

  it('renders with the correct border color', () => {
    render(<HexagonBorder size="m" strokeColor="blue" testID={TEST_ID} />);

    const path = screen.getByTestId(`${TEST_ID}-path`);
    expect(path).toHaveAttribute('stroke', 'blue');
  });
});
