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
      <ListCellFallback disableRandomRectWidth title spacingVariant="condensed" />
      <ListCellFallback description disableRandomRectWidth title spacingVariant="condensed" />
      <ListCellFallback detail disableRandomRectWidth title spacingVariant="condensed" />
      <ListCellFallback disableRandomRectWidth subdetail title spacingVariant="condensed" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        title
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        spacingVariant="condensed"
      />
      <ListCellFallback disableRandomRectWidth title media="icon" spacingVariant="condensed" />
      <ListCellFallback
        description
        disableRandomRectWidth
        title
        media="asset"
        spacingVariant="condensed"
      />
      <ListCellFallback
        detail
        disableRandomRectWidth
        title
        media="image"
        spacingVariant="condensed"
      />
      <ListCellFallback
        disableRandomRectWidth
        subdetail
        title
        media="avatar"
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        title
        media="icon"
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        media="asset"
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={0}
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={1}
        spacingVariant="condensed"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={2}
        spacingVariant="condensed"
      />
      <ListCellFallback disableRandomRectWidth title spacingVariant="compact" />
      <ListCellFallback description disableRandomRectWidth title spacingVariant="compact" />
      <ListCellFallback detail disableRandomRectWidth title spacingVariant="compact" />
      <ListCellFallback disableRandomRectWidth subdetail title spacingVariant="compact" />
      <ListCellFallback description detail disableRandomRectWidth title spacingVariant="compact" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        spacingVariant="compact"
      />
      <ListCellFallback disableRandomRectWidth title media="icon" spacingVariant="compact" />
      <ListCellFallback
        description
        disableRandomRectWidth
        title
        media="asset"
        spacingVariant="compact"
      />
      <ListCellFallback
        detail
        disableRandomRectWidth
        title
        media="image"
        spacingVariant="compact"
      />
      <ListCellFallback
        disableRandomRectWidth
        subdetail
        title
        media="avatar"
        spacingVariant="compact"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        title
        media="icon"
        spacingVariant="compact"
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        media="asset"
        spacingVariant="compact"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={0}
        spacingVariant="compact"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={1}
        spacingVariant="compact"
      />
      <ListCellFallback
        description
        detail
        subdetail
        title
        media="asset"
        rectWidthVariant={2}
        spacingVariant="compact"
      />
      <ListCellFallback
        disableRandomRectWidth
        title
        innerSpacing={innerSpacing}
        outerSpacing={outerSpacing}
      />
      <ListCellFallback disableRandomRectWidth helperText spacingVariant="condensed" />
      <ListCellFallback disableRandomRectWidth helperText title spacingVariant="condensed" />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        helperText
        subdetail
        title
        media="image"
        spacingVariant="compact"
        styles={{ helperText: { paddingLeft: 64 } }}
      />
      <ListCellFallback
        disableRandomRectWidth
        helperText
        title
        media="icon"
        spacingVariant="compact"
        styles={{ helperText: { paddingLeft: 48 } }}
      />
      <ListCellFallback
        disableRandomRectWidth
        helperText
        title
        media="icon"
        spacingVariant="compact"
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
