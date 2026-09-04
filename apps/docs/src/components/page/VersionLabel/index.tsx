import { Box, type BoxDefaultElement, type BoxProps } from '@coinbase/cds-web/layout/Box';
import { Text } from '@coinbase/cds-web/typography/Text';
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
    case '@coinbase/cds-common':
    case '@coinbase/cds-web':
    case '@coinbase/cds-mobile':
      version = versions.cdsCommonVersion;
      break;
    case '@coinbase/cds-icons':
      version = versions.cdsIconsVersion;
      break;
    case '@coinbase/cds-illustrations':
      version = versions.cdsIllustrationsVersion;
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
