import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

export type AccessibilityAnnouncerProps = Omit<
  {
    /** The aria-live attribute
     * @default polite
     */
    politeness?: React.AriaAttributes['aria-live'];
    /** The message to announce */
    message?: string | null;
  },
  'children'
> &
  SharedProps;

const DISPLAY_MESSAGE_MS = 500; // Needs to be *just* long enough for screen readers to pick it up
let timerId: NodeJS.Timeout;

const baseCss = css`
  border: 0;
  clip: rect(0px, 0px, 0px, 0px);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
  display: block;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: visible;
  white-space: nowrap;
  width: 1px;
`;

export const AccessibilityAnnouncer = memo(
  forwardRef(
    (
      {
        message,
        politeness = 'polite',
        testID = 'cds-accessibility-announcer',
      }: AccessibilityAnnouncerProps,
      forwardedRef: React.ForwardedRef<HTMLParagraphElement>,
    ) => {
      /** REMOVE NODE AFTER ONE SECOND
       * While ARIA provides methods to allow only changes or methods that force the entire region to announce those methods are not full proof. To be robust and compatible with all screen readers we should clear the live region after each usage. This ensures that all screen reader and browser combinations will get the announcement. Here is a compatibility test and some bugs found even now with aria-live regions.
       * @link https://terrillthompson.com/tests/aria/live-scores.html
       * */
      const [isVisible, setIsVisible] = useState(true);
      const messageRef = useRef<HTMLParagraphElement>(null);
      const mergedRef = useMergeRefs(forwardedRef, messageRef);

      useEffect(() => {
        setIsVisible(true);

        // Hide the message immediately after it mounts
        if (message) {
          timerId = setTimeout(() => {
            setIsVisible(false);
          }, DISPLAY_MESSAGE_MS);
        }

        // Cleanup
        return () => clearTimeout(timerId);
      }, [message, setIsVisible]);

      return (
        <div aria-atomic aria-live={politeness} className={baseCss} data-testid={testID}>
          {isVisible && (
            <p ref={mergedRef} data-testid={`${testID}--message`}>
              {message}
            </p>
          )}
        </div>
      );
    },
  ),
);

AccessibilityAnnouncer.displayName = 'AccessibilityAnnouncer';
