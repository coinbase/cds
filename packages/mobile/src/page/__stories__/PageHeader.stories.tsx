import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { LogoMark } from '../../icons';
import { Box, Divider, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { PageHeader } from '../PageHeader';

const exampleProps = {
  logoMark1: (
    <RemoteImage alt="btcLogoImage" shape="circle" size="m" source={assets.btc.imageUrl} />
  ),
  logoMark2: <LogoMark size={32} />,
  start1: (
    <Box>
      <IconButton
        transparent
        accessibilityLabel="Go Back"
        name="backArrow"
        onPress={NoopFn}
        testID="header-back-button"
      />
    </Box>
  ),
  title1: <Text font="title1">Page Title</Text>,
  title2: (
    <Box alignItems="center" flexGrow={1} justifyContent="center" width="100%">
      <Text ellipsizeMode="tail" font="title1" numberOfLines={1} style={{ textAlign: 'center' }}>
        Very Very Long Centered Title
      </Text>
    </Box>
  ),
  intermediary1: <Text font="headline">Intermediary Content</Text>,
  intermediary2: (
    <Box dangerouslySetBackground="red">
      <Text font="body">
        Hello there. This is a rather long text sentence since I do not have lorem ipsum handy.
        Hello there. This is a rather long text sentence since I do not have lorem ipsum handy.
      </Text>
    </Box>
  ),
  end1: (
    <IconButton
      active
      transparent
      accessibilityLabel="Show Info"
      name="info"
      onPress={NoopFn}
      testID="header-info-button"
    />
  ),
  end2: (
    <HStack alignItems="center" gap={1}>
      <Link to="https://cds.coinbase.com/components/link">
        <Text color="fgPrimary" font="headline">
          Help
        </Text>
      </Link>
      <HStack gap={0}>
        <IconButton
          transparent
          accessibilityLabel="Share"
          name="externalLink"
          onPress={NoopFn}
          testID="header-external-link-button"
        />
        <IconButton
          transparent
          accessibilityLabel="Close"
          name="close"
          onPress={NoopFn}
          testID="header-close-button"
        />
      </HStack>
    </HStack>
  ),
  end3: (
    <IconButton
      transparent
      accessibilityLabel="Close"
      name="close"
      onPress={NoopFn}
      testID="header-close-button"
    />
  ),
  end4: (
    <IconButton
      active
      transparent
      accessibilityLabel="Show Info"
      name="info"
      onPress={NoopFn}
      testID="header-info-button"
    />
  ),
  endButtons2: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Go Back" variant="secondary">
        Back
      </Button>
      <Button accessibilityLabel="Go Next" variant="primary">
        Next
      </Button>
    </ButtonGroup>
  ),
};
const PageHeaderScreen = () => {
  const theme = useTheme();

  const shiftEndStyles = {
    end: {
      paddingEnd: theme.space[1.5],
    },
  };

  const shiftStartStyles = {
    start: {
      paddingStart: theme.space[1.5],
    },
  };

  return (
    <ExampleScreen>
      <Example title="PageHeader Variants">
        <VStack gap={3}>
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end2}
            start={exampleProps.logoMark2}
            styles={shiftEndStyles}
            title={exampleProps.title1}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end2}
            styles={shiftEndStyles}
            title={exampleProps.title1}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            start={exampleProps.logoMark2}
            title={exampleProps.title1}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end2}
            start={exampleProps.logoMark2}
            styles={shiftEndStyles}
            title={exampleProps.intermediary1}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end2}
            start={exampleProps.logoMark2}
            styles={shiftEndStyles}
            title={exampleProps.title2}
          />
          <Divider />
          <PageHeader
            background="bg"
            end={exampleProps.end3}
            start={exampleProps.start1}
            styles={{ ...shiftStartStyles, ...shiftEndStyles }}
            title={exampleProps.intermediary1}
          />
          <Divider />
          <PageHeader
            background="bg"
            end={exampleProps.end4}
            start={exampleProps.start1}
            styles={{ ...shiftStartStyles, ...shiftEndStyles }}
            title={exampleProps.title1}
          />
          <Divider />
          <PageHeader
            background="bg"
            end={exampleProps.end4}
            start={exampleProps.start1}
            styles={{ ...shiftStartStyles, ...shiftEndStyles }}
            title={exampleProps.title2}
          />
          <Divider />
          <PageHeader
            background="bg"
            end={exampleProps.end4}
            start={exampleProps.start1}
            styles={{ ...shiftStartStyles, ...shiftEndStyles }}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end3}
            styles={shiftEndStyles}
            title={exampleProps.intermediary1}
          />
          <Divider />
          <PageHeader
            background="bgPrimaryWash"
            end={exampleProps.end2}
            start={exampleProps.logoMark2}
            styles={shiftEndStyles}
            title={exampleProps.intermediary2}
          />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default PageHeaderScreen;
