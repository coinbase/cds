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
      <ListCellFallback disableRandomRectWidth title layoutSpacing="hug" />
      <ListCellFallback description disableRandomRectWidth title layoutSpacing="hug" />
      <ListCellFallback detail disableRandomRectWidth title layoutSpacing="hug" />
      <ListCellFallback disableRandomRectWidth subdetail title layoutSpacing="hug" />
      <ListCellFallback description detail disableRandomRectWidth title layoutSpacing="hug" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        layoutSpacing="hug"
      />
      <ListCellFallback disableRandomRectWidth title layoutSpacing="hug" media="icon" />
      <ListCellFallback
        description
        disableRandomRectWidth
        title
        layoutSpacing="hug"
        media="asset"
      />
      <ListCellFallback detail disableRandomRectWidth title layoutSpacing="hug" media="image" />
      <ListCellFallback disableRandomRectWidth subdetail title layoutSpacing="hug" media="avatar" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        title
        layoutSpacing="hug"
        media="icon"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        layoutSpacing="hug"
        media="asset"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="hug"
        media="asset"
        rectWidthVariant={0}
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="hug"
        media="asset"
        rectWidthVariant={1}
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="hug"
        media="asset"
        rectWidthVariant={2}
      />
      <ListCellFallback disableRandomRectWidth title layoutSpacing="compact" />
      <ListCellFallback description disableRandomRectWidth title layoutSpacing="compact" />
      <ListCellFallback detail disableRandomRectWidth title layoutSpacing="compact" />
      <ListCellFallback disableRandomRectWidth subdetail title layoutSpacing="compact" />
      <ListCellFallback description detail disableRandomRectWidth title layoutSpacing="compact" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        layoutSpacing="compact"
      />
      <ListCellFallback disableRandomRectWidth title layoutSpacing="compact" media="icon" />
      <ListCellFallback
        description
        disableRandomRectWidth
        title
        layoutSpacing="compact"
        media="asset"
      />
      <ListCellFallback detail disableRandomRectWidth title layoutSpacing="compact" media="image" />
      <ListCellFallback
        disableRandomRectWidth
        subdetail
        title
        layoutSpacing="compact"
        media="avatar"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        title
        layoutSpacing="compact"
        media="icon"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        layoutSpacing="compact"
        media="asset"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="compact"
        media="asset"
        rectWidthVariant={0}
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="compact"
        media="asset"
        rectWidthVariant={1}
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        layoutSpacing="compact"
        media="asset"
        rectWidthVariant={2}
      />
      <ListCellFallback
        disableRandomRectWidth
        title
        innerSpacing={innerSpacing}
        outerSpacing={outerSpacing}
      />
      <ListCellFallback disableRandomRectWidth helperText layoutSpacing="hug" />
      <ListCellFallback disableRandomRectWidth helperText title layoutSpacing="hug" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        helperText
        subdetail
        title
        layoutSpacing="compact"
        media="image"
        styles={{ helperText: { paddingLeft: 64 } }}
      />
      <ListCellFallback
        disableRandomRectWidth
        helperText
        title
        layoutSpacing="compact"
        media="icon"
        styles={{ helperText: { paddingLeft: 48 } }}
      />
      <ListCellFallback
        disableRandomRectWidth
        helperText
        title
        layoutSpacing="compact"
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
