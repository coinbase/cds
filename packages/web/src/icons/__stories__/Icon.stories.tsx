/**
 * DO NOT MODIFY
 * Generated from yarn nx run icons:generate-stories
 */

import { Icon } from '../Icon';

import { IconSheet } from './IconSheet';

export default {
  title: 'Icons',
  component: Icon,
};

// single sheet is too large for Percy, need to split up in chunks of 160 to stay under resource limit
export const IconSheet1 = () => <IconSheet endIndex={60} startIndex={0} />;
export const IconSheet2 = () => <IconSheet endIndex={120} startIndex={60} />;
export const IconSheet3 = () => <IconSheet endIndex={180} startIndex={120} />;
export const IconSheet4 = () => <IconSheet endIndex={240} startIndex={180} />;
export const IconSheet5 = () => <IconSheet endIndex={300} startIndex={240} />;
export const IconSheet6 = () => <IconSheet endIndex={360} startIndex={300} />;
export const IconSheet7 = () => <IconSheet endIndex={420} startIndex={360} />;
export const IconSheet8 = () => <IconSheet endIndex={480} startIndex={420} />;
export const IconSheet9 = () => <IconSheet endIndex={540} startIndex={480} />;
export const IconSheet10 = () => <IconSheet endIndex={600} startIndex={540} />;
