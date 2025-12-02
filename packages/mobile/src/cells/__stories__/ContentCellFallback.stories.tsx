import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ContentCellFallback } from '../ContentCellFallback';

const Fallbacks = () => {
  return (
    <>
      <ContentCellFallback disableRandomRectWidth spacingVariant="condensed" title />
      <ContentCellFallback description disableRandomRectWidth spacingVariant="condensed" title />
      <ContentCellFallback disableRandomRectWidth spacingVariant="condensed" meta title />
      <ContentCellFallback disableRandomRectWidth spacingVariant="condensed" subtitle title />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        spacingVariant="condensed"
        title
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        spacingVariant="condensed"
        subtitle
        title
      />
      <ContentCellFallback disableRandomRectWidth spacingVariant="condensed" title media="icon" />
      <ContentCellFallback
        description
        disableRandomRectWidth
        spacingVariant="condensed"
        title
        media="asset"
      />
      <ContentCellFallback
        disableRandomRectWidth
        meta
        spacingVariant="condensed"
        title
        media="image"
      />
      <ContentCellFallback
        disableRandomRectWidth
        spacingVariant="condensed"
        subtitle
        title
        media="avatar"
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        spacingVariant="condensed"
        title
        media="icon"
      />
      <ContentCellFallback
        description
        disableRandomRectWidth
        meta
        spacingVariant="condensed"
        subtitle
        title
        media="asset"
      />
      <ContentCellFallback
        description
        media="asset"
        spacingVariant="condensed"
        subtitle
        title
        rectWidthVariant={0}
      />
      <ContentCellFallback
        description
        media="asset"
        spacingVariant="condensed"
        subtitle
        title
        rectWidthVariant={1}
      />
      <ContentCellFallback
        description
        media="asset"
        spacingVariant="condensed"
        subtitle
        title
        rectWidthVariant={2}
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
