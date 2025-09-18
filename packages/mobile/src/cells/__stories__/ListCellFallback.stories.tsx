import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { CellSpacing } from '../Cell';
import { ListCellFallback } from '../ListCellFallback';

const innerSpacing: CellSpacing = {
  paddingX: 2,
  paddingY: 4,
};
const outerSpacing: CellSpacing = {
  paddingX: 10,
  paddingY: 8,
};

const Fallbacks = () => {
  return (
    <>
      <ListCellFallback disableRandomRectWidth title />
      <ListCellFallback description disableRandomRectWidth title />
      <ListCellFallback detail disableRandomRectWidth title />
      <ListCellFallback disableRandomRectWidth subdetail title />
      <ListCellFallback description detail disableRandomRectWidth title />
      <ListCellFallback description detail disableRandomRectWidth subdetail title />
      <ListCellFallback disableRandomRectWidth title media="icon" />
      <ListCellFallback description disableRandomRectWidth title media="asset" />
      <ListCellFallback detail disableRandomRectWidth title media="image" />
      <ListCellFallback disableRandomRectWidth subdetail title media="avatar" />
      <ListCellFallback description detail disableRandomRectWidth title media="icon" />
      <ListCellFallback description detail disableRandomRectWidth subdetail title media="asset" />
      <ListCellFallback description detail subdetail title media="asset" rectWidthVariant={0} />
      <ListCellFallback description detail subdetail title media="asset" rectWidthVariant={1} />
      <ListCellFallback description detail subdetail title media="asset" rectWidthVariant={2} />
      <ListCellFallback compact disableRandomRectWidth title />
      <ListCellFallback compact description disableRandomRectWidth title />
      <ListCellFallback compact detail disableRandomRectWidth title />
      <ListCellFallback compact disableRandomRectWidth subdetail title />
      <ListCellFallback compact description detail disableRandomRectWidth title />
      <ListCellFallback compact description detail disableRandomRectWidth subdetail title />
      <ListCellFallback compact disableRandomRectWidth title media="icon" />
      <ListCellFallback compact description disableRandomRectWidth title media="asset" />
      <ListCellFallback compact detail disableRandomRectWidth title media="image" />
      <ListCellFallback compact disableRandomRectWidth subdetail title media="avatar" />
      <ListCellFallback compact description detail disableRandomRectWidth title media="icon" />
      <ListCellFallback
        compact
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        media="asset"
      />
      <ListCellFallback
        compact
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={0}
      />
      <ListCellFallback
        compact
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={1}
      />
      <ListCellFallback
        compact
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={2}
      />
      <ListCellFallback
        disableRandomRectWidth
        title
        innerSpacing={innerSpacing}
        outerSpacing={outerSpacing}
      />
      <ListCellFallback disableRandomRectWidth helperText />
      <ListCellFallback disableRandomRectWidth helperText title />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        helperText
        subdetail
        title
        media="image"
        styles={{ helperText: { paddingLeft: 64 } }}
      />
      <ListCellFallback
        disableRandomRectWidth
        helperText
        title
        media="icon"
        styles={{ helperText: { paddingLeft: 48 } }}
      />
      <ListCellFallback
        compact
        disableRandomRectWidth
        helperText
        title
        media="icon"
        styles={{ helperText: { paddingLeft: 48 } }}
      />
    </>
  );
};

const ListCellFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExampleScreen>
  );
};

export default ListCellFallbackScreen;
