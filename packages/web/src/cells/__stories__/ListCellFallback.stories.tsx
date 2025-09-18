import React from 'react';

import type { CellSpacing } from '../../cells/Cell';
import { ListCellFallback } from '../ListCellFallback';

export default {
  title: 'Components/Cells/ListCellFallback',
  component: ListCellFallback,
};

const innerSpacing: CellSpacing = {
  paddingX: 2,
  paddingY: 4,
};
const outerSpacing: CellSpacing = {
  paddingX: 10,
  paddingY: 8,
};

export const Fallbacks = () => {
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
      <ListCellFallback disableRandomRectWidth helperText title />
      <ListCellFallback description disableRandomRectWidth helperText title />
      <ListCellFallback
        description
        disableRandomRectWidth
        helperText
        title
        media="pictogram"
        styles={{
          helperText: {
            paddingLeft: 48,
          },
        }}
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        helperText
        subdetail
        title
        media="asset"
        styles={{
          helperText: {
            paddingLeft: 48,
          },
        }}
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        helperText
        subdetail
        title
        media="image"
        styles={{
          helperText: {
            paddingLeft: 64,
          },
        }}
      />
      <ListCellFallback
        description
        detail
        disableRandomRectWidth
        subdetail
        title
        innerSpacing={innerSpacing}
        media="asset"
        outerSpacing={outerSpacing}
      />
    </>
  );
};
