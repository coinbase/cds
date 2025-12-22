import React, { createContext } from 'react';
import { useToggler } from '@coinbase/cds-common';
import { Modal } from '@coinbase/cds-web/overlays/modal/Modal';
import type { ModalBodyProps } from '@coinbase/cds-web/overlays/modal/ModalBody';
import { ModalBody } from '@coinbase/cds-web/overlays/modal/ModalBody';
import { ModalHeader } from '@coinbase/cds-web/overlays/modal/ModalHeader';
import { Link, type LinkBaseProps } from '@coinbase/cds-web/typography/Link';

export type ModalLinkProps = {
  children: string;
  content: React.ReactElement;
  modalBodyRef?: React.RefObject<HTMLDivElement>;
  modalBodyProps?: Omit<ModalBodyProps, 'children'>;
  title?: string;
} & Omit<LinkBaseProps, 'content'>;

/**
 * Gives us the ability to determine if a component is child of Modal.
 * This is useful since we want to hide hyperlink column in PropsTable when in Modal.
 */
export const ModalChildContext = createContext<boolean>(false);

function ModalLink({
  children,
  content,
  modalBodyRef,
  modalBodyProps,
  title,
  ...props
}: ModalLinkProps) {
  const [visible, { toggleOn, toggleOff }] = useToggler();
  return (
    <>
      <Link onClick={toggleOn} {...props}>
        {children}
      </Link>
      <ModalChildContext.Provider value>
        <Modal onRequestClose={toggleOff} visible={visible}>
          <ModalHeader title={title ?? children} />
          <ModalBody ref={modalBodyRef} {...modalBodyProps}>
            {content}
          </ModalBody>
        </Modal>
      </ModalChildContext.Provider>
    </>
  );
}

export default ModalLink;
