/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <ListCell
        selected
        description="Some description of the asset"
        detail="$334,239.03"
        intermediary={<CellMedia name="chartLine" type="icon" />}
        onClick={() => {}}
        priority="start"
        subdetail="+4.06%"
        title="Asset with a really long name"
        variant="positive"
      />,
    );
  });
});
