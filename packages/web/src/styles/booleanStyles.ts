/**
 * Boolean styles are used to power component style props,
 * but they are not responsive and do not accept arguments.
 * They are either on or off.
 */

/* eslint-disable no-restricted-syntax */

import type { PinningDirection } from '@coinbase/cds-common/types/BoxBaseProps';
import { css, type LinariaClassName } from '@linaria/core';

export const borderStyle = {
  bordered: css`
    border-width: var(--borderWidth-100);
    border-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedHorizontal: css`
    border-inline-start-width: var(--borderWidth-100);
    border-left-style: solid;
    border-inline-end-width: var(--borderWidth-100);
    border-right-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedVertical: css`
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedStart: css`
    border-inline-start-width: var(--borderWidth-100);
    border-inline-start-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedEnd: css`
    border-inline-end-width: var(--borderWidth-100);
    border-inline-end-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedTop: css`
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-color: var(--color-bgLine);
  `,
  borderedBottom: css`
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-bgLine);
  `,
} as const;

export const pinStyle: Record<PinningDirection, LinariaClassName> = {
  top: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `,
  bottom: css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  right: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  `,
  left: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  `,
  all: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
} as const;
