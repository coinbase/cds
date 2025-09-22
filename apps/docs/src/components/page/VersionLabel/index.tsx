import { Box, type BoxDefaultElement, type BoxProps } from '@cbhq/cds-web/layout/Box';
import { Text } from '@cbhq/cds-web/typography/Text';
import { useCDSVersions } from '@site/src/hooks/useCDSVersions';

export type VersionLabelProps = Omit<BoxProps<BoxDefaultElement>, 'children'> & {
  packageName: string;
};

export const VersionLabel = ({
  packageName,
  position = 'relative',
  background = 'bgSecondary',
  borderRadius = 700,
  font = 'label1',
  ...props
}: VersionLabelProps) => {
  const versions = useCDSVersions();

  let version = null;

  switch (packageName) {
    case '@cbhq/cds-common':
    case '@cbhq/cds-web':
    case '@cbhq/cds-mobile':
      version = versions.cdsCommonVersion;
      break;
    case '@cbhq/cds-icons':
      version = versions.cdsIconsVersion;
      break;
    case '@cbhq/cds-illustrations':
      version = versions.cdsIllustrationsVersion;
      break;
    case '@cbhq/cds-web-visualization':
      version = versions.cdsWebVisualizationVersion;
      break;
    case '@cbhq/cds-mobile-visualization':
      version = versions.cdsMobileVisualizationVersion;
      break;
    default:
      throw new Error(`VersionLabel received invalid "packageName" prop: ${packageName}`);
  }

  return (
    <Box position={position} {...props}>
      <Text
        background={background}
        borderRadius={borderRadius}
        font={font}
        paddingX={1}
        paddingY={0.5}
      >
        {packageName}@{version}
      </Text>
    </Box>
  );
};
