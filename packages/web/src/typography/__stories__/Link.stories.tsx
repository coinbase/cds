import React from 'react';
import { BrowserRouter as Router, Link as RRLink } from 'react-router-dom';
import { noop } from '@coinbase/cds-utils';

import { Link } from '../Link';
import { Text } from '../Text';

export const Default = () => (
  <div>
    <Link href="https://www.google.com/">Default</Link>
    <br />
    <Link as="button" onClick={noop}>
      As a button
    </Link>
  </div>
);

Default.parameters = {
  a11y: {
    options: {
      rules: {
        'target-size': { enabled: false },
      },
    },
  },
};

export const VariantBody = () => (
  <Link font="body" href="https://www.google.com/">
    Body
  </Link>
);

export const NegativeColor = () => (
  <div>
    <Link color="fgNegative" font="headline" href="https://www.google.com/">
      Negative
    </Link>
  </div>
);

export const Underline = () => (
  <div>
    <Link underline href="https://www.google.com/">
      Default
    </Link>
    <br />
    <Link underline as="button" onClick={noop}>
      As a button
    </Link>
    <br />
    <Link underline font="body" href="https://www.google.com/">
      Body
    </Link>
    <br />
    <Link underline color="fgNegative" font="headline" href="https://www.google.com/">
      Negative
    </Link>
  </div>
);

Underline.parameters = {
  a11y: {
    options: {
      rules: {
        'target-size': { enabled: false },
      },
    },
  },
};

export const InAParagraph = () => (
  <div>
    <Text as="p" display="block" font="body">
      This is a paragraph, and we can include inline links{' '}
      <Link underline href="https://www.coinbase.com">
        with underlines
      </Link>{' '}
      by default. You dont have to do anything to get them!
    </Text>
    <Text as="p" display="block" font="body">
      {`This one however... It is a paragraph, but we can still set underline="false" to opt out of
      the a11y support `}
      <Link href="https://www.coinbase.com">without underlines</Link> . But why? Please dont do this
    </Text>
  </div>
);

export const InheritParentTextStyles = () => (
  <div>
    <Text font="body">
      Go here: <Link href="https://www.coinbase.com">Inherited</Link>
    </Text>
  </div>
);

export const DifferentTextStyle = () => (
  <div>
    <Text display="inline" font="body">
      Go here:{' '}
      <Link font="title3" href="https://www.coinbase.com">
        Title3
      </Link>
    </Text>
  </div>
);

export const OpenWindowInExistingTab = () => (
  <div>
    <Link font="title1" href="https://www.google.com/" target="_blank">
      Default
    </Link>
  </div>
);

export const SetsRelToNorefferer = () => (
  <div>
    <Link font="title2" href="https://www.google.com/" rel="noreferrer">
      Default
    </Link>
  </div>
);

export const SetsRelToNoopener = () => (
  <div>
    <Link font="title3" href="https://www.google.com/" rel="noopener">
      Default
    </Link>
  </div>
);

export const OnClick = () => (
  <div>
    <Link font="headline" href="#tagname" onClick={noop} rel="noopener">
      Link onClick
    </Link>
  </div>
);

export const RenderContainer = () => (
  <div>
    <Router>
      <Link as={RRLink} color="fgPrimary" font="body" onClick={noop} to="/invoices">
        Test renderContainer
      </Link>
    </Router>
  </div>
);

export const RenderContainerColor = () => (
  <div>
    <Router>
      <Link as={RRLink} color="fgNegative" font="label1" onClick={noop} to="/invoices">
        Test renderContainer
      </Link>
    </Router>
  </div>
);

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    a11y: { config: { rules: [{ id: 'touch-target', enabled: false }] } },
  },
};
