import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';

import { cx } from '../../cx';
import { useA11yLabels } from '../../hooks/useA11yLabels';
import { VStack } from '../../layout';
import { breakpoints } from '../../styles/media';
import { type FocusTrapProps } from '../FocusTrap';

import { FullscreenModalHeader } from './FullscreenModalHeader';
import { FullscreenModalLayout } from './FullscreenModalLayout';
import type { ModalProps } from './Modal';
import type { ModalHeaderProps } from './ModalHeader';

export type FullscreenModalProps = {
  /**
   * The logo to display
   */
  logo?: React.ReactElement;
  /**
   * Title displayed in the Fullscreen Modal header.
   */
  title?: string;
  /**
   * Primary content element. Primary content is where the core of the task or information should live.
   */
  primaryContent: React.ReactElement;
  /**
   * Class applied to the primary content element
   */
  primaryContentClassName?: string;
  /**
   * Secondary content element. Secondary content is supplemental information.
   */
  secondaryContent?: React.ReactElement;
  /**
   * Class applied to the secondary content element
   */
  secondaryContentClassName?: string;
  /**
   * Class applied to the content container element
   */
  contentContainerClassName?: string;
  /**
   * Hide header bottom divider
   * @default false
   */
  hideDivider?: boolean;
  /**
   * Show divider between primary and secondary content
   * @default false
   */
  showSecondaryContentDivider?: boolean;
  /** Apply styles to content. */
  contentStyle?: React.CSSProperties;
} & Pick<
  ModalProps,
  | 'visible'
  | 'onRequestClose'
  | 'disablePortal'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'testID'
  | 'zIndex'
  | 'role'
  | 'onDidClose'
  | 'shouldCloseOnEscPress'
  | 'disableFocusTrap'
  | 'focusTabIndexElements'
  | 'restoreFocusOnUnmount'
> &
  Pick<ModalHeaderProps, 'closeAccessibilityLabel'> &
  Pick<FocusTrapProps, 'disableFocusTrap' | 'focusTabIndexElements'>;

const contentMaxWidth = 800;
const secondaryContentWidth = 400;
const paddingStartSmall = 80;
const paddingStartLarge = 240;

const primaryContentContainerCss = css`
  margin-bottom: var(--space-4);

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    max-width: ${contentMaxWidth}px;
    width: 100%;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    padding: var(--space-4) 0;
    margin-inline-end: var(--space-4);
    margin-bottom: 0;
  }
`;

const secondaryContentContainerCss = css`
  width: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    max-width: ${contentMaxWidth}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    width: ${secondaryContentWidth}px;
    padding: var(--space-4) 0 0 0;
  }
`;

const secondaryContentDividerCss = css`
  padding: var(--space-4) 0 0 0;
  border-top: 1px solid var(--color-bgLine);

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    width: calc(${secondaryContentWidth}px + var(--space-4));
    padding: var(--space-4) 0 0 var(--space-4);
    border-top: 0;
    border-left: 1px solid var(--color-bgLine);
  }
`;

const contentScrollContainerCss = css`
  overflow: auto;
  height: 100%;
`;

const contentCss = css`
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  min-height: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    margin-inline-start: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    padding: 0 var(--space-4);
    flex-direction: row;
  }

  @media only screen and (min-width: ${breakpoints.desktop}px) {
    margin-inline-start: ${paddingStartLarge}px;
  }
`;

export const FullscreenModal = memo(function FullscreenModal({
  focusTabIndexElements,
  logo,
  visible,
  onRequestClose,
  primaryContent,
  primaryContentClassName,
  secondaryContent,
  secondaryContentClassName,
  title,
  testID,
  zIndex,
  disablePortal,
  contentContainerClassName,
  hideDivider,
  showSecondaryContentDivider,
  role,
  onDidClose,
  shouldCloseOnEscPress = true,
  disableFocusTrap,
  restoreFocusOnUnmount = true,
  accessibilityLabelledBy,
  accessibilityLabel,
  closeAccessibilityLabel,
  contentStyle,
}: FullscreenModalProps) {
  const { labelledBySource, labelledBy, label } = useA11yLabels({
    accessibilityLabelledBy,
    accessibilityLabel,
  });

  const content = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <div className={contentScrollContainerCss} tabIndex={0}>
        <div
          className={cx(contentCss, contentContainerClassName)}
          style={contentStyle}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <div className={cx(primaryContentContainerCss, primaryContentClassName)}>
            {primaryContent}
          </div>
          {!!secondaryContent && (
            <div
              className={cx(
                secondaryContentContainerCss,
                showSecondaryContentDivider && secondaryContentDividerCss,
                secondaryContentClassName,
              )}
            >
              {secondaryContent}
            </div>
          )}
        </div>
      </div>
    ),
    [
      contentStyle,
      contentContainerClassName,
      primaryContent,
      primaryContentClassName,
      secondaryContent,
      secondaryContentClassName,
      showSecondaryContentDivider,
    ],
  );

  return (
    <FullscreenModalLayout
      accessibilityLabel={label}
      accessibilityLabelledBy={labelledBy}
      disableFocusTrap={disableFocusTrap}
      disablePortal={disablePortal}
      focusTabIndexElements={focusTabIndexElements}
      onDidClose={onDidClose}
      onRequestClose={onRequestClose}
      restoreFocusOnUnmount={restoreFocusOnUnmount}
      role={role}
      shouldCloseOnEscPress={shouldCloseOnEscPress}
      testID={testID}
      visible={visible}
      zIndex={zIndex}
    >
      <VStack background="bg" height="100%" width="100%">
        <FullscreenModalHeader
          closeAccessibilityLabel={closeAccessibilityLabel}
          hideDivider={hideDivider}
          labelledBySource={labelledBySource}
          logo={logo}
          onRequestClose={onRequestClose}
          title={title}
        />
        {content}
      </VStack>
    </FullscreenModalLayout>
  );
});
