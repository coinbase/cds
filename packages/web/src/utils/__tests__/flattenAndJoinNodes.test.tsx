import type { SpacerBaseProps } from '../../layout';
import { flattenAndJoinNodes } from '../flattenAndJoinNodes';

const Divider = () => <p>divider</p>;
const Spacer = (props: SpacerBaseProps) => <p>{`spacing ${props.vertical ?? props.horizontal}`}</p>;

describe('flattenAndJoinNodes', () => {
  it(`inserts divider component between items`, () => {
    const node = flattenAndJoinNodes({
      children: [<div>1</div>, <div>2</div>],
      divider: Divider,
      Spacer,
    });
    expect(node).toHaveLength(3);
  });

  it(`inserts spacer component between items`, () => {
    const node = flattenAndJoinNodes({
      children: [<div>1</div>, <div>2</div>],
      gap: 1,
      Spacer,
    });
    expect(node).toHaveLength(3);
  });

  it(`inserts spacer and divider component between items`, () => {
    const node = flattenAndJoinNodes({
      children: [<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>],
      divider: Divider,
      gap: 2,
      Spacer,
    });
    expect(node).toHaveLength(10);
  });
});
