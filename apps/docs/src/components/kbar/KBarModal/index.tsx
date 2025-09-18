import React, { memo, useCallback } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { Divider, HStack } from '@cbhq/cds-web/layout';
import { Modal } from '@cbhq/cds-web/overlays/modal/Modal';
import { KBarSearch, useKBar, VisualState } from 'kbar';

import KBarAnimator from '../KBarAnimator';
import KBarResults from '../KBarResults';

import styles from './styles.module.css';

const KBarModal = memo(function KBarModal() {
  const { showing, query } = useKBar((state) => ({
    showing: state.visualState !== VisualState.hidden,
  }));

  const handleRequestClose = useCallback(() => {
    query.toggle();
  }, [query]);

  return (
    <Modal
      onRequestClose={handleRequestClose}
      shouldCloseOnEscPress={false}
      visible={showing}
      width={{ tablet: '100%', desktop: 612 }}
    >
      <KBarAnimator>
        <HStack alignItems="center" gap={2} paddingX={3} paddingY={2}>
          <HStack alignItems="center" flexGrow={1} gap={1.5}>
            <Icon color="fg" name="magnifyingGlass" size="s" />
            <KBarSearch className={styles.searchInput} />
          </HStack>
          <IconButton transparent aria-label="close" name="close" onClick={handleRequestClose} />
        </HStack>
        <Divider />
        <KBarResults />
      </KBarAnimator>
    </Modal>
  );
});

export default KBarModal;
