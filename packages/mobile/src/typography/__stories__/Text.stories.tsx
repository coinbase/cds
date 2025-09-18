import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../TextBody';
import { TextCaption } from '../TextCaption';
import { TextDisplay1 } from '../TextDisplay1';
import { TextDisplay2 } from '../TextDisplay2';
import { TextDisplay3 } from '../TextDisplay3';
import { TextHeadline } from '../TextHeadline';
import { TextLabel1 } from '../TextLabel1';
import { TextLabel2 } from '../TextLabel2';
import { TextLegal } from '../TextLegal';
import { TextTitle1 } from '../TextTitle1';
import { TextTitle2 } from '../TextTitle2';
import { TextTitle3 } from '../TextTitle3';
import { TextTitle4 } from '../TextTitle4';

const TextScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <TextDisplay1>Display1</TextDisplay1>
        <TextDisplay2>Display2</TextDisplay2>
        <TextDisplay3>Display3</TextDisplay3>
        <TextTitle1>Title1</TextTitle1>
        <TextTitle2>Title2</TextTitle2>
        <TextTitle3>Title3</TextTitle3>
        <TextTitle4>Title4</TextTitle4>
        <TextLabel1>Label1</TextLabel1>
        <TextLabel2>Label2</TextLabel2>
        <TextHeadline>Headline</TextHeadline>
        <TextBody>Body</TextBody>
        <TextCaption>Caption</TextCaption>
        <TextLegal>Legal</TextLegal>
      </Example>
      <Example title="Mono">
        <TextDisplay1 mono>Display1</TextDisplay1>
        <TextDisplay2 mono>Display2</TextDisplay2>
        <TextDisplay3 mono>Display3</TextDisplay3>
        <TextTitle1 mono>Title1</TextTitle1>
        <TextTitle2 mono>Title2</TextTitle2>
        <TextTitle3 mono>Title3</TextTitle3>
        <TextTitle4 mono>Title4</TextTitle4>
        <TextLabel1 mono>Label1</TextLabel1>
        <TextLabel2 mono>Label2</TextLabel2>
        <TextHeadline mono>Headline</TextHeadline>
        <TextBody mono>Body</TextBody>
        <TextCaption mono>Caption</TextCaption>
        <TextLegal mono>Legal</TextLegal>
      </Example>
    </ExampleScreen>
  );
};

export default TextScreen;
