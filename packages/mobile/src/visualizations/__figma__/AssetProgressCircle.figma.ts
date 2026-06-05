// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=45256-228
// source=packages/mobile/src/visualizations/ProgressCircle.tsx
// component=ProgressCircle
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma "Sizing" maps to the numeric pixel size used by ProgressCircle
const size = instance.getEnum('Sizing', {
  m: 24,
  l: 32,
  xl: 40,
  xxl: 48,
  xxxl: 56,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ProgressCircle
  size={${size}}
  weight="thin"
  progress={0.25}
  contentNode={
    <Box height="100%" padding={0.25} width="100%">
      <RemoteImage
        alt="Asset name"
        shape="circle"
        source="https://example.com/asset.png"
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  }
/>`,
  imports: [
    'import { ProgressCircle } from "@coinbase/cds-mobile/visualizations"',
    'import { Box } from "@coinbase/cds-mobile/layout"',
    'import { RemoteImage } from "@coinbase/cds-mobile/media"',
  ],
  id: 'asset-progress-circle-mobile',
  metadata: { nestable: true },
};
