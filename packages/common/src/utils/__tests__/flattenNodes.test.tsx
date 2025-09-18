import { createElement } from 'react';

import flattenNodes, { hasProps } from '../flattenNodes';

describe('flattenNodes', () => {
  it('checks if child has props', () => {
    const element = createElement('div');

    expect(hasProps(element)).toBe(true);
    expect(hasProps('test')).toBe(false);
  });

  it('flatten nodes', () => {
    const flattenedNodes1 = flattenNodes([
      <>
        <div>1</div>
        <div>2</div>
      </>,
    ]);
    expect(flattenedNodes1).toHaveLength(2);

    const flattenedNodes2 = flattenNodes([
      'test',
      [
        <>
          <div>1</div>
          <div>2</div>
        </>,
      ],
    ]);
    expect(flattenedNodes2).toHaveLength(3);

    const flattenedNodes3 = flattenNodes([undefined, null, false]);
    expect(flattenedNodes3).toHaveLength(0);
  });
});
