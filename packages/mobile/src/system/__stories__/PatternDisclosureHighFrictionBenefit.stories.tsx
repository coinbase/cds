import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Text } from '../../typography/Text';

const PatternDisclosureHighFrictionBenefitScreen = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullet outlining benefits.',
      },
      {
        id: 2,
        headline: 'Benefit to highlight 2',
        body: 'Bullet outlining benefits.',
      },
    ],
    [],
  );

  return (
    <ExampleScreen>
      <Example title="Pattern - High-Friction Benefit Disclosure">
        <Button onPress={setVisibleToTrue}>View HFB Disclosure</Button>
        <Modal
          hideDividers
          accessibilityHint="Hint providing more context about the disclosure. Close this dialog to continue."
          accessibilityLabel="Title outlining the benefit in 1-2 lines"
          onRequestClose={setVisibleToFalse}
          visible={visible}
        >
          <ModalHeader
            closeAccessibilityHint="Close this dialog to continue"
            closeAccessibilityLabel="Close"
          />
          <ModalBody>
            <Box alignItems="center">
              <SpotRectangle name="accessToAdvancedCharts" />
            </Box>
            <Text font="title3" paddingTop={4}>
              Title outlining the benefit in 1-2 lines
            </Text>
            <Text font="label2" paddingTop={1}>
              Body text saying &quot;By verbing, you will get X, Y, Z.&quot;
            </Text>
            <VStack gap={3} paddingY={3}>
              {data.map(({ id, headline, body }) => (
                <VStack key={id} gap={1}>
                  <HStack alignItems="center" gap={2}>
                    <Icon color="fg" name="checkmark" size="s" />
                    <Text font="headline" style={{ flex: 1 }}>
                      {headline}
                    </Text>
                  </HStack>
                  <Text font="body" paddingStart={4}>
                    {body}
                  </Text>
                </VStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter primaryAction={<Button onPress={setVisibleToFalse}>[CTA]</Button>} />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternDisclosureHighFrictionBenefitScreen;
