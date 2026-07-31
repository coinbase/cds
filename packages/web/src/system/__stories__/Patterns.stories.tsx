import { useCallback, useMemo, useState } from 'react';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Icon } from '../../icons/Icon';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { FullscreenAlert, Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';

export default {
  title: 'Components/Patterns',
};

export const Error = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Button onClick={() => setVisible(true)}>View Error</Button>
      <FullscreenAlert
        body="Sorry we couldn't find what you were looking for."
        closeAccessibilityLabel="Close modal"
        heroSquare="errorWeb404"
        onPreferredActionPress={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
        preferredActionLabel="Back to Coinbase"
        title="Page not found"
        visible={visible}
      />
    </>
  );
};

export const DisclosureLowFriction = () => {
  const [visible, setVisible] = useState(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
      {
        id: 3,
        headline: 'Risk to highlight 2',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
    ],
    [],
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>View Low-Friction Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dlf-title"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dlf-title" paddingTop={4}>
            Title outlining the action and benefit in 1-2 lines
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setVisible(false)}>[Affirmative CTA]</Button>}
          secondaryAction={
            <Button as="a" href="https://www.coinbase.com" target="_blank" variant="secondary">
              Terms and conditions
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export const DisclosureMediumFriction = () => {
  const [visible, setVisible] = useState(true);

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

  return (
    <>
      <Button onClick={() => setVisible(true)}>View Medium-Friction Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dmf-title"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dmf-title" paddingTop={4}>
            Title outlining the benefit in 1-2 lines
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setVisible(false)}>[Affirmative CTA]</Button>}
          secondaryAction={
            <Button as="a" href="https://www.coinbase.com" target="_blank" variant="secondary">
              Terms and conditions
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export const DisclosureHighFrictionBenefit = () => {
  const [visible, setVisible] = useState(true);

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
    <>
      <Button onClick={() => setVisible(true)}>View High-Friction Benefit Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dhfb-title"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dhfb-title" paddingTop={4}>
            Title outlining the benefit in 1-2 lines
          </Text>
          <Text as="p" display="block" font="label2" paddingTop={1}>
            Body text saying &quot;By verbing, you will get X, Y, Z.&quot;
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={() => setVisible(false)}>[CTA]</Button>} />
      </Modal>
    </>
  );
};

export const DisclosureHighFrictionRisk = () => {
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
  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

  const checkboxLabelStyles = useMemo(() => ({ cursor: 'pointer' }), []);
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
    <>
      <Button onClick={() => setVisible(true)}>View High-Friction Risk Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dhfr-title"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={() => setVisible(false)}
        />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dhfr-title" paddingTop={4}>
            Title outlining risk in 1-2 lines
          </Text>
          <Text as="p" display="block" font="label2" paddingTop={1}>
            Body text saying &quot;Before you [verb], here are a few things you need to understand
            about [action].&quot;
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({ id, headline, checkboxLabel, linkText, linkUrl }, index) => (
              <VStack key={id} as="li" gap={1}>
                <Text as="h3" display="block" font="headline">
                  {headline}
                </Text>
                <HStack alignItems="center" as="label" gap={1} style={checkboxLabelStyles}>
                  <Checkbox checked={checkboxes[index]} onChange={handleCheckboxChange(index)} />
                  <Text as="span" font="label2">
                    {checkboxLabel}{' '}
                    <Link openInNewWindow underline href={linkUrl}>
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
            <Button disabled={isCtaDisabled} onClick={() => setVisible(false)}>
              {`[${isCtaDisabled ? 'Disabled' : 'Enabled'} CTA]`}
            </Button>
          }
        />
      </Modal>
    </>
  );
};
