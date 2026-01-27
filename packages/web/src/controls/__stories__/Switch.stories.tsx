import React, { useState } from 'react';
import { css } from '@linaria/core';

import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Switch } from '../Switch';

const darkModeWrapperCss = css`
  padding: 20px;
  /* All stories have the light story container. This offsets the light story container's padding. */
  margin: -20px;
  background-color: var(--color-bg);
`;

const DarkModeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={theme}>
      <div className={darkModeWrapperCss}>{children}</div>
    </ThemeProvider>
  );
};

export const Normal = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
      Normal
    </Switch>
  );
};

export const CustomColors = () => {
  const [checked, setChecked] = useState(false);
  return (
    <VStack gap={2}>
      <Switch
        checked={checked}
        controlColor="bgNegative"
        onChange={() => setChecked((prevChecked) => !prevChecked)}
      >
        Control color prop
      </Switch>
      <Switch
        background={checked ? 'accentBoldPurple' : 'bgNegative'}
        borderColor={checked ? 'bgPositive' : 'bgPrimary'}
        borderWidth={200}
        checked={checked}
        color="bgPrimary"
        controlColor="bgPositive"
        onChange={() => setChecked((prevChecked) => !prevChecked)}
      >
        Style props
      </Switch>
    </VStack>
  );
};
export const DarkNormal = () => {
  const [checked, setChecked] = useState(false);
  return (
    <DarkModeWrapper>
      <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
        Normal
      </Switch>
    </DarkModeWrapper>
  );
};

export const NoLabel = () => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)} />;
};
// This is intention to check the view of Switch without any text
NoLabel.parameters = {
  a11y: { config: { rules: [{ id: 'label', enabled: false }] } },
};

export const On = () => <Switch checked>On</Switch>;

export const DisabledOff = () => <Switch disabled>Disabled off</Switch>;

export const DisabledOn = () => (
  <Switch checked disabled>
    Disabled on
  </Switch>
);

export const DarkNormalOn = () => (
  <DarkModeWrapper>
    <Switch checked>On</Switch>
  </DarkModeWrapper>
);

export const DarkNormalDisabledOff = () => (
  <DarkModeWrapper>
    <Switch disabled>Disabled off</Switch>
  </DarkModeWrapper>
);

export const DarkNormalDisabledOn = () => (
  <DarkModeWrapper>
    <Box>
      <Switch checked disabled>
        Disabled on
      </Switch>
    </Box>
  </DarkModeWrapper>
);

export const MultiLineLabel = () => (
  <Box width="250px">
    <Switch>
      This switch has a multi-line label. The switch and label should align at the top.
    </Switch>
  </Box>
);

export const Elevation = () => (
  <Box>
    <Switch elevation={1}>Elevation</Switch>
  </Box>
);

export default {
  title: 'Components/Switch',
  component: Switch,
};
