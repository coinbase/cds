import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ContentCellFallback } from '../ContentCellFallback';

const Fallbacks = () => {
  return (
    <>
      <ContentCellFallback disableRandomRectWidth title spacingVariant="condensed" />
      <ContentCellFallback description disableRandomRectWidth title spacingVariant="condensed" />
      <ContentCellFallback disableRandomRectWidth meta title spacingVariant="condensed" />
      <ContentCellFallback disableRandomRectWidth subtitle title spacingVariant="condensed" />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        title
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        subtitle
        title
        spacingVariant="condensed"
      />
      <ContentCellFallback disableRandomRectWidth title media="icon" spacingVariant="condensed" />
      <ContentCellFallback
        description
        disableRandomRectWidth
        title
        media="asset"
        spacingVariant="condensed"
      />
      <ContentCellFallback
        disableRandomRectWidth
        meta
        title
        media="image"
        spacingVariant="condensed"
      />
      <ContentCellFallback
        disableRandomRectWidth
        subtitle
        title
        media="avatar"
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        title
        media="icon"
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        subtitle
        title
        media="asset"
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        subtitle
        title
        media="asset"
        rectWidthVariant={0}
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        subtitle
        title
        media="asset"
        rectWidthVariant={1}
        spacingVariant="condensed"
      />
      <ContentCellFallback
        description
        subtitle
        title
        media="asset"
        rectWidthVariant={2}
        spacingVariant="condensed"
      />
    </>
  );
};

const ContentCellFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellFallbackScreen;
