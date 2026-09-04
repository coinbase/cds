import React, { useCallback, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';
import { useLocation } from '@docusaurus/router';
import { useAnalytics } from '@site/src/utils/useAnalytics';

type FeedbackType = 'positive' | 'negative' | null;

export function FeedbackWidget() {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const { trackGtagEvent, postMetric } = useAnalytics();

  // Callback ref to focus the confirmation message when it's rendered
  const confirmationRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.focus();
    }
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      try {
        // Get the feedback type from the data attribute
        const type = event.currentTarget.dataset.feedbackType as FeedbackType;

        if (feedback === type) {
          return;
        }

        setFeedback(type);
        setSubmitted(true);

        // Track the feedback event with GA4
        trackGtagEvent({
          action: 'doc_feedback',
          category: 'Documentation',
          label: location.pathname,
          value: type === 'positive' ? 1 : -1,
        });

        // Track the feedback event with Coinbase analytics
        postMetric('cdsDocs', {
          command: 'feedback',
          arguments: type ?? 'unknown',
          context: location.pathname,
        });
      } catch (error) {
        // Log the error but don't disrupt the user experience
        console.error('Error handling feedback:', error);
      }
    },
    [feedback, location.pathname, trackGtagEvent, postMetric],
  );

  // Don't show feedback widget on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';
  if (isHomePage) {
    return null;
  }

  return (
    <div key={location.pathname}>
      {submitted ? (
        <VStack
          ref={confirmationRef}
          background="bgAlternate"
          borderRadius={500}
          gap={3}
          padding={4}
          tabIndex={-1} // Makes the element focusable without keyboard navigation
        >
          <Text font="title3">Thank you for your feedback!</Text>
        </VStack>
      ) : (
        <VStack
          aria-labelledby="feedback-heading"
          background="bgAlternate"
          borderRadius={500}
          gap={{ base: 3, phone: 1 }}
          padding={{ base: 4, phone: 2 }}
          role="region"
        >
          <Text as="h3" font="title3" id="feedback-heading">
            Is this page useful?
          </Text>
          <HStack aria-label="Page feedback options" gap={2} role="group">
            <Button
              compact
              startIconActive
              accessibilityLabel="Yes, this page is useful"
              data-feedback-type="positive"
              onClick={handleClick}
              startIcon="thumbsUp"
              variant="secondary"
            >
              Yes
            </Button>
            <Button
              compact
              startIconActive
              accessibilityLabel="No, this page is not useful"
              data-feedback-type="negative"
              onClick={handleClick}
              startIcon="thumbsDown"
              variant="secondary"
            >
              No
            </Button>
          </HStack>
        </VStack>
      )}
    </div>
  );
}
