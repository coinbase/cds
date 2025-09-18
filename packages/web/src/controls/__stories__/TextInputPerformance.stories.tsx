import { css } from '@linaria/core';
import { withPerformance } from 'storybook-addon-performance';

import { TextInput } from '../TextInput';

export default {
  title: 'Components/Inputs/TextInputPerformance',
  component: TextInput,
  decorators: [withPerformance],
  excludeStories: [
    'HTMLInput',
    'HundredCDSComponents',
    'HundredHTMLComponent',
    'ThousandCDSComponents',
    'ThousandHTMLComponent',
  ],
};

const borderCss = css`
  border-width: 1px;
`;

export const CDSTextInput = () => {
  return <TextInput compact align="start" helperText="Helper Text" label="Label" />;
};

export const HTMLInput = () => {
  return <input required className={borderCss} id="name" name="name" type="text" />;
};

function generateHTMLComponent(n: number) {
  const divs = [];

  for (let i = 0; i < n; i += 1) {
    divs.push(<HTMLInput key={i} />);
  }

  return divs;
}

function generateComponents(n: number) {
  const components = [];

  for (let i = 0; i < n; i += 1) {
    components.push(<CDSTextInput key={i} />);
  }

  return components;
}

const HundredCDSComponents = () => {
  return generateComponents(100);
};

const HundredHTMLComponent = () => {
  return generateHTMLComponent(100);
};

const ThousandCDSComponents = () => {
  return generateComponents(1000);
};

const ThousandHTMLComponent = () => {
  return generateHTMLComponent(1000);
};

export { HundredCDSComponents, HundredHTMLComponent, ThousandCDSComponents, ThousandHTMLComponent };
