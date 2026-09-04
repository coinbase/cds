import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';

const PatternDisclosureHighFrictionRiskScreen = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Risk item 1',
        checkboxLabel: "I understand that I won't be able to do X because of Y.",
        linkText: 'Learn more',
        linkUrl: 'https://www.coinbase.com',
      },
      {
        id: 2,
        headline: 'Risk item 2',
        checkboxLabel: "I understand that I won't be able to do X because of Y.",
        linkText: 'Learn more',
        linkUrl: 'https://www.coinbase.com',
      },
    ],
    [],
  );
  const initialCheckboxesState = useMemo(() => data.map(() => false), [data]);

  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

  const isCtaDisabled = useMemo(() => checkboxes.some((checked) => !checked), [checkboxes]);

  const handleCheckboxChange = useCallback(
    (index: number) => () => {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.map((checked, i) => (i === index ? !checked : checked)),
      );
    },
    [],
  );

  return (
    <ExampleScreen>
      <Example title="Pattern - High-Friction Risk Disclosure">
        <Button onPress={setVisibleToTrue}>View HFR Disclosure</Button>
        <Modal
          hideDividers
          accessibilityHint="Hint providing more context about the disclosure. Close this dialog to continue."
          accessibilityLabel="Title outlining risk in 1-2 lines"
          onRequestClose={setVisibleToFalse}
          visible={visible}
        >
          <ModalHeader
            backAccessibilityHint="Go back to the previous dialog"
            backAccessibilityLabel="Back"
            closeAccessibilityHint="Close this dialog to continue"
            closeAccessibilityLabel="Close"
            onBackButtonClick={setVisibleToFalse}
          />
          <ModalBody>
            <Box alignItems="center">
              <SpotRectangle name="accessToAdvancedCharts" />
            </Box>
            <Text font="title3" paddingTop={4}>
              Title outlining risk in 1-2 lines
            </Text>
            <Text font="label2" paddingTop={1}>
              Body text saying &quot;Before you [verb], here are a few things you need to understand
              about [action].&quot;
            </Text>
            <VStack gap={3} paddingY={3}>
              {data.map(({ id, headline, checkboxLabel, linkText, linkUrl }, index) => (
                <VStack key={id} gap={1}>
                  <Text font="headline">{headline}</Text>
                  <HStack alignItems="center" gap={1}>
                    <Checkbox
                      accessibilityHint="Toggle acknowledgment of this risk item. All risk items must be acknowledged to proceed."
                      accessibilityLabel={checkboxLabel}
                      checked={checkboxes[index]}
                      onChange={handleCheckboxChange(index)}
                    />
                    <Text font="label2" style={{ flex: 1 }}>
                      {checkboxLabel}{' '}
                      <Link underline to={linkUrl}>
                        {linkText}
                      </Link>
                    </Text>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter
            primaryAction={
              <Button disabled={isCtaDisabled} onPress={setVisibleToFalse}>
                {`[${isCtaDisabled ? 'Disabled' : 'Enabled'} CTA]`}
              </Button>
            }
          />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternDisclosureHighFrictionRiskScreen;
