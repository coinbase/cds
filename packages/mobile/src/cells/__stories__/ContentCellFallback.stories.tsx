import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ContentCellFallback } from '../ContentCellFallback';

const Fallbacks = () => {
  return (
    <>
      <ContentCellFallback disableRandomRectWidth title />
      <ContentCellFallback description disableRandomRectWidth title />
      <ContentCellFallback disableRandomRectWidth meta title />
      <ContentCellFallback disableRandomRectWidth subtitle title />
      <ContentCellFallback description disableRandomRectWidth meta title />
      <ContentCellFallback description disableRandomRectWidth meta subtitle title />
      <ContentCellFallback disableRandomRectWidth title media="icon" />
      <ContentCellFallback description disableRandomRectWidth title media="asset" />
      <ContentCellFallback disableRandomRectWidth meta title media="image" />
      <ContentCellFallback disableRandomRectWidth subtitle title media="avatar" />
      <ContentCellFallback description disableRandomRectWidth meta title media="icon" />
      <ContentCellFallback description disableRandomRectWidth meta subtitle title media="asset" />
      <ContentCellFallback description meta subtitle title media="asset" rectWidthVariant={0} />
      <ContentCellFallback description meta subtitle title media="asset" rectWidthVariant={1} />
      <ContentCellFallback description meta subtitle title media="asset" rectWidthVariant={2} />
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
