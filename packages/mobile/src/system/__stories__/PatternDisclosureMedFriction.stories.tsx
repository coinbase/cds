import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Text } from '../../typography/Text';

const PatternDisclosureMedFrictionScreen = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 2',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
    ],
    [],
  );

  const handleSecondaryPress = useCallback(() => {
    // open terms and conditions
  }, []);

  return (
    <ExampleScreen>
      <Example title="Pattern - Medium-Friction Disclosure">
        <Button onPress={setVisibleToTrue}>View MF Disclosure</Button>
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
          <ModalFooter
            direction="vertical"
            primaryAction={<Button onPress={setVisibleToFalse}>[Affirmative CTA]</Button>}
            secondaryAction={
              <Button onPress={handleSecondaryPress} variant="secondary">
                Terms and conditions
              </Button>
            }
          />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternDisclosureMedFrictionScreen;
